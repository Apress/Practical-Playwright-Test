const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://www.example.com/');
  await page.pdf({
    path: './example.pdf',
    format: 'A4',
  });

  // ---------------------
  await context.close();
  await browser.close();
})();
