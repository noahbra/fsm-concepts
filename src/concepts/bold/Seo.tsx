import { siteConfig } from '../../content/config';
import type { CaseStudy } from '../../content/caseStudies';

/**
 * Structured data (schema.org JSON-LD) for the production site. Rendered inside the page so the build's prerender step
 * (scripts/prerender.mjs) captures it in the static HTML; the review site renders it too, harmlessly, under noindex.
 * Facts come from siteConfig only: the brand, its parent agency, the contact email and the verified social profiles.
 * The postal address and phone stay off here on purpose; they live on the terms page, which the client has not signed off.
 * SITE_ORIGIN is injected at build (vite.config.ts `define`); the review origin is the fallback.
 */
const ORIGIN = (import.meta.env.VITE_SITE_ORIGIN as string | undefined) || 'https://noahbra.github.io/fsm-concepts/';
const abs = (p: string) => ORIGIN + p.replace(/^\//, '');

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
