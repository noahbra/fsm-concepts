# Working on this site with an agent

Read this first. It is the map for anyone, human or AI agent, asked to change the Full School Marketing site.

## What this is

A static site: Vite, React, TypeScript. No server, no database, no CMS. The live direction is Concept 06 in
`src/concepts/bold/` (the page) and `src/concepts/bold/work/` (the three case-study pages). The other folders under
`src/concepts/` are earlier directions kept for the record; the hub at `/` is review chrome and comes off at launch.

## Three commands

```bash
npm ci                  # install (Node 22 or newer)
npm run build           # typecheck + production build to dist/   (BASE_PATH=/subpath/ if the site lives under one)
npm test                # 280 checks in four browsers; run before handing anything back
```

The production site (Concept 06 at the root, nothing else) is the same build with `SITE=fsm`; the workflow in
`.github/workflows/deploy.yml` sets it from repository variables, so a push to the production repo deploys it. Locally:
`SITE=fsm VITE_REVIEW_MODE=false VITE_FEEDBACK=off npm run build`.

## Where things live

| Change | File |
| --- | --- |
| Page copy, section order, layout | `src/concepts/bold/App.tsx`, styles in `src/concepts/bold/bold.css` |
| Team roster (names, titles, order) | `src/content/team.ts`; headshots in `public/assets/team/` |
| Schools strip (the logo row) | `src/content/clients.ts` for the names; drop the logo file in the source folder, list it in `scripts/client-logos.mjs`, run `node scripts/client-logos.mjs` |
| Case studies (figures, sources, creative) | `src/content/caseStudies.ts` (`caseStudies` are the three on the cards and the case pages); images in `public/assets/` |
| Services (names, order, blurbs) | `src/content/services.ts` |
| Contact form (the sheet receiver's URL in `inquiryForm`, FilmTwist's LeadConnector ids, the `mode` switch), site URL, review mode | `src/content/config.ts`; the receiver itself is `scripts/inquiry-form.gs` |
| Opener animation (the mark that lands on the header) | `src/concepts/bold/Opener.tsx` |
| Terms and privacy pages (the text) | `src/content/legal.ts`; rendered by `src/concepts/bold/LegalPage.tsx` at `/terms/` and `/privacy/` |
| Tests | `tests/smoke.spec.ts` |

Generated files (`*.generated.json`) are written by the scripts; do not edit them by hand.

## Rules that kept this site honest

- **No invented claims.** Every figure, name and quote on the page traces to a source listed in
  `docs/CONTENT_AND_CLAIMS.md`. Add the source there when you add a claim. If there is no source, do not add the claim.
- **Logos and photos belong to other people.** Reuse of each school mark and each headshot is a client approval, tracked in
  the same register. Do not add a logo because it looks right.
- **No secrets, keys or analytics in the source.** The form ids in `config.ts` are public widget ids, not credentials.
- **Keep the three no-regression checks:** no lone tile starting a row, no white logo on a white tile, the form payload
  shape. The tests assert all three; if a test fails, fix the site, not the test.
- **Reduced motion is a feature.** Every animation has a static path; keep it when you change the moving one.
- American spelling. No em dashes.

## Before you hand back

1. `npm run build` passes.
2. `npm test` passes, or you say exactly which check fails and why.
3. `docs/QA_REPORT.md` gets a dated line saying what changed and what you measured.
4. If you added a claim, a logo or a photo, `docs/CONTENT_AND_CLAIMS.md` says where it came from.

## Read next

- `docs/CONCEPT_06_BRIEF.md`: every design decision and the review round that drove it.
- `docs/PRODUCTION_HANDOFF.md`: what is still open with the client and what launch needs.
- `docs/QA_REPORT.md`: what was measured, when, and what is deployed.
