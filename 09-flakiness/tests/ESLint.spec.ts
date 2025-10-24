import { test, expect } from '@playwright/test';

// https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/missing-playwright-await.md
test('missing Playwright await', async ({ page }) => {
  // ❌ Incorrect
  page.getByRole('button').click();
  expect(page.locator('#promotional-banner')).toBeVisible();

  // ✅ Correct
  await page.getByRole('button').click();
  await expect(page.locator('#promotional-banner')).toBeVisible();
});

// https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-useless-await.md
test('No useless await', async ({ page }) => {
  // ❌ Incorrect
  await page.getByRole('heading');
  await expect(1).toBe(1);
  await expect(true).toBeTruthy();

  // ✅ Correct
  page.getByRole('heading');
  expect(1).toBe(1);
  expect(true).toBeTruthy();
});

// https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/prefer-web-first-assertions.md
test('Prefer web-first assertions', async ({ page }) => {
  // ❌ Incorrect
  expect(await page.locator('.post').isVisible()).toBe(true);
  expect(await page.locator('.post').isEnabled()).toBe(true);
  expect(await page.locator('.post').innerText()).toBe('bar');

  // ✅ Correct
  await expect(page.locator('.post')).toBeVisible();
  await expect(page.locator('.post')).toBeEnabled();
  await expect(page.locator('.post')).toHaveText('bar');
});
