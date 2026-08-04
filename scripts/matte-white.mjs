/**
 * Removes a white studio backdrop from a render, leaving clean alpha.
 *
 * A luminance threshold alone eats the specular highlights on polished metal —
 * they are as bright as the backdrop. So this flood-fills inward from the four
 * corners instead: only white that is *connected to the edge* is background,
 * which leaves interior highlights untouched. Edge pixels then get a soft alpha
 * ramp so the cutout does not alias.
 *
 *   node scripts/matte-white.mjs <in.png> <out.png>
 */
import puppeteer from 'puppeteer-core';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, process.argv[2]);
const dst = resolve(root, process.argv[3]);

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

  const lumaAt = (i) => (0.2126 * p[i] + 0.7152 * p[i + 1] + 0.0722 * p[i + 2]) / 255;
  const satAt = (i) => {
    const mx = Math.max(p[i], p[i + 1], p[i + 2]);
    const mn = Math.min(p[i], p[i + 1], p[i + 2]);
    return mx === 0 ? 0 : (mx - mn) / mx;
  };

  // Background = bright, near-neutral, and reachable from an edge.
  const isBg = (i) => lumaAt(i) > 0.80 && satAt(i) < 0.10;

  const bg = new Uint8Array(W * H);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const n = y * W + x;
    if (bg[n]) return;
    if (!isBg(n * 4)) return;
    bg[n] = 1;
    stack.push(n);
  };

  for (let x = 0; x < W; x++) {
    push(x, 0);
    push(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    push(0, y);
    push(W - 1, y);
  }

  while (stack.length) {
    const n = stack.pop();
    const x = n % W;
    const y = (n / W) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  // Soft edge: alpha falls off across the boundary rather than cutting hard.
  const alpha = new Float32Array(W * H);
  for (let n = 0; n < W * H; n++) alpha[n] = bg[n] ? 0 : 1;

  const blurred = new Float32Array(W * H);
  const R = 1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let sum = 0;
      let count = 0;
      for (let dy = -R; dy <= R; dy++) {
        for (let dx = -R; dx <= R; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          sum += alpha[ny * W + nx];
          count++;
        }
      }
      blurred[y * W + x] = sum / count;
    }
  }

  let kept = 0;
  for (let n = 0; n < W * H; n++) {
    const a = blurred[n];
    p[n * 4 + 3] = Math.round(a * 255);
    if (a > 0.5) kept++;
  }

  ctx.putImageData(d, 0, 0);
  return { W, H, kept, total: W * H, png: c.toDataURL('image/png').split(',')[1] };
}, uri);

await browser.close();
writeFileSync(dst, Buffer.from(out.png, 'base64'));
console.log(
  `  ✓ ${process.argv[3]}  ${out.W}x${out.H}  subject ${((out.kept / out.total) * 100).toFixed(1)}%`
);
