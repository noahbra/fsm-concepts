# Concept 04 creative thesis: The Enrollment Year

**Promise:** Marketing that meets your school where it is in the year.

## The overlooked audience insight

Agency websites are organized the way agencies think: by service line. School leaders do not experience enrollment as
service lines. They experience it as a calendar with pressure points: open-house season, the application window, lottery
and acceptance decisions, summer registration and the quiet loss of families who said yes and never showed up. A principal
scanning a QR code at a conference in October is not asking "do you do video?" They are asking "it is October, what should I
be doing right now, and can you help?" Concept 04 answers that question first and lets the services follow from it.

## Visual vocabulary

- A warm paper canvas and a soft serif display face (Fraunces) with Josefin Sans for labels: the voice of an advisor at a
  planning desk, not a vendor on a billboard.
- The year as a ring: twelve month ticks, four season arcs in the four brand hues (deep green, blue, bright green, teal).
- The brand's own growth metaphor made literal: at the hub of the ring the hand-and-sprout emblem grows from seed to
  sprout to leaves to the full FSM emblem as the seasons advance. The logo is the progress indicator.
- Hairline rules, small-caps labels, numbered lists, a real calendar axis. Everything looks like a plan.

## Interaction mechanics

The season dial is a four-position radio group (click, tap, arrow keys, Space/Enter; aria-checked; a live region announces
the planning view). It preselects the current month's season on load. Changing it re-plans the whole page in one
250 ms cross-fade (none under reduced motion):

- hero headline and sub-line;
- a "What to do now" checklist for that season, each item mapped to the FSM service that delivers it;
- the five services reordered, each with a season-specific "why now" line;
- the lead case study (Fall and Winter: Friendship PCS, whose December-to-September window and confirmed enrollments fit an
  application push; Spring: Envision; Summer: Aspire's full campaign year);
- the CTA label.

A second, quieter signature: the three verified FilmTwist reporting windows plotted as bars on the same calendar, so the
proof is literally placed in time rather than floating as abstract numbers.

## Section map (eight beats)

1. Hero: season-driven headline, sub-line, CTA, "See Our Work", and the dial.
2. What to do now: four grounded moves for the selected season, each tied to a service.
3. Services: the five capabilities, reordered by season, with "why now".
4. Proof: campaign windows on the calendar, then three case cards (lead case first), full attribution.
5. How it works: the same four funnel steps every season (ads where families already are, a landing page that starts enrollment, email follow-up for families who need a nudge, applications you can count), from FilmTwist's K-12 recruitment page.
6. About: the creative team behind FSM, with the FilmTwist relationship stated plainly.
7. CTA band with the season-specific ask, plus "Not sure which season you are in? Start a conversation anyway."
8. Footer.

## Why this has more audience value than a generic animated agency homepage

A generic animated homepage asks the visitor to admire the agency. This page asks the visitor one question about
themselves and then does a small, visible piece of planning work for free. That is the behavior of a partner, which is
what FSM is selling. It also solves the conference problem directly: a tap on "Winter" turns a brochure into a plan for the
exact month the visitor is living in, on a phone, in under five seconds.

## How it differs from the other three

| | 01 Clean & Modern | 02 Bold & Creative | 03 The Invisible School | 04 The Enrollment Year |
| --- | --- | --- | --- | --- |
| Visual hierarchy | Headline and one hero image; linear editorial | Media mosaic dominates; copy supports | Narrative stage first, site second | A control (the dial) shares the hero with the headline; content below is a plan |
| Interaction | Hover and focus states only | Filters, marquee, expansion overlay | Scroll-driven animation, skip, rewatch | A state change that rewrites the page; keyboard and touch first-class |
| Narrative | "We are credible" | "We make great work" | "Your school is great and under-discovered" | "It is this month. Here is what to do, and here is who did it before" |
| Mood | Calm, editorial, white | Loud, dark, electric | Playful, illustrated, warm | Advisor, planning desk, warm paper with a serif |
| Type | Josefin + Inter | Archivo wide black + Josefin | Josefin + Nunito | Fraunces + Josefin |

It is not a reskin of 01: the page content itself changes with the dial, and the layout is a desk grid rather than an
editorial column. It is not a collage or reel: imagery is secondary to the plan. It has no mascot, no horizontal scroll,
no funnel animation, and no calculator: nothing is computed, projected, or promised.

## Accessibility and reduced motion

The dial is a native-pattern radio group with roving tabindex, visible focus, and an aria-live announcement. All seasonal
content is real DOM text. Under `prefers-reduced-motion`, swaps happen instantly with no cross-fade and the ring's growth
states change without animation. The page works fully with the dial untouched (current season preselected), so a visitor
who never interacts still gets a complete site. No hover-only content; no desktop-only features.

## Risks, tradeoffs, and what would invalidate it

- It asks the visitor to make a choice. If reviewers find the dial confusing or ignore it, the concept loses its reason to
  exist and collapses into a conventional page.
- Seasonal copy is generic by necessity (dates vary by state, district and school type). If the client's own enrollment
  calendar language is very different, the checklists will feel off until rewritten.
- The lead-case mapping is an editorial choice, not data. If the client would rather always lead with one case, that
  dimension should be dropped.
- Feedback that would invalidate the concept: "I did not notice the page changed," "this feels like a tool, not a site," or
  "we want the work to hit first" (in which case Concept 02 is the better answer).
