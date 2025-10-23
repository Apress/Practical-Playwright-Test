import { Locator, MatcherReturnType } from '@playwright/test';

export async function toBeRightOf(
  locator: Locator,
  reference: Locator,
): Promise<MatcherReturnType> {
  let pass: boolean;

  const candidateBox = await locator.boundingBox();
  const refBox = await reference.boundingBox();
  if (!candidateBox || !refBox) {
    pass = false;
  } else {
    pass = candidateBox.x >= refBox.x + refBox.width;
  }

  if (this.isNot) {
    pass = !pass;
  }

  const message = pass ? () => 'wouhou' : () => 'nope';

  return {
    message,
    pass,
  };
}

export async function toBeLeftOf(
  locator: Locator,
  reference: Locator,
): Promise<MatcherReturnType> {
  let pass: boolean;

  const candidateBox = await locator.boundingBox();
  const refBox = await reference.boundingBox();
  if (!candidateBox || !refBox) {
    pass = false;
  } else {
    pass = candidateBox.x + candidateBox.width <= refBox.x;
  }

  if (this.isNot) {
    pass = !pass;
  }

  const message = pass ? () => 'wouhou' : () => 'nope';

  return {
    message,
    pass,
  };
}

export async function toBeAbove(
  locator: Locator,
  reference: Locator,
): Promise<MatcherReturnType> {
  let pass: boolean;

  const candidateBox = await locator.boundingBox();
  const refBox = await reference.boundingBox();
  if (!candidateBox || !refBox) {
    pass = false;
  } else {
    pass = candidateBox.y + candidateBox.height <= refBox.y;
  }

  if (this.isNot) {
    pass = !pass;
  }

  const message = pass ? () => 'wouhou' : () => 'nope';

  return {
    message,
    pass,
  };
}

export async function toBeBelow(
  locator: Locator,
  reference: Locator,
): Promise<MatcherReturnType> {
  let pass: boolean;

  const candidateBox = await locator.boundingBox();
  const refBox = await reference.boundingBox();
  if (!candidateBox || !refBox) {
    pass = false;
  } else {
    pass = candidateBox.y >= refBox.y + refBox.height;
  }

  if (this.isNot) {
    pass = !pass;
  }

  const message = pass ? () => 'wouhou' : () => 'nope';

  return {
    message,
    pass,
  };
}
