# Concept 06 design brief: Bold, rebuilt

Status: approved by the project owner, built on the `concept-06-bold` branch and deployed on his go, October 28, 2026 (steps 1 to 3 below; commit `b2d0581`). Round 2 (the opener, the one-photo green hero, the uncropped reel) deployed on his go October 29, 2026 (commit `bfdf75d`). Live at https://noahbra.github.io/fsm-concepts/bold/.
Basis: the decision maker's October 28 verdict on Concept 05 (drop the opening video, too far from option 2, too plain), her October 27 rating of Concept 02 (preferred, 5 of 5: the fonts, the interactivity; change a few colors to bring out the brand; the graphics are busy, borrow the simplicity of Concept 01's photos), the brand owner's October 27 notes (Concept 02's hero is the only part she liked; too much information after the work; "What we make. What it does." is a wall of text; what we do under the hero, then the case studies; no hard numbers up front), and the project owner's round 2 and 3 asks on Concept 05, which stand. Reviewer names stay out of this repo.

## The idea, one sentence

Concept 02 as the decision maker rated it, with the brand owner's three objections fixed and the Concept 05 pieces the project owner asked for carried over.

## What Concept 06 is not

- Not a fresh concept. It is Concept 02's code forked to `src/concepts/bold/`, with Concepts 01 to 05 left byte-identical.
- No opening story. The story is not an opener, a pop-up or a link on this page. Concept 03 and Concept 05 stay on the hub for the record.
- Not plain. The hero keeps its weight: the display type, the kinetic headline, the collage of real campaign work with the pointer tilt, the marquee reel.

## Decisions (the conflicts, and the call on each)

| Conflict | Call | Why |
| --- | --- | --- |
| Type: Concept 02's Archivo (what the decision maker praised) vs the kit's Josefin Sans (the call in Concept 05, which she read as losing the best of 02) | Archivo for display, Josefin Sans for labels, body and UI | The decision maker is the brand's owner and named the fonts first. The kit face stays everywhere text is read, so the page still reads as the kit. The project owner can reverse this with one token |
| "Bring out the brand" vs Concept 02's near-black surfaces | Kit blue takes over from black: hero, reel and final call in `#3D6EA3` and its deep weight; kit green stays the accent and the button color; teal for secondary chips. The bright lime accent on dark is replaced by kit green on blue | Her one change request on 02 was color. The blue surfaces also answer the brand owner's "does not feel like the FSM brand" |
| Busy graphics vs interactivity | Keep the motion, cut the clutter: three collage panels instead of four, no "Real work" sticker, no numbered case badges, one photo per card | "Borrow the simplicity of 01's photos" is about the frames, not the motion |
| The wall of text after the work | The services ledger is replaced by Concept 05's five equal tiles with icons, one line each | The brand owner's objection, in her words. The tiles are already built and approved |
| Section order | Hero, What we do, Work, Who you work with, How we partner, Work with us | The brand owner's order (what we do under the hero, then the case studies). The decision maker did not object to order |
| Numbers | No "Results" section. Each case card carries its one headline metric with the source line; the full metrics live on the case pages | "No hard numbers up front." The decision maker never praised the results tiles |
| Form | Concept 05's FSM form, posting to the FilmTwist form service | Project owner's round 3 call, unchanged |

## Architecture, one job per section

