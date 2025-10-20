import { test, expect } from '@playwright/test';

test('press', async ({ page }) => {
  await page.goto('https://konamijs.mand.is/');

  const body = page.locator('body');
  await body.press('ArrowUp');
  await body.press('ArrowUp');
  await body.press('ArrowDown');
  await body.press('ArrowDown');
  await body.press('ArrowLeft');
  await body.press('ArrowRight');
  await body.press('ArrowLeft');
  await body.press('ArrowRight');
  await body.pressSequentially('BA');

  await expect(page).toHaveURL('https://github.com/georgemandis/konami-js');
});

test.describe('checkbox', () => {
  test.beforeEach(async ({ page }) => {
    // example from https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/input/checkbox
    await page.setContent(`
<fieldset>
  <legend>Choose your monster's features:</legend>

  <div>
    <input type="checkbox" id="scales" name="scales" checked />
    <label for="scales">Scales</label>
  </div>

  <div>
    <input type="checkbox" id="horns" name="horns" />
    <label for="horns">Horns</label>
  </div>
</fieldset>
`);
  });

  test('check', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Scales' }).check();
  });

  test('check from a fieldset', async ({ page }) => {
    const group = page.getByRole('group', { name: "Choose your monster's" });
    await group.getByRole('checkbox', { name: 'Scales' }).check();
  });

  test('check all from a fieldset', async ({ page }) => {
    const group = page.getByRole('group', { name: "Choose your monster's" });
    for (const checkbox of await group.getByRole('checkbox').all()) {
      await checkbox.check();
    }
  });
});

test('select', async ({ page }) => {
  await page.setContent(`
  <select>
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </select>`);

  await page.getByRole('combobox').selectOption('green');
});

test('select multiple', async ({ page }) => {
  await page.setContent(`
  <select multiple>
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </select>`);

  await page.getByRole('listbox').selectOption(['blue', 'red']);
  await page.getByRole('listbox').selectOption('green');
});
