// Prepares the "Schools we've worked with" logos for Concept 06: trims each logo, fits it in a 520x240 box (2x of the
// 260x120 tile), writes png + webp (or copies the SVG), and measures whether the logo is mostly light (white or cream
// marks need the dark tile). Sources: ~/Desktop/fsm-concepts-source/logos/clients/<slug>/ (SOURCE.txt has every URL).
// usage: node scripts/client-logos.mjs
import sharp from 'sharp';
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';

const SRC = join(homedir(), 'Desktop/fsm-concepts-source/logos/clients');
const OUT = new URL('../public/assets/clients/', import.meta.url).pathname;
const BOX = { w: 520, h: 240 };
const clients = [
  ['alpha', 'alpha/alpha-public-schools-vertical-1648.png'],
  ['anawakalmekak', 'anawakalmekak/anawakalmekak-wordmark-308.png'],
  ['aspire', 'aspire/aspire-public-schools-horizontal-purple-on-white-1576.png'],
  ['education-for-change', 'education-for-change/education-for-change-primary-wordmark-blue-3300.png'],
  ['envision', 'envision/envision-education-full-color.svg'],
  ['friendship', 'friendship/friendship-public-charter-school.svg'],
  ['invictus', 'invictus/invictus-academy-of-richmond-2500.png'],
  ['mpms', 'mpms/marin-primary-middle-school-1058.png'],
  ['morgan-autism-center', 'morgan-autism-center/morgan-autism-center.svg'],
  ['pathways', 'pathways/pathways-charter-school-horizontal-3107.png'],
  ['sherman-thomas', 'sherman-thomas/sherman-thomas-charter-schools-947.png'],
  ['summit-leadership-academy', 'summit-leadership-academy/summit-leadership-academy-3928.png'],
  ['visions-in-education', 'visions-in-education/visions-in-education-horizontal-2304.png'],
  ['washington-yu-ying', 'washington-yu-ying/washington-yu-ying-horizontal-982.png'],
];

async function lightness(input) {
  // mean relative luminance of the opaque pixels, 0 (black) to 1 (white)
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let sum = 0, n = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i + 3] < 128) continue;
    sum += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255; n++;
  }
  return n ? sum / n : 0;
}

await mkdir(OUT, { recursive: true });
const manifest = [];
for (const [slug, rel] of clients) {
  const src = join(SRC, rel);
  const isSvg = rel.endsWith('.svg');
  let width, height, files;
  if (isSvg) {
    await copyFile(src, join(OUT, `${slug}.svg`));
    const meta = await sharp(src).metadata();
    width = meta.width; height = meta.height; files = { svg: `${slug}.svg` };
  } else {
    const trimmed = sharp(src).ensureAlpha().trim({ threshold: 10 });
    const tmp = await trimmed.png().toBuffer();
    const meta = await sharp(tmp).metadata();
    const scale = Math.min(BOX.w / meta.width, BOX.h / meta.height, 1);
    width = Math.round(meta.width * scale); height = Math.round(meta.height * scale);
    await sharp(tmp).resize({ width, height, fit: 'inside' }).png({ compressionLevel: 9 }).toFile(join(OUT, `${slug}.png`));
    await sharp(tmp).resize({ width, height, fit: 'inside' }).webp({ quality: 90, lossless: false }).toFile(join(OUT, `${slug}.webp`));
    files = { png: `${slug}.png`, webp: `${slug}.webp` };
  }
  const l = await lightness(isSvg ? await sharp(src).resize({ width: 800 }).png().toBuffer() : join(OUT, `${slug}.png`));
  const tone = l > 0.72 ? 'light' : 'dark';
  manifest.push({ slug, ...files, width, height, lightness: +l.toFixed(2), tone });
  console.log(slug.padEnd(26), `${width}x${height}`.padEnd(10), 'lightness', l.toFixed(2), tone === 'light' ? '-> DARK TILE' : '');
}
await writeFile(new URL('../src/content/clientLogos.generated.json', import.meta.url), JSON.stringify(manifest, null, 2));
