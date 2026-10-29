import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/fsm-concepts/").
// Locally it defaults to "/" so `npm run dev` works at http://localhost:5173/.
// After a custom-domain migration, set BASE_PATH=/ in the workflow.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    assetsDir: 'static', // built chunks go to /static so they never collide with public/assets
    rollupOptions: {
      input: {
        hub: resolve(__dirname, 'index.html'),
        clean: resolve(__dirname, 'clean/index.html'),
        creative: resolve(__dirname, 'creative/index.html'),
        story: resolve(__dirname, 'story/index.html'),
        original: resolve(__dirname, 'original/index.html'),
        visible: resolve(__dirname, 'visible/index.html'),
        bold: resolve(__dirname, 'bold/index.html'),
        'bold-work-aspire': resolve(__dirname, 'bold/work/aspire/index.html'),
        'bold-work-friendship': resolve(__dirname, 'bold/work/friendship/index.html'),
        'bold-work-envision': resolve(__dirname, 'bold/work/envision/index.html'),
        'visible-work-aspire': resolve(__dirname, 'visible/work/aspire/index.html'),
        'visible-work-friendship': resolve(__dirname, 'visible/work/friendship/index.html'),
        'visible-work-envision': resolve(__dirname, 'visible/work/envision/index.html'),
      },
    },
  },
  server: { port: 5173, strictPort: false },
  preview: { port: 4173, strictPort: false },
});
