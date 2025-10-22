import { test, expect } from '@playwright/test';

test.use({
  testIdAttribute: 'data-pw',
});

test('getByTestId', async ({ page }) => {
  await page.setContent(`
    <html>
      <body>
        <button data-testid="directions">Itinéraire</button>
        <button data-pw="alternate-directions">Itinéraire Bis</button>
      </body>
    </html>
  `);

  await expect(page.locator('[data-testid="directions"]')).toBeVisible();
  await expect(page.getByTestId('alternate-directions')).toBeVisible();
});
