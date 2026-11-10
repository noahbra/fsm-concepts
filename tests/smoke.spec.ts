import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';

const PAGES = ['', 'clean/', 'creative/', 'story/', 'original/', 'visible/', 'visible/work/aspire/', 'visible/work/friendship/', 'visible/work/alpha/', 'bold/', 'bold/work/aspire/', 'bold/work/friendship/', 'bold/work/alpha/', 'bold/terms/', 'bold/privacy/'] as const;
/** The three cases, in card order. */
const CASES = ['aspire', 'friendship', 'alpha'] as const;
/** FilmTwist's embedded form (LeadConnector) is third-party: its own requests are not this site's defects. */
const THIRD_PARTY = /leadconnectorhq\.com|msgsndr\.com|challenges\.cloudflare\.com/;
const CONCEPTS = ['clean/', 'creative/', 'story/', 'original/'] as const;
const SCHOOLS = ['Aspire Public Schools', 'Friendship Public Charter School', 'Alpha Public Schools'];
const SOURCES = [
  'https://www.filmtwist.com/work/aspire-public-schools',
  'https://www.filmtwist.com/work/friendship-pcs',
  'https://www.filmtwist.com/work/alpha-public-schools',
];
const CTA = 'https://www.filmtwist.com/consulting';

/** Collect console errors and failed requests for a page. Ignores favicon noise only. */
function watch(page: Page) {
  const errors: string[] = [];
  // WebKit reports the embedded form's captcha messages with no source URL; this site sets no Content Security Policy, so a CSP message is never ours.
  page.on('console', (m: ConsoleMessage) => { if (m.type() === 'error' && !THIRD_PARTY.test(m.location().url) && !/Content Security Policy/.test(m.text())) errors.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => { if (!THIRD_PARTY.test(e.message)) errors.push(`pageerror: ${e.message}`); });
  // requests made by the embedded form's own frame (its fonts, its captcha) are the third party's, not this site's
  page.on('requestfailed', (r) => { if (r.frame() === page.mainFrame() && !THIRD_PARTY.test(r.url())) errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText ?? ''}`); });
  page.on('response', (r) => { if (r.status() >= 400 && r.frame() === page.mainFrame() && !THIRD_PARTY.test(r.url())) errors.push(`http ${r.status()}: ${r.url()}`); });
  return errors;
}

async function settle(page: Page) {
  // The merged direction embeds FilmTwist's form, whose frame keeps the network busy, so idle is best-effort there.
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => {});
  await page.waitForTimeout(300);
}

// Concept 06's opener honors a seen flag; every test starts past it (the opener's own test clears the flag).
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { try { sessionStorage.setItem('fsm-bold-opener-seen', '1'); } catch { /* storage blocked */ } });
});

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
    await expect(imgs).toHaveCount(12); // six cards (the current direction, the merged direction, the four originals), desktop and mobile each
    for (let i = 0; i < 12; i++) {
      await imgs.nth(i).scrollIntoViewIfNeeded();
      await expect.poll(() => imgs.nth(i).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), { timeout: 10_000 }).toBe(true);
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
  await page.getByTestId('case-study').nth(2).scrollIntoViewIfNeeded();
  await expect(page.getByTestId('case-study').nth(2)).toBeInViewport({ ratio: 0.1 });
  // the pinned stage must not trap the scroll: the document is scrollable well past it
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(await page.getByTestId('story-stage').evaluate((el) => el.getBoundingClientRect().height));

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

test('Concept 04: the worksheet recomputes from the seat input and the slider', async ({ page }) => {
  await page.goto('original/');
  await settle(page);
  const apps = page.getByTestId('seat-output-apps');
  const before = await apps.textContent();
  await page.getByTestId('seat-input').fill('120');
  await expect.poll(async () => apps.textContent()).not.toBe(before);
  await expect(apps).toHaveText('158'); // 120 seats at the 76% yield Friendship PCS reported
  // keyboard: the slider moves the number too
  const slider = page.getByTestId('seat-slider');
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByTestId('seat-input')).toHaveValue('125');
  await expect(page.getByTestId('case-study')).toHaveCount(3);
});

test('Feedback persists across reload, sends to the form, and copy/export include answers', async ({ page, context, browserName }) => {
  await page.goto('#feedback?concept=creative');
  await settle(page);
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important }' }); // the hub smooth-scrolls to #feedback; keep clicks off a moving target
  await expect(page.locator('[data-testid="feedback-concept"][data-concept="creative"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('label[for="creative-overall-4"]').click();
  await expect(page.locator('#creative-overall-4')).toBeChecked();
  await page.locator('label[for="creative-brandFit-5"]').click();
  await expect(page.locator('#creative-brandFit-5')).toBeChecked();
  await page.getByTestId('favorite').fill('The campaign collage hero');
  await page.getByTestId('change').fill('Lighter first screen on mobile');
  await page.locator('[data-testid="decision"][value="prefer"]').check();
  await page.getByTestId('reviewer').fill('Test Reviewer');
  await expect(page.getByTestId('feedback-status')).toHaveText(/Saved on this device/);
  await page.reload();
  await settle(page);
  await page.locator('[data-testid="feedback-concept"][data-concept="creative"]').click();
  await expect(page.locator('[data-testid="rating-overall"][value="4"]')).toBeChecked();
  await expect(page.getByTestId('favorite')).toHaveValue('The campaign collage hero');
  await expect(page.getByTestId('reviewer')).toHaveValue('Test Reviewer');
  // Send: intercept the Google Form post and check what left the browser.
  const posted: string[] = [];
  await page.route('https://docs.google.com/forms/**/formResponse', (route) => { posted.push(route.request().postData() ?? ''); return route.fulfill({ status: 200, body: '' }); });
  await page.getByTestId('submit-feedback').click();
  await expect(page.getByTestId('feedback-status')).toHaveText(/Feedback sent/);
  await expect(page.getByTestId('feedback-sent')).toHaveText(/Last sent/);
  expect(posted).toHaveLength(1);
  const body = new URLSearchParams(posted[0]);
  expect(body.get('entry.94783242')).toBe('Test Reviewer');
  expect(body.get('entry.1585371997')).toBe('prefer');
  expect(body.get('entry.944882537')).toBe('4');
  expect(body.get('entry.553541415')).toBeNull(); // untouched concept sends nothing
  expect(body.get('entry.146796121')).toContain('Lighter first screen on mobile');
  expect(JSON.parse(body.get('entry.958974456') ?? '{}').concepts.creative.brandFit).toBe(5);
  // The sent marker survives a reload.
  await page.reload();
  await settle(page);
  await expect(page.getByTestId('feedback-sent')).toHaveText(/Last sent/);
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

test('Feedback send is blocked without a name or any answers, and nothing is posted', async ({ page }) => {
  await page.goto('#feedback?concept=clean');
  await settle(page);
  let posts = 0;
  await page.route('https://docs.google.com/forms/**/formResponse', (route) => { posts += 1; return route.fulfill({ status: 200, body: '' }); });
  await page.getByTestId('submit-feedback').click();
  await expect(page.getByTestId('feedback-status')).toHaveText(/Add your name first/);
  await expect(page.getByTestId('reviewer')).toBeFocused();
  await page.getByTestId('reviewer').fill('Nameless Test');
  await page.getByTestId('submit-feedback').click();
  await expect(page.getByTestId('feedback-status')).toHaveText(/at least one concept/);
  expect(posts).toBe(0);
});

test('Concept 05: one H1 names the offer, skip lands on services, cards expand in place, chrome links to the merged question', async ({ page, browser, baseURL }) => {
  await page.goto('visible/');
  await settle(page);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText(/Enrollment marketing for K-12 schools/);
  // first frame: the primary button and the one visible skip control are in the document and clickable
  const intro = page.getByTestId('cta-intro');
  await expect(intro).toBeVisible();
  expect(await intro.getAttribute('href')).toBe('#contact'); // every call to action lands on the embedded form
  await expect(page.getByTestId('skip-story')).toHaveCount(1);
  await page.getByTestId('skip-story').click();
  await page.waitForTimeout(600);
  await expect(page.getByTestId('services')).toBeInViewport({ ratio: 0.2 });
  // sections in the brief's order, services in source order with the outcome line
  const ids = await page.locator('#site-content section').evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual(['services', 'work', 'team', 'contact']);
  await expect(page.locator('#services .service')).toHaveCount(5);
  await expect(page.locator('#services .service').first()).toContainText('Enrollment Strategy & Positioning');
  await expect(page.locator('#services .service svg')).toHaveCount(5); // equal tiles, each with an icon
  const tileHeights = await page.locator('#services .service').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().height)));
  expect(new Set(tileHeights).size, `tile heights ${tileHeights.join(',')}`).toBe(1);
  // case cards: three, expanding in place to the source link
  const cards = page.getByTestId('case-study');
  await expect(cards).toHaveCount(3);
  for (const s of SCHOOLS) await expect(page.getByText(s, { exact: false }).first()).toBeAttached();
  const first = cards.first();
  await first.scrollIntoViewIfNeeded();
  await expect(first.locator('.case__more')).toBeHidden();
  await first.getByRole('button', { name: 'What the campaign did' }).click();
  await expect(first.locator('.case__more')).toBeVisible();
  // case links stay on this site (no link to filmtwist.com on the card)
  const caseLinks = await page.getByTestId('case-link').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
  for (const id of CASES) expect(caseLinks.some((h) => h.endsWith(`/visible/work/${id}/`)), `case link ${id}`).toBe(true);
  expect(await page.locator('[data-testid="case-study"] a[href^="https://www.filmtwist.com/work/"]').count()).toBe(0);
  // team: the sourced line, nine cut-out photos that load, roles as published
  await expect(page.locator('#team')).toContainText('started in 2020');
  const members = page.getByTestId('team-member');
  await expect(members).toHaveCount(9);
  await members.first().scrollIntoViewIfNeeded();
  await expect.poll(() => members.first().locator('img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(members.first()).toContainText('Operations Manager');
  // contact: the site's own form; no figures in our copy
  await expect(page.locator('#contact')).toContainText('free 30-minute call');
  await expect(page.locator('#contact .contact__copy')).not.toContainText(/\d{2,}%|\$\d/);
  await expect(page.getByTestId('leadconnector-box')).toBeAttached(); // FilmTwist's FSM form frame (Version 3.14); the site's own form is the 'fsm' mode
  await expect(page.locator('.site-header__cta')).toHaveAttribute('href', '#contact');
  // review chrome points at the merged question, not the four-concept form
  await expect(page.getByRole('link', { name: 'Does this resolve your notes?' }).first()).toHaveAttribute('href', /#merged$/);
  // the four originals are untouched by construction: their story page still has its own skip pill
  await page.goto('story/');
  await settle(page);
  await expect(page.locator('.story__skip')).toHaveAttribute('href', '#site-content');
  // reduced motion: static story with the same first frame and one H1
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const p2 = await ctx.newPage();
  await p2.goto(new URL('visible/', baseURL!).toString());
  await settle(p2);
  await expect(p2.getByTestId('story-static')).toBeVisible();
  await expect(p2.locator('h1')).toHaveCount(1);
  await expect(p2.getByTestId('story-static')).toContainText("Let's fill your school.");
  await ctx.close();
});

for (const id of CASES) {
  test(`Concept 05 case page ${id}: the published campaign on this site, every figure with its source, creative that loads`, async ({ page }) => {
    const errors = watch(page);
    await page.goto(`visible/work/${id}/`);
    await settle(page);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(SCHOOLS.find((s) => s.toLowerCase().startsWith(id === 'friendship' ? 'friendship' : id))!);
    expect(await page.getByTestId('case-metrics').locator('li').count()).toBeGreaterThanOrEqual(3);
    expect(await page.locator('.case-page__source').count(), 'the source footnote (off since November 4)').toBe(0);
    expect(await page.locator('body').innerText()).not.toContain('Figures and creative are from');
    const imgs = page.getByTestId('case-gallery').locator('img');
    expect(await imgs.count()).toBeGreaterThanOrEqual(3);
    for (let i = 0; i < await imgs.count(); i++) {
      await imgs.nth(i).scrollIntoViewIfNeeded();
      await expect.poll(() => imgs.nth(i).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    // back, previous and next resolve on this site; the final button lands on the form
    for (const t of ['case-back', 'case-prev', 'case-next', 'cta-final']) {
      const href = await page.getByTestId(t).evaluate((a) => (a as HTMLAnchorElement).href);
      expect(href, t).toContain('/fsm-concepts/visible/');
      const res = await page.request.get(href.split('#')[0]);
      expect(res.status(), `${t} ${href}`).toBe(200);
    }
    expect(await page.getByTestId('cta-final').getAttribute('href')).toBe('../../#contact');
    expect(errors, errors.join('\n')).toEqual([]);
  });
}

// The FSM-branded form's posting test (payload shape, failure handling) ran while siteConfig.leadConnector.mode was 'fsm'
// (git history before Version 3.8). It needs a page that renders FsmForm; in 'embed' mode none does.

test('Concept 05 on a phone: one primary button per viewport, bar appears after the first frame and hides over the footer', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(new URL('visible/', process.env.PW_BASE_URL ?? 'http://localhost:4173/fsm-concepts/').toString());
  await settle(page);
  const bar = page.getByTestId('mobile-cta');
  await expect(bar).toBeHidden();
  await expect(page.locator('.site-header__cta')).toBeHidden();
  await expect(page.getByTestId('cta-intro')).toBeVisible();
  // scroll past the first frame: the intro button fades and the bar takes over
  await page.evaluate(async () => { for (let y = 0; y < 1400; y += 200) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } });
  await page.waitForTimeout(600);
  await expect(bar).toBeVisible();
  // over the footer the bar hides
  await page.locator('.site-footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(bar).toBeHidden();
  await ctx.close();
});

test('Merged direction feedback sends only its own fields, never the four-concept ratings', async ({ page }) => {
  // seed a four-concept rating in this browser first, then answer the merged question
  await page.goto('#feedback?concept=creative');
  await settle(page);
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important }' }); // the hub smooth-scrolls to #feedback; keep clicks off a moving target
  await page.locator('label[for="creative-overall-5"]').click();
  await expect(page.locator('#creative-overall-5')).toBeChecked();
  await page.getByTestId('reviewer').fill('Merged Test');
  await expect(page.getByTestId('feedback-status')).toHaveText(/Saved on this device/);
  await page.goto('#merged');
  await settle(page);
  // the hub smooth-scrolls (hash change, and Playwright's own scroll before a forced click); make scrolling instant here
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important }' });
  await page.waitForFunction(() => new Promise<boolean>((r) => { const y = scrollY; setTimeout(() => r(scrollY === y), 250); }));
  await expect(page.getByTestId('open-merged')).toHaveAttribute('href', /\/visible\/$/);
  // the feedback-addressed checklist for this version sits above the question
  const checklist = page.getByTestId('merged-checklist');
  await expect(checklist).toBeVisible();
  expect(await checklist.locator('li').count()).toBeGreaterThanOrEqual(12);
  await expect(checklist).toContainText('Not yet');
  await expect(page.getByTestId('open-concept')).toHaveCount(4);
  await page.locator('[data-testid="merged-resolves"][value="mostly"]').check();
  await page.getByTestId('merged-notes').fill('Shorter still, and the team line needs our names.');
  await page.getByTestId('merged-fonts').fill('Fine');
  await expect(page.getByTestId('merged-reviewer')).toHaveValue('Merged Test'); // name reused from the four-concept form
  const posted: string[] = [];
  await page.route('https://docs.google.com/forms/**/formResponse', (route) => { posted.push(route.request().postData() ?? ''); return route.fulfill({ status: 200, body: '' }); });
  await page.getByTestId('submit-merged').click();
  await expect(page.getByTestId('merged-status')).toHaveText(/Sent at/);
  await expect(page.getByTestId('merged-sent')).toHaveText(/Last sent/);
  expect(posted).toHaveLength(1);
  const body = new URLSearchParams(posted[0]);
  expect(body.get('entry.94783242')).toBe('Merged Test');
  expect(body.get('entry.1136712824')).toBe('mostly');
  expect(body.get('entry.741865373')).toContain('team line needs our names');
  expect(body.get('entry.528543258')).toBe('Fine');
  expect(body.get('entry.988458610')).toContain('merged direction feedback');
  expect(body.get('entry.944882537')).toBeNull(); // Concept 02 overall rating is NOT resent
  expect(body.get('entry.146796121')).toBeNull(); // the four-concept markdown is NOT resent
  expect(body.get('entry.958974456')).toBeNull(); // nor the JSON
  // the merged answers survive a reload and the four-concept rating is still there, untouched
  await page.reload();
  await settle(page);
  await expect(page.locator('[data-testid="merged-resolves"][value="mostly"]')).toBeChecked();
  await page.locator('[data-testid="feedback-concept"][data-concept="creative"]').click();
  await expect(page.locator('[data-testid="rating-overall"][value="5"]')).toBeChecked();
});

test('Concept 06: one H1, what we do right under the reel, no figure above the case cards, three case links, nine team cut-outs, chrome links to the current question', async ({ page, browser, baseURL }) => {
  await page.goto('bold/');
  await settle(page);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Make your school the one families remember.');
  // section order: reel, services, work, team, partner, contact (the brand owner's order)
  const order = await page.locator('main > section').evaluateAll((els) => els.map((e) => e.id || e.className.split(' ')[0]));
  expect(order).toEqual(['top', 'cr-reel', 'services', 'work', 'team', 'partner', 'contact']);
  // no figure above the case cards: nothing with two or more digits before #work, apart from "K-12"
  const above = await page.evaluate(() => {
    const out: string[] = [];
    for (const el of Array.from(document.querySelectorAll('main > section'))) { if (el.id === 'work') break; out.push((el as HTMLElement).innerText); }
    return out.join(' ').replace(/K-12/g, '');
  });
  expect(above.match(/\d[\d,.]*\d/g) ?? [], 'figures above the case cards').toEqual([]);
  await expect(page.getByTestId('services').locator('li')).toHaveCount(5);
  // every paragraph above the case cards is short (the "wall of text" objection)
  const longest = await page.evaluate(() => Math.max(...Array.from(document.querySelectorAll('#services p, #services h3')).map((p) => (p as HTMLElement).innerText.split(/\s+/).length)));
  expect(longest).toBeLessThanOrEqual(20);
  const cards = page.getByTestId('case-study');
  await expect(cards).toHaveCount(3);
  const caseLinks = await page.getByTestId('case-link').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
  for (const id of CASES) expect(caseLinks.some((h) => h.endsWith(`/bold/work/${id}/`)), `case link ${id}`).toBe(true);
  for (const h of caseLinks) expect((await page.request.get(h)).status(), h).toBe(200);
  const hrefs = await page.locator('a[href^="https://www.filmtwist.com/work/"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
  for (const src of SOURCES) expect(hrefs, `source link ${src}`).toContain(src);
  await expect(page.getByTestId('team-member')).toHaveCount(9);
  // nine people wrap into balanced, centered rows: never a lone tile starting a row, and no row wider than the one above
  const rows = await page.getByTestId('team-member').evaluateAll((els) => { const m = new Map<number, number>(); for (const el of els) { const t = Math.round(el.getBoundingClientRect().top); m.set(t, (m.get(t) ?? 0) + 1); } return [...m.entries()].sort((a, b) => a[0] - b[0]).map(([, n]) => n); });
  expect(rows[rows.length - 1]).toBeGreaterThan(1);
  for (let i = 1; i < rows.length; i++) expect(rows[i]).toBeLessThanOrEqual(rows[i - 1]);
  // schools we've worked with: every client on the list, each logo loaded, each with its school's name, light marks on the dark tile
  const logos = page.getByTestId('client-logo');
  await expect(logos).toHaveCount(14);
  await page.getByTestId('client-strip').scrollIntoViewIfNeeded();
  // the strip sits below the three case studies and loops as one slow row: the track moves on its own and pauses under the pointer
  expect(await page.getByTestId('client-strip').evaluate((el) => el.getBoundingClientRect().top > document.querySelector('.cr-case-row')!.getBoundingClientRect().bottom)).toBe(true);
  await expect(page.getByTestId('client-strip')).toHaveAttribute('data-mode', 'marquee');
  const track = page.locator('.cr-clients-track');
  const x0 = await track.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41);
  await page.waitForTimeout(700);
  const x1 = await track.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41);
  expect(x1, 'the logo row should be moving').not.toBe(x0);
  await page.getByTestId('client-marquee').hover();
  await expect.poll(() => track.evaluate((el) => getComputedStyle(el).animationPlayState)).toBe('paused');
  await page.mouse.move(0, 0);
  await expect.poll(() => logos.locator('img').evaluateAll((imgs) => imgs.filter((el) => !(el as HTMLImageElement).complete || (el as HTMLImageElement).naturalWidth === 0).length), { timeout: 15_000 }).toBe(0);
  expect(await logos.locator('img').evaluateAll((imgs) => imgs.map((el) => (el as HTMLImageElement).alt).filter((a) => a.length < 4))).toEqual([]);
  // every mark measured dark after Aspire and Education for Change were recolored for white tiles (October 30); the backstop still holds for any light mark
  const dark = await logos.evaluateAll((els) => els.filter((el) => el.getAttribute('data-tone') === 'light').map((el) => getComputedStyle(el).backgroundColor));
  expect(dark).toEqual([]);
  expect(await logos.evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor).filter((bg) => bg !== 'rgb(255, 255, 255)'))).toEqual([]);
  const spill = await logos.evaluateAll((els) => els.map((el) => { const t = el.getBoundingClientRect(), i = el.querySelector('img')!.getBoundingClientRect(); return Math.round(Math.max(0, t.top - i.top, i.bottom - t.bottom, t.left - i.left, i.right - t.right)); }));
  expect(spill.filter((px) => px > 1), 'logos spilling out of their tiles').toEqual([]);
  expect(await page.getByTestId('cta-primary').getAttribute('href')).toBe('#contact');
  // the review chrome points at the current direction's question, not the four-concept form
  const review = await page.getByRole('link', { name: 'Does this resolve your notes?' }).first().getAttribute('href');
  expect(review).toMatch(/#current$/);
  // reduced motion: the reel is a static grid, every photo is in full color, nothing is hidden
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const p2 = await ctx.newPage();
  await p2.goto(new URL('bold/', baseURL!).toString());
  await settle(p2);
  await expect(p2.locator('.cr-reel--static')).toBeVisible();
  await expect(p2.locator('h1')).toHaveCount(1);
  const dimmed = await p2.locator('[data-reveal]').evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
  expect(dimmed).toBe(0);
  for (const id of ['services', 'work', 'team', 'partner', 'contact']) await expect(p2.locator(`#${id}`)).toBeVisible();
  // under reduced motion the schools strip is static, centered rows: all fourteen, never a lone tile, rows never widening downward
  await expect(p2.getByTestId('client-strip')).toHaveAttribute('data-mode', 'static');
  const logoRows = await p2.getByTestId('client-logo').evaluateAll((els) => { const m = new Map<number, number>(); for (const el of els) { const t = Math.round(el.getBoundingClientRect().top); m.set(t, (m.get(t) ?? 0) + 1); } return [...m.entries()].sort((a, b) => a[0] - b[0]).map(([, n]) => n); });
  expect(logoRows.reduce((a, b) => a + b, 0)).toBe(14);
  expect(logoRows[logoRows.length - 1], `logo rows ${logoRows.join('-')}`).toBeGreaterThan(1);
  for (let i = 1; i < logoRows.length; i++) expect(logoRows[i], `logo rows ${logoRows.join('-')}`).toBeLessThanOrEqual(logoRows[i - 1]);
  await ctx.close();
});

for (const id of CASES) {
  test(`Concept 06 case page ${id}: the published campaign on this site, no source footnote, creative that loads`, async ({ page }) => {
    const errors = watch(page);
    await page.goto(`bold/work/${id}/`);
    await settle(page);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(SCHOOLS.find((s) => s.toLowerCase().startsWith(id === 'friendship' ? 'friendship' : id))!);
    expect(await page.getByTestId('case-metrics').locator('li').count()).toBeGreaterThanOrEqual(3);
    expect(await page.getByTestId('case-source').count(), 'the source footnote (off since November 4)').toBe(0);
    expect(await page.locator('body').innerText()).not.toContain('Figures and creative are from');
    const imgs = page.getByTestId('case-gallery').locator('img');
    expect(await imgs.count()).toBeGreaterThanOrEqual(3);
    for (let i = 0; i < await imgs.count(); i++) {
      await imgs.nth(i).scrollIntoViewIfNeeded();
      await expect.poll(() => imgs.nth(i).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    for (const t of ['case-back', 'case-prev', 'case-next', 'cta-final']) {
      const href = await page.getByTestId(t).evaluate((a) => (a as HTMLAnchorElement).href);
      expect(href, t).toContain('/fsm-concepts/bold/');
      const res = await page.request.get(href.split('#')[0]);
      expect(res.status(), `${t} ${href}`).toBe(200);
    }
    expect(await page.getByTestId('cta-final').getAttribute('href')).toBe('../../#contact');
    expect(errors, errors.join('\n')).toEqual([]);
  });
}

test('Current direction feedback sends only its own fields, never the merged or four-concept answers', async ({ page }) => {
  await page.goto('#merged');
  await settle(page);
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important }' });
  await page.waitForFunction(() => new Promise<boolean>((r) => { const y = scrollY; setTimeout(() => r(scrollY === y), 250); }));
  await page.locator('[data-testid="merged-resolves"][value="no"]').check();
  await page.getByTestId('merged-reviewer').fill('Current Test');
  await expect(page.getByTestId('merged-status')).toHaveText(/Saved on this device/);
  await page.goto('#current');
  await settle(page);
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important }' });
  await page.waitForFunction(() => new Promise<boolean>((r) => { const y = scrollY; setTimeout(() => r(scrollY === y), 250); }));
  await expect(page.getByTestId('open-current')).toHaveAttribute('href', /\/bold\/$/);
  const checklist = page.getByTestId('current-checklist');
  await expect(checklist).toBeVisible();
  expect(await checklist.locator('li').count()).toBeGreaterThanOrEqual(12);
  await expect(checklist).toContainText('Partly');
  await expect(page.getByTestId('open-merged')).toHaveCount(1);
  await expect(page.getByTestId('open-concept')).toHaveCount(4);
  await page.locator('[data-testid="current-resolves"][value="yes"]').check();
  await page.getByTestId('current-notes').fill('Closer. The blue could be a shade lighter.');
  await page.getByTestId('current-color').fill('Enough brand');
  await expect(page.getByTestId('current-reviewer')).toHaveValue('Current Test'); // name reused from the merged form
  const posted: string[] = [];
  await page.route('https://docs.google.com/forms/**/formResponse', (route) => { posted.push(route.request().postData() ?? ''); return route.fulfill({ status: 200, body: '' }); });
  await page.getByTestId('submit-current').click();
  await expect(page.getByTestId('current-status')).toHaveText(/Sent at/);
  await expect(page.getByTestId('current-sent')).toHaveText(/Last sent/);
  expect(posted).toHaveLength(1);
  const body = new URLSearchParams(posted[0]);
  expect(body.get('entry.94783242')).toBe('Current Test');
  expect(body.get('entry.586107830')).toBe('yes');
  expect(body.get('entry.535067219')).toContain('shade lighter');
  expect(body.get('entry.1637215238')).toBe('Enough brand');
  expect(body.get('entry.1912088952')).toContain('current direction feedback');
  expect(body.get('entry.1136712824')).toBeNull(); // the merged answer is NOT resent
  expect(body.get('entry.944882537')).toBeNull(); // nor any four-concept rating
  expect(body.get('entry.146796121')).toBeNull();
  await page.reload();
  await settle(page);
  await expect(page.locator('[data-testid="current-resolves"][value="yes"]')).toBeChecked();
  await expect(page.locator('[data-testid="merged-resolves"][value="no"]')).toBeChecked();
});

test('Concept 06 opener: plays over a rendered page and again on reload while in review, any key skips it, none under reduced motion', async ({ page, browser, baseURL }) => {
  await page.addInitScript(() => { try { sessionStorage.removeItem('fsm-bold-opener-seen'); } catch { /* ignore */ } });
  const errors = watch(page);
  await page.goto('bold/', { waitUntil: 'load' });
  const opener = page.getByTestId('opener');
  await expect(opener).toBeVisible();
  await expect(page.locator('h1')).toHaveCount(1); // the page is in the document underneath
  await expect(page.getByTestId('contact-form')).toBeAttached();
  expect(await page.evaluate(() => window.__fsmOpener?.duration)).toBeCloseTo(3.5, 1);
  await expect(page.locator('.cr-header')).toHaveCSS('opacity', '0'); // the header waits for the mark (retried: it fades out over 0.4 s under the white field)
  await expect(page.locator('.review-ribbon')).toHaveCSS('opacity', '0'); // and so does the review ribbon above it
  await expect(opener).toHaveCount(0, { timeout: 8_000 });
  expect(await page.evaluate(() => sessionStorage.getItem('fsm-bold-opener-seen'))).toBeNull(); // review mode: no flag, so it replays
  expect(await page.evaluate(() => document.documentElement.classList.contains('cr-opener-lock'))).toBe(false);
  await expect(page.locator('.cr-header')).toHaveCSS('opacity', '1'); // and is back once it lands
  await expect(page.locator('.review-ribbon')).toHaveCSS('opacity', '1');
  await page.reload({ waitUntil: 'load' });
  await expect(page.getByTestId('opener')).toBeVisible(); // review mode: every load
  await expect(page.getByTestId('opener')).toHaveCount(0, { timeout: 8_000 });
  // a key skips it
  await page.goto('bold/?opener=1', { waitUntil: 'load' });
  await expect(page.getByTestId('opener')).toBeVisible();
  await page.keyboard.press('Space');
  await expect(page.getByTestId('opener')).toHaveCount(0, { timeout: 2_000 });
  expect(errors).toEqual([]);
  // reduced motion: no opener at all
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const p2 = await ctx.newPage();
  await p2.goto(`${baseURL}bold/`, { waitUntil: 'load' });
  await p2.waitForTimeout(400);
  await expect(p2.getByTestId('opener')).toHaveCount(0);
  await ctx.close();
});

test('Concept 06 reel: every creative shows whole, hover enlarges, click opens the full creative, Escape closes', async ({ page }) => {
  await page.goto('bold/', { waitUntil: 'load' });
  await settle(page);
  const items = page.getByTestId('reel-item');
  expect(await items.count()).toBeGreaterThanOrEqual(8);
  const crops = await items.evaluateAll((els) => els.map((el) => {
    const img = el.querySelector('img')!; // the asset's own width and height attributes: off-screen tiles are lazy and not yet decoded
    const shown = img.clientWidth / img.clientHeight, natural = Number(img.getAttribute('width')) / Number(img.getAttribute('height'));
    return { shown: +shown.toFixed(2), natural: +natural.toFixed(2), ok: Math.abs(shown - natural) / natural < 0.03 };
  }));
  expect(crops.filter((c) => !c.ok)).toEqual([]);
  await page.getByRole('button', { name: 'Pause reel' }).click(); // tiles must be still for a hover to land
  const first = items.first();
  await first.hover();
  await page.waitForTimeout(350);
  const scale = await first.evaluate((el) => { const m = new DOMMatrix(getComputedStyle(el).transform); return m.a; });
  expect(scale).toBeGreaterThan(1.3);
  await first.click();
  const box = page.getByTestId('lightbox');
  await expect(box).toBeVisible();
  await expect(box.locator('img')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(box).toBeHidden();
  await first.click();
  await expect(box).toBeVisible();
  await page.getByTestId('lightbox-close').click();
  await expect(box).toBeHidden();
  // Version 3.4: the published creative is web-sized, so the dialog shows each file at its own pixel size at most, never
  // upscaled. Checked on every reel item: the shown width never exceeds the asset's width, and it only falls short of it
  // when the dialog's own limits bind (92vw across, 92vh less the caption and button down). Tiles further along the track
  // sit outside the clipped marquee, so they are clicked from script rather than by pointer.
  const n = await items.count();
  for (let i = 0; i < n; i++) {
    await items.nth(i).evaluate((el) => (el as HTMLElement).click());
    await expect(box.locator('img')).toBeVisible();
    await box.locator('img').evaluate((el) => { const img = el as HTMLImageElement; return img.complete && img.naturalWidth > 0 ? undefined : new Promise((r) => { img.onload = r; img.onerror = r; }); });
    await page.waitForTimeout(80);
    const fit = await box.locator('img').evaluate((img) => {
      const native = Number(img.getAttribute('width')), nativeH = Number(img.getAttribute('height'));
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const byHeight = (window.innerHeight * 0.92 - 5.5 * rem) * native / nativeH;
      return { shown: img.clientWidth, native, expected: Math.min(native, 1100, window.innerWidth * 0.92, byHeight) };
    });
    expect(fit.shown, `reel item ${i}`).toBeLessThanOrEqual(fit.native + 1);
    expect(fit.shown, `reel item ${i}`).toBeGreaterThanOrEqual(fit.expected - 2);
    await page.keyboard.press('Escape');
    await expect(box).toBeHidden();
  }
  // Closing the dialog hands focus back to the clicked tile; for a pointer user that must not leave the reel parked (seen
  // live October 31). Pointer only: the track is moving again, so the hover pauses it and a forced click lands on the tile.
  if (test.info().project.name.includes('mobile')) return;
  await page.getByRole('button', { name: 'Play reel' }).click();
  await items.nth(2).hover({ force: true });
  await page.waitForTimeout(300);
  await items.nth(2).click({ force: true });
  await expect(box).toBeVisible();
  await page.getByTestId('lightbox-close').click();
  await expect(box).toBeHidden();
  await page.mouse.move(5, 5);
  await expect.poll(() => page.locator('.cr-marquee-track').evaluate((el) => getComputedStyle(el).animationPlayState)).toBe('running');
  expect(await page.evaluate(() => document.activeElement?.classList.contains('cr-reel-item'))).toBe(false);
});

test('Concept 06 reel: every tile, including the off-screen ones, has its image loaded without scrolling', async ({ page }) => {
  await page.goto('bold/', { waitUntil: 'load' });
  await settle(page);
  await expect.poll(async () => page.locator('.cr-reel img').evaluateAll((imgs) => imgs.filter((i) => !(i as HTMLImageElement).complete || (i as HTMLImageElement).naturalWidth === 0).length), { timeout: 15000 }).toBe(0);
  expect(await page.locator('.cr-reel img').count()).toBeGreaterThanOrEqual(10);
});

test('Concept 06 Version 3.12: the Aspire and Friendship cards lead with photographs', async ({ page }) => {
  const errors = watch(page);
  await page.goto('bold/');
  await settle(page);
  const first = page.getByTestId('case-study').first();
  await expect(first).toContainText('Aspire Public Schools');
  await expect(first.locator('img').first()).toHaveAttribute('src', /\/campaigns\/aspire\/playground-wide-/);
  // the wide frame fills the 4:3 card (the picture element must be block-level or the image leaves a gap below it)
  const fill = await first.locator('.cr-case-media').evaluate((a) => { const img = a.querySelector('img')!; return { box: a.getBoundingClientRect().height, img: img.getBoundingClientRect().height }; });
  expect(Math.abs(fill.box - fill.img), `card ${fill.box}px, image ${fill.img}px`).toBeLessThan(2);
  expect(await page.locator('img[src*="/campaigns/aspire/classroom-photo-"]').count(), 'the chalk still on the home page').toBe(0);
  expect(await page.locator('.cr-case-media img[src*="/campaigns/aspire/math-field-day-"]').count(), 'Math Field Day on a card').toBe(0);
  const friendship = page.getByTestId('case-study').nth(1);
  await expect(friendship).toContainText('Friendship');
  await expect(friendship.locator('img').first()).toHaveAttribute('src', /\/campaigns\/friendship\/classroom-group-/);
  expect(await page.locator('.cr-case-media img[src*="/campaigns/friendship/ad-"]').count(), 'a Friendship ad on a card').toBe(0);
  // the still is in the case page gallery, once
  await page.goto('bold/work/aspire/');
  await settle(page);
  expect(await page.locator('[data-testid="case-gallery"] img[src*="/campaigns/aspire/classroom-photo-"]').count()).toBe(1);
  expect(await page.locator('[data-testid="case-gallery"] img[src*="/campaigns/aspire/math-field-day-"]').count(), 'Math Field Day in the gallery').toBe(1);
  expect(await page.locator('[data-testid="case-gallery"] img[src*="/campaigns/aspire/playground-wide-"]').count(), 'the hero repeated in the gallery').toBe(0);
  await page.goto('bold/work/friendship/');
  await settle(page);
  expect(await page.locator('[data-testid="case-gallery"] img[src*="/campaigns/friendship/ad-education-starts-at-woodridge-"]').count(), 'the Woodridge ad in the gallery').toBe(1);
  expect(await page.locator('[data-testid="case-gallery"] img[src*="/campaigns/friendship/classroom-group-"]').count(), 'the Friendship hero repeated in the gallery').toBe(0);
  expect(errors, errors.join('\n')).toEqual([]);
});

test('Concept 06 Version 3.13: the Friendship case page shows 43 enrollments as a fourth tile; the home card still leads with leads', async ({ page }) => {
  const errors = watch(page);
  await page.goto('bold/work/friendship/');
  await settle(page);
  const tiles = page.getByTestId('case-metrics').locator('li');
  await expect(tiles).toHaveCount(4);
  const text = (await tiles.allTextContents()).join(' | ');
  expect(text).toMatch(/1,022/);
  expect(text).toMatch(/\b51\b/);
  expect(text).toMatch(/\b43\b[^|]*Enrollments/);
  expect(text).toMatch(/\$26\.01/);
  expect(text).not.toMatch(/estimat/i);
  // the other two case pages keep three tiles
  for (const id of ['aspire', 'alpha'] as const) {
    await page.goto(`bold/work/${id}/`);
    await settle(page);
    await expect(page.getByTestId('case-metrics').locator('li')).toHaveCount(3);
  }
  // the home page card headline stays leads
  await page.goto('bold/');
  await settle(page);
  const friendship = page.getByTestId('case-study').filter({ hasText: 'Friendship' });
  await expect(friendship.locator('.cr-case-big')).toHaveText('1,022');
  expect(await friendship.textContent()).not.toMatch(/enrollments/i);
  expect(errors, errors.join('\n')).toEqual([]);
});


test('Concept 06 Version 3.14: the contact section embeds FilmTwist\'s FSM form (no site form), Friendship shows its 2025 figures, Envision is gone, the approval captions are off', async ({ page, baseURL }) => {
  const errors = watch(page);
  await page.goto('bold/');
  await settle(page);
  // the contact section holds FilmTwist's FSM form frame (Version 3.14, the form the brand owner built on November 5); the site's own form is off
  await page.locator('#contact').scrollIntoViewIfNeeded();
  const frame = page.getByTestId('leadconnector-form');
  await expect(frame).toBeAttached();
  await expect(frame).toHaveAttribute('src', 'https://api.leadconnectorhq.com/widget/form/s7caTM5n0YKe6Rdj6v4h');
  await expect(frame).toHaveAttribute('data-form-id', 's7caTM5n0YKe6Rdj6v4h');
  await expect(frame).toHaveAttribute('data-layout', "{'id':'INLINE'}");
  await expect.poll(() => page.locator('script[src="https://link.msgsndr.com/js/form_embed.js"]').count(), { message: 'the widget script loads' }).toBe(1);
  expect(await page.getByTestId('fsm-form').count(), 'the site\'s own form is off').toBe(0);
  expect(await page.locator('#contact iframe').count(), 'one frame').toBe(1);
  // the Work heading (November 3): no slang
  await expect(page.locator('#work-title')).toHaveText('Schools discovered. Seats filled.');
  // Friendship's card carries the 2025 leads report figures; no card shows enrollments
  const friendship = page.getByTestId('case-study').filter({ hasText: 'Friendship' });
  await expect(friendship).toHaveCount(1);
  await expect(friendship).toContainText('1,022');
  await expect(friendship).toContainText('February to September 2025');
  for (const card of await page.getByTestId('case-study').all()) expect(await card.textContent()).not.toMatch(/enrollments/i);
  // Envision: no card, no campaign image, no page; the logo stays in the schools row
  expect(await page.locator('img[src*="/campaigns/envision/"]').count()).toBe(0);
  const gone = await page.request.get(new URL('bold/work/envision/', baseURL).toString()); // the preview answers a missing path with the hub page; GitHub Pages with 404
  expect(await gone.text()).not.toContain('data-case="envision"');
  // the case pages no longer carry the reuse-approval caption
  for (const id of CASES) {
    await page.goto(`bold/work/${id}/`);
    await settle(page);
    expect(await page.locator('.cr-rights').count(), `${id} rights caption`).toBe(0);
  }
  await expect(page.locator('h1')).toHaveText('Alpha Public Schools');
  expect(errors, errors.join('\n')).toEqual([]);
});

test('Concept 06 Version 3.9: the form posts one JSON document to the sheet receiver without a preflight, shows the thank-you on ok and keeps the form on an error', async ({ page }) => {
  test.skip(true, 'siteConfig.leadConnector.mode is \'embed\' since Version 3.14 (November 5, 2026): no page renders FsmForm. Re-enable when the mode returns to \'fsm\'.');
  const errors = watch(page);
  const endpoint = /script\.google\.com\/macros\//;
  let posted: Record<string, unknown> | null = null;
  let contentType = '';
  let answer: { status: number; body: string } = { status: 200, body: JSON.stringify({ ok: true }) };
  await page.route(endpoint, async (route) => {
    const req = route.request();
    contentType = req.headers()['content-type'] ?? '';
    posted = JSON.parse(req.postData() ?? 'null');
    await route.fulfill({ status: answer.status, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: answer.body });
  });
  await page.goto('bold/');
  await settle(page);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  const fill = async () => {
    await page.getByTestId('fsm-name').fill('Test Person');
    await page.getByTestId('fsm-email').fill('test@example.com');
    await page.getByTestId('fsm-phone').fill('510 555 0100');
    await page.getByTestId('fsm-services').selectOption('Marketing Services');
    await page.getByTestId('fsm-source').selectOption('Referral');
    await page.getByTestId('fsm-budget').selectOption('Not sure yet');
    await page.getByTestId('fsm-needs').fill('Forty seats in TK and kindergarten.');
    await page.getByTestId('fsm-terms').check();
  };
  await fill();
  await page.getByTestId('fsm-submit').click();
  await expect(page.getByTestId('fsm-form-sent')).toBeVisible();
  await expect(page.getByTestId('fsm-form-sent')).toContainText('Your message is with the team');
  expect(contentType.startsWith('text/plain'), `content-type ${contentType} (a simple request, no preflight)`).toBe(true);
  const p = posted as unknown as Record<string, unknown>;
  expect(Object.keys(p).sort()).toEqual(['budget', 'consent', 'email', 'full_name', 'lead_source', 'needs', 'page', 'phone', 'referrer', 'seconds', 'services', 'website']);
  expect(p.full_name).toBe('Test Person');
  expect(p.email).toBe('test@example.com');
  expect(p.services).toBe('Marketing Services');
  expect(p.consent).toBe(true);
  expect(p.website).toBe('');
  expect(typeof p.seconds).toBe('number');
  expect(String(p.page)).toContain('bold/');
  // a failure keeps the form and names the status
  answer = { status: 500, body: 'oops' };
  await page.reload();
  await settle(page);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await fill();
  await page.getByTestId('fsm-submit').click();
  await expect(page.getByTestId('fsm-status')).toContainText('answered 500');
  await expect(page.getByTestId('fsm-form')).toBeVisible();
  // a reply without ok is also an error (the script's own validation message is shown)
  answer = { status: 200, body: JSON.stringify({ ok: false, error: 'The consent box must be checked.' }) };
  await page.getByTestId('fsm-submit').click();
  await expect(page.getByTestId('fsm-status')).toContainText('The consent box must be checked.');
  expect(errors.filter((e) => !/500/.test(e)), errors.join('\n')).toEqual([]); // the routed 500 is the test's own
});

test('Concept 06 legal pages: the form and the footer link to this site\'s own terms and privacy pages, both of which read as one document with a working contents list and none of the source template\'s defects', async ({ page, baseURL }) => {
  await page.goto('bold/', { waitUntil: 'load' });
  await settle(page);
  // The footer and the form's consent line point at the site's own pages, which resolve.
  for (const path of ['terms/', 'privacy/'] as const) expect((await page.request.get(new URL(`bold/${path}`, baseURL).toString())).status(), path).toBe(200);
  const footer = page.locator('.cr-footer-legal');
  expect(await footer.getByRole('link', { name: 'Privacy policy' }).getAttribute('href')).toBe('privacy/');
  expect(await footer.getByRole('link', { name: 'Terms and conditions' }).getAttribute('href')).toBe('terms/');
  expect(await page.getByText('to be supplied').count()).toBe(0);

  for (const [path, title, other] of [['bold/terms/', 'Terms and conditions', '../privacy/'], ['bold/privacy/', 'Privacy policy', '../terms/']] as const) {
    const errors = watch(page);
    await page.goto(path, { waitUntil: 'load' });
    await settle(page);
    await expect(page.locator('h1')).toHaveText(title);
    await expect(page.getByTestId('legal-updated')).toContainText('Last updated November 10, 2026');
    // every contents entry lands on a section heading on this page
    const hrefs = await page.locator('[data-testid="legal-toc"] ol a').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''));
    expect(hrefs.length).toBeGreaterThanOrEqual(13);
    for (const h of hrefs) {
      expect(h.startsWith('#'), h).toBe(true);
      await expect(page.locator(`section${h} > h2`), h).toHaveCount(1);
    }
    // each section opens with its plain summary
    expect(await page.locator('.cr-legal-section').count()).toBe(hrefs.length);
    expect(await page.locator('.cr-legal-section .cr-legal-short').count()).toBe(hrefs.length);
    // the sibling document and the way home resolve
    expect(await page.getByTestId('legal-other').getAttribute('href')).toBe(other);
    expect((await page.request.get(new URL(other, new URL(path, baseURL)).toString())).status()).toBe(200);
    expect(await page.getByTestId('legal-home').getAttribute('href')).toBe('../#top');
    // the source template's defects stay out: a New Mexico law clause, a Brussels arbitration court, a homecare medical disclaimer, shouting capitals
    const text = (await page.locator('.cr-legal-text').evaluate((el) => el.textContent ?? '')); // textContent: the headings are uppercased by CSS, not in the text
    for (const bad of ['New Mexico', 'Brussels', 'European Arbitration', 'homecare', 'medical advice', 'Termly', 'filmtwist.com/privacy-policy', '__', '[', ']('] ) expect(text, bad).not.toContain(bad);
    expect(text.match(/[A-Z]{12,}/), 'no all-capitals runs').toBeNull();
    expect(text).toContain('California');
    expect(text).toContain('biz@fullschoolmarketing.com');
    expect(text, 'the agency address is off the legal pages').not.toContain('info@filmtwist.com');
    expect(errors, errors.join('\n')).toEqual([]);
  }
});

