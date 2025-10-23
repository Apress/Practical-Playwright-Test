import { expect, test } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import testData from './test-data.json' with { type: 'json' };

test('JSON', async ({}) => {
  expect(testData.username).toBe('test_user');
  expect(testData.role).toBe('admin');
});

test.describe('CSV', () => {
  const records = parse(readFileSync('./tests/input.csv'), {
    columns: true,
    delimiter: ';',
    cast: true,
  });

  for (const record of records) {
    test(`foo: ${record.test_case}`, () => {
      expect(record.some_value + record.another_value).toEqual(
        record.total,
      );
    });
  }
});
