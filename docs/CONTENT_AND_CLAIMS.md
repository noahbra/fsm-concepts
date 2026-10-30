# Content and claims register

Every substantive marketing claim in the four concepts, with its source, period, attribution, and approval state.
Re-verified against the live source pages on October 26, 2026 (fetched with curl; text matched exactly).

## Case-study metrics (FilmTwist-reported, historical)

| Case | Metric | Value | Reporting window | Source | State |
| --- | --- | --- | --- | --- | --- |
| Aspire Public Schools | Leads | 3,034 | July 2022 to June 2023 | https://www.filmtwist.com/work/aspire-public-schools | Verified 10/26/2026 |
| Aspire Public Schools | Applications | 895 | July 2022 to June 2023 | same | Verified |
| Aspire Public Schools | Average cost per lead | $38 | July 2022 to June 2023 | same | Verified |
| Friendship Public Charter School | Leads | 1,134 | December 2021 to September 2022 | https://www.filmtwist.com/work/friendship-pcs | Verified |
| Friendship Public Charter School | Applications | 102 | December 2021 to September 2022 | same | Verified |
| Friendship Public Charter School | Confirmed enrollments | 78 | December 2021 to September 2022 | same | Verified |
| Friendship Public Charter School | Average cost per lead | $31.21 | December 2021 to September 2022 | same | Verified |
| Envision Education | Leads | 723 | July 2022 to June 2023 | https://www.filmtwist.com/work/envision-education-2 | Verified |
| Envision Education | Applications | 101 | July 2022 to June 2023 | same | Verified |
| Envision Education | Average cost per lead | $64 | July 2022 to June 2023 | same | Verified |

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
| Aspire and Envision location "California" | Inferred from campaign creative (an "Aspire Public Schools Bay Area" ad; a 510 phone number and San Francisco graduation assets for Envision). Not stated on the source pages. | | REQUIRES_CLIENT_CONFIRMATION |

## Services described per case (verbatim from the source pages)

- Aspire: Student/Staff Recruitment, Photo/Video Creative, Digital Advertising, Organic Social. Platforms named: Google, Facebook, Instagram; email campaign; mailers and bus ads shown in creative.
- Friendship: Student/Staff Recruitment, Digital Advertising, Distribution. Platforms named: Google, TikTok, Meta; direct mail; transit ads on bike-share units, metro stations, shelters. "5 campaigns".
- Envision: Student/Staff Recruitment, Photo/Video Creative, Digital Advertising. Platforms: Google, Facebook, Instagram; billboard, bus, door-hanger and mailer creative shown.

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
| "Schools we've worked with" strip (October 30): eleven school logos | Concept 06 Work section; `src/content/clients.ts`, `public/assets/clients/`, `scripts/client-logos.mjs` | The brand owner's full client list, relayed by the project owner 10/30/2026 (Alpha Public Schools, Anawakalmekak, Aspire Public Schools, Education for Change, Envision Education, Friendship Public Charter Schools, Invictus Academy, Marin Primary & Middle School, Sherman Thomas Charter School, Summit Leadership Academy, Washington Yu Ying PCS). Logos pulled 10/30 from each school's own public site or a public job-board copy; per-file URLs in `fsm-concepts-source/logos/clients/SOURCE.txt`. The page labels them "School logos from each school's public site (October 30). Reuse approval pending." | REQUIRES_CLIENT_CONFIRMATION (reuse of each mark, which needs the schools' permission too; whether Anawakalmekak appears, the brand owner was unsure; better files for Anawakalmekak and a dark-text Education for Change) |
| Contact form | Concept 05 "Work with us"; `FsmForm.tsx`, `siteConfig.leadConnector` | Version 2.1: a Full School Marketing form that posts to FilmTwist's LeadConnector "RFI Contact Form" `DveY4KWgzKqaGiHAAA2e` (location `6DjFgiECQC0Tt8gNX4vT`) with the widget's own payload. Fields, required flags, option lists, consent text and thank-you text are the form's own, read from the widget configuration 10/28/2026. Submissions go to FilmTwist's account; this site stores nothing. No test submission was made; the lead's arrival is unverified until one real submission is made. (Version 2 embedded the form as an iframe; `mode: 'embed'` restores that.) | REQUIRES_CLIENT_CONFIRMATION (one real submission to confirm delivery; FilmTwist may prefer a dedicated FSM form in the same account) |
| Case-study pages | `visible/work/{aspire,friendship,envision}/` | Every figure, descriptor, story line and image is the same record as the cards (`caseStudies.ts`), with the published source cited at the foot of each page. No new claims. | As the case studies |
| Hub checklist wording | Hub, "What Version 2 addresses" | Paraphrases of the 10/27 reviewer notes and the 10/28 asks, no names, no ratings. | Internal review copy |

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
| "The form goes straight to the team." | Concept 06 "Work with us" | Concept 05's line; the form posts to FilmTwist's form service (see Version 2.1 above). | As Concept 05 |
| Hub checklist wording, "What Version 1 addresses" | Hub, the current direction | Paraphrases of the October 27 notes on Concept 02 and the October 28 review of Concept 05, no names, no ratings. | Internal review copy |

## Unresolved approvals

1. Reuse of FilmTwist campaign creative (including student imagery) on the FSM site.
2. Attribution wording for the FilmTwist relationship.
3. Tagline lockup and the exact logo variant for the site header.
4. Service names and offer priority.
5. Consultation destination (consulting page vs. booking link vs. a hooked-up form with a privacy policy).
6. Privacy policy and terms text.
7. Which case studies and figures are approved for FSM.
8. Reuse of the FilmTwist team headshots, names and roles on the FSM site (Concept 05).
9. An FSM-specific LeadConnector form (fields, options, styling) in place of the agency's RFI Contact Form.
