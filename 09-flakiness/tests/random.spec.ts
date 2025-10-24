import { test, expect } from '@playwright/test';

test('randomly fails', async () => {
  // Randomly fails 30% of the time.
  expect(Math.random()).toBeGreaterThan(0.3);
});
