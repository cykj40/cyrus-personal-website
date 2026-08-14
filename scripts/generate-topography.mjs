/**
 * Generates the contour geometry for <TopographicContours />.
 *
 *   node scripts/generate-topography.mjs
 *
 * Writes src/components/ui/topography-data.ts.
 *
 * The geometry is fully deterministic — it is a marching-squares trace of an
 * analytic height field, not hand-drawn decoration. It is baked at author time
 * rather than computed in the browser because tracing 25 levels over a
 * 176x100 grid costs ~35ms on a laptop and several hundred on a phone, which
 * is not a bill the hero should pay on first paint.
 *
 * Re-run this script after editing PEAKS or height().
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/** Design-space dimensions of the field. Consumers slice it to fit. */
const W = 1600;
const H = 900;

/** Grid resolution of the sampled height field. */
const COLS = 176;
const ROWS = 100;

/** Number of elevation intervals traced. */
const LEVELS = 26;

/**
 * Fraction of W/H sampled beyond each edge. Layers drift by a few pixels and
 * the SVG is slice-cropped, so the field has to extend past the viewBox or a
 * bare edge would swing into view.
 */
const PAD = 0.22;

/** Elevation bands, low to high. Each becomes one parallax layer. */
const BANDS = 4;

// ── Height field ────────────────────────────────────────────────────────────

/**
 * A coastal range: a dominant massif upper-right, a secondary ridge running
 * lower-left, spurs, and three basins (negative amplitude) that read as water.
 * Columns: cx, cy, sigmaX, sigmaY, amplitude, rotation.
 */
const PEAKS = [
  [0.72, 0.30, 0.115, 0.085, 1.0, -0.45],
  [0.86, 0.46, 0.085, 0.07, 0.78, 0.3],
  [0.6, 0.5, 0.09, 0.06, 0.62, -0.2],
  [0.94, 0.2, 0.07, 0.065, 0.55, 0.0],
  [0.46, 0.24, 0.075, 0.055, 0.44, 0.55],
  [0.34, 0.66, 0.105, 0.062, 0.5, -0.3],
  [0.2, 0.42, 0.08, 0.07, 0.34, 0.4],
  [0.52, 0.86, 0.11, 0.06, 0.38, 0.15],
  [0.8, 0.78, 0.09, 0.07, 0.3, -0.1],
  [0.08, 0.16, 0.09, 0.075, 0.26, 0.2],
  [0.06, 0.8, 0.1, 0.08, -0.34, 0.25],
  [0.66, 0.06, 0.09, 0.055, -0.26, -0.2],
  [0.26, 0.98, 0.09, 0.06, -0.22, 0.1],
];

function height(x, y) {
  let h = 0;
  for (const [cx, cy, sx, sy, amp, rot] of PEAKS) {
    const dx = x - cx;
    const dy = y - cy;
    const c = Math.cos(rot);
    const s = Math.sin(rot);
    const u = (dx * c + dy * s) / sx;
    const v = (-dx * s + dy * c) / sy;
    h += amp * Math.exp(-0.5 * (u * u + v * v));
  }
  // A ridge spine: inverted |sin| gives the sharp crest that a sum of
  // Gaussians alone cannot produce, so the field reads as a range rather
  // than a field of separate domes.
  const spine = x * 0.72 + y * 0.6;
  h +=
    0.34 *
    Math.exp(-0.5 * Math.pow((y - 0.14 - 0.42 * x) / 0.3, 2)) *
    (1 - Math.abs(Math.sin(spine * 6.4)));
  // Regional tilt, so contours never close into tidy concentric ovals.
  h += 0.3 * (1 - y) + 0.1 * x;
  // Layered ripple: turns smooth domes into ridges, spurs, and saddles.
  h += 0.085 * Math.sin(x * 7.1 + y * 3.3) * Math.cos(y * 5.7 - x * 2.1);
  h += 0.05 * Math.sin(x * 11.9 - y * 8.2) * Math.sin(y * 6.1 + 1.3);
  h += 0.02 * Math.cos(x * 15.1 + y * 12.9);
  return h;
}

