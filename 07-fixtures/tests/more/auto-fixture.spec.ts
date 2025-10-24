import { test as base, expect } from '@playwright/test';

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({}, use) => {
      console.log('setup');
      await use();
      console.log('teardown');
    },
    { auto: true },
  ], // automatically starts for every test.
});

test('basic', async ({}) => {
  console.log('test');
});
