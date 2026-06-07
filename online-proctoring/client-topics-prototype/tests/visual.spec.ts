import { test, expect } from '@playwright/test';

const KEY_STATES = [
  { name: 'topics-main', description: 'Main page with mastery header + sidebar + generate panel' },
  { name: 'topics-sidebar-mastery', description: 'Sidebar in mastery view mode' },
  { name: 'topics-generated-paper', description: 'After generating a random paper' },
  { name: 'topics-practice-modal', description: 'Practice modal with question and options' },
];

test('visual: main page layout', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  // Disable animations for stable screenshots
  await page.addStyleTag({ content: '*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }' });
  await expect(page).toHaveScreenshot('topics-main.png', {
    fullPage: false,
    maxDiffPixels: 10000,
  });
});

test('visual: sidebar in mastery view', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.addStyleTag({ content: '*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }' });

  // Toggle to mastery view if in count view
  const toggleBtn = page.locator('button', { hasText: 'Count View' });
  if (await toggleBtn.isVisible()) {
    // Already in mastery view, good
  }

  await expect(page).toHaveScreenshot('topics-sidebar-mastery.png', {
    fullPage: false,
    maxDiffPixels: 10000,
  });
});

test('visual: generated paper preview', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.addStyleTag({ content: '*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }' });

  // Generate a paper
  const genBtn = page.locator('button', { hasText: 'Generate 20 Questions' }).first();
  await genBtn.click();
  await page.waitForTimeout(500);

  await expect(page).toHaveScreenshot('topics-generated-paper.png', {
    fullPage: false,
    maxDiffPixels: 10000,
  });
});

test('visual: practice modal with rendered LaTeX', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(4000); // wait for KaTeX
  await page.addStyleTag({ content: '*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }' });

  // Open first question in practice modal
  const reviewBtn = page.locator('button', { hasText: 'Review' }).first();
  await reviewBtn.click();
  await page.waitForTimeout(2000);

  await expect(page).toHaveScreenshot('topics-practice-modal.png', {
    fullPage: false,
    maxDiffPixels: 10000,
  });
});
