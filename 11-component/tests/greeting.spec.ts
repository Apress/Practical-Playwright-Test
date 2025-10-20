import { test, expect } from '@playwright/test';

test('loads and displays greeting - with Storybook', async ({ page }) => {
  await page.goto(
    'http://localhost:6006/iframe.html?id=greetingcomponent--default&viewMode=story',
  );
  const button = page.getByRole('button', { name: 'Load Greeting' });

  await button.click();

  await expect(page.getByRole('heading')).toHaveText('hello there');
  await expect(button).toBeDisabled();
});
