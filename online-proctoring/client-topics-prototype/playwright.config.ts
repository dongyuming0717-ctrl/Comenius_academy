import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:5174',
    headless: true,
  },
  webServer: {
    command: 'npx vite --port 5174 --host 0.0.0.0 --strictPort',
    url: 'http://localhost:5174',
    reuseExistingServer: true,
    timeout: 15000,
  },
});
