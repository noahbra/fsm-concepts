# Content and claims register

Every substantive marketing claim in the four concepts, with its source, period, attribution, and approval state.
Re-verified against the live source pages on October 26, 2026 (fetched with curl; text matched exactly).

## Case-study metrics (FilmTwist-reported, historical)

| Case | Metric | Value | Reporting window | Source | State |
| --- | --- | --- | --- | --- | --- |
| Aspire Public Schools | Leads | 3,034 | July 2022 to June 2023 | https://www.filmtwist.com/work/aspire-public-schools | Verified 10/26/2026 |
| Aspire Public Schools | Applications | 895 | July 2022 to June 2023 | same | Verified |
| Aspire Public Schools | Average cost per lead | $38 | July 2022 to June 2023 | same | Verified |
| Friendship Public Charter School | Leads | 1,022 | February to September 2025 | FilmTwist's 2025 leads report (Google Sheet 1sniSYVHYRRyDbrKxNxh5K9FwWkwaYYBzP15WRe6PxyI, tab "2025 Leads Report", Total row, read November 3, 2026; sent by the brand owner, msg of November 3, 1:20 PM) | Verified November 3, 2026 (replaces the published 1,134 for December 2021 to September 2022) |
| Friendship Public Charter School | Applications | 51 | February to September 2025 | same report | Verified November 3, 2026 (replaces the published 102) |
| Friendship Public Charter School | Confirmed enrollments | not shown | February to September 2025 | same report: none reported ("we also don't have confirmed enrollments"); the published 78 for December 2021 to September 2022 came off November 3, 2026 | Removed |
| Friendship Public Charter School | Average cost per lead | $26.01 | February to September 2025 | same report (total spend $26,578.98 over 1,022 leads) | Verified November 3, 2026 (replaces the published $31.21) |
| Envision Education | Leads | 723 | July 2022 to June 2023 | https://www.filmtwist.com/work/envision-education-2 | Verified |
| Envision Education | Applications | 101 | July 2022 to June 2023 | same | Verified |
| Envision Education | Average cost per lead | $64 | July 2022 to June 2023 | same | Verified |
| Alpha Public Schools | Leads | 417 | July 2022 to June 2023 | https://www.filmtwist.com/work/alpha-public-schools | Verified 11/2/2026 |
| Alpha Public Schools | Applications | 118 | July 2022 to June 2023 | same | Verified 11/2/2026 |
| Alpha Public Schools | Average cost per lead | $44 | July 2022 to June 2023 | same | Verified 11/2/2026 (the page's 2571% ROI is omitted, as every published ROI is) |

Rules applied in code (`src/content/caseStudies.ts`): each metric carries its unit and period; leads and applications are
never relabeled as enrollments; the three campaigns are never summed; every card links to its source page.

### Deliberately omitted

- Published ROI percentages (Aspire 2977%, Friendship 2494%, Envision 821%) and Friendship "Estimated Income $918,000": definitions unvalidated. Not shown anywhere. REQUIRES_CLIENT_CONFIRMATION before any use.
- Envision "91% college acceptance" appears in Envision's own ad creative (billboards) and is shown only inside those images; it is not asserted in FSM copy.

## School descriptors (from the source pages)

| Case | Descriptor used | Source text | State |
| --- | --- | --- | --- |
| Aspire | Public charter network, 36 schools, tuition-free TK through grade 12 | "a public charter network that serves 36 schools, offer a tuition-free education from Kindergarten through 12th Grade" | Verified. "TK" appears in Aspire's own ad creative ("Now Enrolling TK - 8"); the page says Kindergarten. Shown as "TK-12" in grade band; REQUIRES_CLIENT_CONFIRMATION |
| Friendship | Public charter network, 16 campuses, tuition-free PK3 through grade 12, Washington, D.C. | "a public charter school network with 16 campuses in the Washington D.C. area, offering tuition-free education from PK3 through 12th grade" | Verified |
| Envision | Public charter schools, three campuses, grades 6 through 12 | "a public charter school that serves three schools across three areas from grades 6-12" | Verified |
| Alpha | Public charter network, four schools, tuition-free kindergarten through grade 12 | "a public charter network that serves four schools, offering a tuition-free education from Kindergarten through 12th Grade" | Verified 11/2/2026 |
| Aspire and Envision location "California" | Inferred from campaign creative (an "Aspire Public Schools Bay Area" ad; a 510 phone number and San Francisco graduation assets for Envision). Not stated on the source pages. | | REQUIRES_CLIENT_CONFIRMATION |
| Alpha location "San Jose, California" | Not on the FilmTwist page. Alpha's own site refused the pull (Cloudflare); its public job-board page (edjoin.org/alphaps, read 11/2/2026) gives "San Jose, CA 95122". | | REQUIRES_CLIENT_CONFIRMATION |

## Services described per case (verbatim from the source pages)

- Aspire: Student/Staff Recruitment, Photo/Video Creative, Digital Advertising, Organic Social. Platforms named: Google, Facebook, Instagram; email campaign; mailers and bus ads shown in creative.
- Friendship: Student/Staff Recruitment, Digital Advertising, Distribution. Platforms named: Google, TikTok, Meta; direct mail; transit ads on bike-share units, metro stations, shelters. "5 campaigns".
- Envision: Student/Staff Recruitment, Photo/Video Creative, Digital Advertising. Platforms: Google, Facebook, Instagram; billboard, bus, door-hanger and mailer creative shown.
- Alpha: Student/Staff Recruitment, Photo/Video Creative, Digital Advertising, Organic Social. Platforms named: Google, Facebook, Instagram; email campaign; two mailers shown in the creative sheet ("Mailer Design Examples"). Mapped to strategy, creative, advertising, outreach (the email campaign).

## Brand facts

| Claim | Source | State |
| --- | --- | --- |
| Palette #3D6EA3, #32B67A, #22CF50, #3DA39B, #212121, #EEEEEE | FSM Brand Guide (Google Slides `1FqhTtlEjrCSvDJ_r7Mbo6O0ZdV2OkIWkfTKSA_iKubE`), "Our Color Palette" | Authoritative; supersedes the brief's estimates (#3C6EA3 / #24CB57) |
| Typeface Josefin Sans (Light, Regular, Bold); Proxima Nova for Google Docs | Brand Guide, "Typefaces" | Authoritative |
| Mission: "We help schools grow their own." | Brand Guide, "Our Mission" | Authoritative |
| Tagline "grow your own." under the logo | Build brief (logo reference image). The V2 logo files supplied 10/26/2026 do not include a tagline lockup. Concept 03 renders it as live text. | REQUIRES_CLIENT_CONFIRMATION |
| "Full School Marketing is the school enrollment practice of FilmTwist Creative Agency." | Wording proposed from the brief ("associated with FilmTwist"); Brand Guide calls FSM "a creative agency" | REQUIRES_CLIENT_CONFIRMATION |
| Social: instagram.com/fullschoolmarketing, facebook.com/fullschoolmarketing, youtube.com/@FullSchoolMarketingCourse | Supplied by FilmTwist (Jackie Costanzo, email 10/26/2026), each resolved HTTP 200 the same day | Verified as resolving; ownership confirmation with client recommended |

## Service categories (provisional)

Enrollment Strategy & Positioning; Creative Content: Video, Photography & Design; Digital Advertising & Campaign Management;
School Websites & Landing Pages; Family Outreach, Nurture & Conversion Support. Mapped from FilmTwist's public services
(Brand Strategy, Creative Content, Web Design, Digital Advertising, Distribution, Social Media Marketing, K-12 Student
Recruitment). No automation or CRM integration is advertised. REQUIRES_CLIENT_CONFIRMATION.

## How it works (FilmTwist funnel workflow)

The four "How it works" steps on every concept, and beats 3 and 4 of the Concept 03 story, follow the funnel workflow
published on https://www.filmtwist.com/k-12-student-recruitment (read October 27, 2026, requested by Noah):

1. Digital ads tailored to the school, launched across Google, Meta (Facebook and Instagram), TikTok, and/or streaming
   advertisement (Spotify, Roku). The page graphic also shows YouTube and LinkedIn icons.
2. Ads bring interested parents to a landing page where they enter email and contact information and can start the
   enrollment process.
3. Form submitted leads to conversion (enrollment). No form leads to an email campaign that brings the family back.

Wording in `src/content/services.ts` (`approach`) is adapted for school readers; the steps and channels are FilmTwist's.
"Direct target mailing" and "graphic design", listed under "Other services" on the same page, are not part of the funnel
and are not shown as steps.

## Calls to action

- Active destination on all concepts: https://www.filmtwist.com/consulting (public page). No form claims to submit anything.
- Provisional booking link found on that page: https://calendly.com/dpathak/30min. Stored in config as `provisionalBookingUrl`, not linked. REQUIRES_CLIENT_CONFIRMATION.
- No free audit, conference discount, or guaranteed result is offered anywhere.

## Concept 04 worksheet arithmetic

The worksheet in Concept 04 computes, from a seat count the visitor enters:

- Applications needed = seats / yield, where yield defaults to 76%: Friendship PCS reported 78 confirmed enrollments
  from 102 applications. It is the only campaign that reported enrollments, the page says so, and the visitor can change it.
- Inquiries needed, per campaign = applications / that campaign's application rate (Aspire 895/3,034 = 29%,
  Friendship 102/1,134 = 9%, Envision 101/723 = 14%). Shown as the range across the three, with each plotted.
