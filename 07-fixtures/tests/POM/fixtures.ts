import { test as base, expect } from '@playwright/test';
import { CheckoutPage } from './checkout-page';

// Declare the types of your fixtures.
type MyFixtures = {
  checkoutPage: CheckoutPage;
};

export const test = base.extend<MyFixtures>({
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
    // Clean up if any
  },
});

export { expect } from '@playwright/test';
