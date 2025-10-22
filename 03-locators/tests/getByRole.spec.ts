import { test, expect } from '@playwright/test';

test('text match', async ({ page }) => {
  await page.setContent(`
    <html>
      <body>
        <button>Hello World</button>
      </body>
    </html>
  `);

  // substring match
  await expect(page.getByRole('button', { name: 'llo Worl' })).toBeVisible();
  // ignore case
  await expect(page.getByRole('button', { name: 'hello world' })).toBeVisible();
  // full string match
  await expect(
    page.getByRole('button', { name: 'Hello World', exact: true }),
  ).toBeVisible();

  // substring match
  await expect(page.getByRole('button', { name: /World/ })).toBeVisible();
  // full string match, ignore case
  await expect(
    page.getByRole('button', { name: /^hello world$/i }),
  ).toBeVisible();
  // matches "hello world", "hello Jane", and more
  await expect(page.getByRole('button', { name: /Hello .+/i })).toBeVisible();
});
