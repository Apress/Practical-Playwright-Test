import { test } from './my-test';

test('example test', async ({ myFixture }) => {
  console.log(`Hello I'm ${myFixture}!`);
});
