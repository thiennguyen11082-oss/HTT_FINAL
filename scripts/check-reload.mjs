/**
 * Scrolls partway down, reloads, and reports where the page ends up.
 * A pass is scrollY back at 0 with the preloader replaying.
 */
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

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
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 60_000 });
await new Promise((r) => setTimeout(r, 5500));

for (const target of [3000, 9000]) {
  await page.evaluate((y) => window.scrollTo(0, y), target);
  await new Promise((r) => setTimeout(r, 1500));
  const before = await page.evaluate(() => Math.round(window.scrollY));

  await page.reload({ waitUntil: 'domcontentloaded' });

  // Sample immediately and then across the preloader window.
  const samples = [];
  for (let i = 0; i < 12; i++) {
    await new Promise((r) => setTimeout(r, 400));
    samples.push(
      await page.evaluate(() => ({
        y: Math.round(window.scrollY),
        locked: document.body.dataset.locked,
      }))
    );
  }

  const trace = samples.map((s) => `${s.y}${s.locked === 'true' ? 'L' : ''}`).join(' → ');
  const settled = samples[samples.length - 1].y;
  console.log(`\nscrolled to ${before}px, reloaded`);
  console.log(`  trace: ${trace}`);
  console.log(`  settled at ${settled}px — ${settled === 0 ? 'PASS' : 'FAIL'}`);
}

await browser.close();
