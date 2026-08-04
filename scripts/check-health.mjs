/**
 * Smoke test: loads the site normally and with prefers-reduced-motion forced,
 * reporting console errors, page errors and failed requests in each mode.
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

for (const reduced of [false, true]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  if (reduced) {
    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ]);
  }

  const problems = [];
  page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`));
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) =>
    problems.push(`request failed: ${r.url()} — ${r.failure()?.errorText}`)
  );
  page.on('response', (r) => {
    if (r.status() >= 400) problems.push(`HTTP ${r.status()}: ${r.url()}`);
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 60_000 });
  await new Promise((r) => setTimeout(r, 6000));

  const state = await page.evaluate(() => ({
    locked: document.body.dataset.locked,
    bg: getComputedStyle(document.documentElement).getPropertyValue('--page-bg').trim(),
    scrollable: document.body.scrollHeight > window.innerHeight,
    canvas: !!document.querySelector('canvas'),
    reveal: window.__stage ? window.__stage.reveal : null,
  }));

  // Reduced motion has no pin, so the page must still be scrollable to the end.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 1200));
  const reachedFooter = await page.evaluate(
    () => !!document.querySelector('footer') &&
      document.querySelector('footer').getBoundingClientRect().top < window.innerHeight
  );

  const label = reduced ? 'reduced-motion' : 'normal';
  console.log(`\n[${label}]`);
  console.log(`  locked=${state.locked}  bg=${state.bg}  reveal=${state.reveal}`);
  console.log(`  canvas=${state.canvas}  scrollable=${state.scrollable}  footerReached=${reachedFooter}`);
  if (problems.length) {
    console.log(`  ${problems.length} problem(s):`);
    [...new Set(problems)].slice(0, 12).forEach((p) => console.log(`    - ${p}`));
  } else {
    console.log('  no console errors, page errors or failed requests');
  }

  await page.close();
}

await browser.close();
