/**
 * Captures live project sites at iPhone 16 Pro Max logical resolution.
 *
 * 440x956 is the device's CSS viewport. Capturing at exactly that means the
 * screenshot drops into the phone mockup with no rescaling, so the site's real
 * typography and proportions survive intact.
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

const W = 440;
const H = 956;

const shots = [
  { slug: 'sutton-mobile', url: 'https://sutton-signature-detail.vercel.app/' },
  { slug: 'vaughan-mobile', url: 'https://vaughan-family-plumbing.vercel.app/' },
  { slug: 'valorant-mobile', url: 'https://valorant-demo-wine.vercel.app/' },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars'],
});

for (const { slug, url } of shots) {
  const page = await browser.newPage();
  await page.setViewport({
    width: W,
    height: H,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60_000 });
    // These sites all run entrance animations; let them settle before capture.
    await new Promise((r) => setTimeout(r, 5500));
    await page.screenshot({
      path: resolve(outDir, `${slug}.webp`),
      type: 'webp',
      quality: 90,
    });
    console.log(`  ✓ ${slug}.webp  ${W}x${H} @3x`);
  } catch (err) {
    console.error(`  ✗ ${slug}: ${err.message}`);
  }
  await page.close();
}

await browser.close();
