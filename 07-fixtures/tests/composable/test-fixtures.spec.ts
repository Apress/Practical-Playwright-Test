import { test as base, expect } from '@playwright/test';

type MyFixtures = {
  one: string;
  two: string;
};

export const test = base.extend<MyFixtures>({
  one: async ({}, use) => {
    await use('Hello');
  },
  two: async ({ one }, use) => {
    await use(`${one} world`);
  },
});

test('composable test fixtures', async ({ two }) => {
  expect(two).toBe('Hello world');
});
