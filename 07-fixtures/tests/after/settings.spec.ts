import { expect, test } from './my-test';

test.describe('settings', () => {
  test('settings page should display when admin', async ({
    loggedInAdminPage: page,
  }) => {
    await page.goto('/settings');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Settings',
    );
  });

  test('should display options', async ({ loggedInAdminPage: page }) => {
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
