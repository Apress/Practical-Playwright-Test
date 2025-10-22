import { test, expect } from '@playwright/test';

test('text match', async ({ page }) => {
  await page.setContent(`
    <html>
      <body>
        <div>Hello World</div>
      </body>
    </html>
  `);

  // substring match
  await expect(page.getByText('llo Worl')).toBeVisible();
  // ignore case
  await expect(page.getByText('hello world')).toBeVisible();
  // full string match
  await expect(page.getByText('Hello World', { exact: true })).toBeVisible();

  // substring match
  await expect(page.getByText(/World/)).toBeVisible();
  // full string match, ignore case
  await expect(page.getByText(/^hello world$/i)).toBeVisible();
  // matches "hello world", "hello Jane", and more
  await expect(page.getByText(/Hello .+/i)).toBeVisible();
});
