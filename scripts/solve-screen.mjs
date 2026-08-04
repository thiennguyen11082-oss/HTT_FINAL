/**
 * Extracts the screen quad from a chroma-keyed device render and solves the
 * CSS matrix3d that maps a flat rectangle onto it.
 *
 * Compositing a live DOM screen into a photoreal render only works if the
 * perspective matches exactly. Eyeballing a rotateY/rotateX pair does not —
 * the render has real lens perspective. So: key out the green, find the quad's
 * four extreme corners, solve the homography, and emit it as matrix3d.
 *
 *   node scripts/solve-screen.mjs <in.png> <name>
 *
 * Writes public/assets/devices/<name>.webp (green removed, alpha punched) and
 * prints the matrix plus the quad bounds.
 */
import puppeteer from 'puppeteer-core';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, process.argv[2]);
const name = process.argv[3];

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => existsSync(p));

const uri = `data:image/png;base64,${readFileSync(src).toString('base64')}`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();

const out = await page.evaluate(async (dataUri) => {
  const img = new Image();
  img.src = dataUri;
  await img.decode();

  const W = img.naturalWidth;
  const H = img.naturalHeight;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);

  const d = ctx.getImageData(0, 0, W, H);
  const p = d.data;

  /** Green-dominant test, tolerant of the render's lighting on the screen. */
  const isGreen = (i) => {
    const r = p[i], g = p[i + 1], b = p[i + 2];
    return g > 90 && g - r > 45 && g - b > 45;
  };

  // Collect green pixels and find the four extreme corners by rotated extents.
  // Min/max of (x+y) and (x-y) picks out the corners of a rotated quad far more
  // reliably than a bounding box does.
  let minSum = Infinity, maxSum = -Infinity, minDiff = Infinity, maxDiff = -Infinity;
  let cTop = null, cBottom = null, cLeft = null, cRight = null;
  let count = 0;
  let minX = W, maxX = 0, minY = H, maxY = 0;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (!isGreen(i)) continue;
      count++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      const sum = x + y, diff = x - y;
      if (sum < minSum) { minSum = sum; cTop = [x, y]; }
      if (sum > maxSum) { maxSum = sum; cBottom = [x, y]; }
      if (diff < minDiff) { minDiff = diff; cLeft = [x, y]; }
      if (diff > maxDiff) { maxDiff = diff; cRight = [x, y]; }
    }
  }

  if (count < 500) return { error: `only ${count} green pixels found` };

  /*
   * Two cuts.
   *
   * 1. Green → fully transparent, so the live DOM screen shows through.
   * 2. The render's black backdrop → transparent, driven by luminance. Left
   *    opaque it composites as a visible black rectangle over the page. A
   *    luminance matte also does the right thing with the soft contact shadow:
   *    it survives as a partial alpha rather than a hard edge.
   */
  const smoothstep = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };

  for (let i = 0; i < p.length; i += 4) {
    const r = p[i], g = p[i + 1], b = p[i + 2];

    if (isGreen(i)) {
      p[i + 3] = 0;
      continue;
    }

    if (g > r && g > b) {
      // Green spill on the bezel: pull it down toward the neighbour average.
      const avg = (r + b) / 2;
      p[i + 1] = Math.min(g, avg + 6);
    }

    const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    // Anything at true black drops out; the device and its shadow ramp in.
    p[i + 3] = Math.round(smoothstep(0.012, 0.085, luma) * 255);
  }
  ctx.putImageData(d, 0, 0);

  return {
    W, H, count,
    corners: { top: cTop, right: cRight, bottom: cBottom, left: cLeft },
    bbox: { minX, minY, maxX, maxY },
    png: c.toDataURL('image/png').split(',')[1],
  };
}, uri);

await browser.close();

if (out.error) {
  console.error(out.error);
  process.exit(1);
}

mkdirSync(resolve(root, 'public/assets/devices'), { recursive: true });
const pngPath = resolve(root, `public/assets/devices/${name}.png`);
writeFileSync(pngPath, Buffer.from(out.png, 'base64'));

/* ---- solve the homography mapping the unit square to the screen quad ---- */

const { top, right, bottom, left } = out.corners;
/**
 * Map the extremes onto the quad's real corners.
 *
 * min(x+y) is the corner nearest the origin — the top-left. max(x−y) is the
 * one furthest right for its height — the top-right. And so round. Ordering
 * these wrong rotates the whole composite by a quarter turn.
 */
/**
 * Source rectangle is the screen's *design* size in CSS pixels, so the overlay
 * can be laid out at a sane scale. Its aspect must match the device's real
 * screen aspect or the homography will stretch the content.
 */
const SW = Number(process.argv[4]) || 390;
const SH = Number(process.argv[5]) || 845;

const src4 = [
  [0, 0],
  [SW, 0],
  [SW, SH],
  [0, SH],
];
const dst4 = [top, right, bottom, left].map(([x, y]) => [x, y]);

function solveHomography(s, d) {
  const A = [];
  const b = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = s[i];
    const [u, v] = d[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    b.push(v);
  }
  // Gaussian elimination on the 8x8 system.
  const n = 8;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
    [M[col], M[piv]] = [M[piv], M[col]];
    const pv = M[col][col];
    for (let k = col; k <= n; k++) M[col][k] /= pv;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col];
      for (let k = col; k <= n; k++) M[r][k] -= f * M[col][k];
    }
  }
  return M.map((r) => r[n]);
}

const h = solveHomography(src4, dst4);
const [a, bb, c0, d0, e, f, g, i2] = h;

// CSS matrix3d is column-major 4x4; a 2D homography maps in as the x/y/w rows.
const matrix3d = [a, d0, 0, g, bb, e, 0, i2, 0, 0, 1, 0, c0, f, 0, 1]
  .map((v) => Number(v.toFixed(6)))
  .join(', ');

console.log(`\n${name}`);
console.log(`  image      ${out.W} x ${out.H}`);
console.log(`  green px   ${out.count}`);
console.log(`  corners    TL ${dst4[0]}  TR ${dst4[1]}  BR ${dst4[2]}  BL ${dst4[3]}`);
console.log(`  bbox       ${JSON.stringify(out.bbox)}`);
console.log(`\n  matrix3d(${matrix3d})\n`);

writeFileSync(
  resolve(root, `public/assets/devices/${name}.json`),
  JSON.stringify(
    { width: out.W, height: out.H, screen: { w: SW, h: SH }, corners: dst4, matrix3d },
    null,
    2
  )
);
