/**
 * Clicks each header nav item and reports where the section's first content
 * line lands relative to the bottom of the fixed header.
 *
 * A healthy result is a small positive gap. Large positive = dead band.
 */
import puppeteer from 'puppeteer-core';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
mkdirSync(resolve(root, '.shots'), { recursive: true });

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
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 60_000 });
await new Promise((r) => setTimeout(r, 5500));

const ids = ['services', 'pricing', 'process', 'projects', 'faq', 'contact'];

for (const id of ids) {
  await page.evaluate((sid) => {
    const btns = [...document.querySelectorAll('header nav button')];
    const b = btns.find((x) => x.textContent.trim().toLowerCase().startsWith(sid.slice(0, 4)));
    b?.click();
  }, id);

  await new Promise((r) => setTimeout(r, 2200));

  const m = await page.evaluate((sid) => {
    const sec = document.getElementById(sid);
    const header = document.querySelector('header');
    if (!sec || !header) return null;
    // First visible content line: the section's own header block, not the h2
    // inside it — the index row sits above the heading.
    const first = sec.querySelector('header') ?? sec.querySelector('h2') ?? sec;
    return {
      gap: Math.round(first.getBoundingClientRect().top - header.getBoundingClientRect().bottom),
      secTop: Math.round(sec.getBoundingClientRect().top),
    };
  }, id);

  console.log(
    m ? `  ${id.padEnd(9)} gap below header: ${String(m.gap).padStart(4)}px   (section top ${m.secTop}px)` : `  ${id}: not found`
  );
}

await page.screenshot({ path: resolve(root, '.shots/nav-landing.webp'), type: 'webp', quality: 90 });
await browser.close();