- Media budget, per campaign = inquiries x that campaign's average cost per lead ($38, $31.21, $64). Shown as a range,
  labeled "media only; no fees".

Every figure is a published FilmTwist number; no ROI percentages are used. The page labels the result "historical results
from other schools, not a forecast for yours and not a guarantee". REQUIRES_CLIENT_CONFIRMATION: FilmTwist should confirm
they are comfortable with their published campaign figures being used as scenario ratios in this way.


## Reference sites (client-cited)

- Website Example 1: https://schoolsmarketing.ca/ (plural). The brief cites schoolmarketing.ca (singular); FilmTwist's 10/26 email lists the plural domain. Treated as the same reference. REQUIRES_CLIENT_CONFIRMATION.
- Website Example 2: https://bloomenrollment.com/
- Website Example 3: https://www.kreativewebworks.com/
- Website Example 4: https://enrollmediagroup.com/

No text, layout or code was copied from any reference site.

## Concept 05 copy (new claims, added October 28, 2026)

The merged direction introduces three pieces of copy that the first four concepts did not carry. Each is a claim to confirm with the client; none is approved by the build.

| Copy | Where | Basis | State |
| --- | --- | --- | --- |
| "Enrollment marketing for K-12 schools." | Concept 05 first-frame H1 (`siteConfig.heroLine`) | Names the offer in FilmTwist's own terms ("enrollment marketing", "K-12" are the K-12 page's words). No figures. Replaced "Ads, video and landing pages that bring families to your school." on October 28 after the Version 2 review asked for a revision. | REQUIRES_CLIENT_CONFIRMATION (wording) |
| "Full School Marketing is Filmtwist Creative Agency's K-12 student recruitment practice, started in 2020. We help schools grow their own. Our team covers strategy, design, photography, video, websites and paid advertising." | Concept 05 "Who you work with" (`siteConfig.teamLine`) | Agency name and "K-12 Student Recruitment" from filmtwist.com navigation; mission line from the Brand Guide, verbatim; the six team nouns map one to one onto roles on filmtwist.com/about; "started in 2020" is the project owner's ruling (10/28/2026). Connective words only: "is," "practice," "Our team covers." FilmTwist's own "since 2010" is the agency's date and is not used. | REQUIRES_CLIENT_CONFIRMATION (the practice framing, the 2020 date, whether to name people) |
| "A free 30-minute call. Tell us how many seats you need to fill, where last year's families came from, and what you have tried. We'll say what we would do first and what it takes. No proposal before we understand your school." | Concept 05 "The first conversation" (`siteConfig.contactLine`) | "Free 30-minute" is FilmTwist's wording on filmtwist.com/consulting. The rest describes the call; no figures, no estimate. | REQUIRES_CLIENT_CONFIRMATION (wording) |
| School names in text only (Aspire Public Schools, Friendship Public Charter School, Envision Education) | Concept 05 "Who you work with" | The three published campaigns. School logos would need a separate approval and are not used. Alder Graduate School of Education appears on FilmTwist's K-12 page but is not a K-12 school and is not named. | Names: as the case studies. Logos: not used |

