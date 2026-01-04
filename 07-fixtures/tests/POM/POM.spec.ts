import { test, expect } from './fixtures';

test('checkout', async ({ page, checkoutPage }) => {
  await page.goto('/checkout');

  await checkoutPage.fill();
  await checkoutPage.submit();
  // ...
  await expect(page.getByRole('heading')).toContainText('Thank you!');
});
