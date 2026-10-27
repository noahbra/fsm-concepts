# QA report

Prepared October 26, 2026 (Pacific). Every result below was produced by running the named command; nothing is inferred.

## Revision October 27, 2026

Concept 03's scroll story was rebuilt after review (new scene, palette journey, choreography, typography) and the
"How it works" steps on every concept were replaced with FilmTwist's published funnel workflow. The full Playwright suite was
rerun after the rebuild: 116 passed, 0 failed (1.2 min). Frame-by-frame captures of the pinned story at 21 desktop and 11
mobile scroll positions were reviewed; three defects found during that review were fixed before the rerun (palette variables
not applied through GSAP, SVG group motion treated as absolute by GSAP, landing-page card framed off-screen on mobile).

## Summary

| Area | Status |
| --- | --- |
| Typecheck (`npx tsc --noEmit`, TypeScript 7.0.2) | PASS |
| Production build with `BASE_PATH=/fsm-concepts/` (Vite 8.3.5) | PASS, five HTML entry points, chunks under `/fsm-concepts/static/` |
| Playwright smoke suite, 29 tests x 4 projects (Chromium desktop 1440x900, Chromium mobile Pixel 7, WebKit desktop 1440x900, WebKit mobile iPhone 14) | PASS: 116 passed, 0 failed (1.1 min) |
| Screenshots, desktop 1440x900 and mobile 390x844, all five pages | Captured from the served production build (`npm run screenshots`) |
| Lighthouse (mobile preset, simulated throttling) | See "Lighthouse" below |
| GitHub Pages deployment | See "Deployment" below |

## Commands

```bash
npm ci
npx tsc --noEmit
BASE_PATH=/fsm-concepts/ npm run build
BASE_PATH=/fsm-concepts/ npm run preview            # http://localhost:4173/fsm-concepts/
npx playwright test --reporter=line                 # builds fresh and serves the subpath build itself
node scripts/screenshots.mjs http://localhost:4173/fsm-concepts/
node scripts/og.mjs
```

## Smoke tests (tests/smoke.spec.ts)

| # | Requirement (spec section 15) | Test | Result |
| --- | --- | --- | --- |
| 1 | Hub loads and exposes four working concept links | `Hub > loads and exposes four working concept links` (also GETs each path: 200) | PASS x4 projects |
| 2 | All five paths load directly and on refresh with assets resolved under the subpath | `Page > loads directly under the subpath...` (reloads, checks every script/css/img URL starts with the base, no eager image is broken, no console or request errors, no HTTP >= 400) | PASS x5 pages x4 projects |
| 3 | Case-study source links point to the verified URLs; no broken in-site links | `Concept > has services, three verified case studies...` (all three verified URLs present) and `Page > external links are safe and labeled; in-page anchors resolve` (every `#anchor` has a target) | PASS |
| 4 | Each concept has a services section, three verified school names, and a CTA with the consultation URL | `Concept > has services, three verified case studies with source links, and the CTA` | PASS x4 concepts x4 projects |
| 5 | Concept 02 filters change gallery state | `Concept 02: portfolio filters change visible gallery state` (each of 4 filters narrows from 26 items to a non-empty subset whose items all carry that category; All restores; Enter on a focused filter works) | PASS x4 |
| 6 | Concept 03 skip works, reduced motion does not pin or animate, scrolling reaches proof | `Concept 03: skip works, scrolling reaches proof, reduced motion renders the static story` (Enter on Skip moves focus to `#site-content`; third case card reachable; document scrolls well past the stage; under `reducedMotion: 'reduce'` the static story renders, no stage, no `.pin-spacer`) | PASS x4 |
| 7 | Concept 04 defining interaction works by click and keyboard | `Concept 04: season dial changes the page by click and keyboard` (Winter click changes the headline and leads with Friendship; ArrowRight selects Spring and leads with Envision) | PASS x4 |
| 8 | Feedback persists across reload; copy/export include answers; no fake submit | `Feedback persists across reload...` (ratings, comments, decision and reviewer survive reload; downloaded .md contains the values; clipboard text contains the comment in Chromium; no Submit button when no endpoint is configured) | PASS x4 (clipboard assertion runs in Chromium only; WebKit headless has no clipboard-read permission) |
| 9 | No horizontal overflow at 375 and 390 | `Page > no horizontal overflow at 375 and 390` (before and after scrolling the full page) | PASS x5 pages x4 projects |
| 10 | No unhandled console errors, no missing image requests | folded into test 2 | PASS |
| 11 | Desktop and mobile screenshots for all five pages; hub cards use them | `Hub > hub cards use real screenshots that load` (8 images, each `naturalWidth > 0`) | PASS |
| 12 | External links have safe targets and informative labels | `Page > external links are safe and labeled` (`target=_blank`, `rel` includes `noopener`, non-empty accessible name) | PASS |
| 13 | Reviewer pill copies a link and renders a QR code; Escape closes it | `Concept > reviewer pill copies a link and shows a QR code` | PASS |

