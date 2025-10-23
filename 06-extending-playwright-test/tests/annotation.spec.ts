import { test, expect } from '@playwright/test';

test(
  'annotation',
  {
    annotation: {
      type: 'issue',
      description: 'https://github.com/microsoft/playwright/issues/23180',
    },
  },
  async () => {
    // ...
  },
);

test(
  'Several annotations',
  {
    annotation: [
      {
        type: 'issue',
        description:
          'https://github.com/microsoft/playwright/issues/23180',
      },
      {
        type: 'comment',
        description: 'Annotations can be used to add arbitrary content',
      },
      {
        type: '_hidden',
        description: 'https://en.wikipedia.org/wiki/The_Game_(mind_game)',
      },
    ],
  },
  async () => {
    // ...
  },
);

test.describe(
  'report tests',
  {
    annotation: { type: 'category', description: 'report' },
  },
  () => {
    test('test report header', async ({ page }) => {
      // ...
    });

    test(
      'test full report',
      {
        annotation: [
          { type: 'category', description: 'report' },
          { type: 'performance', description: 'very slow test!' },
        ],
      },
      async ({ page }) => {
        // ...
      },
    );
  },
);
