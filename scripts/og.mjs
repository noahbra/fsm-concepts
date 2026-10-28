/** Generates Open Graph images (1200x630) into public/og from the brand logo and, when present, page screenshots. */
import sharp from 'sharp';
import { mkdir, access } from 'node:fs/promises';

await mkdir('public/og', { recursive: true });
const logo = await sharp('public/assets/brand/fsm-logo-horizontal.png').resize({ width: 520 }).toBuffer();
const titles = {
  hub: ['Website Direction Review', 'The merged direction and the four concepts it came from'],
  clean: ['Great schools deserve full classrooms.', 'Concept 01: Clean & Modern'],
  creative: ['Make your school the one families remember.', 'Concept 02: Bold & Creative'],
  story: ['The Invisible School', 'Concept 03: a scroll-driven story'],
  original: ['Start With Your Number', 'Concept 04: a worksheet, not a brochure'],
  visible: ['Ads, video and landing pages that bring families to your school.', 'Concept 05: the merged direction'],
};
for (const [id, [t, s]] of Object.entries(titles)) {
  const shot = `public/assets/screenshots/${id}-desktop.webp`;
  let hasShot = true; try { await access(shot); } catch { hasShot = false; }
  // The thumbnail sits in the top-right band (y 60 to 347), the text block below it, so neither covers the other.
  // Titles longer than one line at 40px wrap once at the nearest space to the middle.
  const esc = (x) => x.replace(/&/g, '&amp;');
  const lines = [];
  if (t.length > 36) {
    const mid = Math.floor(t.length / 2);
    const left = t.lastIndexOf(' ', mid); const right = t.indexOf(' ', mid);
    const cut = right === -1 || (left !== -1 && mid - left <= right - mid) ? left : right;
    lines.push(t.slice(0, cut), t.slice(cut + 1));
  } else lines.push(t);
  const size = lines.length > 1 ? 40 : t.length > 28 ? 44 : 52;
  const titleSvg = lines.map((l, i) => `<text x="80" y="${410 + i * (size + 6)}" font-family="Helvetica, Arial, sans-serif" font-size="${size}" font-weight="700" fill="#1f3d5c">${esc(l)}</text>`).join('');
  const subY = 410 + (lines.length - 1) * (size + 6) + 52;
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#ffffff"/>
    <rect x="0" y="0" width="14" height="630" fill="#3d6ea3"/><rect x="14" y="0" width="10" height="630" fill="#32b67a"/>
    ${titleSvg}
    <text x="80" y="${subY}" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#2e7f79">${esc(s)}</text>
    <text x="80" y="580" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="#666">Design concept for review. Not a live business site.</text>
  </svg>`;
  const layers = [{ input: logo, left: 80, top: 90 }];
  if (hasShot) {
    const thumb = await sharp(shot).resize({ width: 440, height: 275, fit: 'cover', position: 'top' }).png().toBuffer();
    const framed = await sharp({ create: { width: 452, height: 287, channels: 4, background: '#1f3d5c' } }).composite([{ input: thumb, left: 6, top: 6 }]).png().toBuffer();
    layers.push({ input: framed, left: 680, top: 60 });
  }
  await sharp(Buffer.from(svg)).composite(layers).png().toFile(`public/og/${id}.png`);
  console.log('og', id, hasShot ? 'with screenshot' : 'logo only');
}
