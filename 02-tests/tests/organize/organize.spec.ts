import test, { expect } from '@playwright/test';

test('test', async ({ page }) => {
  await test.step('Log in', async () => {
    // ...
  });

  // ...
});

test.describe('a well organized test suite', () => {
  test.describe('logged in', () => {
    test.beforeEach(async () => {
      await test.step('login', async () => {
        // ...
      });
    });

    test('test 1', async () => {
      // ...
    });

    test('test 2', async () => {
      // ...
    });
  });

  test('logged out', async () => {
    // ...
  });
});
