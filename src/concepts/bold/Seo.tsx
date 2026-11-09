import { siteConfig } from '../../content/config';
import type { CaseStudy } from '../../content/caseStudies';

/**
 * Structured data (schema.org JSON-LD) for the production site. Rendered inside the page so the build's prerender step
 * (scripts/prerender.mjs) captures it in the static HTML; the review site renders it too, harmlessly, under noindex.
 * Facts come from siteConfig only: the brand, its parent agency, the contact email, the verified social profiles, and the
 * postal address and phone from the legal pages (terms signed off November 9, 2026).
 * SITE_ORIGIN is injected at build (vite.config.ts `define`); the review origin is the fallback.
 */
const ORIGIN = (import.meta.env.VITE_SITE_ORIGIN as string | undefined) || 'https://noahbra.github.io/fsm-concepts/';
const abs = (p: string) => ORIGIN + p.replace(/^\//, '');

/** ['911 Marina Way South, Studio E1', 'Richmond, CA 94804', 'United States'] to a schema.org PostalAddress. */
function postalAddress(lines: readonly string[]) {
  const m = /^(.*), ([A-Z]{2}) (\d{5})$/.exec(lines[1] ?? '');
  return { '@type': 'PostalAddress', streetAddress: lines[0], addressLocality: m?.[1], addressRegion: m?.[2], postalCode: m?.[3], addressCountry: 'US' };
}

type Kind = { kind: 'home' } | { kind: 'case'; c: CaseStudy } | { kind: 'legal' };

export function JsonLd(props: Kind) {
  if (typeof document === 'undefined') return null;
  const title = document.title;
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? '';
  const path = document.location.pathname.replace(/^\/fsm-concepts\/bold\//, '').replace(/^\//, '');
  const orgId = abs('#organization');
  const siteId = abs('#website');
  const organization = {
    '@type': 'Organization',
    '@id': orgId,
    name: siteConfig.brandName,
    alternateName: siteConfig.shortName,
    url: ORIGIN,
    logo: abs('assets/brand/fsm-logo-horizontal.png'),
    description: siteConfig.heroLine,
    email: siteConfig.legal.email,
    telephone: siteConfig.legal.phone,
    address: postalAddress(siteConfig.legal.address),
    parentOrganization: { '@type': 'Organization', name: siteConfig.filmtwist.name, legalName: siteConfig.legal.entity, url: siteConfig.filmtwist.url },
    sameAs: siteConfig.social.filter((s) => s.verified).map((s) => s.url),
  };
  const website = { '@type': 'WebSite', '@id': siteId, url: ORIGIN, name: siteConfig.brandName, publisher: { '@id': orgId } };
  const page: Record<string, unknown> = {
    '@type': 'WebPage',
    url: abs(path),
    name: title,
    description,
    isPartOf: { '@id': siteId },
    publisher: { '@id': orgId },
  };
  if (props.kind === 'case') page.about = { '@type': 'EducationalOrganization', name: props.c.school };
  const data = { '@context': 'https://schema.org', '@graph': [organization, website, page] };
  return <script type="application/ld+json" data-testid="json-ld" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
