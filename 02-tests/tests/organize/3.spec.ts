import test from '@playwright/test';

test.describe('3', { tag: ['@a', '@c', '@b'] }, () => {
  test('three', () => {});
});
