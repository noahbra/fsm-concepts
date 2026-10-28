/**
 * Capture the pinned story at N evenly spaced scroll positions.
 * Usage: node scripts/frames.mjs <url> <outDir> <prefix> [width=1440] [height=900] [n=16] [fractions]
 * `fractions` (optional) is a comma-separated list of story progress values in 0..1 that replaces the even spacing.
 */
import { chromium } from '@playwright/test';
const [url, outDir, prefix, w = '1440', h = '900', n = '16', fractions] = process.argv.slice(2);
const steps = fractions ? fractions.split(',').map(Number) : Array.from({ length: +n + 1 }, (_, i) => i / +n);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, isMobile: +w < 500, hasTouch: +w < 500 });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const range = await page.evaluate(() => {
  const stage = document.querySelector('[data-testid="story-stage"]');
  const r = stage.getBoundingClientRect();
  return { start: r.top + window.scrollY, end: r.top + window.scrollY + r.height - window.innerHeight };
});
for (let i = 0; i < steps.length; i++) {
  const y = range.start + (range.end - range.start) * steps[i];
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${outDir}/${prefix}-${String(i).padStart(2, '0')}.png` });
}
console.log(JSON.stringify({ range, errors }));
await browser.close();
