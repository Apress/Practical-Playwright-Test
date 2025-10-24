import { expect, test } from '@playwright/test';

test.describe('normal user', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signin');
    await page.getByRole('textbox', { name: 'Username:' }).fill('user');
    await page.getByRole('textbox', { name: 'Password:' }).fill('user123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(
      page.getByRole('heading', { name: 'Welcome to the App!' }),
    ).toBeVisible();
  });
  test.afterEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click();
  });

  test('home should say hello', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(
      'Hi user! 👋',
    );
  });

  // ...
});

test.describe('admin user', () => {
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

  test('home should say hello admin', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(
      'Hello admin.',
    );
    await expect(
      page.getByRole('link', { name: 'Settings' }),
    ).toBeVisible();
  });

  test('settings page should display when admin', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Settings',
    );
  });
});
