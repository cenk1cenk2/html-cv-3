import { configs, utils } from '@cenk1cenk2/eslint-config'
import configSvelteTypescript from '@cenk1cenk2/eslint-config/svelte-typescript'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...configs['typescript-dynamic'],
  ...configSvelteTypescript,
  ...utils.configImportGroup({
    tsconfigDir: import.meta.dirname,
    tsconfig: 'tsconfig.json'
  }),
  {
    languageOptions: {
      globals: {
        // https://github.com/sindresorhus/globals/issues/305
        document: 'readonly',
        window: 'readonly',
        HTMLElement: 'readonly',
        Element: 'readonly',
        MouseEvent: 'readonly',
        Event: 'readonly'
      }
    },
    rules: {
      'import/no-extraneous-dependencies': 'off'
    }
  },
  {
    ignores: ['.svelte-kit/', 'dist/']
  }
]
