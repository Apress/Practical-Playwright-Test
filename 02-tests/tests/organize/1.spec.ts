import test from '@playwright/test';

test.describe('1', { tag: '@a' }, () => {
  test('one', () => {});
});
