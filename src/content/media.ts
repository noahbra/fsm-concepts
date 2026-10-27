import manifest from './assetManifest.generated.json';
import { url } from './config';

export type AssetRights = 'approved' | 'pending-approval' | 'concept-art';

export interface MediaAsset {
  /** Full-size WebP */
  src: string;
  /** srcset with half and full widths */
  srcSet: string;
  /** JPEG fallback for <picture> */
  fallback: string;
  width: number;
  height: number;
  alt: string;
  rights: AssetRights;
  /** Where the original was published */
  sourceUrl: string;
  caption?: string;
  /** Gallery category (used by Concept 02 filters) */
  category?: GalleryCategory;
}

export type GalleryCategory = 'enrollment' | 'video-photo' | 'digital-ads' | 'print-ooh';

export const galleryCategories: { id: 'all' | GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'enrollment', label: 'Enrollment campaigns' },
  { id: 'video-photo', label: 'Video & photo' },
  { id: 'digital-ads', label: 'Digital ads' },
  { id: 'print-ooh', label: 'Print & out-of-home' },
];

interface ManifestEntry { caseId: string; name: string; width: number; height: number; half: number; source: string }

/**
 * Look up an optimized campaign image by case and name.
 * Swap images by editing scripts/optimize-assets.mjs and re-running it; page components never hardcode paths.
 */
export function campaignMedia(
  caseId: 'aspire' | 'friendship' | 'envision',
  name: string,
  alt: string,
  opts: { rights?: AssetRights; sourceUrl: string; caption?: string; category?: GalleryCategory },
): MediaAsset {
  const m = (manifest.campaigns as ManifestEntry[]).find((e) => e.caseId === caseId && e.name === name);
  if (!m) throw new Error(`Missing campaign asset ${caseId}/${name}. Run node scripts/optimize-assets.mjs`);
  const base = `assets/campaigns/${caseId}/${name}`;
  return {
    src: url(`${base}-${m.width}.webp`),
    srcSet: `${url(`${base}-${m.half}.webp`)} ${m.half}w, ${url(`${base}-${m.width}.webp`)} ${m.width}w`,
    fallback: url(`${base}-${m.width}.jpg`),
    width: m.width,
    height: m.height,
    alt,
    rights: opts.rights ?? 'pending-approval',
    sourceUrl: opts.sourceUrl,
    caption: opts.caption,
    category: opts.category,
  };
}

export const brand = {
  logoHorizontal: { src: url('assets/brand/fsm-logo-horizontal.png'), webp: url('assets/brand/fsm-logo-horizontal.webp'), width: 1600, height: 466 },
  logoStacked: { src: url('assets/brand/fsm-logo-stacked.png'), webp: url('assets/brand/fsm-logo-stacked.webp'), width: 1200, height: 1404 },
  logoHorizontalWhite: { src: url('assets/brand/fsm-logo-horizontal-white.png'), webp: url('assets/brand/fsm-logo-horizontal-white.webp'), width: 1600, height: 466 },
  logoStackedWhite: { src: url('assets/brand/fsm-logo-stacked-white.png'), webp: url('assets/brand/fsm-logo-stacked-white.webp'), width: 1200, height: 1404 },
  logoHorizontalBlack: { src: url('assets/brand/fsm-logo-horizontal-black.png'), webp: url('assets/brand/fsm-logo-horizontal-black.webp'), width: 1600, height: 466 },
  emblemColor: url('assets/brand/fsm-emblem-color.svg'),
  emblemWhite: url('assets/brand/fsm-emblem-white.svg'),
  emblemBlack: url('assets/brand/fsm-emblem-black.svg'),
};
