import { toBeFinite, toBeValidDate } from 'jest-extended';
import { test, expect as baseExpect } from '@playwright/test';

const expect = baseExpect.extend({ toBeFinite, toBeValidDate });

test('valid date', async () => {
  expect(new Date()).toBeValidDate();
  expect(new Date('01/01/2018')).toBeValidDate();
  expect(new Date('01/90/2018')).not.toBeValidDate();
});

test('passes when value is a finite number', () => {
  expect(1).toBeFinite();
  expect(Infinity).not.toBeFinite();
  expect(NaN).not.toBeFinite();
});
