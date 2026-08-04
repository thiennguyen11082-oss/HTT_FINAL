/**
 * Captures the live portfolio demos into public/assets/projects/.
 *
 * Drives the user's installed Chrome via puppeteer-core rather than
 * downloading a private Chromium — same rendering, ~170MB less install.
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/assets/projects');
mkdirSync(outDir, { recursive: true });

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => existsSync(p));

if (!CHROME) {
  console.error('No Chrome or Edge binary found.');
  process.exit(1);
}

const shots = [
  { slug: 'sutton', url: 'https://sutton-signature-detail.vercel.app/', w: 1600, h: 1000 },
  { slug: 'seduction', url: 'https://seduction-nails-demo.vercel.app/', w: 1600, h: 1000 },
  { slug: 'concrete', url: 'https://concrete-moving-demo.vercel.app/', w: 1600, h: 1000 },
  { slug: 'valorant', url: 'https://valorant-demo-wine.vercel.app/', w: 1600, h: 1000 },
  { slug: 'vaughan', url: 'https://vaughan-family-plumbing.vercel.app/', w: 1600, h: 1000 },
  // Portrait capture — this one rides the hero as the phone-shaped panel.
  {
    slug: 'vaughan-mobile',
    url: 'https://vaughan-family-plumbing.vercel.app/',
    w: 398,
    h: 856,
    mobile: true,
  },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-features=IsolateOrigins,site-per-process'],
});

for (const { slug, url, w, h, mobile } of shots) {
  const page = await browser.newPage();
  await page.setViewport({
    width: w,
    height: h,
    deviceScaleFactor: mobile ? 3 : 2,
    isMobile: !!mobile,
    hasTouch: !!mobile,
  });
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60_000 });
    // These sites all run entrance animations; let them settle before capture.
    await new Promise((r) => setTimeout(r, 5000));
    const out = resolve(outDir, `${slug}.webp`);
    await page.screenshot({ path: out, type: 'webp', quality: 92 });
    console.log(`  ✓ ${slug}.webp`);
  } catch (err) {
    console.error(`  ✗ ${slug}: ${err.message}`);
  }
  await page.close();
}

await browser.close();
console.log('\nCaptured to public/assets/projects/');
