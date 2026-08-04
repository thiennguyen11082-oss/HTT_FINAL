/**
 * Captures the local site at a set of scroll positions inside the pinned hero,
 * so each act of the 3D sequence can be inspected at full resolution.
 *
 *   node scripts/shoot-acts.mjs [width] [height]
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, '.shots');
mkdirSync(outDir, { recursive: true });

const W = Number(process.argv[2]) || 1440;
const H = Number(process.argv[3]) || 900;

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => existsSync(p));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--enable-unsafe-swiftshader', '--use-gl=angle'],
});

const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
page.on('console', (m) => m.type() === 'error' && console.log('  console:', m.text()));
page.on('pageerror', (e) => console.log('  pageerror:', e.message));

await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 60_000 });

// Let the preloader run to completion and the reveal settle.
await new Promise((r) => setTimeout(r, 5000));

const pinPx = await page.evaluate(() => window.innerHeight * 5.2);

/** Hero-progress checkpoints worth eyeballing. */
const marks = [
  ['00-revealed', 0],
  ['01-turn-early', 0.1],
  ['02-morph-start', 0.17],
  ['03-morph-mid', 0.22],
  ['04-morph-end', 0.29],
  ['05-phone-front', 0.42],
  ['06-scrub-start', 0.5],
  ['07-scrub-mid', 0.72],
  ['08-scrub-end', 0.98],
];

for (const [name, p] of marks) {
  await page.evaluate((y) => window.scrollTo(0, y), p * pinPx);
  // Lenis eases; give it time to arrive and the video time to seek.
  await new Promise((r) => setTimeout(r, 1400));
  await page.screenshot({ path: resolve(outDir, `${name}.webp`), type: 'webp', quality: 90 });
  const state = await page.evaluate(() => {
    const s = window.__stage;
    return s ? `hero=${s.hero.toFixed(3)} morph=${s.morph.toFixed(3)}` : 'n/a';
  });
  console.log(`  ✓ ${name}  ${state}`);
}

await browser.close();
console.log(`\nWrote ${marks.length} shots to .shots/`);
