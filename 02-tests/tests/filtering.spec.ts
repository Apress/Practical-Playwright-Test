import { test, expect } from '@playwright/test';

test.describe('filtering', () => {
  test('list of products', async ({ page }) => {
    await page.setContent(`
<ul>
  <li>
    <h3>Product 1</h3>
    <button>Add to cart</button>
  </li>
  <li>
    <h3>Product 2</h3>
    <button>Add to cart</button>
  </li>
</ul>`);

    // li has no accessible name
    const locator = page.getByRole('listitem').nth(0);
    await expect(locator).toHaveAccessibleName('');

    // simply with a text
    const product1 = page
      .getByRole('listitem')
      .filter({ hasText: 'Product 1' });
    await expect(product1).toBeVisible();

    // by Locator
    const product2 = page
      .getByRole('listitem')
      .filter({ has: page.getByRole('heading', { name: 'Product 2' }) });
    await expect(product2).toBeVisible();
  });
});