### Defects found and fixed during QA

- Preview server base path: the test server command applied `BASE_PATH` only to the build, so `vite preview` served at `/` with SPA fallback and every route returned the hub HTML (76 failures on the first run). Fixed in `playwright.config.ts` and the README.
- Concept 01: five CTA anchors to the FilmTwist consulting page lacked `target="_blank" rel="noopener noreferrer"`. Fixed.
- Hub card images are lazy-loaded; the test now scrolls each into view before asserting it loaded (WebKit mobile did not load below-fold cards otherwise).
- Concept 03 test asserted the third case card was in the viewport after a scripted scroll; on WebKit the final scroll position was the footer. The test now scrolls the card into view and separately asserts the document scrolled past the pinned stage.
- Builders removed IntersectionObserver reveal animations from Concepts 01, 02 and 04 because hidden-until-scrolled sections render blank in full-page screenshots.

## Viewport checks

Screenshots in `docs/screenshots/` (full page, with reviewer chrome) and `public/assets/screenshots/` (first viewport, chrome hidden, used by the hub cards):

| Page | 1440x900 | 390x844 | Notes |
| --- | --- | --- | --- |
| Hub | hub-desktop-full.png | hub-mobile-full.png | Cards stack to one column; matrix scrolls horizontally inside its own container |
| 01 Clean | clean-desktop-full.png | clean-mobile-full.png | Sticky bottom CTA under 700px |
| 02 Creative | creative-desktop-full.png | creative-mobile-full.png | Collage reflows to a stacked composition; marquee is clipped by its wrapper |
| 03 Story | story-desktop-full.png | story-mobile-full.png | Mobile uses a reframed vertical composition; stage has `overflow: hidden` |
| 04 Original | original-desktop-full.png | original-mobile-full.png | Ring scales down; segmented control beneath; sticky CTA appears after the hero |

Additional widths checked by the builders during development with the same script: 1920x1080 and 768x1024 (Concept 02), 375x667 (Concepts 02 and 04). The Playwright suite's overflow test runs at 375 and 390 on every page in all four browser projects.

Manual visual inspection: every screenshot above was opened and reviewed (headline wrapping, image crops, contrast on image overlays, overlap between the floating review pill and page content). Fixes made from that review are listed in each concept's rationale and in the defects list above.

## Accessibility

Automated: Lighthouse accessibility category (below); Playwright checks for skip links, focus movement on Skip, `aria-pressed` filters operable by keyboard, radio-group arrow keys, dialog Escape and focus restore, external link labels.

Manual: keyboard walk of each page's primary interactions in Chromium (nav toggle, filters, gallery dialog, season dial, story skip and rewatch, feedback form, review pill). A full screen-reader pass (VoiceOver, NVDA) has NOT been run; it is listed in `PRODUCTION_HANDOFF.md`.

Reduced motion: every concept switches off nonessential motion under `prefers-reduced-motion: reduce` (CSS media query plus `useReducedMotion` in React); Concept 03 swaps to a static four-frame story; screenshots of the reduced-motion renders were reviewed by the builders.

