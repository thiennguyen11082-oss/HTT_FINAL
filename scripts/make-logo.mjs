/**
 * Turns the supplied logo.png into a transparent mark.
 *
 * The source is a light ring + lettering sitting on a dark disc, on a grey
 * gradient square. Dropped straight into the dark header, that square's corners
 * are visible. This masks to the disc and drives alpha from luminance, leaving
 * just the ring and letters.
 */
import puppeteer from 'puppeteer-core';
import { existsSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'public/assets/logo/logo.png');
const out = resolve(root, 'public/assets/logo/logo-mark.png');

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => existsSync(p));

const dataUri = `data:image/png;base64,${readFileSync(src).toString('base64')}`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();

const b64 = await page.evaluate(async (uri) => {
  const img = new Image();
  img.src = uri;
  await img.decode();

  const N = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = N;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, N, N);

  const d = ctx.getImageData(0, 0, N, N);
  const p = d.data;
  const cx = N / 2;
  const cy = N / 2;
  // The disc fills most of the square; trim just inside so the gradient corners go.
  const R = N * 0.482;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const i = (y * N + x) * 4;
      const dist = Math.hypot(x - cx, y - cy);

      if (dist > R) {
        p[i + 3] = 0;
        continue;
      }

      // Perceptual luminance → alpha. Dark disc drops out, light marks stay.
      const lum = (0.2126 * p[i] + 0.7152 * p[i + 1] + 0.0722 * p[i + 2]) / 255;
      // Lift contrast so the mid-grey halo around the strokes doesn't linger.
      const a = Math.max(0, Math.min(1, (lum - 0.34) / 0.42));

      p[i] = 255;
      p[i + 1] = 255;
      p[i + 2] = 255;
      p[i + 3] = Math.round(a * 255);
    }
  }

  ctx.putImageData(d, 0, 0);
  return c.toDataURL('image/png').split(',')[1];
}, dataUri);

writeFileSync(out, Buffer.from(b64, 'base64'));
await browser.close();
console.log(`Wrote ${out}`);
