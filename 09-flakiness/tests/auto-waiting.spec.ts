import test, { expect } from '@playwright/test';

test.describe('auto-waiting', () => {
  test('fail', async ({ page }) => {
    await page.locator('fail').click();
  });

  test('fail faster', async ({ page }) => {
    await page.locator('fail').click({ timeout: 5_000 });
  });

  test('clicks blindly (force)', async ({ page }) => {
    await page.setContent(`
    <button id="btn" disabled="true" style="background: lightgray; color: black;">Click me</button>
    <div id="message" style="display:none">Success</div>
    
    <script>
      setTimeout(() => {
        document.getElementById('btn').disabled = false;
      }, 1000);

      document.getElementById('btn').addEventListener('click', function() {
          document.getElementById('message').style.display = 'block';
      });
    </script>
  `);

    await page
      .getByRole('button', { name: 'Click me' })
      .click({ force: true });
    await expect(page.getByText('Success')).toBeVisible();
  });

  test('forgot await', async ({ page }) => {
    await page.setContent(`
    <button id="btn" disabled="true" style="background: lightgray; color: black;">Click me</button>
    <div id="message" style="display:none">Success</div>
    
    <script>
      setTimeout(() => {
        document.getElementById('btn').disabled = false;
      }, 1000);

      document.getElementById('btn').addEventListener('click', function() {
          document.getElementById('message').style.display = 'block';
      });
    </script>
  `);

    // auto-retry will still happen
    page.getByRole('button', { name: 'Click me' }).click();
    // we wait on the result, not the click
    await expect(page.getByText('Success')).toBeVisible();
  });
});
