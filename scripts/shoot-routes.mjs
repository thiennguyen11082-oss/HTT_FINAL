/**
 * Captures the top of each detail route, and reports console/page errors.
 *
 *   node scripts/shoot-routes.mjs [width] [height]
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

const routes = ['services', 'pricing', 'process', 'projects', 'faq', 'contact'];

for (const r of routes) {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });

  const problems = [];
  page.on('console', (m) => m.type() === 'error' && problems.push(m.text()));
  page.on('pageerror', (e) => problems.push(e.message));

  await page.goto(`http://localhost:5173/${r}`, { waitUntil: 'networkidle2', timeout: 60_000 });
  await new Promise((res) => setTimeout(res, 2500));

  await page.screenshot({ path: resolve(outDir, `route-${r}.webp`), type: 'webp', quality: 90 });

  // A second shot further down, where the real content lives.
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.15));
  await new Promise((res) => setTimeout(res, 1200));
  await page.screenshot({
    path: resolve(outDir, `route-${r}-body.webp`),
    type: 'webp',
    quality: 90,
  });

  const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent ?? '(no h1)');
  console.log(`  ${problems.length ? '✗' : '✓'} /${r} — "${h1.slice(0, 46)}"`);
  problems.slice(0, 3).forEach((p) => console.log(`      ${p}`));

  await page.close();
}

await browser.close();
