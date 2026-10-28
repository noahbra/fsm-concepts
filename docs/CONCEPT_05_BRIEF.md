# Concept 05 design brief: Visible (fourth draft)

Status: APPROVED by the project owner October 28, 2026 and BUILT on branch `concept-05-visible` (`src/concepts/visible/`). This document is the spec the build was checked against; deviations are noted in `docs/QA_REPORT.md`.
Basis: FilmTwist's review of Concepts 01 to 04 on October 27, 2026 (details in the ThirdWay client record, not in this repo), the FSM Brand Guide, and three rounds of pressure testing against the code.
Changes from v3: the merged direction gets its own feedback model, send and form fields (the hub's existing send re-posts every filled concept, so 05 cannot share it); the three promises the code could not keep are replaced (no-JavaScript test, stage-ordered services, the "last 6%" fade); the opening hold is described as a retune, not a parameter; the tagline is the one named contrast exception and text greens move to the ink weights after measurement; the mobile bottom row is resolved; the intro fade and the CTA bar are tied to the same timeline position; the expanding card is specified; the fork drops the class-prefix work and the screenshot assertion becomes a folder-diff check; the handoff doc and claims register gain their Concept 05 entries; the "both reviewers" line is corrected.

## The idea, one sentence

A school families cannot see becomes visible, and everything on the page becomes visible the same way the school does.

## Decisions (the conflicts, and the call on each)

| Conflict | Call | Why, and the fallback |
| --- | --- | --- |
| Headline type: Concept 02's Archivo (liked by the decision maker) vs the kit's Josefin Sans | Josefin Sans | The Brand Guide lists Josefin Sans Light, Regular and Bold and nothing else for the brand. Taste does not outrank the kit. No fallback |
| Body type: Concept 03's Nunito vs the kit | Josefin Sans Regular, 17px minimum, line-height 1.6 | Nunito is not in the kit; the guide's Proxima Nova is for Google Docs only. The density rule keeps body copy to single lines. Fallback if the 375px legibility check fails: Josefin Sans Regular at 18px, never Light |
| The animated story: the decision maker wants it as a pop-up, the brand owner wants it as the opener | Opener. Deepa is overruled on placement | The brand owner rated the story's hero as the brand (brand fit 5 of 5); the decision maker, rating Concept 02, said she liked the story and asked for it as a pop-up. A pop-up hides the one element that tested as the brand behind a click. Shortening the pin and adding a visible skip reduces the cost of the opener; it does not grant the pop-up. Fallback if she holds after seeing the merged page: a one-screen hero (lockup, H1, button) with a "Watch the story" button that opens the story full screen. One day of work, built only on her word |
| Interactivity: Concept 02's collage, marquee and kinetic type vs restraint | One motion system (color-in on reveal, lift on hover, the scroll story) plus one interactive element below the hero: case cards expand in place | The same reviewer who liked 02's interactivity called its graphics busy. The reveal keeps the page alive; the expanding cards give her one thing below the hero to point to, as 02's cards did |
| Service clarity: the opener scored 3 of 5 on clarity | H1 names the offer on screen one; section 2 lists the five services in the client's current order with each service's one-line outcome | Clarity is checked by cut test 2 (cold phone, no scrolling). The service order is a pending client approval and is not changed here |
| Hard numbers up front | None, anywhere | A figure reads as a promise. Case study metrics stay, with their source, pending the client confirmation listed in `docs/CONTENT_AND_CLAIMS.md` |
| The dusk palette vs "bring out our branding" | Bias the quiet palette toward kit tints | The quiet state becomes blue-tint and teal-tint paper rather than gray, so the brand is present before the color arrives |

### Round 2 decisions (Noah, October 28, 2026, on the Version 1 preview)

| Ask | Call | How it is built |
| --- | --- | --- |
| "What we do" cells the same size, as a visual | Five equal tiles, each with a line icon in kit blue on a blue tint | `grid-template-columns: repeat(5, 1fr)` with `grid-auto-rows: 1fr` from 1100px; one column of equal rows below, icon left. Icons are inline SVG in `ServiceIcons.tsx`, no icon font |
| Case studies as pages on this site, not links to filmtwist.com | Three pages at `visible/work/<case>/` built from `content/caseStudies.ts`: facts, hero, every metric with unit and period, the work, campaign creative, a call to the form, previous and next. The published FilmTwist page is cited once at the foot | The card's "Read the case study" link is internal; no card links to filmtwist.com. Cards still expand in place |
| Cut-out team photos for "Who you work with" | Eleven members from filmtwist.com/about, names and roles as published, subjects lifted from the headshots (macOS Vision), on brand-tint discs | `content/team.ts`, `public/assets/team/`. Reuse is a client approval, noted on the page |
| A work-with-us form wired to FilmTwist's form system | FilmTwist's own LeadConnector "RFI Contact Form" (id `DveY4KWgzKqaGiHAAA2e`), embedded exactly as filmtwist.com/contact embeds it. Every call to action on the page now lands on `#contact` | The frame's look (black, agency logo, gold button) is set inside FilmTwist's LeadConnector account and cannot be styled from outside; it also carries Cloudflare Turnstile, so a native FSM-styled form cannot post to it. Ask: FilmTwist duplicates the form in LeadConnector as an "FSM" form (white, kit-blue button, school-specific service options); one config value swaps it in |
| Should headers use FSM colors | Yes. Section headings in the kit blue #3D6EA3 (5.3:1 on white, AA for all sizes); H3 in the measured blue-deep | The story captions keep their own colors |
| A feedback-addressed checklist on the hub | On the hub, under the merged card: each first-round note and each round-2 ask with Done, Partly or Not yet and one line on how, no reviewer names | `mergedChecklist` in `content/concepts.ts` |

## Build rule: fork, do not modify

Concepts 01 to 04 stay live and unchanged for comparison. The new concept lives in `src/concepts/visible/` and copies `TownScene.tsx`, `StoryScroll.tsx`, `StoryStatic.tsx` and `story.css` from `src/concepts/story/`, then changes them there. No class renaming: each concept is its own Vite entry with its own stylesheet, so nothing leaks. The duplicate is acceptable because 01 to 04 are disposable once the direction is chosen.

Files a fifth concept touches, so nothing is forgotten: `visible/index.html` (own title, description and social image), `vite.config.ts` input, the concept id union and card data in `src/content/concepts.ts`, `src/content/config.ts` form field ids, `src/concepts/hub/` (presentation and the new feedback model below), `tests/smoke.spec.ts`, `scripts/og.mjs`, `scripts/screenshots.mjs` (its poster offset is tuned to the 600% pin and needs a value for 350%), `docs/PRODUCTION_HANDOFF.md` (a Concept 05 row), `docs/CONTENT_AND_CLAIMS.md` (the new H1 and section 5 prose).

Invariant check: the build fails if `git diff --quiet main -- src/concepts/clean src/concepts/creative src/concepts/story src/concepts/original` reports a change. Per-browser screenshot diffs are not used; there are no baselines and they are flaky.

## Architecture, one job per section

| # | Section (id) | Job | Content source | Limit |
| --- | --- | --- | --- | --- |
| 1 | The Invisible School, hero (`#top`) | Say what FSM does on screen one, then make the promise felt | Forked story code, modified as specified below | First frame per the contract below. Pin 350%. Five beats kept |
| 2 | What we do (`#services`) | Name the five services in ten seconds | `content/services.ts` in source order; the line is each service's `outcome` field | 1 heading, 5 items, no paragraphs, no stage labels |
| 3 | Schools that got seen (`#work`) | Prove it | `content/caseStudies.ts`, three campaigns, photo-led, one headline metric each with its source. Click expands the card in place to its `summary` and `story` lines; no modal, no route change | 1 heading, 3 cards. Rights note as a caption under the photo, not a badge on it |
| 4 | Who you work with (`#team`) | Earn trust: a real agency, real people, real schools | FilmTwist attribution per `CONTENT_AND_CLAIMS.md`; the three partner schools by name in text; a team line supplied by the client | 1 heading, under 60 words. No lorem, no placeholder copy |
| 5 | The first conversation (`#contact`) | Lower the threshold | What a discovery call covers and what to bring, in prose. No figures, no estimate | 1 heading, under 60 words, one button |
| 6 | Footer | Attribution, social, legal placeholders | `content/config.ts` | As the other concepts |

Copy rule: "Let's fill your school." appears once, as the hero's closing line, in both the scroll and the static versions. Section 5 has its own heading. The screen-reader description of the story is rewritten to match the new final frame. The H1 and the section 5 prose are new copy and are registered in `CONTENT_AND_CLAIMS.md` as claims to confirm.

## The first frame, exactly

- **Layers.** The lockup wrapper keeps its pointer-events-off behavior for the period-dot measurement. The H1, button and skip link sit in an intro layer inside the same centered grid as the lockup, directly below it, with pointer events on. It fades on the lockup's timeline position (7) as its own tween. While faded, the intro layer is `inert` so nothing invisible can take focus.
- **H1.** Names the offer, no sentiment, no numbers. Working line: "Ads, video and landing pages that bring families to your school." The page has exactly one H1 and it is here.
- **Button.** Primary, kit blue, same destination as the other concepts.
- **Skip.** One visible control: the text link "Skip the story" in the intro layer, target `#services`. The existing skip pill is removed. The screen-reader skip link stays (invisible until focused; an accessibility control, not a second button).
- **Mobile, 375 by 667.** Stacked logo at 26vh, maximum 165px wide; tagline; H1 on two lines at most; button; skip link; scroll cue. The sticky header is accounted for with top padding on the pin. The pause pill is hidden below 700px. The scroll cue hides at the same moment the CTA bar appears.
- **Pin and beats.** Pin shortened from 600% to 350%. The pin length is one parameter, but the timeline positions are literals, so restoring the opening hold to about half a viewport (14 units at 350%) means offsetting every later position by 8 and compressing the ending. This is a retune, verified by `scripts/frames.mjs` at 12 positions: every beat legible for at least one frame, and the ending (world fade, character return, final block) still reads.
- **Final frame.** Heading "Let's fill your school.", one line, primary button, Rewatch as a text link inside the frame. The second button is removed. The frame's controls are `inert` until the frame is visible.
- **Quiet palette** biased toward `--fsm-blue-tint` and `--fsm-teal-tint`; the color journey unchanged.
- **Colors.** The forked stylesheet's off-token hex values are mapped: eyebrow to `--fsm-teal-deep`, hover to `--fsm-green-ink`, caption gray to `--s-muted`, button to kit blue. No new CSS introduces a hex value outside `tokens.css`.
- **Reduced motion.** The static version serves it, with the same first frame and the same closing line and single button.

## Hero to page handoff (the seam)

- The ending is kept as built: the world fades and exposes the pin's white-to-paper gradient, and the final block arrives. Section 2 opens on `--s-paper`, the color the pin ends on. The page's `--s-bg` arrives at section 3.
- Reveal timing is stated, not borrowed: media enters at `saturate(0.35)` and 0.6 opacity and transitions to full over 600ms, ease-out cubic, when 30% of the element is visible. Text never enters dimmed.
- One illustrated mark from the hero, the tagline's period dot in kit teal, recurs as the device before every section eyebrow. Eyebrow text is `--s-muted`, so there is one teal per heading, not two. The only illustration below the hero.
- Nothing else sits on the seam: no Rewatch outside the pin, no divider.

## Header and calls to action

- Sticky header on every viewport: brand lockup and links Services, Work, Team, Contact. The header's primary button shows at 700px and up only.
- Below 700px, a bottom CTA bar (Concept 01's pattern, same 700px breakpoint) appears at timeline position 7, the moment the intro layer's button fades, and hides over the footer. It is offset from the review pill as 01's is. One primary button is visible per viewport, never two, and never a gap between them.
- Mobile bottom row at 375px holds the CTA bar and the review pill only. The pause pill is hidden below 700px and the scroll cue hides when the bar appears.
- Button colors: primary is kit blue `--fsm-blue` with white text (5.3 to 1); ghost is ink outline. The primary button is the only kit-blue fill in sections 2 to 5.
- Destination: unchanged from the other concepts (`consultationUrl`, the public FilmTwist consulting page) until the client approves a booking link. Flagged in `CONTENT_AND_CLAIMS.md`; not resolved by this build.

## Visual spec

- **Type.** Josefin Sans only: Bold for headings, Regular for body, Bold uppercase with tracking for eyebrows. Scale from the forked stylesheet (h2 `clamp(1.9rem, 1.2rem + 2.6vw, 3rem)`).
- **Color, two tiers, measured.** Kit hex for fills, buttons, marks and large graphic shapes. Text uses only shades that measure at least 4.5 to 1 on both white and `--s-paper`: `--fsm-blue-deep` (8.1 and 7.5), `--fsm-green-ink` (6.5 and 6.1), `--s-muted` (5.8 and 5.4), ink. Shades that fail and are therefore not text: kit green 2.6, kit teal 3.0, bright green 2.1, `--fsm-green-deep` 4.3 on white, `--fsm-teal-deep` 4.4 on paper. Metrics are `--fsm-green-ink`. One accent per section: the teal period dot before eyebrows, ink-green metrics, the blue button. Every section has one brand-colored element the eye lands on first.
- **The one exception.** The hero tagline "grow your own." stays kit teal at weight 400 (3.0 to 1) because it is part of the brand lockup as the client's own guide renders it. It is live text, so assistive technology reads it regardless of contrast; the exception is visual only. No other text is exempt.
- **Surfaces.** One paper card, radius `--s-radius`, one soft shadow. The only container on the page.
- **Photography.** Campaign photography only, 4:3, full color once revealed, no text on photos, no decorative graphics beside them. Weak thumbnails get a different frame from the same campaign set. Rights note as a caption.
- **Motion.** As stated in the handoff: media only, 600ms, ease-out cubic, once. Cards lift 4px on hover and expand in place on click. Nothing moves under `prefers-reduced-motion`, and no pre-state is applied there.

## Accessibility and robustness

- Full color is the default. The dimmed pre-state is applied only by a class the script adds once the observer exists; if the observer never fires or the class is never added, the page is a normal page. (The routes are client-rendered, so "no JavaScript" is not a state this site has; the guarantee is about the reveal script, not the app.)
- Text is never dimmed. Only photos and the hero's illustration carry the pre-state.
- Reduced motion: no pre-state, no scroll story, same content and the same single H1.
- Keyboard path: the screen-reader skip link, then the intro layer's button and skip link, then the sections. Hidden frames and controls are `inert`.
- Hero LCP budget: at or under 3.2 seconds on Lighthouse's simulated slow 4G (Concept 03's current figure). The LCP element stays the logo. Removing Nunito saves one font file.

## Density rule

Per section: one heading, one intro sentence of 25 words or fewer, five items at most, each one line. If a thought needs a paragraph, it belongs inside an expanded card.

## Content to obtain before build

- **Team line**, drafted from FilmTwist's own published copy and sent to the client to confirm rather than write. Sources, pulled October 28, 2026: filmtwist.com/about ("Creative Experts Since 2010"; "We partner with education organizations and mission-driven brands"; the team roster with names and roles, led by Deepa Pathak, Managing Director and Owner), filmtwist.com/consulting ("With over a decade of experience supporting schools with their digital marketing needs"), filmtwist.com/k-12-student-recruitment (school clients listed: Alder Graduate School of Education, Envision Education, Aspire Public Schools, Friendship PCS). Scope rule from the project owner (October 28, 2026): the line speaks only to K-12 schools, and Full School Marketing dates from 2020 (FilmTwist's 2010 date is the agency's, not FSM's). Alder Graduate School of Education is therefore not used as a school name; the three K-12 campaigns stand. Working line, 33 words, built only from the client's own published phrases plus connective words: "Full School Marketing is Filmtwist Creative Agency's K-12 student recruitment practice, started in 2020. We help schools grow their own. Our team covers strategy, design, photography, video, websites and paid advertising." Source map: "Filmtwist Creative Agency" and "K-12 Student Recruitment" are the agency's name and its own service name (filmtwist.com navigation); "started in 2020" is the project owner's ruling, to confirm with the client; "We help schools grow their own." is the FSM Brand Guide's mission line, verbatim; the six team nouns map one to one onto roles on filmtwist.com/about (Marketing Manager and Managing Director for strategy, Senior Designer, Senior Photographer, Senior Videographer, Website Specialist, PPC Manager). Connective words only: "is," "practice," "Our team covers." Nothing else is invented. Registered in `CONTENT_AND_CLAIMS.md` as a claim to confirm (the practice framing, "started in 2020", and which team members to name, if any). FilmTwist's home-page figures (satisfied clients, projects, leads generated, average ROI) are not used: the ROI rule in the claims register and the reviewers' "no numbers" objection both exclude them. No office location is asserted; the site does not state one. If confirmation has not arrived at review time, section 4 ships with the attribution and the school names only, and the hub's merged-direction note says the team line is pending.
- **School names in text** need no new approval. School logos would, and are not used.

