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

## Calls to action

- Active destination on all concepts: https://www.filmtwist.com/consulting (public page). No form claims to submit anything.
- Provisional booking link found on that page: https://calendly.com/dpathak/30min. Stored in config as `provisionalBookingUrl`, not linked. REQUIRES_CLIENT_CONFIRMATION.
- No free audit, conference discount, or guaranteed result is offered anywhere.

## Concept 04 seasonal copy

The "What to do now" checklists describe typical enrollment-season activities in general terms ("many schools", "typically")
and state that dates vary by state, district and school type. No specific deadlines, lottery dates or funding figures are claimed.

## Reference sites (client-cited)

- Website Example 1: https://schoolsmarketing.ca/ (plural). The brief cites schoolmarketing.ca (singular); FilmTwist's 10/26 email lists the plural domain. Treated as the same reference. REQUIRES_CLIENT_CONFIRMATION.
- Website Example 2: https://bloomenrollment.com/
- Website Example 3: https://www.kreativewebworks.com/
- Website Example 4: https://enrollmediagroup.com/

No text, layout or code was copied from any reference site.

## Unresolved approvals

1. Reuse of FilmTwist campaign creative (including student imagery) on the FSM site.
2. Attribution wording for the FilmTwist relationship.
3. Tagline lockup and the exact logo variant for the site header.
4. Service names and offer priority.
5. Consultation destination (consulting page vs. booking link vs. a hooked-up form with a privacy policy).
6. Privacy policy and terms text.
7. Which case studies and figures are approved for FSM.
