import { test, expect } from '@playwright/test';

test('better assertions', () => {
  // Arrange
  test.step('log in', () => {});

  // Act
  // ...

  // Assert
  expect(2, 'to be 3 : Adel, Filip, Frank').toBe(3);
});
