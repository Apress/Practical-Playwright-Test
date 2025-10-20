import { test, expect } from '@playwright/test';

test.describe('snapshots', () => {
  test('Snapshot', async ({}) => {
    expect('coucou').toMatchSnapshot();

    expect(JSON.stringify({ json: true })).toMatchSnapshot();
  });

  test('API Snapshot', async ({ request }) => {
    const response = await request.get(`https://catfact.ninja/facts`);
    const json = await response.json();

    expect(JSON.stringify(json.data)).toMatchSnapshot();
  });

  test('screenshot', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await expect(page).toHaveScreenshot();
    await expect(page).toHaveScreenshot({ fullPage: true });

    const locator = page.getByRole('banner');
    const stargazers = page.getByRole('link', {
      name: 'stargazers on GitHub',
    });
    await expect(locator).toHaveScreenshot({ mask: [stargazers] });
  });

  test('AriaSnapshot', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('banner')).toMatchAriaSnapshot();
  });
});
