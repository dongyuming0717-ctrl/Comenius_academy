import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'https://localhost:5173',
    ignoreHTTPSErrors: true,
    headless: true,
  },
  webServer: {
    command: 'npx vite --host 0.0.0.0 --port 5173',
    url: 'https://localhost:5173',
    reuseExistingServer: true,
    ignoreHTTPSErrors: true,
    timeout: 15000,
  },
});
