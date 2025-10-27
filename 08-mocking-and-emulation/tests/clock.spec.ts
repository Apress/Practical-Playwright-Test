import { test, expect } from '@playwright/test';

test.describe('clock', () => {
  test('setFixedTime', async ({ page }) => {
    await page.goto('/current-time.html');
    await page.clock.setFixedTime(new Date('2024-02-02T10:00:00'));
    await expect(page.locator('#clock')).toContainText('10:00:00');
  });

  test('countdown fast forward', async ({ page }) => {
    await page.clock.install();
    await page.goto('/countdown-timer.html');

    await page.clock.fastForward('05:00');

    await expect.soft(page.getByText('Only 1 minute remaining!')).toBeVisible();
    await expect(page.getByText('Time is up!')).toBeVisible();
  });

  test('countdown run', async ({ page }) => {
    await page.clock.install();
    await page.goto('/countdown-timer.html');

    await page.clock.runFor('05:00');

    await expect(page.getByText('Only 1 minute remaining!')).toBeVisible();
    await expect(page.getByText('Time is up!')).toBeVisible();
  });
});
