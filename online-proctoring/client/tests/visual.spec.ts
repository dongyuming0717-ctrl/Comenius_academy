import { test, expect } from '@playwright/test';

const KEY_PAGES = [
  { name: 'past-papers', path: '/past-papers' },
  { name: 'admission-tests', path: '/admission-tests' },
  { name: 'topics', path: '/topics' },
  { name: 'login', path: '/login' },
];

for (const { name, path } of KEY_PAGES) {
  test(`visual: ${name}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'commit', timeout: 10000 });
    // Disable animations for stable screenshots
    await page.addStyleTag({ content: '*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }' });
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: false,
      maxDiffPixels: 10000,
    });
  });
}
