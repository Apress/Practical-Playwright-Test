import { expect, test } from './my-test';

test.describe('home', () => {
  test('should say hello', async ({ loggedInPage: page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(
      'Hi user! 👋',
    );
  });

  // ...

  test('should say hello when admin', async ({
    loggedInAdminPage: page,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(
      'Hello admin.',
    );
    await expect(
      page.getByRole('link', { name: 'Settings' }),
    ).toBeVisible();
  });
});
