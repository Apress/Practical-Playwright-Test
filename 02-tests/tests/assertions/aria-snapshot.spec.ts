import { test, expect } from '@playwright/test';

test.describe('ARIA snapshots - different HTML, same snapshot', () => {
  const HTMLsamples = [
    `
<header class="hero hero--primary heroBanner_UJJx">
  <div class="container">
    <h1 class="hero__title heroTitle_ohkl">
      <span class="highlight_gXVj">Playwright</span> enables reliable end-to-end
      testing for modern web apps.
    </h1>
    <div class="buttons_pzbO">
      <a class="getStarted_Sjon" href="/docs/intro">Get started</a>
      <span class="github-btn github-stargazers github-btn-large">
        <a
          class="gh-btn"
          href="https://github.com/microsoft/playwright"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Star microsoft/playwright on GitHub"
        >
          <span class="gh-ico" aria-hidden="true"></span>
          <span class="gh-text">Star</span>
        </a>
        <a
          class="gh-count"
          href="https://github.com/microsoft/playwright/stargazers"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="72k+ stargazers on GitHub"
          style="display: block"
        >
          72k+
        </a>
      </span>
    </div>
  </div>
</header>`,
    `
<header>
  <h1>Playwright enables reliable end-to-end testing for modern web apps.</h1>
  <a href="/docs/intro">Get started </a>
  <a href="https://github.com/microsoft/playwright">
    Star microsoft/playwright on GitHub
  </a>
  <a href="https://github.com/microsoft/playwright/stargazers">
    72k+ stargazers on GitHub
  </a>
</header>`,
  ];

  HTMLsamples.forEach((value, index) => {
    test(`HTML ${index}`, async ({ page }) => {
      await page.setContent(value);
      await expect(page.getByRole('banner')).toMatchAriaSnapshot(`
      - banner:
        - heading "Playwright enables reliable end-to-end testing for modern web apps." [level=1]
        - link "Get started":
          - /url: /docs/intro
        - link "Star microsoft/playwright on GitHub":
          - /url: https://github.com/microsoft/playwright
        - link "72k+ stargazers on GitHub":
          - /url: https://github.com/microsoft/playwright/stargazers
    `);
    });
  });
});
