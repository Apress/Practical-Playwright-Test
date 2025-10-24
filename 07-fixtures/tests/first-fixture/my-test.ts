import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/fr';

export const test = base.extend<{ myFixture: string }>({
  myFixture: async ({}, use) => {
    console.log('Setup');
    await use(faker.person.firstName());
    console.log('Teardown');
  },
});