| # | Section (id) | Job | Source | Limit |
| --- | --- | --- | --- | --- |
| 1 | Hero (`#top`) | Make the brand felt and name the offer on screen one | Concept 02's hero: eyebrow "Enrollment marketing for K-12 schools", kinetic H1 "Make your school the one families remember.", the offer line, primary button to `#contact`, secondary to `#work`, three-panel collage with tilt | No figures. Collage panels are real campaign assets with captions, reuse approval pending |
| 2 | Reel | Prove production range in one swipe | Concept 02's marquee, pause button, static grid under reduced motion | Unchanged |
| 3 | What we do (`#services`) | Name the five services in ten seconds | Concept 05's tiles and icons, `content/services.ts` in source order, the `outcome` line | 5 tiles, one line each, no paragraphs |
| 4 | Work (`#work`) | Prove it | Three case cards from `content/caseStudies.ts`, photo, descriptor, one headline metric with source, "Read the case study" to the in-site case pages | 3 cards. Case pages are Concept 05's, restyled to this chrome |
| 5 | Who you work with (`#team`) | Earn trust | Concept 05's eleven cut-outs, names and roles as published, reuse approval pending | As Concept 05 |
| 6 | How we partner (`#partner`) | Set expectations | Concept 02's four steps | One line each, under 60 words total |
| 7 | Work with us (`#contact`) | Lower the threshold | Concept 05's intro copy and FSM form | As Concept 05 |
| 8 | Footer | Attribution, social, legal placeholders | `content/config.ts` | As the other concepts |

## Visual spec

- Surfaces: hero, reel and the final call on kit blue (`#3D6EA3`) with headlines in white and the accent in kit green (`#32B67A`, 3.1:1 on the blue, used only at display sizes 24px and up; body text on blue is white). Light sections on the paper tone with headings in kit blue and the display accent in blue-deep.
- Type: Archivo Variable at width 125 and weight 900 for H1, H2 and the final call, uppercase as in Concept 02. Josefin Sans for eyebrows, tile titles, body, buttons, form and footer, 17px minimum.
- Motion: the kinetic H1, the collage tilt (fine pointers only), the marquee, lift on hover, Concept 05's reveal on photos. All off under reduced motion. Nothing scroll-pinned.
- Buttons: kit green primary with ink text (the measured 02 button), ghost secondary in white on blue.

## Review presentation

- The hub leads with Concept 06 as "The current direction", with its own feedback model, storage key and form fields (as the merged model was added for 05), so a send never re-posts earlier ratings. Concept 05 moves below it as "Version 2.1, superseded"; its checklist stays.
- A "What Concept 06 addresses" checklist under the card: the three October 28 objections, the October 27 notes on 02 and 01, and the standing round 2 and 3 asks, each Done, Partly or Not yet, no names.

## Build order and the gate

1. Fork `creative/` to `bold/`, retoken color and type, rebuild the hero and reel. Desktop and 375px captures. **Show the project owner before continuing.**
2. Sections 3 to 8 from the Concept 05 components, restyled. Case pages under `bold/work/`.
3. Hub card, feedback model, checklist, Playwright, Lighthouse, prose scan, handoff and claims entries.
4. **Nothing deploys without the project owner's go.** Work on a branch with a local preview; the hub link is already in FilmTwist's hands.

## Cut tests, before anything is called done

1. Cold phone, no scrolling: a reader can say what FSM does and who it is for.
2. One scroll past the hero shows the five services; no paragraph longer than two lines anywhere above the case cards.
3. No figure appears above the case cards.
4. Every entity named on the page belongs to FilmTwist or its three published campaigns.
5. Concepts 01 to 05 are byte-identical to `main` after the build.
6. Reduced motion: the page reads top to bottom with no animation and nothing hidden.

## Content to confirm (client, via the project owner)

