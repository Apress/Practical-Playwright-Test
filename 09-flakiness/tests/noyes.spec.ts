import { test, expect } from '@playwright/test';

// This test will fail on first attempt
test('always flaky', async ({}, testInfo) => {
  if (!testInfo.retry) {
    expect(false).toBeTruthy();
  }
});
