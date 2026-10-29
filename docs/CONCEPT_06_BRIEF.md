# Concept 06 design brief: Bold, rebuilt

Status: approved by the project owner, built on the `concept-06-bold` branch and deployed on his go, October 28, 2026 (steps 1 to 3 below; commit `b2d0581`). Live at https://noahbra.github.io/fsm-concepts/bold/.
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

## Out of scope

Production hosting, analytics, the privacy and terms pages, a dedicated FSM form in the FilmTwist form service, new photography.
