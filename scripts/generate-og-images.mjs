import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(projectRoot, 'public', 'og');

const [fraunces, inter, jetBrainsMono] = await Promise.all([
  readFile(path.join(projectRoot, 'public', 'fonts', 'fraunces-latin.woff2'), 'base64'),
  readFile(path.join(projectRoot, 'public', 'fonts', 'inter-latin.woff2'), 'base64'),
  readFile(path.join(projectRoot, 'public', 'fonts', 'jetbrains-mono-latin.woff2'), 'base64'),
]);

const cards = [
  {
    filename: 'home.png',
    route: '/',
    title: 'Cyrus Khiabani — AI-First Programmer | Chatbots, Agents & MCP Servers',
    description: 'AI Engineer building production chatbots, agents, and MCP servers. Open to full-time, part-time, and freelance work.',
  },
  {
    filename: 'work.png',
    route: '/work',
    title: 'Work | Cyrus Khiabani',
    description: 'Case studies: production MCP servers, multi-agent AI systems, and automation tools built for real users — not demos.',
  },
  {
    filename: 'services.png',
    route: '/services',
    title: 'Freelance & Project Work | Cyrus Khiabani',
    description: 'Custom AI agents, MCP servers, and RAG chatbots — scoped, priced, and built for companies that need production-grade AI systems.',
  },
  {
    filename: 'hire-me.png',
    route: '/hire-me',
    title: 'Hire Me | Cyrus Khiabani',
    description: 'AI-First Programmer open to full-time and part-time roles. Monmouth County, NJ — willing to travel.',
  },
];

const escapeHtml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const renderCard = ({ route, title, description }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: Fraunces; src: url(data:font/woff2;base64,${fraunces}) format('woff2'); font-weight: 400 700; }
      @font-face { font-family: Inter; src: url(data:font/woff2;base64,${inter}) format('woff2'); font-weight: 400 700; }
      @font-face { font-family: JetBrainsMono; src: url(data:font/woff2;base64,${jetBrainsMono}) format('woff2'); font-weight: 400 500; }
      :root {
        --pine-deep: rgb(14 42 31);
        --pine-darker: rgb(8 26 19);
        --ridge-blue: rgb(44 95 124);
        --ocean-glass: rgb(95 168 160);
        --birch: rgb(242 239 230);
        --ember: rgb(201 110 59);
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
      body { background: var(--pine-deep); color: var(--birch); font-family: Inter, sans-serif; }
      main { position: relative; isolation: isolate; width: 1200px; height: 630px; padding: 68px 76px; }
      main::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -2;
        background:
          radial-gradient(ellipse at 82% 34%, rgb(95 168 160 / 0.24), transparent 48%),
          linear-gradient(118deg, var(--pine-darker), var(--pine-deep) 58%, rgb(23 51 36));
      }
      .contours { position: absolute; inset: 0 0 0 47%; z-index: -1; width: 53%; height: 100%; opacity: 0.48; }
      .contours path { fill: none; stroke: var(--ocean-glass); stroke-width: 2; }
      .route { display: inline-flex; align-items: center; gap: 12px; font: 500 18px/1 JetBrainsMono, monospace; letter-spacing: 0.08em; text-transform: uppercase; color: rgb(137 198 191); }
      .route::before { content: ''; width: 9px; height: 9px; border-radius: 50%; background: var(--ember); box-shadow: 0 0 0 6px rgb(201 110 59 / 0.16); }
      h1 { max-width: 850px; margin: 46px 0 0; font: 600 66px/0.99 Fraunces, serif; letter-spacing: -0.025em; text-wrap: balance; }
      p { max-width: 800px; margin: 32px 0 0; font-size: 24px; line-height: 1.42; color: rgb(220 232 224); text-wrap: balance; }
      footer { position: absolute; right: 76px; bottom: 54px; font: 500 17px/1 JetBrainsMono, monospace; letter-spacing: 0.04em; color: rgb(137 198 191); }
      .rule { position: absolute; left: 76px; right: 76px; bottom: 86px; height: 1px; background: rgb(95 168 160 / 0.35); }
    </style>
  </head>
  <body>
    <main>
      <svg class="contours" viewBox="0 0 636 630" aria-hidden="true">
        <path d="M724 42C622 4 526 1 440 32c-97 35-113 121-208 143-80 18-160-27-228 19-76 52-41 162 35 190 78 29 142-26 218-13 87 15 106 104 194 127 84 22 178-24 273-72" />
        <path d="M724 88c-94-34-185-33-263-4-87 32-102 107-187 128-73 18-145-23-206 18-67 46-37 142 31 168 70 26 128-22 196-10 78 14 96 92 175 113 76 20 160-21 254-64" />
        <path d="M724 137c-87-31-170-30-242-3-79 28-92 95-169 114-66 16-132-21-187 16-61 42-33 127 28 150 63 24 116-19 177-8 71 12 87 82 159 101 69 18 145-19 234-59" />
        <path d="M724 189c-79-28-155-27-221-3-71 26-83 86-153 103-59 14-118-19-168 15-55 37-30 114 25 135 57 21 104-18 160-8 63 11 78 74 143 91 61 16 130-17 214-54" />
        <path d="M724 244c-72-26-141-25-201-3-65 23-76 77-139 93-54 13-108-17-153 13-50 34-27 103 23 122 51 19 94-16 144-7 58 10 71 66 130 82 56 15 118-15 196-49" />
        <path d="M724 302c-65-23-128-22-182-2-58 21-68 70-126 84-49 12-97-15-138 12-45 30-25 93 20 110 47 17 86-14 131-6 52 9 64 60 117 74 51 13 107-14 178-44" />
      </svg>
      <div class="route">${escapeHtml(route)}</div>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(description)}</p>
      <div class="rule"></div>
      <footer>cyruskhiabani.com</footer>
    </main>
  </body>
</html>`;

await mkdir(outputDirectory, { recursive: true });

const systemChromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
  ?? (existsSync(systemChromePath) ? systemChromePath : undefined);
const browser = await puppeteer.launch({ headless: true, executablePath });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  for (const card of cards) {
    await page.setContent(renderCard(card), { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: path.join(outputDirectory, card.filename),
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });
  }
} finally {
  await browser.close();
}

console.log(`Generated ${cards.length} OG images in ${outputDirectory}`);
