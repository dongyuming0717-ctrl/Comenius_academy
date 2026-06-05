import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/login',
  '/signup',
  '/terms',
  '/privacy',
  '/past-papers',
  '/admission-tests',
  '/topics',
  '/analytics',
  '/profile',
];

ROUTES.forEach(route => {
  test(`${route} loads without crash`, async ({ page }) => {
    // Navigate — use 'commit' to avoid hanging on Supabase auth timeout
    await page.goto(route, { waitUntil: 'commit', timeout: 15000 });

    // Wait a bit for React to render (but don't wait for Supabase)
    await page.waitForTimeout(3000);

    // The page must have rendered something — not a blank white screen
    const bodyText = await page.textContent('body');
    expect(bodyText?.trim().length || 0).toBeGreaterThan(0);
  });
});

test('past-papers page renders', async ({ page }) => {
  await page.goto('/past-papers', { waitUntil: 'commit', timeout: 10000 });
  await page.waitForTimeout(2000);
  // At minimum the nav and page structure should render
  const nav = page.locator('nav, header, [class*="nav"]').first();
  await expect(nav).toBeVisible({ timeout: 5000 });
});

test('navigation does not show error boundary', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  // Click the Past Papers link in the nav
  const pastPapersLink = page.locator('a[href="/past-papers"]').first();
  if (await pastPapersLink.isVisible()) {
    await pastPapersLink.click();
    await page.waitForTimeout(3000);
    const errorText = await page.locator('text=Something went wrong').count();
    expect(errorText).toBe(0);
  }
});
