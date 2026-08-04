/**
 * Removes a black studio backdrop from a render, leaving clean alpha.
 *
 * Left opaque, a near-black render composites as a visible rectangle over a
 * page that is #08080B rather than #000. Driving alpha from luminance drops the
 * backdrop out and — usefully — keeps soft shadows and floor reflections as
 * partial alpha, so they blend instead of ending at a hard edge.
 *
 *   node scripts/matte-black.mjs <in.png> <out.png> [lo] [hi]
 */
import puppeteer from 'puppeteer-core';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, process.argv[2]);
const dst = resolve(root, process.argv[3]);
const LO = Number(process.argv[4] ?? 0.015);
const HI = Number(process.argv[5] ?? 0.10);

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => existsSync(p));

const uri = `data:image/png;base64,${readFileSync(src).toString('base64')}`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();

const out = await page.evaluate(
  async (dataUri, lo, hi) => {
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

    const smoothstep = (a, b, x) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };

    let kept = 0;
    for (let i = 0; i < p.length; i += 4) {
      const luma = (0.2126 * p[i] + 0.7152 * p[i + 1] + 0.0722 * p[i + 2]) / 255;
      const a = smoothstep(lo, hi, luma);
      p[i + 3] = Math.round(a * 255);
      if (a > 0.5) kept++;
    }

    ctx.putImageData(d, 0, 0);
    return { W, H, kept, total: W * H, png: c.toDataURL('image/png').split(',')[1] };
  },
  uri,
  LO,
  HI
);

await browser.close();
writeFileSync(dst, Buffer.from(out.png, 'base64'));
console.log(
  `  ✓ ${process.argv[3]}  ${out.W}x${out.H}  subject ${((out.kept / out.total) * 100).toFixed(1)}%`
);
