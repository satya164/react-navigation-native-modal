import { defineConfig, globalIgnores } from 'eslint/config';
import { jest, react, recommended } from 'eslint-config-satya164';
import sort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  recommended,
  react,
  jest,

  globalIgnores([
    '**/node_modules/',
    '**/coverage/',
    '**/dist/',
    '**/lib/',
    '**/.expo/',
    '**/.yarn/',
    '**/.vscode/',
  ]),

  {
    plugins: {
      'simple-import-sort': sort,
    },
  },
]);