## Review presentation and the merged-feedback model

- The hub presents Concept 05 above the four originals as "The merged direction," not as a fifth equal card, so the reviewers are not asked to vote five ways. Hub intro, the "four" strings in the hub copy, the smoke test and the social image script are updated.
- **Own model, own send.** The hub's existing send posts every filled concept from saved state on each click, which would resubmit a reviewer's October 27 ratings as a new row. Concept 05 therefore gets its own type (resolves: yes, mostly, no; notes; and three targeted asks: fonts, story length, team section), its own storage key, its own "Send" that posts only the reviewer name, timestamp, page and the merged fields plus its own Markdown, and its own form fields. The four-concept send is unchanged.
- The Google Form gains the matching fields (edited outside the repo); `config.ts` gains their entry ids. The hub screenshot and the route's social image are regenerated.
- The two rights-pending indicators (photo caption, consultation destination) stay visible because this is a review build; the merged-direction note says so in one line.

## Build order and the gate

1. Fork the story code, retune the pin to 350%, build the first frame and final frame. Produce 12 frames. **Show Noah before continuing.**
2. Sections 2 to 6 on the forked visual language. Full-page frames at desktop and 375px.
3. Seam and reveal. Cut tests 1 to 7.
4. Hub presentation, merged-feedback model, form fields, Playwright, Lighthouse, prose scan, handoff and claims entries.
5. **Nothing deploys without Noah's review.** The hub link is already in FilmTwist's hands, and a push to main publishes immediately, so the work happens on a branch with a local preview, and merges only after Noah has seen it.

