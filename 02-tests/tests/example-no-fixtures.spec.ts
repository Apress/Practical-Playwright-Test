import {
  test,
  expect,
  chromium,
  Browser,
  Page,
  BrowserContext,
} from '@playwright/test';

test.describe('example', () => {
  // Test setup
  let browser: Browser, context: BrowserContext, page: Page;
  test.beforeAll(async () => {
    browser = await chromium.launch();
  });
  test.afterAll(async () => {
    await browser.close();
  });
  test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
  });
  test.afterEach(async () => {
    await context.close();
  });

  test('has title', async () => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async () => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole('heading', { name: 'Installation' }),
    ).toBeVisible();
  });
});
