import { external_links } from '@mdsvex/plugin-external-links'
import adapter from '@sveltejs/adapter-static'
import { sveltekit } from '@sveltejs/kit/vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { type Bundle, mdsvex } from 'mdsvex'
import { defineConfig } from 'vite'

const more: Bundle = {
  name: 'more',
  parse: {
    html_comment: {
      parse(node, ctx) {
        return () => {
          if (node.parent?.type !== 'root' || node.text_content.trim() !== 'more') {
            return
          }

          ctx.set('folded', true)
          node.wrap_from('html', { tag: 'div', attributes: { class: 'more' } })
          node.remove()
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    mdsvex({
      extensions: ['.md', '.svx'],
      smart_punctuation: true,
      plugins: [external_links({ rel: ['nofollow'] }), more]
    }),
    sveltekit({
      inlineStyleThreshold: 100000,

      // Consult https://kit.svelte.dev/docs/integrations#preprocessors
      // for more information about preprocessors

      preprocess: [vitePreprocess()],

      adapter: adapter({ pages: 'dist', assets: 'dist' })
    })
  ]
})
