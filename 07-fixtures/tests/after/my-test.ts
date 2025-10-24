import { test as base, expect, Page } from '@playwright/test';

type MyFixtures = {
  loggedInPage: Page;
  loggedInAdminPage: Page;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    await page.goto('/signin');
    await page.getByRole('textbox', { name: 'Username:' }).fill('user');
    await page.getByRole('textbox', { name: 'Password:' }).fill('user123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(
      page.getByRole('heading', { name: 'Welcome to the App!' }),
    ).toBeVisible();
    await use(page);
    await page.getByRole('button', { name: 'Logout' }).click();
  },
  loggedInAdminPage: async ({ page }, use) => {
    await page.goto('/signin');
    await page.getByRole('textbox', { name: 'Username:' }).fill('admin');
    await page
      .getByRole('textbox', { name: 'Password:' })
      .fill('admin123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(
      page.getByRole('heading', { name: 'Welcome to the App!' }),
    ).toBeVisible();
    await use(page);
    await page.getByRole('button', { name: 'Logout' }).click();
  },
});

export { expect } from '@playwright/test';
