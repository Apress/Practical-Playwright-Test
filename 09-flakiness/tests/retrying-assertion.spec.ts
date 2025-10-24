import test, { expect } from '@playwright/test';

test.describe('auto-retrying', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`<h1></h1>
        <script>
            setTimeout(() => {
                document.querySelector('h1').textContent = 'Hello';
            }, 100);
        </script>`);
  });

  test('non-retrying assertion', async ({ page }) => {
    const locator = page.getByRole('heading');
    expect(await locator.textContent()).toBe('Hello');
  });
  test('poll non-retrying assertion', async ({ page }) => {
    const locator = page.getByRole('heading');
    await expect
      .poll(async () => await locator.textContent())
      .toBe('Hello');
  });

  test('web-first assertion, not awaited and interrupted', async ({
    page,
  }) => {
    const locator = page.getByRole('heading');
    // Fails because it does not wait
    expect(locator).toHaveText('Hello');
  });
  test('web-first assertion, not awaited', async ({ page }) => {
    const locator = page.getByRole('heading');
    // Always passes because the Promise is "lost"
    expect(locator).toHaveText('Hello');
    await page.waitForTimeout(2000);
  });
});
