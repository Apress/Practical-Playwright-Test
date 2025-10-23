import { expect } from '@playwright/test';
import { test, testWithOption } from './my-test';

test('default value', async ({ person }) => {
  expect('John').toBe(person);
});

testWithOption('person from project configuration', async ({ person }) => {
  expect('Alice').toBe(person);
});
