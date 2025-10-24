import { test, expect } from '@playwright/test';

test.describe('settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signin');
    await page.getByRole('textbox', { name: 'Username:' }).fill('admin');
    await page
      .getByRole('textbox', { name: 'Password:' })
      .fill('admin123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(
      page.getByRole('heading', { name: 'Welcome to the App!' }),
    ).toBeVisible();
  });
  test.afterEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click();
  });

  test('should display options', async ({ page }) => {
    await page.goto('/settings');
    await expect(
      page.getByRole('heading', { name: 'Application Settings' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'User Management' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'System Configuration' }),
    ).toBeVisible();
  });
});
