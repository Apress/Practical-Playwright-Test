const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['Pixel 5'],
  });
  const page = await context.newPage();

  await page.goto('https://playwright.dev');

  // Full-page screenshot
  await page.screenshot({ path: 'home.png', fullPage: true });

  // Element screenshot
  const chart = page.locator('header');
  await chart.screenshot({ path: 'header.png' });

  await context.close();
  await browser.close();
})();