## Concept 05 Version 2 additions (October 28, 2026)

| Item | Where | Basis | State |
| --- | --- | --- | --- |
| Team photos, names and roles (Tien Louis-Goff, Deepa Pathak, Jackie Costanzo, Emily Martin, Jesse, Rhett, David, Kien, Stefan, Sunny Kim, Alec Gossage) | Concept 05 "Who you work with"; `src/content/team.ts`, `public/assets/team/` | https://www.filmtwist.com/about, read 10/28/2026; wording as published (first names only where the page shows only a first name). Headshots are the page's own files with the background lifted. The page labels them "Team photos and roles from filmtwist.com/about. Reuse approval pending." | REQUIRES_CLIENT_CONFIRMATION (reuse; who should appear; full names for the five shown by first name) |
| Team roster change (October 29): Jesse, Sunny Kim and Alec Gossage removed; Pat Angeles added in Alec's place, headshot from her email | Concept 05 and 06 team sections; `src/content/team.ts`, `public/assets/team/pat.*` | The brand owner's email of 10/29/2026 5:06 PM PT ("remove Jesse, Sunny, and Alec. In Alec's spot add Pat Angeles and here is her headshot"); the headshot is the inline image in that email, subject lifted. No title was given in that email; "Studio Administrator" is her own email signature (Patricia Angeles, msg 1a146d04f545259a, 10/17/2026). | Roster: client-stated. Title: from her signature; confirmed by the decision maker 10/30/2026 (msg 1a18dc3a58d1ccd8) |
| "Schools we've worked with" strip (October 30): fourteen school logos | Concept 06 Work section; `src/content/clients.ts`, `public/assets/clients/`, `scripts/client-logos.mjs` | The brand owner's full client list, relayed by the project owner 10/30/2026 (Alpha Public Schools, Anawakalmekak, Aspire Public Schools, Education for Change, Envision Education, Friendship Public Charter Schools, Invictus Academy, Marin Primary & Middle School, Sherman Thomas Charter School, Summit Leadership Academy, Washington Yu Ying PCS), plus Morgan Autism Center and Visions In Education, added by the project owner 10/30/2026, plus Pathways Charter School (pathwayscharter.org, TK-12 independent study), the decision maker's proposal named by the brand owner 10/30/2026. Logos pulled 10/30 from each school's own public site or a public job-board copy; per-file URLs in `fsm-concepts-source/logos/clients/SOURCE.txt`. Aspire's is FSM's own file (purple-on-white horizontal) from the brand owner's Drive folder, 10/30/2026 evening. Pathways' is the site's own lockup recovered from its watermark file, with the mark and wordmark set side by side as the site's header sets them; not a file the school publishes. The page labels them "School logos from each school's public site (October 30). Reuse approval pending." One mark is recolored for a white tile at the project owner's request (10/30): Education for Change's cream wordmark set in the blue of its own dark version (#4e76b5); the brand owner has no file for the current EFC logo (10/30 evening). Aspire's earlier recolor is retired. | REQUIRES_CLIENT_CONFIRMATION (reuse of each mark, which needs the schools' permission too; Anawakalmekak and Washington Yu Ying confirmed in by the brand owner 10/30; a larger Anawakalmekak file; Education for Change's own dark-text file in place of the recolor; Pathways' own horizontal lockup in place of the arrangement) |
| Contact form | Concept 05 "Work with us"; `FsmForm.tsx`, `siteConfig.leadConnector` | Version 2.1: a Full School Marketing form that posts to FilmTwist's LeadConnector "RFI Contact Form" `DveY4KWgzKqaGiHAAA2e` (location `6DjFgiECQC0Tt8gNX4vT`) with the widget's own payload. Fields, required flags, option lists, consent text and thank-you text are the form's own, read from the widget configuration 10/28/2026. Submissions go to FilmTwist's account; this site stores nothing. No test submission was made; the lead's arrival is unverified until one real submission is made. (Version 2 embedded the form as an iframe; `mode: 'embed'` restores that.) | REQUIRES_CLIENT_CONFIRMATION (one real submission to confirm delivery; FilmTwist may prefer a dedicated FSM form in the same account) |
| Case-study pages | `visible/work/{aspire,friendship,alpha}/` | Every figure, descriptor, story line and image is the same record as the cards (`caseStudies.ts`), with the published source cited at the foot of each page. No new claims. | As the case studies |
| Hub checklist wording | Hub, "What Version 2 addresses" | Paraphrases of the 10/27 reviewer notes and the 10/28 asks, no names, no ratings. | Internal review copy |

