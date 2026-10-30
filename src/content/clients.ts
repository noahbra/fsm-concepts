/**
 * Schools FSM has worked with, for the "Schools we've worked with" strip on Concept 06 (October 30, 2026).
 * The list is the brand owner's full client list (relayed by the project owner, October 30, 2026), in her order.
 * Logos were pulled from each school's own public site (or a public job-board copy) at the largest size served;
 * provenance per file in fsm-concepts-source/logos/clients/SOURCE.txt (not committed). Reuse of every mark on the
 * FSM site is a client approval (REQUIRES_CLIENT_CONFIRMATION). Anawakalmekak is on the list with the brand owner's
 * own question mark ("not sure if you want to include this one"), so it stays in until she decides.
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
  anawakalmekak: { name: 'Anawakalmekak', source: 'anawakalmekak.org', flag: 'Brand owner unsure whether to include; the only public logo is 308 px wide' },
  aspire: { name: 'Aspire Public Schools', source: 'aspirepublicschools.org' },
  'education-for-change': { name: 'Education for Change Public Schools', source: 'efcps.org', flag: 'Only the light (cream on dark) version is published; a dark-text primary is wanted' },
  envision: { name: 'Envision Education', source: 'envisionschools.org' },
  friendship: { name: 'Friendship Public Charter School', source: 'friendshipschools.org' },
  invictus: { name: 'Invictus Academy of Richmond', source: 'invictusofrichmond.org' },
  mpms: { name: 'Marin Primary & Middle School', source: 'mpms.org' },
  'sherman-thomas': { name: 'Sherman Thomas Charter School', source: 'stcsca.org' },
  'summit-leadership-academy': { name: 'Summit Leadership Academy', source: 'edjoin.org/summitleadershipacademy' },
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
