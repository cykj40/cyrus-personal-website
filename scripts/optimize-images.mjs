/**
 * Re-encodes the site's raster images to responsive WebP (plus a JPEG fallback).
 *
 * Uses the Chromium that already ships with puppeteer (a devDependency, used by
 * scripts/generate-og-images.mjs) as the encoder, so this adds no new package.
 * Run with: node scripts/optimize-images.mjs
 */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Widths are driven by the largest box each image is ever painted into.
 * The profile photo sits in a `max-w-[280px]` column, so 280 / 560 / 840 covers
 * 1x through 3x and nothing above that is ever useful.
 */
const targets = [
  {
    source: 'image-sources/cyrus-portfolio-picture-1.png',
    outputDirectory: 'public/images/profile',
    basename: 'cyrus-portfolio',
    widths: [280, 560, 840],
    webpQuality: 0.82,
    jpegQuality: 0.82,
  },
];

const mimeFor = (file) =>
  ({ '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' })[
    path.extname(file).toLowerCase()
  ] ?? 'application/octet-stream';

// Falls back to a locally installed Chrome when puppeteer's own download is not
// present (`npx puppeteer browsers install chrome` fetches it otherwise).
const DEFAULT_MAC_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executablePath =
  process.env.CHROME_PATH ??
  (existsSync(puppeteer.executablePath()) ? undefined : DEFAULT_MAC_CHROME);

const browser = await puppeteer.launch({ headless: true, executablePath });
const page = await browser.newPage();

for (const target of targets) {
  const sourcePath = path.join(projectRoot, target.source);
  const outputDirectory = path.join(projectRoot, target.outputDirectory);
  await mkdir(outputDirectory, { recursive: true });

  const sourceBytes = (await stat(sourcePath)).size;
  const dataUrl = `data:${mimeFor(sourcePath)};base64,${await readFile(sourcePath, 'base64')}`;

  const encoded = await page.evaluate(
    async (src, widths, webpQuality, jpegQuality) => {
      const image = new Image();
      image.src = src;
      await image.decode();

      const results = [];
      for (const width of widths) {
        const height = Math.round((image.naturalHeight / image.naturalWidth) * width);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(image, 0, 0, width, height);

        results.push({
          width,
          height,
          webp: canvas.toDataURL('image/webp', webpQuality).split(',')[1],
          jpeg: canvas.toDataURL('image/jpeg', jpegQuality).split(',')[1],
        });
      }
      return { intrinsicWidth: image.naturalWidth, intrinsicHeight: image.naturalHeight, results };
    },
    dataUrl,
    target.widths,
    target.webpQuality,
    target.jpegQuality
  );

  console.log(
    `\n${target.source} — ${encoded.intrinsicWidth}x${encoded.intrinsicHeight}, ${(sourceBytes / 1024).toFixed(0)} kB`
  );

  for (const variant of encoded.results) {
    for (const format of ['webp', 'jpeg']) {
      const extension = format === 'jpeg' ? 'jpg' : 'webp';
      const filename = `${target.basename}-${variant.width}w.${extension}`;
      const buffer = Buffer.from(variant[format], 'base64');
      await writeFile(path.join(outputDirectory, filename), buffer);
      console.log(
        `  ${filename.padEnd(32)} ${variant.width}x${variant.height}  ${(buffer.length / 1024).toFixed(1)} kB`
      );
    }
  }
}

await browser.close();
