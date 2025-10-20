import test from '@playwright/test';

test.describe('2', { tag: '@b' }, () => {
  test('two', () => {});
});
