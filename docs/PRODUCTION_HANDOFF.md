# Production handoff

What remains to turn the chosen concept into the final Full School Marketing site.

## Decisions needed from the client (blocking)

1. Choose a direction (or name the sections to combine).
2. Approve reuse of FilmTwist campaign creative on the FSM site, case by case, including student imagery and any model releases FilmTwist holds for Aspire, Friendship PCS and Envision.
3. Approve the FilmTwist relationship wording and where it appears (trust strip, proof block, footer).
4. Approve the tagline lockup ("grow your own." as live text under the official logo) or supply the layered logo artwork.
5. Approve the five service names and the order they appear in.
6. Decide the consultation destination: FilmTwist consulting page, the Calendly link, or a form with a privacy policy and a named recipient.
7. Supply privacy policy and terms text, a business address if one should be shown, and confirm social profile ownership.
8. Decide whether the e-book or course gets a secondary mention anywhere.

## Engineering work

- Promote the winning concept's entry to the site root; retire the other three and the hub (keep the repo history).
- Set `VITE_REVIEW_MODE=false` and remove the review chrome and `noindex` meta.
- Replace raster logos with an SVG lockup derived from `All Full School Marketing Logos.ai`.
- Add the remaining pages the client wants (Services detail, Work index, About, Contact) and real navigation targets; add a sitemap and robots.
- Hook up the CTA: either the approved booking link or a form with a backend (Formspree, Netlify Forms, or a CRM endpoint) plus consent language.
- Image pipeline: AVIF alongside WebP, art-directed crops per breakpoint for the hero, poster-backed video if FilmTwist supplies approved footage.
- Analytics only after consent language is in place (none is installed now).
- Accessibility pass against WCAG 2.2 AA with a screen reader (VoiceOver, NVDA); the automated checks here are a floor, not a certificate.
- Performance pass: Lighthouse on a mid-range Android over throttled 4G; budget the hero image and fonts; preload the largest contentful image.
- Hosting: GitHub Pages is fine for the concept review. For production, Cloudflare Pages or Vercel gives custom domain, redirects, forms and access control; point the client's DNS when ready (not done in this round).
- Concept-specific:
  - 02: confirm every gallery item is approved; add true video assets with pause controls if desired.
  - 03: test the pinned story on real iOS Safari and low-end Android; keep the static reduced-motion path in sync when scenes change.
  - 05 (the merged direction, `src/concepts/visible/`): it is a fork of 03's story code, so promoting it means promoting `visible/` and `visible/work/*` and retiring `story/` along with the other originals. Confirm the three new copy claims (hero line, team line with "started in 2020", first-conversation line) before launch; wire the merged-feedback fields out of the review build with the rest of the review chrome.
  - 05 contact form: the page embeds FilmTwist's LeadConnector "RFI Contact Form" (`siteConfig.leadConnector`). Its look, fields, options and consent text live in FilmTwist's LeadConnector account and cannot be styled from this site; it also runs Cloudflare Turnstile, so a native form cannot post to it. Recommended: FilmTwist duplicates the form in LeadConnector as an FSM form (white background, kit-blue button, Josefin Sans, school-specific "What type of services" and budget options, an FSM tag on the lead), then the one `formId` value is swapped. LeadConnector and Turnstile set cookies, so the consent language in decision 7 should cover the form.
  - 05 team: the eleven cut-out headshots were lifted from the About-page files at 200px to 1,979px; the five smaller ones (Jesse, Rhett, David, Kien, Stefan) are soft at 2x. Ask FilmTwist for the originals before launch.
  - 04: confirm the client is comfortable with the worksheet arithmetic on their published campaign figures; consider adding a "send me my worksheet" email capture.

## Content work

- Final copy pass in the client's voice (tone of voice section of the brand guide).
- Decide which case metrics to lead with, and whether to add newer FSM-run campaigns when available.
- Alt text review for every campaign image by someone who knows the campaigns.

## Estimated shape of the work

Roughly two to three weeks of focused design and development after decisions 1 through 7 land, assuming no CMS. A CMS
(Sanity, Contentful, or Webflow CMS, which FilmTwist already uses) adds a week and is worth it only if the client will edit
case studies regularly.
