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
    'playwright/missing-playwright-await': 'error',
    'playwright/no-useless-await': 'warn',
    'playwright/prefer-web-first-assertions': 'error',
  },
});
