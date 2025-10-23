import { expect as baseExpect } from '@playwright/test';
import { toBeFinite, toBeValidDate } from 'jest-extended';
import * as layoutMatchers from './layout-matchers';

export const expect = baseExpect.extend({
  toBeFinite,
  toBeValidDate,
  ...layoutMatchers,
});
