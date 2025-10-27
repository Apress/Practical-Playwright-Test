import { test, expect } from '@playwright/test';

test('CPU throttling', async ({ context, browserName }) => {
  if (browserName !== 'chromium') {
    test.skip();
  }

  const page1 = await context.newPage();
  await page1.goto('https://dacris.github.io/jsmark/benchModern.html');

  const page2 = await context.newPage();
  const client = await page2.context().newCDPSession(page2);
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page2.goto('https://dacris.github.io/jsmark/benchModern.html');
});