// ── Marching squares ────────────────────────────────────────────────────────

function contourSegments(grid, cols, rows, level) {
  const segs = [];
  const at = (c, r) => grid[r * (cols + 1) + c];
  const lerp = (a, b) => (level - a) / (b - a);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tl = at(c, r);
      const tr = at(c + 1, r);
      const br = at(c + 1, r + 1);
      const bl = at(c, r + 1);
      let idx = 0;
      if (tl > level) idx |= 8;
      if (tr > level) idx |= 4;
      if (br > level) idx |= 2;
      if (bl > level) idx |= 1;
      if (idx === 0 || idx === 15) continue;

      const T = () => [c + lerp(tl, tr), r];
      const R = () => [c + 1, r + lerp(tr, br)];
      const B = () => [c + lerp(bl, br), r + 1];
      const L = () => [c, r + lerp(tl, bl)];

      switch (idx) {
        case 1:
        case 14:
          segs.push([L(), B()]);
          break;
        case 2:
        case 13:
          segs.push([B(), R()]);
          break;
        case 3:
        case 12:
          segs.push([L(), R()]);
          break;
        case 4:
        case 11:
          segs.push([T(), R()]);
          break;
        case 6:
        case 9:
          segs.push([T(), B()]);
          break;
        case 7:
        case 8:
          segs.push([L(), T()]);
          break;
        // Saddles: resolve both crossings independently.
        case 5:
          segs.push([L(), T()]);
          segs.push([B(), R()]);
          break;
        case 10:
          segs.push([T(), R()]);
          segs.push([L(), B()]);
          break;
      }
    }
  }
  return segs;
}

/** Chains the unordered segment soup into polylines by endpoint matching. */
function stitch(segs, prec = 1e4) {
  const key = (p) => `${Math.round(p[0] * prec)},${Math.round(p[1] * prec)}`;
  const segKey = (a, b) => `${key(a)}|${key(b)}`;
  const adjacency = new Map();

  for (const [a, b] of segs) {
    for (const [from, to] of [
      [a, b],
      [b, a],
    ]) {
      const k = key(from);
      if (!adjacency.has(k)) adjacency.set(k, []);
      adjacency.get(k).push(to);
    }
  }

  const used = new Set();
  const lines = [];

  for (const [a, b] of segs) {
    if (used.has(segKey(a, b))) continue;
    used.add(segKey(a, b));
    used.add(segKey(b, a));
    const line = [a, b];

    // Extend from the tail, then from the head.
    for (const fromTail of [true, false]) {
      for (;;) {
        const tip = fromTail ? line[line.length - 1] : line[0];
        const next = (adjacency.get(key(tip)) || []).find(
          (n) => !used.has(segKey(tip, n))
        );
        if (!next) break;
        used.add(segKey(tip, next));
        used.add(segKey(next, tip));
        if (fromTail) line.push(next);
        else line.unshift(next);
        const other = fromTail ? line[0] : line[line.length - 1];
        if (key(next) === key(other)) break; // closed the loop
      }
    }
    if (line.length >= 3) lines.push(line);
  }
  return lines;
}

/** Marching squares emits far more vertices than the smoothed curve needs. */
function decimate(pts, step, closed) {
  if (pts.length <= 6 || step <= 1) return pts;
  const out = [];
  for (let i = 0; i < pts.length; i += step) out.push(pts[i]);
  const tail = pts[pts.length - 1];
  if (!closed && out[out.length - 1] !== tail) out.push(tail);
  return out.length >= 4 ? out : pts;
}

