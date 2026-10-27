/**
 * Captures real desktop + mobile screenshots of all five pages from a running server,
 * writes WebP posters for the hub cards (public/assets/screenshots) and full-page PNGs for docs/screenshots.
 * Usage: node scripts/screenshots.mjs [baseUrl=http://localhost:4173/fsm-concepts/]
 */
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const base = process.argv[2] || 'http://localhost:4173/fsm-concepts/';
const pages = [['hub', ''], ['clean', 'clean/'], ['creative', 'creative/'], ['story', 'story/'], ['original', 'original/']];
// Poster scroll offsets: the story page opens on a calm logo, so its poster is taken mid-narrative (full-color school beat).
const posterScroll = { story: { desktop: 4000, mobile: 4300 } };
await mkdir('public/assets/screenshots', { recursive: true });
await mkdir('docs/screenshots', { recursive: true });
const browser = await chromium.launch();
for (const [id, path] of pages) {
  for (const [kind, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: kind === 'mobile', hasTouch: kind === 'mobile' });
    const page = await ctx.newPage();
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    // poster: first viewport only, without the reviewer ribbon/pill so the card shows the concept itself
    await page.addStyleTag({ content: '.review-ribbon,.review-pill{display:none !important}' });
    const y = posterScroll[id]?.[kind] ?? 0;
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(y ? 900 : 300);
    const poster = await page.screenshot({ fullPage: false });
    await sharp(poster).webp({ quality: 80 }).toFile(`public/assets/screenshots/${id}-${kind}.webp`);
    // full page for docs (with chrome visible)
    await page.addStyleTag({ content: '.review-ribbon,.review-pill{display:revert !important}' });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `docs/screenshots/${id}-${kind}-full.png`, fullPage: true });
    await ctx.close();
    console.log('captured', id, kind);
  }
}
await browser.close();
