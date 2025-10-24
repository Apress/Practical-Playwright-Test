import { test, expect } from '@playwright/test';

test('extended timeouts', { tag: '@slow' }, async ({ page }) => {
  // Hello world appears after a long delay
  await page.setContent(`
        <script>
        setTimeout(() => {
            document.body.innerHTML = '<h1>Hello world</h1>';
            }, 40_000);
            </script>
            `);

  test.slow();
  const locator = page.getByRole('heading');
  await expect(locator).toHaveText('Hello world', { timeout: 0 });
});
