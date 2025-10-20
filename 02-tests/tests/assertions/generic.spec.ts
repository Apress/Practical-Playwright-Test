import { test, expect } from '@playwright/test';

test.describe('generic assertions', () => {
  test('toMatchObject', () => {
    const value = {
      a: true,
      b: 4,
      c: {
        values: ['one', 'two', 'three'],
        anything: 21,
        color: 'red',
        prop: 2,
      },
    };
    const expectedValue = {
      a: true,
      c: {
        values: ['one', 'two', 'three'],
        anything: expect.anything(),
        color: expect.stringMatching(/red|blue/),
        prop: expect.any(Number),
      },
    };

    expect(value).toMatchObject(expectedValue);
  });
});
