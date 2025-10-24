import { test as base, expect } from '@playwright/test';

export const test = base.extend<{
  screenshotOnFail: boolean;
  forEachTest: void;
}>({
  screenshotOnFail: [false, { option: true }],
  forEachTest: [
    async ({ page, screenshotOnFail }, use, testInfo) => {
      await use();

      if (screenshotOnFail) {
        if (testInfo.status !== testInfo.expectedStatus) {
          const screenshot = await page.screenshot({ fullPage: true });
          await testInfo.attach('screenshot', {
            body: screenshot,
            contentType: 'image/png',
          });
        }
      }
    },
    { auto: true },
  ],
});

test.use({ screenshotOnFail: true });

test('homepage has wrong title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/DefinitelyWrongTitle/);
});
