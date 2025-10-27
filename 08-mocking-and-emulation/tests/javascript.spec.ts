import { test } from '@playwright/test';

test('evaluate', async ({ page }) => {
  const res = await page.evaluate('1 + 2');
  console.log(res); // Prints "3"

  const res2 = await page.evaluate(() => 1 + 2);
  console.log(res2); // Prints "3"
});

test('evaluate with parameter', async ({ page }) => {
  const name = 'Jane';
  // Displays "Hello "
  await page.evaluate(() => document.writeln(`Hello ${name}<br>`));

  // Displays "Hello Jane"
  await page.evaluate((n) => document.writeln(`Hello ${n}<br>`), name);
});
