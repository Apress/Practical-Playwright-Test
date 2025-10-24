import test, { expect } from '@playwright/test';

test.describe('poor hydration', () => {
  test('fails to hydrate on time', async ({ page }) => {
    await page.setContent(`
      <html>
        <body>
          <button id="click-me">Click me</button>
          <div id="message" style="display:none">Success</div>
          <script>
            setTimeout(() => {
              document.getElementById('click-me').onclick = () => {
                document.getElementById('message').style.display = 'block';
              };
            }, Math.random() * 2000);
          </script>
        </body>
      </html>
    `);

    await page.getByRole('button', { name: 'Click me' }).click();
    await expect(page.getByText('Success')).toBeVisible();
  });

  test('fails to hydrate on time - solution 1 disable button until ready', async ({
    page,
  }) => {
    await page.setContent(`
      <html>
        <body>
          <button id="click-me" disabled>Click me</button>
          <div id="message" style="display:none">Success</div>
          <script>
            setTimeout(() => {
              const button = document.getElementById('click-me');
              button.onclick = () => {
                document.getElementById('message').style.display = 'block';
              };
              button.disabled = false;
            }, Math.random() * 2000);
          </script>
        </body>
      </html>
    `);

    await page.getByRole('button', { name: 'Click me' }).click();
    await expect(page.getByText('Success')).toBeVisible();
  });

  test('fails to hydrate on time - solution 2 toPass', async ({
    page,
  }) => {
    await page.setContent(`
      <html>
        <body>
          <button id="click-me">Click me</button>
          <div id="message" style="display:none">Success</div>
          <script>
            setTimeout(() => {
              document.getElementById('click-me').onclick = () => {
                document.getElementById('message').style.display = 'block';
              };
            }, Math.random() * 2000);
          </script>
        </body>
      </html>
    `);

    await expect(async () => {
      await page.getByRole('button', { name: 'Click me' }).click();
      await expect(page.getByText('Success')).toBeVisible();
    }).toPass();
  });
});
