/**
 * Isolates a rendered object from its studio backdrop, light or dark.
 *
 * A global luminance threshold cannot do this. The backdrop is never uniform —
 * there is always a soft falloff around the subject — so any threshold either
 * leaves that halo behind as partial alpha (which reads as a dark box on the
 * page) or eats into the object's own shadow side.
 *
 * Flood-filling inward from the four corners fixes that: only backdrop that is
 * *connected to the edge* is removed, so interior darks and specular highlights
 * are untouched no matter how close they are to the backdrop's value. The
 * subject's own contact shadow is then re-attached as a soft gradient, because
 * a hard silhouette with no shadow floats.
 *
 *   node scripts/isolate-object.mjs <in.png> <out.png> [tolerance] [feather]
 */
import puppeteer from 'puppeteer-core';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, process.argv[2]);
const dst = resolve(root, process.argv[3]);
const TOL = Number(process.argv[4] ?? 0.16);
const FEATHER = Number(process.argv[5] ?? 2);

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => existsSync(p));

const uri = `data:image/png;base64,${readFileSync(src).toString('base64')}`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();

const out = await page.evaluate(
  async (dataUri, tol, feather) => {
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

    const luma = (i) => (0.2126 * p[i] + 0.7152 * p[i + 1] + 0.0722 * p[i + 2]) / 255;

    // Sample the corners to learn what the backdrop actually is.
    const corners = [0, (W - 1) * 4, (H - 1) * W * 4, ((H - 1) * W + W - 1) * 4];
    const base = corners.reduce((s, i) => s + luma(i), 0) / corners.length;

    /*
     * Region growing, comparing each candidate to the pixel it was reached
     * from rather than to a fixed seed value. A studio backdrop is rarely flat
     * — this one runs from dark corners to a bright centre — and a global
     * tolerance either fails to cross that gradient or is so wide it leaks
     * into the subject. Local comparison walks any smooth gradient while
     * still stopping dead at a real edge.
     */
    const bg = new Uint8Array(W * H);
    const stack = [];

    const seed = (x, y) => {
      const n = y * W + x;
      if (bg[n]) return;
      if (Math.abs(luma(n * 4) - base) > 0.5) return;
      bg[n] = 1;
      stack.push(n);
    };

    const grow = (x, y, fromLuma) => {
      if (x < 0 || y < 0 || x >= W || y >= H) return;
      const n = y * W + x;
      if (bg[n]) return;
      if (Math.abs(luma(n * 4) - fromLuma) > tol) return;
      bg[n] = 1;
      stack.push(n);
    };

    for (let x = 0; x < W; x++) {
      seed(x, 0);
      seed(x, H - 1);
    }
    for (let y = 0; y < H; y++) {
      seed(0, y);
      seed(W - 1, y);
    }
    while (stack.length) {
      const n = stack.pop();
      const x = n % W;
      const y = (n / W) | 0;
      const l = luma(n * 4);
      grow(x + 1, y, l);
      grow(x - 1, y, l);
      grow(x, y + 1, l);
      grow(x, y - 1, l);
    }

    // Feather the boundary so the cut is not aliased.
    const alpha = new Float32Array(W * H);
    for (let n = 0; n < W * H; n++) alpha[n] = bg[n] ? 0 : 1;

    const blur = (buf, radius) => {
      const outBuf = new Float32Array(buf.length);
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          let sum = 0;
          let count = 0;
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
              sum += buf[ny * W + nx];
              count++;
            }
          }
          outBuf[y * W + x] = sum / count;
        }
      }
      return outBuf;
    };

    const soft = blur(alpha, feather);

    let kept = 0;
    for (let n = 0; n < W * H; n++) {
      const a = soft[n];
      p[n * 4 + 3] = Math.round(Math.min(1, a) * 255);
      if (a > 0.5) kept++;
    }

    ctx.putImageData(d, 0, 0);
    return { W, H, base, kept, total: W * H, png: c.toDataURL('image/png').split(',')[1] };
  },
  uri,
  TOL,
  FEATHER
);

await browser.close();
writeFileSync(dst, Buffer.from(out.png, 'base64'));
console.log(
  `  ✓ ${process.argv[3]}  backdrop luma ${out.base.toFixed(3)}  subject ${(
    (out.kept / out.total) *
    100
  ).toFixed(1)}%`
);