## Concept 06 Version 3.12 (November 4, 2026): Friendship card photograph

Source: the project owner, November 4, 2026 (the ad's "typeface and logo look pixelated when on large screen"; "use cr photo").

| Claim or asset | Where | Basis | Status |
|---|---|---|---|
| Friendship card photograph: the classroom group | Friendship card, the reel's Friendship tile, the case page hero | The classroom photograph from the published case (Frame 117, served at 1,400 and 700) leads in place of the "Education starts at Woodridge" ad, which FilmTwist publishes only at 686 px and which the card scaled past its size. The ad takes the first gallery slot (caption "Digital ad"). It is the only plain photograph among the six images on FilmTwist's Friendship page (three ads, two print composites); full-size campaign photography is FilmTwist's to supply if they want a different one. No new asset; the set was approved by the brand owner on November 3. | Built |

## Concept 06 Version 3.11 (November 4, 2026): the case page footnote comes off

Source: the project owner, November 4, 2026 ("remove all of these foot notes").

| Claim or asset | Where | Basis | Status |
|---|---|---|---|
| Case page footnote "Figures and creative are from the published FilmTwist case study" | Bottom of each case page (`bold/work/*`, production `/work/*`; Concept 05's pages likewise) | Removed on the project owner's ruling, as the three on-page provenance footnotes were on October 31. The card-level Source link under each headline number stays (its Friendship fate is with the brand owner). This register keeps the source for every figure and image. | Removed |

## Concept 06 Version 3.10 (November 4, 2026): Aspire card photograph

Source: the project owner, November 4, 2026 ("use the photo of the kids at the playground equipment as the thumbnail for Aspire").

| Claim or asset | Where | Basis | Status |
|---|---|---|---|
| Aspire card photograph: the playground group | Aspire card, the reel's Aspire tile, the case page hero | The playground photograph from the same published case (Group 279, 1,454 by 577, served at 1,400) leads the card in place of Math Field Day, which moves to the gallery slot it leaves (caption "School photography"). The card frame is 4:3, so it shows the middle of the wide frame (about four of the eight students); the reel tile and the case page show the whole frame. No new asset; the set was approved by the brand owner on November 3. | Built |

## Concept 06 Version 3.9 (November 4, 2026): the site's own contact form, backed by a Google Sheet

Source: the project owner's rulings of November 4, 2026 ("we can't use the FSM-style contact form and wire it to the FilmTwist form, the formatting class doesn't work"; then "go, I'll own the form for now and share it with them").

| Claim or content | Source and treatment | Status |
|---|---|---|
| Contact form | FilmTwist's embedded widget is a cross-origin frame whose look is set only in their form builder, so it cannot carry FSM's styling from this page. The site's own form (`FsmForm.tsx`, white card, green button, the RFI form's fields and option lists) is back, `siteConfig.leadConnector.mode: 'fsm'`. It posts one JSON document per submission to a Google Apps Script web app (`scripts/inquiry-form.gs`) attached to the Google Sheet "FilmTwist - FSM Website Inquiries - v1 - 2026-11-04" (Drive `1a7Cd-eW-wnZIMr9TgJHAnh41iHuW3fy_Ejr0QrP8Bf4`, Client Work/FilmTwist, held by the project owner, to be shared with FilmTwist). The script appends a row and emails the addresses on the sheet's Settings tab; a hidden honeypot field and a minimum fill time (3 s) replace a captcha. The widget (`'embed'`) stays available for the day an FSM-styled copy exists in FilmTwist's form builder. | Interim, ruled by the project owner November 4, 2026; REQUIRES_CLIENT_CONFIRMATION (one real submission by FilmTwist after the sheet is shared) |
| Thank-you text | "Your message is with the team. We will reply by email." replaces the widget's configured text, which promised "next steps" by email that the widget's automation sent and this path does not. New copy. | REQUIRES_CLIENT_CONFIRMATION |
| Privacy notice | New sentence under "Information you give us": submissions are kept in a spreadsheet held for us by our website administrator and emailed to our team; the site stores nothing. `updated` November 4, 2026. | Accurate to the build; FilmTwist's legal read still open |
| Consent line | Unchanged text (terms and privacy links to this site's pages; the text-message sentence stays because the form asks for a phone number). | As before |

## Concept 06 Version 3.8 (November 3, 2026): the brand owner's sign-off notes

Source: the brand owner's reply of November 3, 2026, 1:20 PM, relayed by the project owner.

| Claim or content | Source and treatment | Status |
|---|---|---|
| Alpha stays; Envision removed | "Alpha is good to stay." Envision's page shells, Vite inputs, `public/assets/campaigns/envision/`, the optimize-assets rows, the `archivedCaseStudies` list and the tests are removed; `/work/envision/` answers 404 on both sites after the deploy. Its logo stays in the schools row (a school FilmTwist worked with). | Approved |
| Friendship figures | Replaced with FilmTwist's 2025 leads report (Google Sheet 1sniSYVHYRRyDbrKxNxh5K9FwWkwaYYBzP15WRe6PxyI, tab "2025 Leads Report", Total row, read November 3, 2026; sent by the brand owner, msg of November 3, 1:20 PM): 1,022 leads, 51 applications, $26.01 average cost per lead, February to September 2025 (October to December are brand-awareness months, not counted, per the brand owner). The story lines, channels and creative stay from the published case study (filmtwist.com/work/friendship-pcs), which still prints the 2021 to 2022 figures; the card's Source link goes there. | Client-supplied; the pairing of 2025 figures with the published 2022 story and Source link REQUIRES_CLIENT_CONFIRMATION |
| Terms intro: notice before changes | "The notice promises contradict each other." The intro sentence "We will give you notice before scheduled changes to the Services you use" is now "We may update these terms from time to time"; the take-effect sentence and section 10 are unchanged. The source template carried the same contradiction. | Fixed on the brand owner's note |
| Privacy page | "Looks good too." No change. The embedded form now loads FilmTwist's widget, which runs the forms service's bot check (Cloudflare Turnstile / reCAPTCHA); the notice names the forms provider by role and covers technical data any website records. | Approved; the bot-check wording is for counsel if they want it named |
| Campaign photos and school logos | "School logos and photos are good." `assetsReady: 'approved'` on all three cases (the case-page captions come off); `clientsSource.note` updated. | Approved by the brand owner, November 3, 2026 |
| Contact form | "The contact form gave me an error": screenshot shows "The form service answered 429." The widget page at api.leadconnectorhq.com/widget/form/DveY4KWgzKqaGiHAAA2e bundles Cloudflare Turnstile and reCAPTCHA (read November 3), so direct posts without the widget's token are refused. `siteConfig.leadConnector.mode` is 'embed' again: FilmTwist's own widget, as on filmtwist.com/contact. Its consent line links to the pages set in their form system (filmtwist.com's), not this site's; FilmTwist can point them at fullschoolmarketing.com/terms and /privacy there. `FsmForm.tsx` stays in the repo. | Fixed; the consent links inside the widget are FilmTwist's to change |
| Work heading | "I like Schools seen. Seats filled." The project owner chose "Schools discovered. Seats filled." on November 3 (a stronger first word than "seen"). | Decided |

## Concept 06 Version 3.7 (November 3, 2026): contact email, Aspire card photograph

| Claim or content | Source and treatment | Status |
|---|---|---|
| Contact email on the terms and privacy pages: biz@fullschoolmarketing.com | The decision maker's note of November 3, 2026 ("contact email should be biz@fullschoolmarketing.com"), relayed by the project owner. Replaces info@filmtwist.com (the terms' own value) in `siteConfig.legal.email`, which every email mention in `src/content/legal.ts` reads. The domain carries Google mail records (checked November 3); whether the mailbox exists is FilmTwist's to confirm. | Client-stated; mailbox REQUIRES_CLIENT_CONFIRMATION |
| Aspire card photograph: Math Field Day | Same note ("thumbnails need a little better at least for Aspire"). The chalk-drawing still (no faces) was the card's photo and the reel's second tile; the Math Field Day photograph from the same published case (030423-Aspire-MathFieldDay-5, 870 px) takes both, and the still moves to the gallery slot it leaves (caption "School photography"). No new asset; both were already approved-pending with the rest of the Aspire set. | Built; image reuse still REQUIRES_CLIENT_CONFIRMATION with the set |
| "Schools that got seen. And chosen." (Work heading) | Same note: reads as slang; the decision maker asked the brand owner and the project owner for thoughts. Now "Schools discovered. Seats filled." (November 3). | Decided |
| Contact form destination | Same note asked where the form goes. `src/content/config.ts` leadConnector: the form posts to FilmTwist's LeadConnector account (location 6DjFgiECQC0Tt8gNX4vT, the RFI Contact Form DveY4KWgzKqaGiHAAA2e, the one filmtwist.com/contact embeds); this site stores nothing. Notification routing lives in that account. | Answered from the build; routing is FilmTwist's |

## Concept 06 Version 3.6 (November 2, 2026): Alpha Public Schools in place of Envision Education

| Claim or content | Where | Source | Status |
|---|---|---|---|
| Alpha Public Schools case: descriptor, services, story lines, channels, three figures, ten images | Third case card, `bold/work/alpha/` (production `/work/alpha/`), the reel; `src/content/caseStudies.ts`, `public/assets/campaigns/alpha/` | FilmTwist's published case study, https://www.filmtwist.com/work/alpha-public-schools, read in full 11/2/2026. Figures: 417 leads, 118 applications, $44 average cost per lead, "July 2022 to June 2023 (a full campaign year)". The page's 2571% ROI is omitted (definition unvalidated, as for the other cases). Story lines paraphrase the page's two paragraphs (Google, Facebook and Instagram ads; an email campaign to collected leads; photo and video of events, sports days, classroom life and graduations). "Mailers" is in the channels because the page's creative sheet shows two mailers ("Mailer Design Examples"); the text does not name them. Images: the page's nine photographs and one creative sheet, pulled from the Webflow CDN at the largest size served (335 to 1,600 px wide; the sheet, 1,753 by 3,199, is split into a social-ads crop and a mailers crop, flattened on white, label dropped); provenance per file in `fsm-concepts-source/campaigns/alpha/SOURCE.txt`. Not carried over: the page's own defects (an unfilled "{{multi-elements}}" placeholder, a stray "NEW PATHWAYS WEBSITE" label, an empty "See the New Creatives in Action" block, a duplicated paragraph). | Verified 11/2/2026; REQUIRES_CLIENT_CONFIRMATION for reuse of the creative and for the location |
| Envision Education case, archived | Off the cards and the reel; still served at `bold/work/envision/` (production `/work/envision/`) with its own figures and source, linked from nowhere on the site; its logo stays in the schools strip | The project owner's direction, 11/2/2026: swap, not add; keep Envision reachable in case it is wanted back; delete once the swap is approved | Pending the client's approval of the swap; on approval, remove the page shells, the Vite inputs, the assets and the `archivedCaseStudies` entry |

## Concept 06 Version 3.5 (October 31, 2026): legal pages, three headshots, one note

| Where | Change | Status |
| --- | --- | --- |
| Terms and conditions page (`bold/terms/`, production `/terms/`; text in `src/content/legal.ts`) | Adapted from FilmTwist's published Terms and Conditions (filmtwist.com/terms-and-conditions, "Last updated Oct 13, 2024", read October 31, 2026). The substance is the source's; this site restructures it for reading: a plain one-line summary under each heading, numbered sections, the all-capitals blocks set in sentence case inside a marked notice, this site named where the source names filmtwist.com. Departures from the source, each a decision for FilmTwist: (1) governing law is California, the source says New Mexico; (2) binding arbitration is before a single arbitrator with a recognized US provider, seated in Contra Costa County, California, the source names the International Commercial Arbitration Court under the European Arbitration Chamber in Brussels with three arbitrators and the seat left blank; (3) the fallback court is Contra Costa County, the source refers to "the courts listed for jurisdiction above" and lists none; (4) the liability cap is "the amount paid, if any, by you to us", the source reads "the lesser of the amount paid, if any, by you to us or ." with the second value blank; (5) the "No Medical Advice Disclaimer" about homecare services (a template leftover) is dropped; (6) the User Generated Contributions and Contribution License sections are folded into "What you send us" because this site has no posting; (7) the "buying agent" prohibited use is dropped because nothing is sold here; (8) the text-message section states the form's own consent sentence. Company facts: entity and DBA from the privacy notice, address and phone from the terms, email biz@fullschoolmarketing.com since November 3, 2026 at the client's request, info@filmtwist.com before (zip 94804, the terms' value; the privacy notice says 94603). "Last updated October 31, 2026" is this adaptation's date. | REQUIRES_CLIENT_CONFIRMATION (FilmTwist or its counsel signs off the text and the eight departures before launch) |
| Privacy policy page (`bold/privacy/`, production `/privacy/`) | Adapted from FilmTwist's published Privacy Policy (filmtwist.com/privacy-policy, "Last updated May 09, 2024", read October 31, 2026), same treatment. Departures: (1) the information list names what this site's form actually collects (name, email, phone, service, lead source, budget range, the message), the source lists names, phone numbers, email addresses and contact preferences; (2) GPS and precise location collection is dropped (this site does none); (3) the Google Analytics sharing clause is replaced with "does not currently use Google Analytics or any other analytics service; if we add one, we will update this notice", true of the build (no analytics in the source, per AGENTS.md); (4) service providers are named by role (the forms platform that receives the contact form, which is LeadConnector, the email provider, the website host); (5) a "Legal requirements" sharing bullet is added, matching the source's own legal-obligation basis; (6) the California categories list names the five categories this site collects and says the rest are not collected through this website, the source prints the template's full category table with the "Collected" column empty; (7) retention: "identifiers for six months", the source's own value, the other two template rows (categories C and G, "as long as the user has an account") dropped because there are no accounts; (8) "We have not sold or shared personal information" keeps the source's claim, with "disclosed" removed because sharing with service providers is a disclosure; (9) the under-18 California account-removal paragraph is dropped (no accounts); (10) privacy requests go to the site's contact email (biz@fullschoolmarketing.com since November 3, 2026) with "Privacy request" in the subject, the source links a Termly data-subject form and marketing@filmtwist.com; (11) the browser flag for the opener is disclosed. | REQUIRES_CLIENT_CONFIRMATION (as above) |
| Contact form consent line; footer | The two links in the form's consent sentence (text unchanged, the form's own) now open this site's terms and privacy pages instead of filmtwist.com's. The footer's "Privacy policy and terms to be supplied." placeholder is replaced by links to the two pages. | Done October 31 |
| Team: Stefan, Kien, David | New headshots supplied by the project owner on October 31 ("Sunlit Friendly Headshot", "Smiling Photographer in Warm Sunlight", "Sunlit Smiling Portrait in Blue Circle"), each a circular portrait; cropped to the circle, subject lifted with macOS Vision, 360 px. Replace the filmtwist.com/about headshots. Provenance in the source folder's `team/*-2026-10-31.SOURCE.txt`. | REQUIRES_CLIENT_CONFIRMATION (reuse, as approval 8; who took the photos is not recorded) |
| "Work with us" | "The form goes straight to the team." removed. | Removed October 31 |

## Concept 06 Version 3.4 (October 31, 2026)

| Where | Change | Status |
| --- | --- | --- |
| Work, Team, Schools strip | The on-page provenance footnotes (results disclaimer and sources, team photos and roles note, school logos note) are removed at the project owner's direction. This register remains the record of every source and every pending approval; nothing in the "Unresolved approvals" list changes. | Removed from the page October 31 |
| Reel dialog | Each creative opens at its own pixel size at most. The published files are web-sized (340 to 1,400 px wide); the agency's full-size files are wanted. | REQUIRES_CLIENT_CONFIRMATION (files) |
| Footer, Work heading | "Campaign creative shown with reuse approval pending." and the Work lede "Featured school recruitment campaigns delivered by the FilmTwist team." removed at the project owner's direction. Approval 1 in the list below is unchanged. | Removed from the page October 31 |
| Meta description (search and share preview) | Now "School enrollment creative, campaigns and strategy for K-12 schools, from Full School Marketing." The production build drops the trailing review label. | Edited October 31 |
| Hero | "built by the team behind FilmTwist" dropped from the offer line; the line is now "Creative, campaigns and enrollment strategy for K-12 schools. The goal is enrolled students, not just clicks." The FilmTwist relationship is stated once, in the Team intro (unchanged wording, see approval 2). | Edited October 31 |

## Concept 06 round 2 (October 29, 2026)

| Where | Text | Status |
| --- | --- | --- |
| Opener | The FSM mark and wordmark, animated as in the opening of the FSM module videos; the statement is the page's H1 line | Brand assets from the kit; the sequence is the client's own, from their videos |
| Hero photograph | Four students on school steps, no caption (`assets/site/hero-school-steps-*`) | Chosen by the project owner on October 29 from filmtwist.com (its CDN file `680bbaaa31d7b9b9f1bc8dda_Screenshot 2025-04-25 at 11.38.54 AM.png`; the page it sits on is not in the saved source pages). The client's own site image; reuse on this site REQUIRES_CLIENT_CONFIRMATION like the campaign images. Replaced the Aspire chalk-numeral still, which carried the caption "Campaign photography, Aspire Public Schools" for part of October 29. |
| Reel | Tile and dialog captions are the media record's captions and school short names | Unchanged |
| Hub | "Reviews of Version 1, October 29" checklist wording (six items) | Paraphrases of the two reviewers' notes, no names |

## Concept 06 (October 28, 2026)

Concept 06 reuses Concept 02's hero copy, Concept 05's services, case, team and contact copy, and the content record unchanged. The only wording it introduces is below.

| Copy | Where | Basis | State |
| --- | --- | --- | --- |
| The four partner steps: "Your enrollment goals, grade bands, neighborhoods and the families you most want to reach." / "Film and photo days, ad creative, print, out-of-home and landing pages. Your school, not stock." / "Campaigns go live where families already are, timed to your application windows." / "We read leads, applications and cost per lead, and adjust as the season moves." | Concept 06 "How we partner" | Concept 02's four lines, trimmed so the section stays under 60 words. Describe the engagement; no figures, no client names. | REQUIRES_CLIENT_CONFIRMATION (wording, as for Concept 02) |
| Section headings: "What we do." / "Schools that got seen. And chosen." / "Who you work with." / "Four steps, one season at a time." / "Let's fill your school." / case pages: "What the campaign did." / "The work." / "Campaign creative." | Concept 06 and its case pages | Concept 05's and Concept 02's headings, unchanged in substance. | As the earlier concepts |
| "The form goes straight to the team." | Concept 06 "Work with us" | Removed October 31, 2026 (project owner: not necessary; the contact line above it already says what happens next). | Removed |
| Hub checklist wording, "What Version 1 addresses" | Hub, the current direction | Paraphrases of the October 27 notes on Concept 02 and the October 28 review of Concept 05, no names, no ratings. | Internal review copy |

## Unresolved approvals

1. Reuse of FilmTwist campaign creative (including student imagery) on the FSM site.
2. Attribution wording for the FilmTwist relationship.
3. Tagline lockup and the exact logo variant for the site header.
4. Service names and offer priority.
5. Consultation destination (consulting page vs. booking link vs. a hooked-up form with a privacy policy).
6. Privacy policy and terms text: drafted on this site from FilmTwist's own published pages (Version 3.5 above); FilmTwist signs off the text and the listed departures before launch.
7. Which case studies and figures are approved for FSM.
8. Reuse of the FilmTwist team headshots, names and roles on the FSM site (Concept 05).
9. An FSM-specific LeadConnector form (fields, options, styling) in place of the agency's RFI Contact Form.
