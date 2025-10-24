import { test, expect } from '@playwright/test';

let one: string;
let two: string;

test.describe('composable test hooks', () => {
  test.beforeEach(async () => {
    one = 'Hello';
  });
  test.beforeEach(async () => {
    two = `${one} world`;
  });

  test('dependency', async () => {
    expect(two).toBe('Hello world');
  });
});
