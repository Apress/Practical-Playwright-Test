import { test } from '@playwright/test';

test.use({
  geolocation: { longitude: 48.1173, latitude: -1.6778 },
  permissions: ['geolocation'],
});

test('Geoloc', async ({ page, browserName }) => {
  await page.goto('https://www.bing.com/maps');
  await page.getByRole('link', { name: 'Accept' }).click();
  if (browserName === 'chromium') {
    return;
  }
  await page.getByRole('button', { name: 'Select Style' }).hover();
  await page.getByRole('option', { name: '3D' }).click();
  await page.getByRole('button', { name: '3D Flyover' }).click();
});
