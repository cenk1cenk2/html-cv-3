<script lang="ts">
  import { onMount, type Snippet } from 'svelte'

  import Footer from './Footer.svelte'
  import '@fontsource-variable/dm-sans'
  import '../app.css'

  interface Props {
    children?: Snippet
  }

  let { children }: Props = $props()

  onMount(() => {
    const controller = new AbortController()
    let attempts = 0
    let timer: ReturnType<typeof setTimeout>

    const connect = (): void => {
      if (document.modelContext) {
        void import('#lib/webmcp.js').then(({ register }) => register(controller.signal))
      } else if (++attempts < 20) {
        timer = setTimeout(connect, 500)
      }
    }

    timer = setTimeout(connect)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  })
</script>

<svelte:head>
  <meta name="author" content="Cenk Kılıç <cenk@kilic.dev>" />
</svelte:head>

<div class="app">
  <main>
    {@render children?.()}
  </main>
  <Footer />
</div>
