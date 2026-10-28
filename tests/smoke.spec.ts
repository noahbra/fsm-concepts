import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';

const PAGES = ['', 'clean/', 'creative/', 'story/', 'original/', 'visible/', 'visible/work/aspire/', 'visible/work/friendship/', 'visible/work/envision/'] as const;
const CASES = ['aspire', 'friendship', 'envision'] as const;
const LEADCONNECTOR_FORM = 'DveY4KWgzKqaGiHAAA2e';
/** FilmTwist's embedded form (LeadConnector) is third-party: its own requests are not this site's defects. */
const THIRD_PARTY = /leadconnectorhq\.com|msgsndr\.com|challenges\.cloudflare\.com/;
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
    await expect(imgs).toHaveCount(10); // five cards (the merged direction plus the four originals), desktop and mobile each
    for (let i = 0; i < 10; i++) {
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
  await expect(page.locator('h1')).toHaveText(/Ads, video and landing pages/);
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
  // team: the sourced line, eleven cut-out photos that load, roles as published
  await expect(page.locator('#team')).toContainText('started in 2020');
  const members = page.getByTestId('team-member');
  await expect(members).toHaveCount(11);
  await members.first().scrollIntoViewIfNeeded();
  await expect.poll(() => members.first().locator('img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(members.first()).toContainText('Operations Manager');
  // contact: FilmTwist's own form, embedded; no figures in our copy
  await expect(page.locator('#contact')).toContainText('free 30-minute call');
  await expect(page.locator('#contact .contact__copy')).not.toContainText(/\d{2,}%|\$\d/);
  const form = page.getByTestId('leadconnector-form');
  await expect(form).toBeAttached();
  expect(await form.getAttribute('src')).toBe(`https://api.leadconnectorhq.com/widget/form/${LEADCONNECTOR_FORM}`);
  expect(await form.getAttribute('data-form-id')).toBe(LEADCONNECTOR_FORM);
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
    const src = await page.locator('.case-page__source a[href^="https://www.filmtwist.com/work/"]').getAttribute('href');
    expect(SOURCES, `source ${src}`).toContain(src!);
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
