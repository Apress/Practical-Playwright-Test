import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');
  await page.getByRole('button', { name: 'Consent' }).click();

  const from = page
    .locator('#post-2669')
    .getByRole('paragraph')
    .locator('iframe')
    .contentFrame()
    .getByRole('img', { name: 'The peaks of High Tatras' });
  const to = page
    .locator('#post-2669')
    .getByRole('paragraph')
    .locator('iframe')
    .contentFrame()
    .locator('#trash');

  await from.dragTo(to);
});
