/**
 * Schools FSM has worked with, for the "Schools we've worked with" strip on Concept 06 (October 30, 2026).
 * The list is the brand owner's full client list (relayed by the project owner, October 30, 2026), plus Morgan Autism
 * Center and Visions In Education (project owner, the same afternoon) and Pathways Charter School (the decision maker's
 * proposal, named by the brand owner that evening; TK-12 independent study, Sonoma County); the list is alphabetical.
 * Logos were pulled from each school's own public site (or a public job-board copy) at the largest size served, except
 * Aspire's, which is FSM's own file from its brand folder (brand owner, October 30); provenance per file in
 * fsm-concepts-source/logos/clients/SOURCE.txt (not committed). Reuse of every mark on the FSM site is a client approval
 * (REQUIRES_CLIENT_CONFIRMATION). Anawakalmekak and Washington Yu Ying were the brand owner's question marks; she kept
 * both in on October 30.
 * `tone` is measured by scripts/client-logos.mjs: a mark that is mostly white or cream ('light') sits on the dark tile.
 */
import { url } from './config';
import manifest from './clientLogos.generated.json';

export interface ClientLogo {
  slug: string;
  name: string;
  /** Where the logo came from, for the record and the footnote. */
  source: string;
  /** svg, or png + webp, under assets/clients/. */
  svg?: string;
  png?: string;
  webp?: string;
  width: number;
  height: number;
  /** 'light' marks (white or cream lettering) need the dark tile. */
  tone: 'light' | 'dark';
  /** Open with the client: include at all, or a better file wanted. */
  flag?: string;
}

const names: Record<string, { name: string; source: string; flag?: string }> = {
  alpha: { name: 'Alpha Public Schools', source: 'edjoin.org/alphaps' },
  anawakalmekak: { name: 'Anawakalmekak', source: 'anawakalmekak.org', flag: 'In, per the brand owner (October 30); the only public logo is 308 px wide, a larger file is still welcome' },
  aspire: { name: 'Aspire Public Schools', source: 'FSM brand folder (purple-on-white horizontal, supplied October 30)' },
  'education-for-change': { name: 'Education for Change Public Schools', source: 'efcps.org', flag: 'Wordmark recolored from the published light version; the brand owner has no file for the current logo (October 30)' },
  envision: { name: 'Envision Education', source: 'envisionschools.org' },
  friendship: { name: 'Friendship Public Charter School', source: 'friendshipschools.org' },
  invictus: { name: 'Invictus Academy of Richmond', source: 'invictusofrichmond.org' },
  mpms: { name: 'Marin Primary & Middle School', source: 'mpms.org' },
  'morgan-autism-center': { name: 'Morgan Autism Center', source: 'morgancenter.org' },
  pathways: { name: 'Pathways Charter School', source: 'pathwayscharter.org', flag: 'The site\'s own mark and wordmark set side by side, as its header sets them; the school\'s own horizontal file is wanted' },
  'sherman-thomas': { name: 'Sherman Thomas Charter School', source: 'stcsca.org' },
  'summit-leadership-academy': { name: 'Summit Leadership Academy', source: 'edjoin.org/summitleadershipacademy' },
  'visions-in-education': { name: 'Visions In Education', source: 'viedu.org' },
  'washington-yu-ying': { name: 'Washington Yu Ying Public Charter School', source: 'washingtonyuying.org' },
};

export const clientsSource = { readOn: '2026-10-30', note: 'School logos from each school\'s public site (October 30). Reuse approval pending.' };

export const clients: ClientLogo[] = (manifest as Array<{ slug: string; svg?: string; png?: string; webp?: string; width: number; height: number; tone: 'light' | 'dark' }>).map((m) => ({
  slug: m.slug,
  ...names[m.slug],
  svg: m.svg ? url(`assets/clients/${m.svg}`) : undefined,
  png: m.png ? url(`assets/clients/${m.png}`) : undefined,
  webp: m.webp ? url(`assets/clients/${m.webp}`) : undefined,
  width: m.width,
  height: m.height,
  tone: m.tone,
}));
