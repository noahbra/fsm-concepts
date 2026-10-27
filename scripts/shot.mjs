/**
 * Screenshot helper. Usage:
 *   node scripts/shot.mjs <url> <out.png> [width=1440] [height=900] [fullPage=0] [reducedMotion=0] [scrollTo=0]
 * Example: node scripts/shot.mjs http://localhost:5181/clean/ /tmp/clean.png 390 844 1
 */
import { chromium } from '@playwright/test';
const [url, out, w = '1440', h = '900', full = '0', rm = '0', scrollTo = '0'] = process.argv.slice(2);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, reducedMotion: rm === '1' ? 'reduce' : 'no-preference', isMobile: +w < 500, hasTouch: +w < 500 });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));
page.on('requestfailed', (r) => errors.push('REQUEST FAILED ' + r.url()));
await page.goto(url, { waitUntil: 'networkidle' });
if (+scrollTo) { await page.evaluate((y) => window.scrollTo(0, y), +scrollTo); await page.waitForTimeout(600); }
await page.waitForTimeout(400);
await page.screenshot({ path: out, fullPage: full === '1' });
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
console.log(JSON.stringify({ out, overflow, errors }, null, 1));
await browser.close();
