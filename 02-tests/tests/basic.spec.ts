import { test, expect } from '@playwright/test';

test.describe('basic', () => {
  test('goto', async ({ page }) => {
    const response = await page.goto(
      'https://playwright.dev/docs/api/class-playwright',
    );

    expect(response?.status()).toBe(200);
    // ok() means HTTP 2xx
    expect(response?.ok()).toBeTruthy();
  });

  test('goto with wrong URL', async ({ page }) => {
    const response = await page.goto(
      'https://playwright.dev/docs/api/clsdfgdfg',
    );

    expect(response?.status()).toBe(200);
    // ok() means HTTP 2xx
    expect(response?.ok()).toBeTruthy();
  });

  test('click', async ({ page }) => {
    const locator = page.locator('body');

    await locator.click({
      button: 'right',
      modifiers: ['Shift'],
    });
  });

  test('dispatchEvent', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
<html>
<body>
<h1>HTML DOM Events</h1>
<h2>The onwheel Event</h2>

<p>Use the addEventListener() method to attach a "wheel" event to an element:</p>

<div id="myDIV" style="border:1px solid black">
<p>Roll the mouse wheel over me!</p>
</div>

<script>
document.getElementById("myDIV").addEventListener("wheel", myFunction);

function myFunction(e) {
console.log(e.deltaY)

 
}
</script>

</body>
</html>

      `);
    const locator = page.locator('body');

    await locator.dispatchEvent('click');
    await page.locator('#myDIV').dispatchEvent('wheel', { deltaY: 1664 });
    await page.locator('body').dispatchEvent('myEvent', {});
  });
});
