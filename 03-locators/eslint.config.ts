import playwright from 'eslint-plugin-playwright';
import typescriptParser from '@typescript-eslint/parser';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  ...playwright.configs['flat/recommended'],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      projectService: true,
    },
  },
  plugins: {
    '@typescript-eslint': typescriptEslint,
    playwright: playwright,
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'error',
    ...playwright.configs['flat/recommended'].rules,
    'playwright/no-commented-out-tests': 'error',
    'playwright/no-duplicate-hooks': 'error',
    'playwright/no-get-by-title': 'error',
    'playwright/no-nth-methods': 'error',
    'playwright/no-raw-locators': 'error',
    'playwright/no-restricted-matchers': 'error',
    'playwright/prefer-comparison-matcher': 'error',
    'playwright/prefer-equality-matcher': 'error',
    'playwright/prefer-hooks-in-order': 'error',
    'playwright/prefer-hooks-on-top': 'error',
    'playwright/prefer-lowercase-title': 'error',
    'playwright/prefer-strict-equal': 'error',
    'playwright/prefer-to-be': 'error',
    'playwright/prefer-to-contain': 'error',
    'playwright/prefer-to-have-count': 'error',
    'playwright/prefer-to-have-length': 'error',
    'playwright/require-to-throw-message': 'error',
    'playwright/require-top-level-describe': 'error',
  },
});
