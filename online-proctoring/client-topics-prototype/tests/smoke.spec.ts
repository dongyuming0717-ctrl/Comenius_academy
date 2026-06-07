import { test, expect } from '@playwright/test';

test('page loads without crash', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);

  const title = await page.textContent('h1');
  expect(title).toContain('Topics');

  // Verify core sections exist
  const masteryText = await page.textContent('body');
  expect(masteryText).toContain('Overall Mastery');
  expect(masteryText).toContain('Generate Practice Paper');
  expect(masteryText).toContain('Topics');
});

test('sidebar topic selection works', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  // Click a topic in sidebar (first topic after Algebra)
  const topicButton = page.locator('text=Quadratics').first();
  if (await topicButton.isVisible()) {
    await topicButton.click();
    await page.waitForTimeout(500);
    // Should update the question count heading
    const heading = page.locator('h2');
    await expect(heading).toBeVisible();
  }
});

test('generate paper produces output', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  const generateBtn = page.locator('button', { hasText: 'Generate 20 Questions' }).first();
  await generateBtn.click();
  await page.waitForTimeout(500);

  // Check that paper preview appears
  const startExam = page.locator('text=Start Exam');
  await expect(startExam).toBeVisible({ timeout: 5000 });
});

test('practice modal opens and renders LaTeX', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(4000); // wait for KaTeX CDN

  const reviewBtn = page.locator('button', { hasText: 'Review' }).first();
  await reviewBtn.click();
  await page.waitForTimeout(2000);

  // Modal should be a fixed overlay
  const modal = page.locator('[style*="position: fixed"][style*="z-index: 1000"]');
  await expect(modal).toBeVisible();

  // LaTeX should be rendered (not raw $...$)
  const katexEls = page.locator('.katex');
  const count = await katexEls.count();
  expect(count).toBeGreaterThan(0);
});

test('generate mode switching works', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  // Switch to Adaptive mode
  const adaptiveBtn = page.locator('button', { hasText: 'Adaptive' }).first();
  await adaptiveBtn.click();
  await page.waitForTimeout(300);

  // Switch paper
  const paper2Btn = page.locator('button', { hasText: 'Paper 2' }).first();
  await paper2Btn.click();
  await page.waitForTimeout(300);

  // Generate
  const genBtn = page.locator('button', { hasText: 'Generate 20 Questions' }).first();
  await genBtn.click();
  await page.waitForTimeout(500);

  // Should say "Adaptive" in the output
  const paper = page.locator('text=Adaptive Paper');
  await expect(paper.first()).toBeVisible();
});
