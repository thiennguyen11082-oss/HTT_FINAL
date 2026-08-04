/**
 * Captures each content section below the hero at full resolution.
 *
 *   node scripts/shoot-sections.mjs [width] [height]
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
const tag = process.argv[4] ? `-${process.argv[4]}` : '';

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
page.on('pageerror', (e) => console.log('  pageerror:', e.message));

await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 60_000 });
await new Promise((r) => setTimeout(r, 5000));

const ids = ['services', 'pricing', 'process', 'projects', 'faq', 'contact'];

for (const id of ids) {
  const y = await page.evaluate((sid) => {
    const el = document.getElementById(sid);
    if (!el) return null;
    return el.getBoundingClientRect().top + window.scrollY;
  }, id);

  if (y == null) {
    console.log(`  ✗ ${id}: not found`);
    continue;
  }

  await page.evaluate((top) => window.scrollTo(0, top), y);
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: resolve(outDir, `sec-${id}${tag}.webp`), type: 'webp', quality: 90 });
  console.log(`  ✓ ${id}`);
}

// Footer, from the very bottom.
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: resolve(outDir, `sec-footer${tag}.webp`), type: 'webp', quality: 90 });
console.log('  ✓ footer');

await browser.close();