## Lighthouse

Lighthouse 13 (via `npx lighthouse@latest`), mobile form factor, simulated throttling, headless Chrome, run October 26, 2026 against the
production build served at `http://localhost:4173/fsm-concepts/`. Raw JSON in `docs/lighthouse/`. Thresholds from the brief: Accessibility >= 95, Best Practices >= 90, SEO >= 90, Mobile Performance >= 85.

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Hub / | 89 | 100 | 100 | 63 | 3.5 s | 0 ms | 0 |
| 01 /clean/ | 89 | 100 | 100 | 63 | 3.5 s | 0 ms | 0 |
| 02 /creative/ | 86 | 100 | 100 | 63 | 4.0 s | 0 ms | 0.009 |
| 03 /story/ | 91 | 100 | 100 | 63 | 3.2 s | 60 ms | 0 |
| 04 /original/ | 87 | 100 | 100 | 63 | 3.8 s | 30 ms | 0 |

- Performance and Accessibility and Best Practices meet the thresholds on every page. Accessibility was 93 to 96 on three pages on the first run (link accessible names not containing their visible text, three low-contrast decorative numerals and labels, an `aria-label` on a `<p>`); all were fixed and re-measured at 100.
- SEO is 63 on every page for one reason: the five HTML heads carry `<meta name="robots" content="noindex">` on purpose, because this is a concept review site that should not be indexed. Lighthouse's `is-crawlable` audit fails on that alone. Remove the tag for production and the category passes (every other SEO audit passes: title, description, viewport, link text, hreflang, canonical not required).
- LCP of 3.2 to 4.0 s is under simulated slow 4G on a laptop; the largest element is the hero image (Concepts 01, 02, 04), the logo (03) or the hub's first card. Production handoff lists hero preloading and AVIF as the next steps.

## Deployment

Repository: https://github.com/noahbra/fsm-concepts (public; GitHub Pages requires a public repo on a free account).
Workflow: `.github/workflows/deploy.yml` (Node 22, `npm ci`, `BASE_PATH=/fsm-concepts/ npm run build`, `actions/deploy-pages@v4`). Pages source set to GitHub Actions through the API on October 26, 2026.

Live URLs, verified with HTTP 200 after the first deploy (run 40452092797) and re-verified after the final push:

| Page | URL |
| --- | --- |
| Hub | https://noahbra.github.io/fsm-concepts/ |
| 01 Clean & Modern | https://noahbra.github.io/fsm-concepts/clean/ |
| 02 Bold & Creative | https://noahbra.github.io/fsm-concepts/creative/ |
| 03 The Invisible School | https://noahbra.github.io/fsm-concepts/story/ |
| 04 The Enrollment Year | https://noahbra.github.io/fsm-concepts/original/ |

The full Playwright suite was also run against the live site (`PW_BASE_URL=https://noahbra.github.io/fsm-concepts/ npx playwright test`): 116 passed, 0 failed. Open Graph images (`/og/*.png`) and hub screenshots resolve on the live site. Deep links and hard refresh work because each concept is a real directory with its own `index.html`.

## Known limitations

- iOS Safari was tested through Playwright WebKit (iPhone 14 emulation), not on a physical iPhone. Concept 03's pinned stage uses `pinSpacing: true` without `normalizeScroll`; a real-device check is recommended before the conference.
- Campaign imagery is FilmTwist-published case-study creative with reuse approval pending; it is labeled as such on every concept.
- No video assets (none approved). Concept 02's "reel" is a thumbnail marquee.
- The tagline lockup in Concept 03 is live text under the official logo because no logo file with the tagline was supplied.
- Feedback is stored per device in localStorage; there is no backend. Copy/Download is the delivery path unless `VITE_FEEDBACK_ENDPOINT` is configured.
- The repository and the Pages site are public; the review hub says so and asks reviewers not to add confidential notes.
- Lighthouse performance scores were measured on a developer laptop with simulated throttling, not on a mid-range phone over real 4G.
