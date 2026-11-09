// Production-only post-build step (SITE=fsm): render each built page in Chromium and write the rendered markup into
// dist/<page>/index.html, so crawlers that do not run JavaScript (most AI search crawlers) read the page text, headings,
// links and structured data. React re-renders on load (createRoot replaces the static markup). The home page gets a
// static white cover (the opener's first frame) so the opener does not pop in over visible content. Also writes
// dist/llms.txt from the rendered pages. Page list: dist/sitemap.xml. Run after `npm run build`; needs Playwright Chromium.
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';
import { chromium } from 'playwright';

const dist = resolve('dist');
const sitemap = join(dist, 'sitemap.xml');
if (!existsSync(sitemap)) { console.error('prerender: dist/sitemap.xml missing; build the production site first (SITE=fsm)'); process.exit(2); }
const locs = [...readFileSync(sitemap, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const origin = new URL(locs[0]).origin + '/';
const pages = locs.map((l) => l.slice(origin.length));

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json', '.mp4': 'video/mp4', '.webm': 'video/webm', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = join(dist, p);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file) || statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': mime[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
const summary = [];
for (const p of pages) {
  await page.goto(`http://127.0.0.1:${port}/${p}`, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const data = await page.evaluate(() => {
    const root = document.getElementById('root');
    root.querySelectorAll('iframe, script[src], .review-ribbon, .review-pill').forEach((e) => e.remove());
    const text = (el) => (el.textContent || '').replace(/\s+/g, ' ').trim();
    return {
      html: root.innerHTML,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || '',
      h1: [...document.querySelectorAll('h1')].map(text),
      h2: [...document.querySelectorAll('h2')].map(text),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].length,
      textChars: text(root).length,
    };
  });
  const file = join(dist, p, 'index.html');
  let html = readFileSync(file, 'utf8');
  const m = html.match(/<div id="root"([^>]*)><\/div>/);
  if (!m) { console.error(`prerender: no empty #root in ${file}`); process.exit(2); }
  const cover = p === '' ? '<div class="cr-opener" aria-hidden="true"></div>' : '';
  html = html.replace(m[0], `<div id="root"${m[1]}>${cover}${data.html}</div>`);
  writeFileSync(file, html);
  summary.push({ path: p, ...data, html: undefined, bytes: html.length });
  console.log(`prerendered /${p}: ${data.textChars} text chars, h1 ${JSON.stringify(data.h1)}, json-ld ${data.jsonLd}, ${html.length} bytes`);
}
await browser.close();
server.close();
if (errors.length) { console.error('prerender: page errors', errors); process.exit(1); }

// llms.txt: what the site is, then one line per page, from the rendered pages themselves (no copy kept here).
const home = summary.find((s) => s.path === '');
const lines = [
  `# ${home.title.split(' | ')[0]}`,
  '',
  `> ${home.description}`,
  '',
  ...(home.h1.length ? [home.h1[0], ''] : []),
  'Full School Marketing is the school enrollment practice of FilmTwist Creative Agency (https://www.filmtwist.com/).',
  `Contact: ${origin}#contact`,
  '',
  '## Pages',
  '',
  ...summary.map((s) => `- [${s.title.split(' | ')[0]}](${origin}${s.path}): ${s.description}`),
  '',
  '## Sections of the home page',
  '',
  ...home.h2.filter(Boolean).map((h) => `- ${h}`),
  '',
];
writeFileSync(join(dist, 'llms.txt'), lines.join('\n'));
console.log('wrote dist/llms.txt');
