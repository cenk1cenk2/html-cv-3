import adapter from '@sveltejs/adapter-static'
import { sveltekit } from '@sveltejs/kit/vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { mdsvex } from 'mdsvex'
import { defineConfig } from 'vite'

const more = /^<!--\s*more\s*-->$/

function remarkMore() {
  return (tree: { children: { type: string; value?: string }[] }): void => {
    const index = tree.children.findIndex((node) => node.type === 'html' && more.test(node.value?.trim() ?? ''))

    if (index === -1) {
      return
    }

    tree.children.splice(index, 1, { type: 'html', value: '<div class="more">' })
    tree.children.push({ type: 'html', value: '</div>' })
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      extensions: ['.svelte', '.md', '.svx'],

      // Consult https://kit.svelte.dev/docs/integrations#preprocessors
      // for more information about preprocessors

      preprocess: [mdsvex({ extensions: ['md', '.svx'], remarkPlugins: [remarkMore] }), vitePreprocess()],

      adapter: adapter({ pages: 'dist', assets: 'dist' })
    })
  ]
})
