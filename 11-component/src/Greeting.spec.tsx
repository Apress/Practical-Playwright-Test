import { expect, test } from '@playwright/experimental-ct-react';
import GreetingComponent from './greeting';

test('loads and displays greeting', async ({ mount }) => {
  // Arrange
  const component = await mount(<GreetingComponent url="/greeting" />);
  const button = component.getByRole('button', { name: 'Load Greeting' });

  // Act
  await button.click();

  // Assert
  await expect(component.getByRole('heading')).toHaveText('hello there');
  await expect(button).toBeDisabled();
});
