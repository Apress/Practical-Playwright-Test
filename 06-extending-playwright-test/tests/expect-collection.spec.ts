import { test } from '@playwright/test';
import { expect } from './my-expect';

test('valid date', async () => {
  expect(new Date()).toBeValidDate();
  expect(new Date('01/01/2018')).toBeValidDate();
  expect(new Date('01/90/2018')).not.toBeValidDate();
});

test('passes when value is a finite number', () => {
  expect(1).toBeFinite();
  expect(Infinity).not.toBeFinite();
  expect(NaN).not.toBeFinite();
});

test('layout', async ({ page }) => {
  await page.setContent(`
  <table>
    <tr><td id='7'>7</td><td id='8'>8</td><td id='9'>9</td></tr>
    <tr><td id='4'>4</td><td id='5'>Reference text</td><td id='6'>6</td></tr>
    <tr><td id='1'>1</td><td id='2'>2</td><td id='3'>3</td></tr>
  </table>`);

  await expect(page.getByText('6')).toBeRightOf(
    page.getByText('Reference text'),
  );
});

test('all layout', async ({ page }) => {
  await page.setContent(`
  <table>
    <tr><td id='7'>7</td><td id='8'>8</td><td id='9'>9</td></tr>
    <tr><td id='4'>4</td><td id='5'>Reference text</td><td id='6'>6</td></tr>
    <tr><td id='1'>1</td><td id='2'>2</td><td id='3'>3</td></tr>
  </table>`);

  await expect(page.getByText('6')).toBeRightOf(
    page.getByText('Reference text'),
  );
  await expect(page.getByText('4')).toBeLeftOf(
    page.getByText('Reference text'),
  );
  await expect(page.getByText('8')).toBeAbove(
    page.getByText('Reference text'),
  );
  await expect(page.getByText('2')).toBeBelow(
    page.getByText('Reference text'),
  );
});
