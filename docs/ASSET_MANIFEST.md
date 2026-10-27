# Asset manifest

Raw sources live outside the repo in `~/Desktop/fsm-concepts-source/` (not committed). `scripts/optimize-assets.mjs`
rebuilds `public/assets/` from them and writes `src/content/assetManifest.generated.json` (dimensions used for layout).

## Brand (first-party, supplied by FilmTwist)

Provenance: FilmTwist Drive share "Branding/Logos" (folder `1ghtT4GS21vGpZcMBvHRm_2F99Qph3iRw`), sent by Jackie Costanzo on
October 26, 2026. Usage rights: FSM's own brand assets; approved for FSM use by virtue of the share. The brand guide says: do
not distort, rotate, or recolor.

| File (public/assets/brand) | Source file | Format | Used in |
| --- | --- | --- | --- |
| fsm-logo-horizontal.png / .webp (1600x466) | Logo Files/Color/Full School Marketing Logo(V2)-01.png (10642x4539) | Raster, trimmed and resized | Hub header, Concept 01, 02, 04 headers, OG images |
| fsm-logo-stacked.png / .webp (1200x1404) | Logo Files/Color/Full School Marketing Logo(V2)-02.png | Raster | Concept 03 opening lockup |
| fsm-logo-horizontal-white.png / .webp | Logo Files/White/...-05.png | Raster | Concept 02 (dark canvas), footers |
| fsm-logo-stacked-white.png / .webp | Logo Files/White/...-06.png | Raster | Available |
| fsm-logo-horizontal-black.png / .webp | Logo Files/Black/...-03.png | Raster | Available |
| fsm-emblem-color.svg, -white.svg, -black.svg | Emblem Files/{Color,White,Black}/*.svg | Vector | Concept 03 details, Concept 04 header, favicon fallback |
| favicon/* (ico, 16, 32, 180, 192, 512, site.webmanifest) | Favicon/ | As supplied | All five HTML heads |
| (not committed) All Full School Marketing Logos.ai, Emblem .eps/.ai | Logo Files, Emblem Files | Vector masters | Production: derive an SVG wordmark lockup from the .ai |

Note: a full-logo vector (wordmark + hand) exists only as `.ai`; no SVG of the complete lockup was supplied. The tagline
"grow your own." is not part of any supplied logo file.

## Campaign creative (third-party-adjacent; rights pending)

Provenance: images published on FilmTwist's own case-study pages (Webflow CDN), downloaded October 26, 2026, resized and
re-encoded (WebP + JPEG fallback, two widths). They depict FilmTwist client schools and, in many cases, students.
**Usage rights: PENDING.** Every concept labels them "campaign creative from FilmTwist's published case studies; client
approval for reuse pending" (`assetsNote` in `src/content/caseStudies.ts`; `assetsReady: 'pending-approval'`). No
watermark or credit was removed; none existed on the files. Not hotlinked.

| Case | public/assets/campaigns/<case>/<name>-{w}.webp | Original CDN filename | Depicts | Used in |
| --- | --- | --- | --- | --- |
| aspire | classroom-photo | AspireCHA-22-min.jpg | Students drawing on blacktop | 01 hero, 02 gallery, 03/04 case cards |
| aspire | student-portrait | AspireCHA-44 (3)-min.jpg | Student writing | 02 gallery |
| aspire | math-field-day | 030423-Aspire-MathFieldDay-5 (2)-min.jpg | Students building | 02 gallery |
| aspire | playground-wide | Group 279 (1).jpg | Students on playground | 01 case card, 02 collage |
| aspire | social-ads-mockup | Frame 101... (Frame 100 (2).png) | Facebook ad + Instagram grid phone mockups | 02 hero/gallery (digital ads) |
| aspire | mailer-and-bus-ads | Frame 101.png | Mailer and bus ad designs | 02 gallery (print and OOH) |
| aspire | uniform-portrait, sports-day, graduation | Mask group (1), (2), (3).jpg | Event photography | 02 gallery |
| friendship | classroom-group | Frame 117.jpg | Students and teacher | 02 gallery, 03/04 |
| friendship | ad-learn-and-make-memories, ad-innovation-in-education, ad-education-starts-at-woodridge | 2023 Woodridge Ad Angles 1/(1)/(2)-min.jpg | Three square digital ads | 01/02/03/04 case cards and hero collage |
| friendship | transit-shelter-and-rail-poster | Group 298 (1)-min.png | Transit shelter ads and 2-sheet rail poster | 02 gallery |
| friendship | direct-mail | Frame 1000004615 (2)-min.png | Direct mail designs | 02 gallery |
| envision | students-trio, hug, campus-atrium, graduation-speaker, college-pennants, students-outdoor, graduate, classroom-laptop, teacher-and-students | EnvisionAcademyMG-136/-24, EnvisionAcademy2025-14, EnvisionCALGrad-346, Envision-EA+IA-148, Invision_10_18_22_0086, EnvisionSFGradTeasers-9, EnvisionAcademy-Teasers-9/-10 | School photography | Case cards, galleries |
| envision | bus-and-billboard-ads | Frame 109 (2).png | Bus ads and billboards | 02 hero/gallery |
| envision | door-hanger-and-mailer | Frame 110 (1).png | Door hangers and mailers | 02 gallery |

Not downloaded: the Webflow site-chrome images (FilmTwist favicon, icons, Facebook logo), gallery items marked "No items
found" on the source pages, and anything from the Vimeo channel (no video is used; none is approved).

## Generated (first-party, this repo)

| File | How | Used in |
| --- | --- | --- |
| public/assets/screenshots/{hub,clean,creative,story,original}-{desktop,mobile}.webp | `npm run screenshots` from the real built pages | Hub cards, OG images |
| docs/screenshots/*-full.png | same script, full page | QA report |
| public/og/*.png | `node scripts/og.mjs` (logo + headline + page screenshot) | `og:image` in each HTML head |
| Concept 03 town, school, signs, dots | Inline SVG written in React (`src/concepts/story/`) | Concept 03 only; concept illustration, not client work |
| Concept 04 worksheet range bars and funnel bars | HTML/CSS (`src/concepts/original/`) | Concept 04 only |
| Service glyphs | Inline SVG per concept | Services sections |

## Supplied but intentionally unused in version 1

E-Book (Slides `1s_Pxp8iKBPdljnZO1XHnY1LyMt17NeS5WjDM9838ur0`), Modules folder (`1VJDNsaVHLw6u8QU42M_dY-_PAqVRr7ZM`), "10 Day Course
Accelerator Logos" folder. The course is not the lead product; slots exist in `src/content/config.ts` if the client wants a
secondary mention later.