/** Catmull-Rom through the vertices, emitted as cubic Béziers. */
function toPath(pts, sx, sy, closed) {
  const n = pts.length;
  const P = (i) =>
    pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  const X = (p) => Math.round(p[0] * sx);
  const Y = (p) => Math.round(p[1] * sy);

  let d = `M${X(P(0))} ${Y(P(0))}`;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = P(i - 1);
    const p1 = P(i);
    const p2 = P(i + 1);
    const p3 = P(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${X(c1)} ${Y(c1)} ${X(c2)} ${Y(c2)} ${X(p2)} ${Y(p2)}`;
  }
  return closed ? `${d}Z` : d;
}

// ── Build ───────────────────────────────────────────────────────────────────

function build() {
  const grid = new Float64Array((COLS + 1) * (ROWS + 1));
  let lo = Infinity;
  let hi = -Infinity;

  for (let r = 0; r <= ROWS; r++) {
    for (let c = 0; c <= COLS; c++) {
      const x = -PAD + (c / COLS) * (1 + 2 * PAD);
      const y = -PAD + (r / ROWS) * (1 + 2 * PAD);
      const h = height(x, y);
      grid[r * (COLS + 1) + c] = h;
      if (h < lo) lo = h;
      if (h > hi) hi = h;
    }
  }

  const sx = (W * (1 + 2 * PAD)) / COLS;
  const sy = (H * (1 + 2 * PAD)) / ROWS;
  const bands = Array.from({ length: BANDS }, () => []);

  for (let i = 1; i < LEVELS; i++) {
    const t = i / LEVELS;
    const paths = [];

    for (const line of stitch(contourSegments(grid, COLS, ROWS, lo + t * (hi - lo)))) {
      const head = line[0];
      const tail = line[line.length - 1];
      const closed =
        Math.abs(head[0] - tail[0]) < 1e-6 && Math.abs(head[1] - tail[1]) < 1e-6;
      const pts = closed ? line.slice(0, -1) : line;
      if (pts.length < 4) continue;
      paths.push(toPath(decimate(pts, 5, closed), sx, sy, closed));
    }
    if (!paths.length) continue;

    const band = Math.min(BANDS - 1, Math.floor(((i - 1) / (LEVELS - 1)) * BANDS));
    bands[band].push({ t: Number(t.toFixed(3)), paths });
  }

  return { bands, offsetX: -W * PAD, offsetY: -H * PAD };
}

const { bands, offsetX, offsetY } = build();
const pathCount = bands.reduce(
  (n, band) => n + band.reduce((m, level) => m + level.paths.length, 0),
  0
);

const out = `// GENERATED FILE — do not edit by hand.
// Run \`node scripts/generate-topography.mjs\` to regenerate.
//
// Marching-squares contour trace of the analytic height field defined in that
// script. ${pathCount} paths across ${BANDS} elevation bands, low to high.

/** One traced elevation interval. \`t\` is 0..1 from lowest to highest. */
export interface ContourLevel {
  /** Normalised elevation, 0 = lowest traced interval, 1 = highest. */
  t: number;
  /** SVG path data, in the coordinate space described by {@link TOPO_VIEWBOX}. */
  paths: string[];
}

/** viewBox the paths are authored against, once {@link TOPO_OFFSET} is applied. */
export const TOPO_VIEWBOX = { width: ${W}, height: ${H} } as const;

/**
 * Translation that maps the over-sampled field back onto the viewBox. The
 * field is traced past every edge so drifting layers never reveal a boundary.
 */
export const TOPO_OFFSET = { x: ${offsetX}, y: ${offsetY} } as const;

/** Elevation bands, index 0 = lowest ground, ${BANDS - 1} = summits. */
export const TOPO_BANDS: readonly (readonly ContourLevel[])[] = ${JSON.stringify(
  bands
)} as const;
`;

const here = dirname(fileURLToPath(import.meta.url));
const dest = resolve(here, '../src/components/ui/topography-data.ts');
writeFileSync(dest, out);
console.log(
  `topography-data.ts — ${pathCount} paths, ${(out.length / 1024).toFixed(1)}KB, ` +
    `bands ${bands.map((b) => b.reduce((n, l) => n + l.paths.length, 0)).join('/')}`
);
