# Full School Marketing: website direction concepts

Four working website directions for Full School Marketing (FSM), plus a client review hub, built as one static
Vite + React + TypeScript multi-page site so every page is deep-linkable on GitHub Pages.

| Path | Purpose |
| --- | --- |
| `/` | Review hub: four cards with real screenshots, side-by-side matrix, reviewer questions, feedback form, decision guide |
| `/clean/` | Concept 01: Clean & Modern ("A Clearer Path to Enrollment") |
| `/creative/` | Concept 02: Bold & Creative ("Creative That Fills Classrooms") |
| `/story/` | Concept 03: The Invisible School (scroll-driven story) |
| `/original/` | Concept 04: The Enrollment Year (season dial; the invented direction) |

Status: design concepts for client review. Not a live business site. Deployment status and live URLs are recorded in `docs/QA_REPORT.md`.

## Setup

Requires Node 22 or newer.

```bash
npm ci
npm run dev        # http://localhost:5173/  (hub), /clean/, /creative/, /story/, /original/
npm run build      # typecheck + production build to dist/
npm run preview    # serve dist/ at http://localhost:4173/
```

To preview exactly what GitHub Pages serves (project subpath):

```bash
BASE_PATH=/fsm-concepts/ npm run build && npm run preview
# open http://localhost:4173/fsm-concepts/
```

## Tests and screenshots

```bash
npm test                       # Playwright smoke suite (builds with BASE_PATH=/fsm-concepts/ and serves it)
npm run screenshots            # regenerate hub posters + docs/screenshots from a running preview server
node scripts/og.mjs            # regenerate Open Graph images in public/og
node scripts/optimize-assets.mjs  # rebuild public/assets from the raw source folder (see docs/ASSET_MANIFEST.md)
```

The suite covers: hub links, direct load and refresh of all five paths under the subpath, base-aware asset URLs, verified
case-study source links, services/case-study/CTA presence per concept, Concept 02 filters, Concept 03 skip and reduced
motion, Concept 04 season dial (click and keyboard), feedback persistence and export, no horizontal overflow at 375/390,
console and request errors, external link safety. Results: `docs/QA_REPORT.md`.

## Configuration

Everything client-editable lives in `src/content/`:

- `config.ts`: brand name, tagline, CTA labels, consultation destination, FilmTwist attribution, social links, legal placeholders.
- `services.ts`: the five provisional service categories and the four-step approach.
- `caseStudies.ts`: the three verified FilmTwist case studies (metrics, periods, source URLs, media, rights state).
- `media.ts`: image lookup. Swap a thumbnail by editing `scripts/optimize-assets.mjs` and re-running it; pages never hardcode paths.
- `concepts.ts`: hub card copy and the comparison matrix.

Environment variables (see `.env.example`):

| Variable | Default | Effect |
| --- | --- | --- |
| `BASE_PATH` | `/` | Vite base. The Pages workflow sets `/<repo-name>/`. Set `/` after moving to a custom domain. |
| `VITE_REVIEW_MODE` | `true` | `false` hides the reviewer ribbon and floating review pill (production output). |
| `VITE_FEEDBACK_ENDPOINT` | empty | If set, the hub shows a real Submit button that POSTs JSON to this URL (Formspree, Tally webhook, etc.). If empty, no submit button is shown. |

## Deployment (GitHub Pages)

1. Push to a GitHub repository. In the repo: Settings, Pages, Source: **GitHub Actions**.
2. `.github/workflows/deploy.yml` builds on every push to `main` with `BASE_PATH=/<repo-name>/` and deploys `dist/`.
3. The site is served at `https://<owner>.github.io/<repo-name>/`, with `/clean/`, `/creative/`, `/story/`, `/original/` as real directories, so hard refresh and deep links work without SPA rewrites.
4. Open Graph image URLs in the five HTML files point at `https://noahbra.github.io/fsm-concepts/og/*.png`; update them if the owner, repo name or domain changes.

Optional repository variables: `VITE_REVIEW_MODE`, `VITE_FEEDBACK_ENDPOINT`.

Alternatives: Cloudflare Pages or Vercel work with the same `dist/` output (`npm run build`, output directory `dist`, set `BASE_PATH=/`). Use Cloudflare Access (or Vercel password protection) if the client needs genuinely private review; a client-side password on a static site is not access control and is deliberately not implemented.

## Feedback

The hub form saves answers in the reviewer's browser (localStorage) as they type, for all four concepts. "Copy feedback"
and "Download .md / .json" always work and include every rated concept. Nothing is transmitted unless
`VITE_FEEDBACK_ENDPOINT` is configured. Reviewer feedback is never stored in this repository.

## Docs

- `docs/IMPLEMENTATION_PLAN.md`: technical approach and gates.
- `docs/CONCEPT_RATIONALES.md`: one page per direction.
- `docs/CONCEPT_04_CREATIVE_THESIS.md`: the invented concept, in full.
- `docs/CONTENT_AND_CLAIMS.md`: every metric and claim with its source, period and approval state.
- `docs/ASSET_MANIFEST.md`: every asset, provenance, rights state, where used.
- `docs/DECISION_GUIDE.md`: neutral rubric.
- `docs/QA_REPORT.md`: tests run, viewport checks, known limitations, deployment status.
- `docs/PRODUCTION_HANDOFF.md`: what remains to turn the chosen concept into the final site.

## Client handoff

Send the client the hub URL. They open each concept on a phone and a desktop, record ratings and comments on the hub, and
use Copy or Download to send the result back. Items marked REQUIRES_CLIENT_CONFIRMATION in `src/content/config.ts` and
`docs/CONTENT_AND_CLAIMS.md` need answers before production.