The H1 wording (Concept 02's, unchanged), the tagline, team photo reuse and the five first-name-only members, campaign creative reuse, and one real submission through the form.

## Build notes (October 28, 2026)

- Step 1 (hero and reel) was shown to the project owner before step 2; his go came the same day.
- Section 7 is the final call: the "Let's fill your school" headline on kit blue with Concept 05's contact copy and the FSM form in a paper card. There is no separate call-to-action band after the form.
- The four partner steps are Concept 02's lines, trimmed to 58 words in all (titles included); no new claims.
- Case pages live at `bold/work/<case>/`, Concept 05's `CasePage` ported to this chrome (`src/concepts/bold/CasePage.tsx`); the content record is unchanged.
- Hub: a "The current direction" section (`#current`) above the merged direction, with its own feedback model (`fsm-review-current-v1`), five fields added to the feedback form on October 28, and a "What Version 1 addresses" checklist. Concept 05 is labeled "Version 2.1, superseded" and keeps its checklist and form.
- Cut tests 1 to 6 are asserted in `tests/smoke.spec.ts` ("Concept 06: one H1 ...") except test 1, which is a reading of the phone capture, and test 5, which is a `git diff main` over the Concept 01 to 05 directories before the merge.

## Round 2: the opener (October 29, 2026, built on the `concept-06-round-2` branch and deployed)

The decision maker's October 29 review (hub form, "mostly" resolves): the site is solid; the opening is still a little busy; he proposes "a logo animation screen with the hand and then a bold statement and then it transitions into the first page", more brand color at the open, and more green overall. The headline type stays.

**The source.** The FilmTwist module videos open with an animation of the FSM mark that FilmTwist made (reference clip and hold frame in `fsm-concepts-source/animation/`, cut from the "welcome" module in the client's DAY 0 folder; not committed). On white: a kit-blue dot bounces across the frame in decaying arcs for about 2.4 seconds; it squashes and morphs into the blue hand; the two leaves grow up out of the hand while the wordmark wipes in from the left with a rippled edge ("FULL SCHOOL" in blue over "MARKETING" in the bright green); a hold of about 0.7 seconds; a fade to white; the content crossfades in. About 5.5 seconds in all, with a music bed. Colors sampled from the hold frame: hand and "FULL SCHOOL" #3c6ea3, "MARKETING" #23ce4e, leaves #28c660 toward teal, background white.

**The web version is that sequence, shorter, then the statement, then the page.**

1. White field. The dot enters and bounces, 1.2 seconds (three arcs, not five). This is the same dot that Concept 05 used, so the motif carries.
2. The dot morphs into the hand (0.3 seconds, a path morph between the dot and the hand path of `fsm-emblem-color.svg`, which has the hand and the leaves as two paths). The leaves grow from the stem (0.5 seconds, scale from the base) while the wordmark wipes in (0.6 seconds, a clip-path wipe with a per-letter rise; live text in the brand face, not an image).
3. Hold 0.4 seconds. The bold statement rises under the mark: the Concept 06 H1 line, set in the display face, blue on white with one green word. 0.6 seconds.
4. The whole opener slides up and the page is underneath, already rendered. 0.5 seconds. Total about 3.6 seconds; the statement is readable from 2.6 seconds.

**Guardrails, all asserted in the suite.** Once per session at launch (a session-storage flag; a return visit lands on the page); during the review the project owner chose a replay on every load (`REPLAY_EVERY_LOAD` in `Opener.tsx`, October 29) so reviewers who refresh see it again. Any scroll, click, tap or key skips to the page at once. No audio. Under reduced motion there is no opener at all. The opener is an overlay above a fully rendered page: the H1, the services and the form are in the document from the first paint, so search engines, screen readers and the LCP measurement see the page, not the overlay, and the overlay is `aria-hidden`. Nothing the visitor can act on is ever behind it longer than the sequence.

**The hero under it gets simpler and greener.** The three-panel collage is what he reads as busy (the same note as October 27). It becomes one photo panel beside the statement, and the hero surface moves from kit blue to a kit-green field (#32B67A deepening toward the teal), white type, the button in blue-ink on white. The header and footer stay blue-ink; the final call stays blue, so the page opens green and closes blue. Services, work and team sections are unchanged.

**The brand owner's October 29 review (hub form, "mostly" resolves) adds three items.** She is "not a fan of the three little thumbnails" in the hero, which confirms the one-photo hero above; both reviewers now reject the collage. The staff list is out of date: the eleven cut-outs were read from filmtwist.com/about on October 28, so that page is itself stale, and the current roster (names, titles, headshots) must come from her before the team section can be corrected (REQUIRES_CLIENT_CONFIRMATION; until then the section stays as built with the source note). The reel crops the creatives (fixed 190px tiles, `object-fit: cover`); she asks whether that is fine and for an enlarged view on hover. Round 2 shows each creative whole on its tile (contain, on the reel's dark surface) and opens the full creative in a dialog on hover intent or tap, closable with Escape, never autoplaying the marquee behind it. Type and color are settled with her ("that works", "the mix of colors are good"), so the green lean stays confined to the opener and the hero field.

**Gate.** Build the opener and the recolored hero on a branch, show the project owner a frame strip (`scripts/frames.mjs` style, twelve frames across the sequence) and the phone capture before anything else, and nothing deploys without his go. The brand owner has not answered on Concept 06; her answer should be in hand, or asked for in the same reply, before the opener ships, so the opener is built once.

## Round 2 build notes (October 29, 2026)

- `src/concepts/bold/Opener.tsx`: the dot, the hand (a GSAP MorphSVG from a circle path to the emblem's hand path), the leaves (scaled from the stem), the wordmark (live Josefin Sans, letter stagger), the statement (the H1 line in the display face), the slide-up. 3.9 seconds. Session flag `fsm-bold-opener-seen`; `?opener=1|0` forces it on or off; `window.__fsmOpener.seek(t)` pauses the timeline at `t` for frame captures and tests (it returns nothing: a GSAP timeline handed back through `page.evaluate` serializes a cyclic graph and crashes the renderer). Skip on wheel, touchstart, pointerdown or keydown. The overlay is `aria-hidden` and the page is in the document underneath from the first paint.
- The landing (October 29, afternoon, project owner's call: "start with a larger version of the animation and then reveal the header on the first page"): the mark and wordmark open at about 60 percent of the viewport width; at the end they shrink and glide into the header's logo position (a FLIP tween to the header logo image's rect, scaled to its height), the statement fades, the white field dissolves only once the mark is most of the way there, and the header fades in around the logo that just landed (`html.cr-opener-playing` hides the header until then). Skip runs the same landing in 0.35 s. Total 4.0 s.
- Statement removed (October 29, later still, project owner: the headline "appears in the animation"): the opener no longer carries its own statement slide; the page's H1 is the bold statement and it is the first thing on screen when the mark lands. The decision maker's "logo animation, then a bold statement, then the page" is now logo animation, then the page with the statement at the top of it. Total 3.5 s.
- Landing follow-up (October 29, later): the review ribbon and pill wait with the header, all three fading in by tween once the mark lands; the landing target is measured when the tween first renders (after the brand font loads) and aims the svg, so the hand lands on the header logo's hand to the pixel.
- The bounce is written as sequential tweens; a GSAP `keyframes` array for the same arcs stalled at the first apex in Chromium.
- Hero: one photograph (`caseStudies[0].hero`, the Aspire chalk-numeral still) beside the statement, on `#1a7f54` to the green ink with a deep-teal glow. White body text on the field measures above 4.5:1. The primary button is white with blue-ink text.
- Reel: each tile is a button sized by the asset's own proportion (`--ar`), 190px tall, `object-fit: contain`, so nothing is cropped; hover or focus scales it 1.45 in place; click, tap or Enter opens a native `<dialog>` with the full creative and a caption; Escape, the Close button or the backdrop closes it. Duplicated marquee items stay `aria-hidden` with `tabindex="-1"`. The caption no longer widens the tile.
- Hub: `currentVersion` is Version 2 (October 29); the checklist opens with the "Reviews of Version 1, October 29" round (six items, one not done: the staff roster).
- Team: unchanged, pending the current roster from the client.
- Tests: the opener (plays once over a rendered page, flag set, reload shows none, a key skips, reduced motion shows none) and the reel (every creative's shown proportion within 3% of its natural one, hover scale above 1.3, dialog opens and closes by Escape and by the button). Every other test starts past the opener through a `beforeEach` init script.

## Out of scope

Production hosting, analytics, the privacy and terms pages, a dedicated FSM form in the FilmTwist form service, new photography.
