import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
  {
    files: ['./src/shared/assets/**'],
    rules: {
      'fsd/public-api': 'off',
      'fsd/segments-by-purpose': 'off',
    },
  },
]);
