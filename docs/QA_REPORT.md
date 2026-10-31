# QA report

Prepared October 26, 2026 (Pacific). Every result below was produced by running the named command; nothing is inferred.

## Revision October 27, 2026

Concept 03's scroll story was rebuilt after review (new scene, palette journey, choreography, typography) and the
"How it works" steps on every concept were replaced with FilmTwist's published funnel workflow. The full Playwright suite was
rerun after the rebuild: 116 passed, 0 failed (1.2 min). Frame-by-frame captures of the pinned story at 21 desktop and 11
mobile scroll positions were reviewed; three defects found during that review were fixed before the rerun (palette variables
not applied through GSAP, SVG group motion treated as absolute by GSAP, landing-page card framed off-screen on mobile).

## Revision October 27, 2026 (second): Concept 04 replaced

Noah rejected "The Enrollment Year" (season dial) as unprofessional with an unclear architecture and asked for research
before a new direction. `CONCEPT_04_RESEARCH.md` records the research; `CONCEPT_04_CREATIVE_THESIS.md` the new concept,
"Start With Your Number" (a seat worksheet computed from the three published campaigns, proof as funnels, the first-call
checklist). The Concept 04 smoke test was rewritten for the worksheet. Full suite after the rebuild: 116 passed, 0 failed
(1.1 min). Desktop and mobile folds and full pages were reviewed; one defect (range labels colliding with notes) was fixed
before the rerun. Lighthouse was not rerun for this revision.

## Revision October 30, 2026 (sixteenth): the evening answers, fourteen tiles

Brand owner (5:24 PM): Anawakalmekak and Washington Yu Ying stay; the decision maker's "Pathways" is Pathways Charter
School (pathwayscharter.org; its site says TK-12 independent study in Sonoma, Solano, Napa and Marin counties); FSM's own
Aspire logo folder shared; no file for the current Education for Change logo; full names for the four first-name staff.
Decision maker (5:28 PM): first names only. Built: Aspire's tile now carries FSM's own purple-on-white horizontal PNG
(1576 by 586, transparent) in place of the recolored web SVG; Pathways joins as the fourteenth tile. Its site has no logo
image (the header is a CSS-placed mark beside live Cinzel text), but its watermark PNG is the full-color vertical lockup
with every pixel at alpha 26; restored to full alpha, then its mark and wordmark blocks set side by side as the site's
header sets them (3107 by 724). Flagged in the claims register for the school's own file. The roster is unchanged.
Column picks for fourteen: 7-7 from 1200 px, 4-4-4-2 on a tablet, two by two on a phone; the count-aware rule needs no
widening fix at any width. Tests: fourteen logos, fourteen in the reduced-motion rows. Measured on the local build at 1440
and 390 (static rows under reduced motion, the moving row without): 14 tiles, 0 broken images, every tile white.
Full local suite (four browsers, served from the built `dist/`): 280 passed, 0 failed. Hub Version 3.3.
Deployed: commit 5395441, Pages run 41166138545 (success, 8:52 PM). Measured live: the Concept 06 bundle (bold-CIIWj9pu.js)
matches the local build and carries Pathways Charter School; the Aspire and Pathways logo files serve; full suite against
the live site in all four browsers: 280 passed, 0 failed. Lighthouse was not rerun for this revision.

## Revision October 30, 2026 (fifteenth): the strip below the case studies, scrolling, all white