## Cut tests, before anything is called done

1. Frame the whole page at 12 scroll positions. The pin-release frame is the one that matters: same type, same paper, same reveal on both sides of it.
2. Load the page cold on a phone. Can you say what FSM does without scrolling? If not, the H1 line failed.
3. Name each section's parent concept. If you can, redesign it.
4. Count brand-colored elements per section on desktop. Exactly one dominant.
5. Read every line in Josefin Sans on a 375px screen. If body copy strains, apply the 18px fallback before changing anything else.
6. Block the reveal script (remove the pre-state class hook). The page is fully visible and readable.
7. Tab through the page from the top. No focus lands on anything invisible.

## Success metrics (production, not the review site)

The review site carries no analytics by rule. For production, the client's analytics should report: primary button click rate, share of visitors who reach section 2, skip-the-story rate, scroll depth to section 5, and card-expand rate. Targets are set with the client after launch.

## What this build is not (production path)

A static Vite build on GitHub Pages under a base path, with content in TypeScript files. No CMS, no domain, no analytics, no form backend, booking link unapproved, legal text blank, review chrome switchable off by environment variable. Production hosting, domain, CMS or editing workflow, analytics, booking and legal copy are a separate scope, documented in `docs/PRODUCTION_HANDOFF.md`, which gains a Concept 05 row saying that promoting 05 means promoting the fork and retiring `story/`.

## Verification

Full Playwright suite with the new route in all four browser projects, the merged-direction presentation, the merged-feedback send (intercepted, asserting it posts only its own fields), and the folder-diff invariant on the four existing concepts. Lighthouse mobile: performance at or above 89, accessibility 100, hero LCP at or under 3.2 seconds. One H1. Prose scan on all copy. Nothing in `docs/CONTENT_AND_CLAIMS.md` is approved by this build; the open approvals list applies unchanged, plus the two new entries.

## Out of scope

No worksheet or calculator, no figures beyond the case studies' published metrics, no changes to Concepts 01 to 04, no change to the service order, no new photography, no school logos, no analytics on the review site, no change to the consultation destination, no pop-up variant unless the decision maker asks for it after seeing the merged page.
