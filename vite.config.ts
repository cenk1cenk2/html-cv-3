import adapter from '@sveltejs/adapter-static'
import { sveltekit } from '@sveltejs/kit/vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { mdsvex } from 'mdsvex'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      extensions: ['.svelte', '.md', '.svx'],

      // Consult https://kit.svelte.dev/docs/integrations#preprocessors
      // for more information about preprocessors

      preprocess: [mdsvex({ extensions: ['md', '.svx'] }), vitePreprocess()],

      adapter: adapter({ pages: 'dist', assets: 'dist' })
    })
  ]
})
