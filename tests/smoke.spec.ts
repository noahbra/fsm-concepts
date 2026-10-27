import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';

const PAGES = ['', 'clean/', 'creative/', 'story/', 'original/'] as const;
const CONCEPTS = ['clean/', 'creative/', 'story/', 'original/'] as const;
const SCHOOLS = ['Aspire Public Schools', 'Friendship Public Charter School', 'Envision Education'];
const SOURCES = [
  'https://www.filmtwist.com/work/aspire-public-schools',
  'https://www.filmtwist.com/work/friendship-pcs',
  'https://www.filmtwist.com/work/envision-education-2',
];
const CTA = 'https://www.filmtwist.com/consulting';

/** Collect console errors and failed requests for a page. Ignores favicon noise only. */
function watch(page: Page) {
  const errors: string[] = [];
  page.on('console', (m: ConsoleMessage) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText ?? ''}`));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`http ${r.status()}: ${r.url()}`); });
  return errors;
}

async function settle(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(300);
}

test.describe('Hub', () => {
  test('loads and exposes four working concept links', async ({ page, baseURL }) => {
    const errors = watch(page);
    await page.goto('');
    await settle(page);
    await expect(page).toHaveTitle(/Website Direction Review/);
    const links = page.getByTestId('open-concept');
    await expect(links).toHaveCount(4);
    for (const c of CONCEPTS) {
      const href = await page.locator(`[data-testid="open-concept"][href$="/${c}"]`).getAttribute('href');
      expect(href).toBe(new URL(c, baseURL).pathname);
      const res = await page.request.get(new URL(c, baseURL).toString());
      expect(res.status(), c).toBe(200);
    }
    await expect(page.getByText('Design concepts for review')).toBeVisible();
    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('hub cards use real screenshots that load', async ({ page }) => {
    await page.goto('');
    await settle(page);
    const imgs = page.locator('.card__media img');
    await expect(imgs).toHaveCount(8);
    for (let i = 0; i < 8; i++) {
      const ok = await imgs.nth(i).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
      expect(ok, `card image ${i}`).toBe(true);
    }
  });
});

for (const p of PAGES) {
  test.describe(`Page ${p || '(hub)'}`, () => {
    test('loads directly under the subpath with resolved assets, no console errors, no missing images', async ({ page, baseURL }) => {
      const errors = watch(page);
      await page.goto(p);
      await settle(page);
      await page.reload();
      await settle(page);
      // Every script/css/img URL must resolve under the project base path.
      const bad = await page.evaluate((base) => {
        const urls = [
          ...Array.from(document.querySelectorAll('script[src]')).map((s) => (s as HTMLScriptElement).src),
          ...Array.from(document.querySelectorAll('link[rel="stylesheet"],link[rel="icon"]')).map((l) => (l as HTMLLinkElement).href),
          ...Array.from(document.images).map((i) => i.currentSrc || i.src),
        ].filter((u) => u.startsWith(location.origin));
        return urls.filter((u) => !u.startsWith(base));
      }, new URL(baseURL!).origin + '/fsm-concepts/');
      expect(bad, 'asset URLs outside base path').toEqual([]);
      const broken = await page.evaluate(() => Array.from(document.images).filter((i) => i.loading !== 'lazy' && (!i.complete || i.naturalWidth === 0)).map((i) => i.src));
      expect(broken, 'broken eager images').toEqual([]);
      expect(errors, errors.join('\n')).toEqual([]);
    });

    test('no horizontal overflow at 375 and 390', async ({ page }) => {
      for (const w of [375, 390]) {
        await page.setViewportSize({ width: w, height: 800 });
        await page.goto(p);
        await settle(page);
        const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(over, `overflow px at ${w}`).toBeLessThanOrEqual(0);
        // scroll through the page to trigger lazy content, then recheck
        await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
        const over2 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(over2, `overflow px at ${w} after scroll`).toBeLessThanOrEqual(0);
      }
    });

    test('external links are safe and labeled; in-page anchors resolve', async ({ page }) => {
      await page.goto(p);
      await settle(page);
      const issues = await page.evaluate(() => {
        const out: string[] = [];
        document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
          const href = a.getAttribute('href') || '';
          const name = (a.getAttribute('aria-label') || a.textContent || '').trim();
          if (/^https?:/.test(href) && !href.startsWith(location.origin)) {
            if (a.target !== '_blank') out.push(`external not _blank: ${href}`);
            if (!/noopener/.test(a.rel)) out.push(`external missing noopener: ${href}`);
            if (!name) out.push(`external unlabeled: ${href}`);
          }
          if (href.startsWith('#') && href.length > 1 && !href.includes('?')) {
            if (!document.getElementById(href.slice(1))) out.push(`dangling anchor: ${href}`);
          }
        });
        return out;
      });
      expect(issues).toEqual([]);
    });
  });
}

for (const c of CONCEPTS) {
  test.describe(`Concept ${c}`, () => {
    test('has services, three verified case studies with source links, and the CTA', async ({ page }) => {
      await page.goto(c);
      await settle(page);
      await expect(page.getByTestId('services').first()).toBeVisible();
      for (const s of SCHOOLS) await expect(page.getByText(s, { exact: false }).first()).toBeAttached();
      const cards = page.getByTestId('case-study');
      await expect(cards).toHaveCount(3);
      const hrefs = await page.locator('a[href^="https://www.filmtwist.com/work/"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
      for (const s of SOURCES) expect(hrefs, `source link ${s}`).toContain(s);
      const cta = page.getByTestId('cta-primary').first();
      await expect(cta).toBeAttached();
      expect(await cta.getAttribute('href')).toBe(CTA);
      // Review chrome links back to the hub
      await expect(page.getByRole('link', { name: 'Compare all four' }).first()).toBeAttached();
    });

    test('reviewer pill copies a link and shows a QR code', async ({ page, context, browserName }) => {
      await page.goto(c);
      await settle(page);
      await page.getByRole('button', { name: 'Review' }).click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await dialog.getByRole('button', { name: /QR code/ }).click();
      await expect(dialog.locator('canvas')).toBeVisible();
      if (browserName === 'chromium') {
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);
        await dialog.getByRole('button', { name: 'Copy shareable link' }).click();
        await expect(dialog.getByRole('status')).toHaveText(/copied/i);
      }
      await page.keyboard.press('Escape');
      await expect(dialog).toBeHidden();
    });
  });
}

test('Concept 02: portfolio filters change visible gallery state', async ({ page }) => {
  await page.goto('creative/');
  await settle(page);
  const items = page.locator('[data-testid="gallery-item"]:visible');
  const all = await items.count();
  expect(all).toBeGreaterThan(5);
  const filters = page.getByTestId('gallery-filter');
  const n = await filters.count();
  expect(n).toBeGreaterThanOrEqual(4);
  for (let i = 1; i < n; i++) {
    const f = filters.nth(i);
    const id = await f.getAttribute('data-filter');
    await f.click();
    await expect(f).toHaveAttribute('aria-pressed', 'true');
    const visible = await items.count();
    expect(visible, `filter ${id} shows items`).toBeGreaterThan(0);
    expect(visible, `filter ${id} narrows`).toBeLessThan(all);
    const cats = await items.evaluateAll((els) => els.map((e) => e.getAttribute('data-category')));
    expect(cats.every((x) => x === id), `all visible items are ${id}`).toBe(true);
  }
  await filters.nth(0).click();
  expect(await items.count()).toBe(all);
  // keyboard: filters are buttons, Enter works
  await filters.nth(1).focus();
  await page.keyboard.press('Enter');
  await expect(filters.nth(1)).toHaveAttribute('aria-pressed', 'true');
});

test('Concept 03: skip works, scrolling reaches proof, reduced motion renders the static story', async ({ page, browser }) => {
  await page.goto('story/');
  await settle(page);
  await expect(page.getByTestId('story-stage')).toBeAttached();
  const skip = page.getByTestId('skip-story');
  await skip.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  const focusedId = await page.evaluate(() => document.activeElement?.id || document.activeElement?.closest('[id]')?.id);
  expect(focusedId).toBe('site-content');
  await expect(page.getByTestId('case-study')).toHaveCount(3);
  // scroll all the way down: case studies must be in the document and reachable
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
  await expect(page.getByTestId('case-study').nth(2)).toBeInViewport({ ratio: 0.1 });

  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const p2 = await ctx.newPage();
  await p2.goto(page.url());
  await settle(p2);
  await expect(p2.getByTestId('story-static')).toBeVisible();
  await expect(p2.getByTestId('story-stage')).toHaveCount(0);
  expect(await p2.locator('.pin-spacer').count()).toBe(0);
  await expect(p2.getByTestId('case-study')).toHaveCount(3);
  await ctx.close();
});

test('Concept 04: season dial changes the page by click and keyboard', async ({ page }) => {
  await page.goto('original/');
  await settle(page);
  const headline = page.getByTestId('season-headline');
  const before = await headline.textContent();
  const winter = page.locator('[data-testid="season-control"][data-season="winter"]');
  await winter.click();
  await expect(winter).toHaveAttribute('aria-checked', 'true');
  await expect(headline).not.toHaveText(before!);
  await expect(page.getByTestId('case-study').first()).toContainText('Friendship');
  // keyboard: arrow moves selection
  await winter.focus();
  await page.keyboard.press('ArrowRight');
  const spring = page.locator('[data-testid="season-control"][data-season="spring"]');
  await expect(spring).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByTestId('case-study').first()).toContainText('Envision');
});

test('Feedback persists across reload, copy/export include answers, and there is no fake submit', async ({ page, context, browserName }) => {
  await page.goto('#feedback?concept=creative');
  await settle(page);
  await expect(page.locator('[data-testid="feedback-concept"][data-concept="creative"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-testid="rating-overall"][value="4"]').check({ force: true });
  await page.locator('[data-testid="rating-brandFit"][value="5"]').check({ force: true });
  await page.getByTestId('favorite').fill('The campaign collage hero');
  await page.getByTestId('change').fill('Lighter first screen on mobile');
  await page.locator('[data-testid="decision"][value="prefer"]').check({ force: true });
  await page.getByTestId('reviewer').fill('Test Reviewer');
  await expect(page.getByTestId('feedback-status')).toHaveText(/Saved on this device/);
  await page.reload();
  await settle(page);
  await page.locator('[data-testid="feedback-concept"][data-concept="creative"]').click();
  await expect(page.locator('[data-testid="rating-overall"][value="4"]')).toBeChecked();
  await expect(page.getByTestId('favorite')).toHaveValue('The campaign collage hero');
  await expect(page.getByTestId('reviewer')).toHaveValue('Test Reviewer');
  expect(await page.getByTestId('submit-feedback').count()).toBe(0);
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('download-md').click()]);
  const path = await download.path();
  const text = path ? (await import('node:fs')).readFileSync(path, 'utf8') : '';
  expect(text).toContain('Bold & Creative');
  expect(text).toContain('Overall direction: 4/5');
  expect(text).toContain('The campaign collage hero');
  expect(text).toContain('Test Reviewer');
  if (browserName === 'chromium') {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.getByTestId('copy-feedback').click();
    await expect(page.getByTestId('feedback-status')).toHaveText(/copied/i);
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('Lighter first screen on mobile');
  }
});
