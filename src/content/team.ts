/**
 * The FilmTwist team, as published on https://www.filmtwist.com/about (read October 28, 2026).
 * October 29, 2026, from the brand owner: Jesse, Sunny Kim and Alec Gossage removed; Pat Angeles added in Alec's place
 * (headshot from her email; the title is from her own email signature, "Studio Administrator", to confirm).
 * Names and roles are the page's own wording; where the page shows only a first name, only the first name is used.
 * Photos are the page's headshots with the background lifted (public/assets/team). Reuse on the FSM site is a
 * client approval (REQUIRES_CLIENT_CONFIRMATION), like the campaign imagery. Order follows the About page.
 */
import { url } from './config';

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  photo: { webp: string; png: string; width: number; height: number };
}

export const teamSource = { url: 'https://www.filmtwist.com/about', readOn: '2026-10-28' };

const photo = (slug: string) => ({ webp: url(`assets/team/${slug}.webp`), png: url(`assets/team/${slug}.png`), width: 360, height: 360 });

export const team: TeamMember[] = [
  { slug: 'tien', name: 'Tien Louis-Goff', role: 'Operations Manager', photo: photo('tien') },
  { slug: 'deepa', name: 'Deepa Pathak', role: 'Managing Director / Owner', photo: photo('deepa') },
  { slug: 'jackie', name: 'Jackie Costanzo', role: 'Marketing Manager', photo: photo('jackie') },
  { slug: 'emily', name: 'Emily Martin', role: 'Marketing Associate', photo: photo('emily') },
  { slug: 'rhett', name: 'Rhett', role: 'Senior Photographer', photo: photo('rhett') },
  { slug: 'david', name: 'David', role: 'Senior Videographer', photo: photo('david') },
  { slug: 'kien', name: 'Kien', role: 'Senior Videographer', photo: photo('kien') },
  { slug: 'stefan', name: 'Stefan', role: 'PPC Manager', photo: photo('stefan') },
  { slug: 'pat', name: 'Pat Angeles', role: 'Studio Administrator', photo: photo('pat') }, // brand owner, 10/29: "in Alec's spot"; title from her own email signature (Patricia Angeles, Studio Administrator, 10/17)
];
