# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> /analytics loads without crash
- Location: tests/smoke.spec.ts:17:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const ROUTES = [
  4  |   '/',
  5  |   '/login',
  6  |   '/signup',
  7  |   '/terms',
  8  |   '/privacy',
  9  |   '/past-papers',
  10 |   '/admission-tests',
  11 |   '/topics',
  12 |   '/analytics',
  13 |   '/profile',
  14 | ];
  15 | 
  16 | ROUTES.forEach(route => {
  17 |   test(`${route} loads without crash`, async ({ page }) => {
  18 |     // Navigate — use 'commit' to avoid hanging on Supabase auth timeout
  19 |     await page.goto(route, { waitUntil: 'commit', timeout: 15000 });
  20 | 
  21 |     // Wait a bit for React to render (but don't wait for Supabase)
  22 |     await page.waitForTimeout(3000);
  23 | 
  24 |     // The page must have rendered something — not a blank white screen
  25 |     const bodyText = await page.textContent('body');
> 26 |     expect(bodyText?.trim().length || 0).toBeGreaterThan(0);
     |                                          ^ Error: expect(received).toBeGreaterThan(expected)
  27 |   });
  28 | });
  29 | 
  30 | test('past-papers page renders', async ({ page }) => {
  31 |   await page.goto('/past-papers', { waitUntil: 'commit', timeout: 10000 });
  32 |   await page.waitForTimeout(2000);
  33 |   // At minimum the nav and page structure should render
  34 |   const nav = page.locator('nav, header, [class*="nav"]').first();
  35 |   await expect(nav).toBeVisible({ timeout: 5000 });
  36 | });
  37 | 
  38 | test('navigation does not show error boundary', async ({ page }) => {
  39 |   await page.goto('/', { waitUntil: 'domcontentloaded' });
  40 |   // Click the Past Papers link in the nav
  41 |   const pastPapersLink = page.locator('a[href="/past-papers"]').first();
  42 |   if (await pastPapersLink.isVisible()) {
  43 |     await pastPapersLink.click();
  44 |     await page.waitForTimeout(3000);
  45 |     const errorText = await page.locator('text=Something went wrong').count();
  46 |     expect(errorText).toBe(0);
  47 |   }
  48 | });
  49 | 
```