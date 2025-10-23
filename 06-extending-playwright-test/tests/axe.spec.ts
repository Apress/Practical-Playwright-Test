import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AxeResults } from 'axe-core';

test('example with attachment', async ({ page }, testInfo) => {
  await page.goto('https://emma11y.github.io/tester-a11y/cas-pratique-5');

  const accessibilityScanResults: AxeResults = await new AxeBuilder({
    page,
  }).analyze();

  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(accessibilityScanResults, null, 2),
    contentType: 'application/json',
  });
});
