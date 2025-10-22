import { test, expect } from '@playwright/test';

test.use({ testIdAttribute: 'data-test' });

test('test with authenticated state', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');

  await page.getByTestId('nav-menu').click();
  await page.getByTestId('nav-my-profile').click();

  await expect(page.getByLabel('First name')).toHaveValue('Jane');
  await expect(page.getByLabel('Last name')).toHaveValue('Doe');
});
