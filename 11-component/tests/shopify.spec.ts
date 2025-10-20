import { test, expect } from '@playwright/test';

test('Shopify Autocomplete component', async ({ page }) => {
  await page.goto(
    'https://storybook.polaris.shopify.dev/iframe.html?globals=&id=all-components-autocomplete--with-multiple-tags&viewMode=story',
  );

  await page.getByRole('button', { name: 'Remove Rustic' }).click();
  await page.getByRole('combobox', { name: 'Tags' }).click();
  await page.getByRole('option', { name: 'Antique' }).click();
  await page.getByRole('combobox', { name: 'Tags' }).fill('refurbished');
  await page.getByRole('combobox', { name: 'Tags' }).press('Enter');

  await expect(page.locator('#storybook-root')).toContainText(
    'AntiqueRefurbished',
  );
  await expect(page).toHaveScreenshot();
});
