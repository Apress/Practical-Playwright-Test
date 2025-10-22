import { test, expect } from '@playwright/test';
import { PlaywrightBlocker } from '@ghostery/adblocker-playwright';

test.describe('blocking', () => {
  test.skip('domain', async ({ page }) => {
    await page.route('https://*.ads.com/**', (route) => route.abort());

    // Start your tests AFTER you've set up route
    await page.goto('/');
  });

  test('image', async ({ page }) => {
    await page.route('**/*', (route) => {
      return route.request().resourceType() === 'image'
        ? route.abort()
        : route.continue();
    });

    await page.goto('https://playwright.dev/');

    await expect(
      page.getByRole('heading', { name: 'Playwright' }),
    ).toBeVisible();
  });

  test('without ad blocker', async ({ page }) => {
    await page.goto('https://canyoublockit.com/testing/');
    // I can't for the life of me close this ad
    await page.getByRole('link', { name: '' }).click();
    await page.getByRole('link', { name: 'Finish' }).click();

    await expect(
      page.getByRole('heading', { name: 'results' }),
    ).toBeVisible();
  });

  test('with ad blocker', async ({ page }) => {
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking();
    blocker.enableBlockingInPage(page);

    await page.goto('https://canyoublockit.com/testing/');
    await page.getByRole('link', { name: 'Finish' }).click();

    await expect(
      page.getByRole('heading', { name: 'results' }),
    ).toBeVisible();
  });
});
