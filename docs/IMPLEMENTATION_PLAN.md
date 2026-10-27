# Implementation plan

Prepared October 26, 2026. This is the short technical declaration required by Gate 0 of the build spec.

## Stack

- Vite 8, React 19, TypeScript 7, GSAP 3.15 (ScrollTrigger, Concept 03 only), `qrcode` (lazy-loaded for QR codes), `sharp` (build-time image pipeline), Playwright (smoke tests and screenshots).
- Static multi-page build: five HTML entry points (`index.html`, `clean/`, `creative/`, `story/`, `original/`), each mounting its own React entry. No client-side router, so hard refresh and deep links work on GitHub Pages without rewrites.
- Base-aware URLs everywhere via `import.meta.env.BASE_URL` (`url()` helper in `src/content/config.ts`); `BASE_PATH` env sets the Vite base at build time.
- Fonts self-hosted through `@fontsource-variable/*` so first paint does not depend on a third-party font CDN.

## Shared versus concept-specific

Shared: content modules (`src/content`), accessibility and review primitives (`src/components`), brand tokens (`src/styles/tokens.css`), motion and share helpers (`src/lib`).

Not shared: page layout, section templates, typography pairing, color treatment, animation. Each concept owns `src/concepts/<id>/` and its own stylesheet, so one concept's theme cannot leak into another.

| Concept | Type pairing | Canvas | Motion |
| --- | --- | --- | --- |
| 01 Clean | Josefin Sans + Inter | White, editorial | Load-in, hover and focus states |
| 02 Creative | Archivo (wide, black) + Josefin Sans | Ink black, electric green/teal | Kinetic type, marquee with pause, cursor tilt on desktop, inline expansion overlay |
| 03 Story | Josefin Sans + Nunito | Soft paper, desaturated to color | GSAP pinned side-scroll, skip and reduced-motion static frames |
| 04 Original | Space Grotesk + JetBrains Mono | FSM blue ink, warm paper, green for computed figures | Figures ease to new values; range dots slide |

## Gates

0. Source inventory: brand kit pulled from FilmTwist's Drive share (10/26/2026), case-study pages re-read live, typed content layer written. Done.
1. Shared build and hub: MPA scaffold, review chrome, feedback storage, base-path verification. Done.
2. Concepts 01 and 02. 3. Concept 03. 4. Concept 04 with thesis doc.
5. Review, tests, screenshots, deployment workflow, docs.

## Deliberate omissions

No course, e-book or module content (not the lead product). No contact form (no approved destination). No analytics, pixels, or keys. No client-side "password gate". No ROI percentages from the source pages (definitions unvalidated).
