import { test, expect } from '@playwright/test';

test('custom expect message', async () => {
  expect(3, 'to be 3 : Adel, Filip, Frank').toBe(3);
});

test('custom expect message with error', async () => {
  expect(2, 'to be 3 : Adel, Filip, Frank').toBe(3);
});
