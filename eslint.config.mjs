import eslintConfigPrettier from 'eslint-config-prettier';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import eslintSimpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

import tsEslint from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: typescriptEslintParser,
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      'simple-import-sort': eslintSimpleImportSort,
      'react-refresh': eslintReactRefresh,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages and external/builtin packages come first.
            ['^react', '^/?\\w'],
            // Internal packages.
            ['^@?\\w'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  eslintConfigPrettier,
];