test('Concept 06 Version 3.4: the provenance footnotes are off the page (the register in docs/CONTENT_AND_CLAIMS.md keeps them)', async ({ page }) => {
  await page.goto('bold/', { waitUntil: 'load' });
  await settle(page);
  for (const s of ['FilmTwist-reported', 'Campaigns above:', 'School logos from each school', 'Client approval for reuse', 'reuse approval pending', 'delivered by the FilmTwist team', 'team behind FilmTwist', 'The form goes straight to the team']) {
    expect(await page.getByText(s).count(), s).toBe(0);
  }
  expect(await page.locator('meta[name="description"]').getAttribute('content')).not.toContain('team behind');
  // The relationship is stated once, plainly, in the Team intro; the hero no longer tries to explain it.
  expect(await page.locator('#team').getByText("Filmtwist Creative Agency's K-12 student recruitment practice").count()).toBe(1);
});


test('Concept 06a and 06b: frozen earlier versions at their own addresses, banner back to the current one, no review chrome; the hub links to both', async ({ page }) => {
  await page.goto('', { waitUntil: 'load' });
  const links = page.getByTestId('previous-versions').locator('a');
  await expect(links).toHaveCount(2);
  const hrefs = await links.evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')));
  expect(hrefs.map((h) => h?.replace(/^.*fsm-concepts\//, ''))).toEqual(['6a/bold/', '6b/bold/']);
  for (const [path, label] of [['6a/bold/', 'Concept 06a'], ['6b/bold/', 'Concept 06b']] as const) {
    const errors = watch(page);
    await page.goto(`${path}?opener=0`, { waitUntil: 'load' });
    await expect(page.locator('h1')).toHaveCount(1);
    const banner = page.getByTestId('frozen-banner');
    await expect(banner).toContainText(label);
    await expect(banner.locator('a')).toHaveAttribute('href', '/fsm-concepts/bold/');
    await expect(page.locator('.review-ribbon')).toHaveCount(0);
    await expect(page.locator('.review-pill')).toHaveCount(0);
    await expect.poll(() => page.locator('img').first().evaluate((el) => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0), { timeout: 15_000 }).toBe(true);
    expect(errors.filter((e) => !/cancelled/.test(e))).toEqual([]);
  }
});
