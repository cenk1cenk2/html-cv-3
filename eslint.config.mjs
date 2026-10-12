import TypescriptParser from '@typescript-eslint/parser'
import SvelteParser from 'svelte-eslint-parser'

import { configs, utils } from '@cenk1cenk2/eslint-config'
import configSvelteTypescript from '@cenk1cenk2/eslint-config/svelte-typescript'

const dedupePlugins = (items) => {
  const plugins = new Set()

  return items.map((item) => {
    if (!item.plugins) {
      return item
    }

    const entries = Object.entries(item.plugins).filter(([name]) => {
      if (plugins.has(name)) {
        return false
      }

      plugins.add(name)

      return true
    })

    if (entries.length === Object.keys(item.plugins).length) {
      return item
    }

    const next = { ...item }

    if (entries.length > 0) {
      next.plugins = Object.fromEntries(entries)
    } else {
      delete next.plugins
    }

    return next
  })
}

/** @type {import("eslint").Linter.Config[]} */
export default dedupePlugins([
  ...configs['typescript-dynamic'],
  ...configSvelteTypescript,
  ...utils.configImportGroup({
    paths: ['#lib']
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
        KeyboardEvent: 'readonly',
        Event: 'readonly',
        setTimeout: 'readonly'
      }
    },
    rules: {
      'import/no-extraneous-dependencies': 'off'
    }
  },
  // TODO: @cenk1cenk2 drop once https://gitlab.kilic.dev/config/eslint-config/-/merge_requests/2517 is released
  {
    files: ['**/*.svelte.ts'],
    languageOptions: {
      parser: SvelteParser,
      parserOptions: {
        parser: TypescriptParser,
        project: 'tsconfig.json',
        extraFileExtensions: ['.svelte']
      }
    }
  },
  {
    ignores: ['.svelte-kit/', 'dist/']
  }
])
