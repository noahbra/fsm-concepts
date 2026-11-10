import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { rmSync } from 'node:fs';
import type { Plugin } from 'vite';

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/fsm-concepts/").
// Locally it defaults to "/" so `npm run dev` works at http://localhost:5173/.
// After a custom-domain migration, set BASE_PATH=/ in the workflow.
const base = process.env.BASE_PATH || '/';

// SITE=fsm builds the production site: Concept 06 alone, at the root (its case pages at /work/<school>/, its legal pages at /terms/ and /privacy/), no hub, no other
// concepts, no frozen review copies. SITE_ORIGIN rewrites the absolute og:image URLs (default: the review site's).
// VITE_INDEXABLE=true strips the robots noindex meta at launch. The review site is the default (SITE unset).
const site = process.env.SITE === 'fsm' ? 'fsm' : 'review';
const siteOrigin = (process.env.SITE_ORIGIN || 'https://noahbra.github.io/fsm-concepts/').replace(/\/?$/, '/');
const indexable = process.env.VITE_INDEXABLE === 'true';
// Google Search Console ownership token (the content of its HTML-tag method); a repo variable, production only. Not a secret.
const googleSiteVerification = (process.env.GOOGLE_SITE_VERIFICATION || '').trim();
// Google Tag Manager container for the production site, supplied by the brand owner on November 10, 2026 (she set up Google
// Analytics and asked for the tag). The id is public in every page's HTML by design. Empty GTM_CONTAINER_ID disables it.
const gtmContainerId = (process.env.GTM_CONTAINER_ID ?? 'GTM-P2HFWB7T').trim();
const gtmHead = gtmContainerId ? `<!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmContainerId}');</script>
    <!-- End Google Tag Manager -->
    ` : '';
const gtmBody = gtmContainerId ? `<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmContainerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    ` : '';

const reviewInput = {
  hub: resolve(__dirname, 'index.html'),
  clean: resolve(__dirname, 'clean/index.html'),
  creative: resolve(__dirname, 'creative/index.html'),
  story: resolve(__dirname, 'story/index.html'),
  original: resolve(__dirname, 'original/index.html'),
  visible: resolve(__dirname, 'visible/index.html'),
  bold: resolve(__dirname, 'bold/index.html'),
  'bold-work-aspire': resolve(__dirname, 'bold/work/aspire/index.html'),
  'bold-work-friendship': resolve(__dirname, 'bold/work/friendship/index.html'),
  'bold-work-alpha': resolve(__dirname, 'bold/work/alpha/index.html'),
  'bold-terms': resolve(__dirname, 'bold/terms/index.html'),
  'bold-privacy': resolve(__dirname, 'bold/privacy/index.html'),
  'visible-work-aspire': resolve(__dirname, 'visible/work/aspire/index.html'),
  'visible-work-friendship': resolve(__dirname, 'visible/work/friendship/index.html'),
  'visible-work-alpha': resolve(__dirname, 'visible/work/alpha/index.html'),
};
const fsmInput = {
  bold: resolve(__dirname, 'bold/index.html'),
  'bold-work-aspire': resolve(__dirname, 'bold/work/aspire/index.html'),
  'bold-work-friendship': resolve(__dirname, 'bold/work/friendship/index.html'),
  'bold-work-alpha': resolve(__dirname, 'bold/work/alpha/index.html'),
  'bold-terms': resolve(__dirname, 'bold/terms/index.html'),
  'bold-privacy': resolve(__dirname, 'bold/privacy/index.html'),
};

/** Production site: move bold/ to the root, rewrite the og:image origin, strip noindex at launch, add the Search Console tag and Google Tag Manager, emit robots.txt and sitemap.xml, prune review-only files. */
function fsmSite(): Plugin {
  return {
    name: 'fsm-site',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      let out = html.split('https://noahbra.github.io/fsm-concepts/').join(siteOrigin);
      // One canonical URL per page, at the production origin (the page path without bold/ and without index.html).
      const pagePath = ctx.path.replace(/^\//, '').replace(/^bold\//, '').replace(/index\.html$/, '');
      out = out.replace('<meta name="viewport"', `<link rel="canonical" href="${siteOrigin}${pagePath}" />\n    <meta name="viewport"`);
      out = out.split('"../assets/').join('"' + base.replace(/\/?$/, '/') + 'assets/'); // the page sits at the root now, not under bold/
      out = out.split('="../assets/').join('="' + base.replace(/\/?$/, '/') + 'assets/').split(' ../assets/').join(' ' + base.replace(/\/?$/, '/') + 'assets/');
      if (indexable) out = out.replace(/\s*<meta name="robots" content="noindex" \/>/, '');
      if (googleSiteVerification) out = out.replace('<meta name="viewport"', `<meta name="google-site-verification" content="${googleSiteVerification}" />\n    <meta name="viewport"`);
      if (gtmHead) out = out.replace('</head>', gtmHead + '</head>').replace('<body>', '<body>\n    ' + gtmBody);
      out = out.split(' Concept 06: Bold, rebuilt.').join(''); // the review label has no place in the production description
      return out;
    },
    generateBundle(_, bundle) {
      const pages: string[] = [];
      for (const item of Object.values(bundle)) {
        if (item.fileName.startsWith('bold/') && item.fileName.endsWith('.html')) item.fileName = item.fileName.slice('bold/'.length);
        if (item.fileName.endsWith('index.html')) pages.push(item.fileName.slice(0, -'index.html'.length));
      }
      // robots.txt and sitemap.xml exist only on the production site; the review hub stays noindex and gets neither.
      // Six URLs, one per built page (home, three case pages, terms, privacy). No lastmod: a build date is not a content date.
      const rank = (p: string) => (p === '' ? 0 : p.startsWith('work/') ? 1 : 2); // home, case pages, legal
      pages.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
      const urls = pages.map((p) => `  <url><loc>${siteOrigin}${p}</loc></url>`).join('\n');
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n` });
      const robots = indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}sitemap.xml\n` : 'User-agent: *\nDisallow: /\n';
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
    },
    closeBundle() {
      const out = resolve(__dirname, 'dist');
      for (const p of ['6a', '6b', 'bold', 'screenshots', 'assets/screenshots', 'assets/story', 'og/clean.png', 'og/creative.png', 'og/hub.png', 'og/original.png', 'og/story.png', 'og/visible.png']) rmSync(resolve(out, p), { recursive: true, force: true });
    },
  };
}

export default defineConfig({
  base,
  plugins: site === 'fsm' ? [react(), fsmSite()] : [react()],
  define: { 'import.meta.env.VITE_SITE': JSON.stringify(site), 'import.meta.env.VITE_SITE_ORIGIN': JSON.stringify(siteOrigin) },
  build: {
    target: 'es2020',
    assetsDir: 'static', // built chunks go to /static so they never collide with public/assets
    rollupOptions: { input: site === 'fsm' ? fsmInput : reviewInput },
  },
  server: { port: 5173, strictPort: false },
  preview: { port: 4173, strictPort: false },
});
