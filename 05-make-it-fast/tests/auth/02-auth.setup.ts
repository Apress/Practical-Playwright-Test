import test, { expect, test as setup } from '@playwright/test';

const STORAGE_PATH = './.auth/user.json';

test.use({ testIdAttribute: 'data-test' });

setup('signin', async ({ page, context }) => {
  await page.goto('https://practicesoftwaretesting.com');

  await test.step('sign in', async () => {
    await page.getByTestId('nav-sign-in').click();

    await page
      .getByTestId('email')
      .fill('customer@practicesoftwaretesting.com');

    await page.getByTestId('password').fill('welcome01');
    await page.getByTestId('login-submit').click();
  });

  await expect(
    page.getByTestId('nav-menu').getByText('Jane Doe'),
  ).toBeVisible();

  // Save the storage
  await context.storageState({ path: STORAGE_PATH });
});
