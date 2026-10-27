import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke tests run against the PRODUCTION build served under the GitHub Pages subpath (/fsm-concepts/),
 * so deep links, hard refresh and base-aware asset URLs are what gets tested.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://localhost:4173/fsm-concepts/', trace: 'retain-on-failure' },
  webServer: {
    command: 'BASE_PATH=/fsm-concepts/ npm run build && npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173/fsm-concepts/',
    reuseExistingServer: true,
    timeout: 180_000,
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'chromium-mobile', use: { ...devices['Pixel 7'] } },
    { name: 'webkit-desktop', use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } } },
    { name: 'webkit-mobile', use: { ...devices['iPhone 14'] } },
  ],
});
