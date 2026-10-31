import { chromium } from '@playwright/test';
const base = 'http://localhost:4175/fullschoolmarketing/';
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
const bad = []; p.on('response', (r) => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
await p.goto(base, { waitUntil: 'networkidle' });
const title = await p.title();
const ribbon = await p.locator('text=Current direction').count();
const reviewPill = await p.locator('[class*="review"]').count();
const logos = await p.locator('[data-testid="client-logo"]').count();
const links = await p.locator('[data-testid="case-link"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
const form = await p.locator('form').count();
const results = [];
for (const href of links) {
  const r = await p.goto(new URL(href, base).href, { waitUntil: 'networkidle' });
  const home = await p.locator('header a').first().getAttribute('href');
  const homeStatus = (await p.request.get(new URL(home, p.url()).href)).status();
  results.push({ href, status: r.status(), h1: (await p.locator('h1').first().textContent())?.trim().slice(0, 40), home, homeStatus });
}
console.log(JSON.stringify({ title, ribbon, reviewPill, logos, form, results, bad }, null, 1));
await b.close();
