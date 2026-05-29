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
        Event: 'readonly',
        setTimeout: 'readonly'
      }
    },
    rules: {
      'import/no-extraneous-dependencies': 'off'
    }
  },
  {
    ignores: ['.svelte-kit/', 'dist/']
  }
])
