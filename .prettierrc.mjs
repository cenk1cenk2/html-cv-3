import prettierrc from '@cenk1cenk2/eslint-config/prettierrc'

/** @type {import("prettier").Config} */
export default {
  ...prettierrc,
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss']
}
