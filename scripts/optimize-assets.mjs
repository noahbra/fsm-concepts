/**
 * Builds the optimized public assets from the raw source folder.
 * Source folder (not committed): ~/Desktop/fsm-concepts-source
 * Output: public/assets/brand, public/assets/campaigns, public/og
 * Run: node scripts/optimize-assets.mjs
 */
import sharp from 'sharp';
import { mkdir, copyFile, readdir, writeFile } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';
import { homedir } from 'node:os';

const SRC = process.env.FSM_SOURCE_DIR || join(homedir(), 'Desktop', 'fsm-concepts-source');
const OUT = new URL('../public/assets/', import.meta.url).pathname;

async function ensure(dir) { await mkdir(dir, { recursive: true }); }

async function logo(src, outBase, width) {
  const img = sharp(src).trim();
  await img.clone().resize({ width }).png({ compressionLevel: 9, palette: false }).toFile(`${outBase}.png`);
  await img.clone().resize({ width }).webp({ quality: 92, alphaQuality: 100 }).toFile(`${outBase}.webp`);
  const meta = await sharp(`${outBase}.png`).metadata();
  return { file: basename(outBase), width: meta.width, height: meta.height };
}

async function campaign(caseId, file, outName, maxW = 1400) {
  const src = join(SRC, 'campaigns', caseId, file);
  const dir = join(OUT, 'campaigns', caseId);
  await ensure(dir);
  const meta = await sharp(src).metadata();
  const w = Math.min(maxW, meta.width);
  const half = Math.round(w / 2);
  const base = join(dir, outName);
  await sharp(src).resize({ width: w }).webp({ quality: 82 }).toFile(`${base}-${w}.webp`);
  await sharp(src).resize({ width: half }).webp({ quality: 80 }).toFile(`${base}-${half}.webp`);
  await sharp(src).resize({ width: w }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${base}-${w}.jpg`);
  const outMeta = await sharp(`${base}-${w}.webp`).metadata();
  return { caseId, name: outName, width: outMeta.width, height: outMeta.height, half, source: file };
}

const manifest = { logos: [], campaigns: [], site: [] };

await ensure(join(OUT, 'brand'));
manifest.logos.push(await logo(join(SRC, 'logos/fsm-logo-color-01.png'), join(OUT, 'brand/fsm-logo-horizontal'), 1600));
manifest.logos.push(await logo(join(SRC, 'logos/fsm-logo-color-02.png'), join(OUT, 'brand/fsm-logo-stacked'), 1200));
manifest.logos.push(await logo(join(SRC, 'logos/fsm-logo-white-05.png'), join(OUT, 'brand/fsm-logo-horizontal-white'), 1600));
manifest.logos.push(await logo(join(SRC, 'logos/fsm-logo-white-06.png'), join(OUT, 'brand/fsm-logo-stacked-white'), 1200));
manifest.logos.push(await logo(join(SRC, 'logos/fsm-logo-black-03.png'), join(OUT, 'brand/fsm-logo-horizontal-black'), 1600));
for (const v of ['color', 'white', 'black']) {
  await copyFile(join(SRC, `emblem/fsm-emblem-${v}.svg`), join(OUT, `brand/fsm-emblem-${v}.svg`));
}
await ensure(join(OUT, 'brand/favicon'));
for (const f of await readdir(join(SRC, 'favicon'))) {
  await copyFile(join(SRC, 'favicon', f), join(OUT, 'brand/favicon', f));
}

// Campaign creative published on filmtwist.com case-study pages (rights: pending client approval).
const C = [
  ['aspire', 'aspire-cha-22.jpg', 'classroom-photo'],
  ['aspire', 'aspire-cha-44.jpg', 'student-portrait'],
  ['aspire', 'aspire-mathfieldday.jpg', 'math-field-day'],
  ['aspire', 'hero-group279.jpg', 'playground-wide'],
  ['aspire', 'frame100.png', 'social-ads-mockup'],
  ['aspire', 'frame101.png', 'mailer-and-bus-ads'],
  ['aspire', 'mask1.jpg', 'uniform-portrait'],
  ['aspire', 'mask2.jpg', 'sports-day'],
  ['aspire', 'mask3.jpg', 'graduation'],
  ['friendship', 'hero-frame117.jpg', 'classroom-group'],
  ['friendship', 'woodridge-ad-1.jpg', 'ad-learn-and-make-memories'],
  ['friendship', 'woodridge-ad-2.jpg', 'ad-innovation-in-education'],
  ['friendship', 'woodridge-ad-3.jpg', 'ad-education-starts-at-woodridge'],
  ['friendship', 'group298.png', 'transit-shelter-and-rail-poster'],
  ['friendship', 'frame1000004615.png', 'direct-mail'],
  ['envision', 'academy-mg-136.jpg', 'students-trio'],
  ['envision', 'academy-mg-24.jpg', 'hug'],
  ['envision', 'academy2025-14.jpg', 'campus-atrium'],
  ['envision', 'calgrad-346.jpg', 'graduation-speaker'],
  ['envision', 'ea-ia-148.jpg', 'college-pennants'],
  ['envision', 'frame109.png', 'bus-and-billboard-ads'],
  ['envision', 'frame110.png', 'door-hanger-and-mailer'],
  ['envision', 'invision-0086.jpg', 'students-outdoor'],
  ['envision', 'sfgrad-teasers-9.jpg', 'graduate'],
  ['envision', 'teasers-9.jpg', 'classroom-laptop'],
  ['envision', 'teasers-10.jpg', 'teacher-and-students'],
];
for (const [c, f, n] of C) manifest.campaigns.push(await campaign(c, f, n));

// Site images that are not campaign creative: the Concept 06 hero photograph, taken from filmtwist.com by the project owner
// on October 29, 2026 (provenance in fsm-concepts-source/site/*.SOURCE.txt; rights: pending client approval).
async function site(file, outName, maxW = 1400) {
  const src = join(SRC, 'site', file);
  const dir = join(OUT, 'site');
  await ensure(dir);
  const meta = await sharp(src).metadata();
  const w = Math.min(maxW, meta.width);
  const half = Math.round(w / 2);
  const base = join(dir, outName);
  await sharp(src).resize({ width: w }).webp({ quality: 82 }).toFile(`${base}-${w}.webp`);
  await sharp(src).resize({ width: half }).webp({ quality: 80 }).toFile(`${base}-${half}.webp`);
  await sharp(src).resize({ width: w }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${base}-${w}.jpg`);
  const outMeta = await sharp(`${base}-${w}.webp`).metadata();
  return { name: outName, width: outMeta.width, height: outMeta.height, half, source: file };
}
for (const [f, n] of [['hero-school-steps.png', 'hero-school-steps']]) manifest.site.push(await site(f, n));

await writeFile(new URL('../src/content/assetManifest.generated.json', import.meta.url), JSON.stringify(manifest, null, 2));
console.log('logos', manifest.logos);
console.log('campaigns', manifest.campaigns.length);
