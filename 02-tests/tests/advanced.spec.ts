import { test, expect } from '@playwright/test';
import path from 'path';

test('upload file', async ({ page }) => {
  await page.setContent(`
<label for="avatar">Choose a profile picture:</label>

<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
`);

  const fileInput = page.getByLabel('Choose a profile picture:');

  // File should really exists
  // await fileInput.setInputFiles(path.join(__dirname, "myfile.pdf"));

  // Alternative : put a buffer
  await fileInput.setInputFiles({
    name: 'file.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('this is test'),
  });
});

test('upload file 2', async ({ page }) => {
  await page.goto('http://localhost:3000/file-upload.html');

  const fileInput = page.getByRole('button', { name: 'Choose File' });
  await fileInput.setInputFiles({
    name: 'file.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('this is test'),
  });

  await expect(page.getByRole('status', { name: 'Total size:' })).toHaveText(
    '12 bytes',
  );
});
