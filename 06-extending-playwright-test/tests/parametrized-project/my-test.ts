import { test as base } from '@playwright/test';

export type TestOptions = {
  person: string;
};

export const test = base.extend<TestOptions>({
  person: 'John',
});

export const testWithOption = base.extend<TestOptions>({
  person: ['John', { option: true }],
});