Project owner: white tiles for Aspire and Education for Change with their white text made visible; should the proof sit lower,
and should it scroll. Aspire's wordmark path (`fill="#ffffff"`) is set in the mark's own purple (#85568a); Education for
Change's cream pixels are recolored to the wordmark blue measured from its dark version (#4e76b5, the tree untouched);
both now measure dark (0.45, 0.50) and every tile is white. The strip moved below the three case studies and the proof note.
Without reduced motion it is one looping row: fixed 168 by 96 px tiles (136 by 80 on a phone), the list twice, a CSS
animation of 3.4 s per tile (44.2 s for thirteen) translating exactly one copy so the loop is seamless, paused on hover or
focus, edges faded with a mask. Under reduced motion the component renders the static centered rows of the fourteenth
revision. Images are eager so tiles never slide in blank. Measured in Chromium and WebKit at 1440 and 390: strip below the
case row; track moves about 38 px in 0.7 s; every tile white; 0 px spill; no horizontal overflow; reduced motion gives 7-6
and 3-3-3-2-2. Tests: strip below the cases, track moving, paused on hover, no light-tone tile and every tile white,
reduced-motion rows. Concept 06 and hub tests 48 passed; full local suite 280 passed, 0 failed.
Deployed with the fourteenth revision: commits 43d16fa and 8cb1f1e, Pages run 41144093330 (success, 4:23 PM). Measured live:
the Concept 06 bundle (bold-hmsrUtOz.js) matches the local build and carries the looping track, the four new or recolored
logo files serve, the live Aspire SVG has no white fill left; full suite against the live site in all four browsers:
280 passed, 0 failed. Lighthouse was not rerun for this revision.

## Revision October 30, 2026 (fourteenth): two more schools in the strip

Morgan Autism Center and Visions In Education added at the project owner's request: both from the header vector on the
school's own site (Webflow `logo-vector.svg`; `1999-Logo-HORZ-02.svg`). The Visions SVG carries "Est. 1999" as live Arial
text, so it was rendered in Chromium at 8x (2304 px, transparent) and the strip uses that PNG; the Morgan vector has no
live text and is used as is. Both measure dark (0.29, 0.45) and sit on white. Thirteen is prime, so the strip now takes its
column count from the component (`columns()` in `App.tsx`: the first candidate that divides the count, else the first
that leaves no lone tile, else the first with the CSS fix that widens the last two tiles to one column fewer, with their
logos capped to the normal column size). Measured in Chromium and WebKit: rows 7-6 at 1440, 5-5-3 at 1024, 3-3-3-2-2 at
390; 0 px spill for every logo; no horizontal overflow; the widened phone tiles show their logos at 99 px wide against
87 px for their neighbors. Test: thirteen tiles, rows summing to thirteen, last row above one, rows never widening
downward. Full local suite: 280 passed, 0 failed. Hub: Version 3.2.

## Revision October 30, 2026 (thirteenth): "Schools we've worked with" strip

Eleven school logos (the brand owner's full list) in one tile each, inside the Work section above the case cards.
`scripts/client-logos.mjs` trims each source, fits it in a 520 by 240 box (2x of the tile), writes png and webp (SVGs are
copied as is: Aspire, Envision, Friendship have no live text), and measures the mean luminance of the opaque pixels; a
mark above 0.72 is marked light and gets the blue-ink tile. Measured: Aspire 0.77 and Education for Change 0.87 light,
Sherman Thomas 0.71 (white panel with a green border, fine on white), the rest 0.15 to 0.59. Three cuts: the first wrapped
5-5-1 on desktop and 2-2-2-2-2-1 on a phone (lone tiles), now 6-5 from 1200 px, 4-4-3 on a tablet, 3-3-3-2 on a phone;
the second let tall logos spill out of their tiles (a percentage max-height does not resolve inside a grid tile with an
inline picture wrapper), fixed with a flex tile, `picture { display: contents }` and overflow hidden; the third measured 0 px
spill for every logo in Chromium and WebKit at 1440, 1024 and 390, no horizontal overflow. Smallest rendered logo: Alpha
at 61 by 69 px on a tablet (a vertical lockup). Tests: eleven logos, every image loaded, every alt a school name, light
marks on a non-white tile, zero spill. Full local suite before the spill fix: 280 passed; Concept 06 and hub tests after
it: 48 passed, 0 failed. Hub: Version 3.1 with a "Reviews of Version 3" round.
Deployed the same afternoon: commit 764af56, Pages run 41138893514 (success). Measured live: all nineteen logo files
under assets/clients serve, the live Concept 06 bundle (bold-D1XnyESd.js) matches the local build and carries the strip;
full suite against the live site in all four browsers: 280 passed, 0 failed. Lighthouse was not rerun for this revision.

## Revision October 30, 2026 (twelfth): team rows balanced

The project owner saw a lone ninth tile starting the second team row (at the 1320 px content width the auto-fill grid
gave 8 and 1). The grid is now a centered flex wrap with fixed column bases: 5 over 4 from 1000 px up, 3 by 3 below,
the photo shrinking to the column on a phone. First cut set the column width as a cap instead of a basis and still wrapped
8 and 1 (flex breaks lines on the basis); second cut kept pairs on a phone, which left a centered lone tile and failed
the new assertion; third cut is 3 by 3 everywhere under 1000 px. Measured rows: 5/4 at 1440, 1280 and 1024; 3/3/3 at
768, 390 and 360; no horizontal overflow. Concept 06 tests locally: 28 passed. Deployed on the project owner's go
(commit 5800556, Pages run 41088915185 success, 9:20 AM Pacific); live rows re-measured the same; full live suite
280 passed, 0 failed.

Also checked on the project owner's report that the work-image hover motion was lost: the live case-card zoom (1.04)
and reel enlarge (1.45) measured working in Chromium and WebKit after both a skipped and a finished opener, and the
motion CSS is byte-identical to Version 2. Not reproduced; Concept 06a never had the reel hover (a round 2 feature).

## Revision October 29, 2026 (eleventh): Concepts 06a and 06b frozen for comparison

Frozen builds of commits b2d0581 (06a, Version 1) and e83e62d (06b, Version 2) from detached worktrees, `VITE_REVIEW_MODE=false`,
base `/fsm-concepts/6a/` and `/6b/`; `bold/`, `static/` and `assets/` copied into `public/`, every page stamped with a
frozen-version banner linking to the current page. First copy missed the hashed `static/` bundles (the pages reference
`static/`, not `assets/`); rebuilt and verified every script path resolves. Test: hub links to both; each serves one H1,
the banner, no review ribbon or pill, first image loads, no console errors other than canceled requests.

Deployed on the project owner's go the morning of October 30 (commit 4804212, Pages run 41063717385 success, 6:31 AM
Pacific). Live: the hub, the current page, `6a/bold/` and `6b/bold/` all answer 200; both banners present; the 06a hashed
bundle resolves. Live suite: 275 passed, 5 failed. Three of the five were the new test asserting the first image loaded
synchronously after `load`, before the logo had finished downloading over the network (it was `complete` with a 1600 px
width three seconds later); the assertion now polls up to 15 s. One was the reel hover scale read at 1 on Chromium
desktop (a timing read, passes on rerun), one a GitHub Pages 503 on the Visible page. Live rerun of those three tests in
all four browsers: 60 passed, 0 failed. This run also covers the tenth revision's content, live since the evening before.

## Revision October 29, 2026 (tenth): hero back on kit blue, roster from the brand owner

From the Version 2 reviews by email. Hero: the round-2 green field (kit green darkened to #1a7f54, not a guide color) is
replaced by Version 1's kit-blue field with the one photo kept; the hero button returns to the kit-green primary on blue.
Team: Jesse, Sunny Kim and Alec Gossage removed; Pat Angeles added in Alec's place. Her headshot is the 512 px inline image
from the brand owner's email, subject lifted with macOS Vision and framed to the set (subject top about 30 px, bottom on the
frame edge, 360 px square, png and webp). Her title was not in the note; "Studio Administrator" is her own email signature, marked to confirm. Team count asserted at
nine on the Concept 05 and 06 pages. Hub: Version 3, with a "Reviews of Version 2, October 29" round.

Deployed on the project owner's go (commit f93680f, Pages run 40995285217 success, 8:04 PM Pacific). The live suite for
this revision ran the next morning together with the eleventh; see that entry.

## Revision October 29, 2026 (ninth): the statement slide is gone from the opener (not deployed)

The project owner, on the cache-free link: the headline "Make your school the one families remember." appears in the
animation. It did, as the opener's own statement slide, and then again as the hero H1 the moment the page appeared. The slide
is removed; the opener is the logo animation and the landing, 3.5 s, and the page's H1 is the statement. The landing's
measured offset against the header logo stays 0 px. Test duration updated.

The mark then grew to fill the space the statement left: about 82 percent of the width on desktop and laptop, 83 on a
390 px phone, 88 on a 360 px phone, measured with at least 16 px clear each side and no horizontal overflow; the first cut
ran to 4 px from the phone edge and was trimmed. Landing offset against the header logo: 0 px on all four. Local suite
after the change: 276 passed, 0 failed.

Deployed on the project owner's go (commits d77d567 and e83e62d, Pages run 40948065846 success). Live suite afterward:
273 passed, 3 failed, all network: one image request reported `cancelled` while the opener test navigated away (WebKit
desktop), and two Concept 05 case pages that did not finish loading on WebKit mobile. Live rerun of those three tests in
all browsers: 12 passed, 0 failed.

## Revision October 29, 2026 (eighth): nothing above the page until the mark lands (not deployed)

The project owner still saw "the header in the animation" after the seventh revision. Measured live in Chromium and WebKit: the
site header was at opacity 0 for the whole play, but the review ribbon above it (the "Current direction" strip, review-only
chrome) and the review pill were never hidden, so the ribbon showed through as the white field dissolved, before the mark had
landed. On a phone it is a tall dark bar and reads as a header. Now the header, ribbon and pill all wait and fade in together
by a GSAP tween once the mark has landed (a tween, not a class flip, so a seek shows the frame a viewer gets; the CSS
transition on the header is gone, so it snaps to hidden under the white field at mount instead of racing a fade).

Second defect found while measuring the landing: on desktop and tablet the landed mark sat 17 to 25 px left of the header
logo. The target was measured when the timeline was built, before the brand font had loaded; the wider fallback wordmark
shifted the centered mark. The landing tween now uses function-based values, measured when it first renders, and aims the
svg itself rather than its box. Landed mark versus header logo on desktop, phone and tablet: 0 px in x, y and height.

Tests: the ribbon is asserted hidden during play and visible after, alongside the header. Local suite: 276 passed, 0 failed.
Deployed on the project owner's go (commit 9be3fae, Pages run 40945183822 success). Live suite afterward, exit code read directly: 276 passed, 0 failed (3.7 min).

## Revision October 29, 2026 (seventh): the opener lands on the header logo (branch of main, not deployed)

On the project owner's note that the logo appeared twice (big in the opener, then again in the header), the opener now opens
larger (about 60 percent of the viewport) and ends with the mark and wordmark gliding into the header's logo position while
the statement fades, the white field dissolving only once the mark is most of the way there, and the header fading in around
the logo that just landed. 4.0 s. Two defects caught in the frame strip before any deploy: the enlarged wordmark wrapped
mid-word on desktop (now `white-space: nowrap`, size trimmed), and the first cut dissolved the field before the mark had
moved, leaving the big mark over the hero text (resequenced: travel first, then dissolve). Test: the header is at opacity 0
while the opener plays and back at 1 once it ends.

Deployed on the project owner's go (commit 2b56162, Pages run 40940819198 success). Live suite afterward: 271 passed, 5 failed.
Four were the opener test in every browser: the header's opacity read 0.69 at the instant the test sampled it, mid-way through
its 0.4 s fade under the white field, so the assertion was racing a transition the viewer cannot see. The assertion now retries
(`toHaveCSS`). The fifth was `read ETIMEDOUT` fetching the Concept 05 Friendship case page, the same network shape as the
earlier timeouts today. Live rerun of those five tests in all browsers after the fix: 8 passed, 0 failed.

## Revision October 29, 2026 (sixth): replay the opener on every load during review; the hero photograph

Two changes on the project owner's word after Version 2 went live, deployed together. The opener replays on every load while
the site is in review (`REPLAY_EVERY_LOAD` in `Opener.tsx`; he refreshed, saw nothing, and reviewers would read that as broken);
at launch the flag goes to false and the opener plays once per session as the brief specified. The hero photograph is now the one
he chose from filmtwist.com (four students on school steps; `public/assets/site/hero-school-steps-*`, a new `site` section in
`scripts/optimize-assets.mjs` and `siteMedia()` in `media.ts`), with no caption since it is not a case-study asset; the Aspire
chalk-numeral still and its caption are gone. Playwright: 276 passed, 0 failed before the push (commit `df7ac85`). Against the live site afterward: 272 passed, 4 failed,
all four `page.goto` network timeouts (`net::ERR_TIMED_OUT`) on one Chromium worker reaching pages untouched by this change
(the envision case page, Concept 01); the same four passed on an immediate live rerun. Posters for the page and the hub regenerated.

## Revision October 29, 2026 (fifth): Concept 06 round 2, the opener

Deployed to GitHub Pages on October 29, 2026 on the project owner's go (commit `bfdf75d`, run 40934439541). The full suite was
rerun against the live site (`PW_BASE_URL=https://noahbra.github.io/fsm-concepts/`): 276 passed, 0 failed (3.5 min).

Built on the `concept-06-round-2` branch after the two October 29 reviews of Version 1 (hub form: "mostly" resolves from both;
the opener still busy; a logo animation then a statement then the page; more green; the hero thumbnails; the stale staff list;
the reel's cropped creatives). The opener and hero were shown to the project owner as frame strips and captures before the rest
was built.

- Opener (`src/concepts/bold/Opener.tsx`): FilmTwist's own module-video intro rebuilt for the web from the emblem's two SVG
  paths. A kit-blue dot bounces three arcs, morphs into the hand (GSAP MorphSVG, free in gsap 3.13 and later), the leaves grow
  from the stem, the wordmark rises letter by letter, the H1 line appears, the field slides up off the rendered page. 3.9 s.
  Once per session (`sessionStorage`), any wheel, touch, pointer or key skips, none under reduced motion, `aria-hidden`; the page
  (H1, sections, form) is in the document from the first paint.
- Hero: the three-panel collage replaced by one campaign photograph beside the statement on a deep kit-green field (#1a7f54 to
  the green ink; white body text above 4.5:1), white primary button. The photograph is preloaded with `fetchpriority="high"`.
- Reel: every creative shown whole at its own proportion (no cropping), hover or focus enlarges it in place, click, tap or Enter
  opens the full creative in a native dialog that Escape, Close or the backdrop dismisses.
- Hub: Version 2 (October 29) with a "Reviews of Version 1, October 29" round at the top of the checklist (six items; the staff
  roster is the one not done, pending the client).
- Playwright: 276 passed, 0 failed (2.8 min), four projects. New: the opener test (plays once over a rendered page, flag set,
  reload shows none, a key skips, reduced motion shows none) and the reel test (every tile's proportion within 3% of the asset's,
  hover scale above 1.3, dialog opens and closes two ways); every other test starts past the opener through a `beforeEach`.
  An earlier run showed eight failures: the reel test read `naturalWidth` of lazy, undecoded images (now the asset's declared
  size), and three webkit page loads and one opener run that failed while Lighthouse and a capture script ran on the same
  machine at the same time; all pass alone and in the clean rerun.
- Defects found and fixed during the build: the statement fell back to a serif (the display font variable was not scoped to the
  overlay); the bounce stalled at its first apex in Chromium when written as a GSAP keyframes array (now sequential tweens);
  the seek hook returned the GSAP timeline, which `page.evaluate` tried to serialize and crashed the renderer (now returns
  nothing); reel captions widened their tiles (the caption no longer sizes the tile); a width cap letterboxed wide creatives
  (cap removed).
- Lighthouse 13 (mobile, simulated throttling) on the production build: `/bold/` with the opener 91 / 100 / 100 / 63, LCP 3.4 s,
  TBT 0 ms, CLS 0; `/bold/?opener=0` 92 / 100 / 100 / 63, LCP 3.3 s, FCP 0.9 s. The LCP element is now the hero photograph
  (Version 1's was the headline text at 0.9 s); the observed render delay is 124 ms and the 3.3 s is the throttling model's
  estimate for an image LCP. SEO 63 is the deliberate `noindex` alone.
- Posters: `bold-*.webp` and the hub's regenerated (the page and the card changed); other pages' posters regenerated and reverted.

## Revision October 28, 2026 (fourth): Concept 06, the current direction

Deployed to GitHub Pages on October 28, 2026 on the project owner's go (commit `b2d0581`, run 40799727233). The full suite was
rerun against the live site (`PW_BASE_URL=https://noahbra.github.io/fsm-concepts/`): 268 passed, 0 failed (2.6 min).

Built on the `concept-06-bold` branch per `CONCEPT_06_BRIEF.md` after the decision maker's October 28 review of Concept 05
(drop the opening video; too far from Concept 02; too plain). The branch waited for the project owner's go because the hub link is in the
client's hands. Step 1 (hero and reel) was shown to him before steps 2 and 3 were built.

- New pages: `/bold/` and `/bold/work/{aspire,friendship,envision}/`, Concept 02's page forked to `src/concepts/bold/` with
  kit-blue surfaces, kit-green accent, Archivo display over Josefin Sans text, a three-panel collage, the Concept 02 reel,
  Concept 05's five service tiles, three case cards opening case pages in this chrome, the eleven team cut-outs, Concept
  02's four steps trimmed to 58 words, and the FSM form on the final call. No story, no results section, no ledger.
  Concepts 01 to 05 are byte-identical to `main` (`git diff main` over their directories is empty).
- Hub: a "The current direction" section (`#current`) above the merged direction, with its own feedback model and storage
  key (`fsm-review-current-v1`), five fields added to the feedback form on October 28 (`fields.current`), and a "What
  Version 1 addresses" checklist (13 items, no names). Concept 05 is labeled "Version 2.1, superseded" and keeps its form.
- Playwright: 268 passed, 0 failed (2.5 min), four projects. New: the four Concept 06 pages in the page loop; a Concept 06
  test asserting one H1, the section order (reel, services, work, team, partner, contact), no figure above the case cards
  (every two-or-more-digit run before `#work`, "K-12" excepted), no service line over 20 words, three case links that resolve,
  eleven team members, the form present, the review chrome pointing at `#current`, and the reduced-motion page with the
  static reel and every photo at full opacity; the Concept 06 case pages with the same assertions as Concept 05's; the FSM
  form test now runs on both `/visible/` and `/bold/`; a current-direction feedback test asserting only the five new fields
  plus reviewer, time and page are posted, never the merged or four-concept answers, and that both saved states survive a reload.
- Defects found and fixed during the build: the case page head widened past a phone viewport (the facts list's auto-fit
  columns sized the head's grid column intrinsically; fixed with `minmax(0, 1fr)` and `min-width: 0`); at 390px the metrics
  tiles went to two columns and "$31.21" at the display size overflowed its tile by 4px on the friendship page (the first full
  run failed that page's overflow test in all four projects; the figure now scales with the viewport and wraps if it must).
- Lighthouse 13 (mobile, simulated throttling, headless Chrome) on the production build: `/bold/` Performance 100,
  Accessibility 100, Best Practices 100, SEO 63, LCP 0.9 s, TBT 10 ms, CLS 0.022; `/bold/work/friendship/` 90 / 100 / 100 / 63,
  LCP 3.6 s, TBT 0 ms, CLS 0.045. SEO is 63 for the documented reason only (`noindex`). Raw JSON in `docs/lighthouse/bold-*.json`.
- Posters and OG images: `bold-desktop.webp`, `bold-mobile.webp`, `og/bold.png` added; the hub's regenerated because its page
  changed. Other pages' posters were regenerated and reverted (capture noise, no code change).

## Revision October 28, 2026 (third): Concept 05 Version 2.1

Deployed to GitHub Pages on October 28, 2026 (commit `0ff29d0`, run 40768763430). The full suite was rerun against the live site
(`PW_BASE_URL=https://noahbra.github.io/fsm-concepts/`): 196 passed, 0 failed (1.9 min). Noah's review of Version 2 live
asked for five changes (recorded in `CONCEPT_05_BRIEF.md`, "Round 3 decisions"): an FSM-branded form instead of the embedded
FilmTwist frame; the brand rising on the first scroll with the tagline dissolving and the dot dropping from the period;
a revised tagline; the school scrolling up and the dot rejoining the logo at the end; the school's windows corrected and
every object in the scene checked for orientation. All five are built.

- The contact form is now a native form (`FsmForm.tsx`) that posts the LeadConnector widget's own multipart payload to
  `backend.leadconnectorhq.com/forms/submit`. A new test routes that endpoint and asserts: an empty form posts nothing; a
  500 keeps every answer and shows the error line; a 200 shows the thank-you; the URL carries the form and location ids;
  the `formData` part carries the field tags, the selected service and the consent flag. No real submission was made
  (this site makes none); one real submission is the remaining proof that a lead lands in FilmTwist's account.
- With the iframe gone, `/visible/` loads no third-party script, sets no cookie and reaches network idle again. The
  third-party request and console filters in the test helpers remain for the `'embed'` fallback.
- Story timeline: the opening (0 to 13) and ending (90 to 100) were rewritten; beats 13 to 90 are untouched. Frames
  captured at 0, 1, 2, 3, 4.5, 6, 8, 10, 12 and 14 percent and at 90 to 100 percent on 1440x900 and 375x667 confirm the
  brand moves on the first step, the H1 is gone by 3 percent, the dot lands by about 9 percent, the town has cleared the
  viewport before the logo reconstitutes, and the dot sits as the period on the final frame.
- Follow-up (same day): the town now scrolls up from below the viewport into position during the opening (yPercent 100 to 0
  over timeline 0 to 6.5) instead of fading in; frames at 0 to 14 percent on both viewports confirm it is settled before the dot
  lands at about 7 percent.
- Town scene: the school's right-hand windows were generated by a formula (`3498 + c * 66 - 66`) that placed the last window
  42 units past the wall at x 3780; both groups are now explicit, mirrored about the door, with the lit-window overlay
  using the same positions. The clock and "SCHOOL" label moved up 6 to 7 units so they clear the roof trim. Every other
  object's coordinates were checked against the ground line and its neighbors; none needed a change.
- Playwright: 196 passed, 0 failed (2.1 min), four projects. The H1 assertion and the OG title follow the new tagline;
  the hub checklist gains a "Project review of Version 2" round. Lighthouse was not rerun for this revision.

## Revision October 28, 2026 (second): Concept 05 Version 2

Deployed to GitHub Pages on October 28, 2026 (merge `2e21858`, run 40759807755). The full suite was rerun against the live site
(`PW_BASE_URL=https://noahbra.github.io/fsm-concepts/`): 192 passed, 0 failed (2.3 min). The hub, `/visible/` and the three case pages return 200.

Noah's review of the Version 1 preview asked for six changes (recorded in `CONCEPT_05_BRIEF.md`, "Round 2 decisions"):
equal service tiles with icons; case studies as pages on this site; cut-out team photos; a work-with-us form wired to
FilmTwist's form system; headings in FSM colors; a feedback-addressed checklist on the hub. All six are built.

- New routes: `visible/work/aspire/`, `visible/work/friendship/`, `visible/work/envision/` (Vite inputs added). The four
  originals are still byte-identical to `main`.
- The contact form is FilmTwist's LeadConnector "RFI Contact Form", embedded as filmtwist.com/contact embeds it. No test
  submission was made; the wiring is verified by the iframe source and form id, and by the frame rendering FilmTwist's live
  form (fields, consent text, Turnstile) in the preview. Its frame never reaches network idle and logs its own captcha
  messages, so the test helpers now attribute third-party frame requests and Content Security Policy messages to the third party.
- Playwright: 192 passed, 0 failed (2.0 min), four projects. Added: three case-page tests and assertions for the five equal
  tiles, eleven team photos, the embedded form and the hub checklist. Defects found and fixed during this QA: case-page header
  overflow at 375px (a grid column sized to content); uneven team cells when a role wraps; rating radios sit under their
  styled labels, so the hub tests now click the label as a reviewer does (the earlier forced clicks had masked this).
- Lighthouse 13, same flags as the first Concept 05 run, October 28, 2026, `/visible/`: Performance 93, Accessibility 100,
  Best practices 77, SEO 63, LCP 3.1 s, TBT 130 ms, CLS 0. Best practices fell from 100 to 77 on two audits
  (`third-party-cookies`, `inspector-issues`), both raised by the embedded LeadConnector form and its Cloudflare Turnstile;
  consent language before launch is listed in `PRODUCTION_HANDOFF.md`. SEO is the `noindex` reason below.

## Revision October 28, 2026: Concept 05, the merged direction

Built from the October 27 reviewer feedback to `docs/CONCEPT_05_BRIEF.md` (v4, approved by Noah before the build). `src/concepts/visible/`
is a fork of Concept 03's story code; the four originals are byte-identical to `main` (`git diff --quiet main -- src/concepts/{clean,creative,story,original}` passes).
The hub gained a "merged direction" card above the four originals and a separate feedback model for it
(`fsm-review-merged-v1`, its own six Google Form fields), so a merged send never re-posts the four-concept ratings.

- Typecheck and production build: PASS.
- Playwright: three tests added (Concept 05 first frame, skip, sections, cards, chrome, reduced motion; Concept 05 phone CTA bar;
  merged feedback isolation). Full suite after the build: 144 passed, 0 failed (1.5 min), four projects.
- Defects found and fixed during this QA: the hub card count assertion (8 to 10 images); the reduced-motion test built its URL
  relative to the story page; the merged form read the reviewer's name only at mount (now re-read on arrival at the section and on
  focus); forced radio clicks raced the hub's smooth scroll under suite load (five `check({ force: true })` calls, two of them
  pre-existing, are now plain `check()`, which waits for the element to stop moving); the OG image title ran under the thumbnail
  on every concept (titles now wrap and the thumbnail sits above the text block; all six OG images regenerated).
- Frame review: 12-frame contact sheets of the pinned opener at 1440x900 and 375x667 (`docs/screenshots/concept05-step1-*-frames.png`),
  plus full pages and the seam into the services section, were reviewed before the hub work started.
- Lighthouse 13 (`npx lighthouse@latest`, `--preset=perf --form-factor=mobile --throttling-method=simulate`, headless Chrome),
  October 28, 2026, against the production build on `http://localhost:4173/fsm-concepts/`. Raw JSON in `docs/lighthouse/`.

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 05 /visible/ | 92 | 100 | 100 | 63 | 3.0 s | 150 ms | 0 |
| Hub / (re-measured, same flags) | 100 | 100 | 100 | 63 | 0.9 s | 0 ms | 0.04 |

The brief's targets for Concept 05 were Performance >= 89, Accessibility 100, LCP <= 3.2 s: met. SEO is 63 for the `noindex` reason
given under "Lighthouse" below. The hub's figures differ from the October 26 row because the flags differ (`--preset=perf`); they are
not comparable to that run.

Not done in this revision: a real-device iOS check of the pinned opener, and client confirmation of the three new copy claims
(`docs/CONTENT_AND_CLAIMS.md`, "Concept 05 copy").

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
| 7 | Concept 04 defining interaction works by typing and keyboard | `Concept 04: the worksheet recomputes from the seat input and the slider` (typing 120 seats shows 158 applications; ArrowRight on the slider moves the input to 125; three case studies present) | PASS x4 |
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
| 04 Original | original-desktop-full.png | original-mobile-full.png | Worksheet stacks under the headline; rows go single-column; range labels stay inside the card |

Additional widths checked by the builders during development with the same script: 1920x1080 and 768x1024 (Concept 02), 375x667 (Concepts 02 and 04). The Playwright suite's overflow test runs at 375 and 390 on every page in all four browser projects.

Manual visual inspection: every screenshot above was opened and reviewed (headline wrapping, image crops, contrast on image overlays, overlap between the floating review pill and page content). Fixes made from that review are listed in each concept's rationale and in the defects list above.

## Accessibility

Automated: Lighthouse accessibility category (below); Playwright checks for skip links, focus movement on Skip, `aria-pressed` filters operable by keyboard, radio-group arrow keys, dialog Escape and focus restore, external link labels.

Manual: keyboard walk of each page's primary interactions in Chromium (nav toggle, filters, gallery dialog, worksheet input and sliders, story skip and rewatch, feedback form, review pill). A full screen-reader pass (VoiceOver, NVDA) has NOT been run; it is listed in `PRODUCTION_HANDOFF.md`.

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
| 04 Start With Your Number | https://noahbra.github.io/fsm-concepts/original/ |

The full Playwright suite was also run against the live site (`PW_BASE_URL=https://noahbra.github.io/fsm-concepts/ npx playwright test`): 116 passed, 0 failed. Open Graph images (`/og/*.png`) and hub screenshots resolve on the live site. Deep links and hard refresh work because each concept is a real directory with its own `index.html`.

## Known limitations

- iOS Safari was tested through Playwright WebKit (iPhone 14 emulation), not on a physical iPhone. Concept 03's pinned stage uses `pinSpacing: true` without `normalizeScroll`; a real-device check is recommended before the conference.
- Campaign imagery is FilmTwist-published case-study creative with reuse approval pending; it is labeled as such on every concept.
- No video assets (none approved). Concept 02's "reel" is a thumbnail marquee.
- The tagline lockup in Concept 03 is live text under the official logo because no logo file with the tagline was supplied.
- Feedback is stored per device in localStorage and, on "Send feedback", posted as one entry to the project owner's Google Form (`feedbackForm` in `src/content/config.ts`). The form endpoint has no CORS headers, so the browser cannot read the result; a send is confirmed by the request leaving without a network error. Copy/Download remain as backups. Verified end to end on October 27, 2026: after the form owner removed the sign-in restriction, a direct POST and a real browser send from the live hub both appeared in the form's responses within two seconds.
- The repository and the Pages site are public; the review hub says so and asks reviewers not to add confidential notes.
- Lighthouse performance scores were measured on a developer laptop with simulated throttling, not on a mid-range phone over real 4G.
