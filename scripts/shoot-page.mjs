/**
 * Captures the home page at a series of scroll depths, at full resolution.
 *
 *   node scripts/shoot-page.mjs [width] [height]
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
  args: ['--hide-scrollbars'],
});

const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });

const problems = [];
page.on('console', (m) => m.type() === 'error' && problems.push(m.text()));
page.on('pageerror', (e) => problems.push(e.message));
page.on('requestfailed', (r) => problems.push(`failed: ${r.url()}`));

await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 60_000 });
// Let the opening sequence run out and the hero settle.
await new Promise((r) => setTimeout(r, 4500));

await page.screenshot({ path: resolve(outDir, `p-hero${tag}.webp`), type: 'webp', quality: 92 });
console.log('  ✓ hero');

const ids = ['introduction', 'pricing', 'process', 'projects', 'services', 'faq', 'contact'];
for (const id of ids) {
  const y = await page.evaluate((sid) => {
    const el = document.getElementById(sid);
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  }, id);
  if (y == null) {
    console.log(`  ✗ ${id} not found`);
    continue;
  }
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await new Promise((r) => setTimeout(r, 1600));
  await page.screenshot({ path: resolve(outDir, `p-${id}${tag}.webp`), type: 'webp', quality: 92 });
  console.log(`  ✓ ${id}`);
}

if (problems.length) {
  console.log(`\n  ${problems.length} problem(s):`);
  [...new Set(problems)].slice(0, 8).forEach((p) => console.log(`    - ${p}`));
} else {
  console.log('\n  no console errors, page errors or failed requests');
}

await browser.close();
