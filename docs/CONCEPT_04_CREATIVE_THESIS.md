# Concept 04: Start With Your Number

The invented direction, second version. The first version ("The Enrollment Year", a season dial) was rejected by Noah on
October 27, 2026: not professional, unclear architecture, and no research behind it. This version was designed from the
research in `CONCEPT_04_RESEARCH.md`, which is the document to read first.

## The thesis in one line

Every agency page starts with the agency. This one starts with the one number a school leader already knows, the seats
to fill, and works out what it takes from the only campaigns FilmTwist can show.

## Why this, and not another styling of the same page

The reference sites FilmTwist cited and the agencies in the 2026 roundups run one page: promise hero, pain points, process
steps, case cards, logo wall, free call. Concepts 01 to 03 are three excellent stylings of that page (polish, portfolio,
story). A fourth styling would not be a fourth direction.

The category's own advice on choosing an agency is: ask for the school's funnel before showing anything, and judge on
students in seats and cost per seat. No site in the set acts on that advice. This one does, literally. The visitor's
school is the subject; the agency's proof is the arithmetic.

## Architecture: one job per section

| # | Section | Job | What is on screen |
| --- | --- | --- | --- |
| 1 | Your number | Make the visitor's school the subject | One input (seats). One adjustable assumption (yield, preset to Friendship PCS's 76%). Four computed rows: seats, applications needed, inquiries needed (range, three campaigns plotted), media budget (range, three campaigns plotted). Disclaimer on the sheet. |
| 2 | Where the numbers come from | Proof as comparable data | The three campaigns as funnels: leads, applications, confirmed enrollments or "not reported", period, cost per lead, source link, campaign image with the rights label. |
| 3 | How it works | Tie the service to the number | FilmTwist's four funnel steps, each tagged with the worksheet row it moves. |
| 4 | The first call | Make the data-first stance literal | Six things to bring; the promise that missing data is the first thing fixed; the CTA. |
| 5 | Services | Required content, kept compact | The five provisional services as a numbered list. |
| 6 | Invitation | Close on the visitor's own number | "Your number was N." "Bring your number. We'll bring ours." CTA, FilmTwist relationship line. |

Navigation mirrors the sections: Your number, Proof, How it works, Services, Let's talk.

## The arithmetic, and its guardrails

- Applications needed = seats / yield. Yield defaults to 76% (Friendship PCS: 78 confirmed enrollments from 102
  applications), the only campaign that reported enrollments. The sheet says so and lets the visitor change it.
- Inquiries needed, per campaign = applications / that campaign's application rate (29%, 9%, 14%). Shown as a range.
- Media budget, per campaign = inquiries x that campaign's cost per lead ($38, $31.21, $64). Shown as a range, "media
  only; no fees".
- On-screen label: "Historical results from other schools, not a forecast for yours and not a guarantee."
- No ROI percentages. No point estimates. No invented benchmarks. All figures trace to the three source pages.

## Design

- Type: Space Grotesk for words, JetBrains Mono (tabular) for every figure. Numbers are the imagery.
- Color: FSM blue deepened to ink for the worksheet and the first-call sections; warm paper for proof and services; brand
  green reserved for computed figures, the range track and the CTA.
- Motion: figures ease to new values and range dots slide (480 ms); instant under reduced motion. Nothing else moves.
- Mobile: worksheet stacks under the headline, rows go single-column, range labels stay inside the card. The slider is a
  native range input so it works with a thumb and with arrow keys.

## How it differs from 01 to 03

| | 01 Clean | 02 Bold | 03 Story | 04 Number |
| --- | --- | --- | --- | --- |
| Subject | The agency | The work | A school like yours | Your school |
| Reader's role | Read | Browse | Watch | Do |
| Proof format | Cards | Gallery | Cards after the story | Funnels, comparable |
| First screen | Headline and image | Collage | Logo and period | A question and a worksheet |
| What the CTA promises | A conversation | A conversation | A conversation | A conversation with a stated agenda |

## What FilmTwist should decide

1. Are they comfortable with their published campaign figures being used as scenario ratios? (`CONTENT_AND_CLAIMS.md`)
2. Should the yield default stay at the Friendship figure, or be set from their wider book of work?
3. Whether to add an email capture ("send me my worksheet") in production, which would make the page a lead source itself.
