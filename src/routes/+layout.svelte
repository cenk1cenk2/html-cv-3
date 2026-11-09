<script lang="ts">
  import { onMount, type Snippet } from 'svelte'

  import Footer from './Footer.svelte'
  import '@fontsource-variable/dm-sans'
  import '../app.css'

  interface Props {
    children?: Snippet
  }

  let { children }: Props = $props()

  // Keyboard scrolling reads on by a screen, but on phones the mandatory snap points would carry a page step on to the next item's start and
  // skip the text in between, and Firefox stops Home at the first snap point below the top. Snapping steps aside from the first such key and
  // stays aside while the keys go on: putting it back at once would snap the page straight past what it just showed. The next wheel, swipe
  // or pointer press brings it back.
  const keys = new Set(['PageDown', 'PageUp', ' ', 'Home', 'End'])

  function page(event: KeyboardEvent): void {
    const target = event.target as HTMLElement

    if (keys.has(event.key) && !event.defaultPrevented && !target.closest('input, textarea, select, button, summary, [contenteditable]')) {
      document.documentElement.dataset.paging = ''
    }
  }

  function snap(): void {
    delete document.documentElement.dataset.paging
  }

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

<svelte:window onkeydown={page} onwheel={snap} ontouchstart={snap} onpointerdown={snap} />

<svelte:head>
  <meta name="author" content="Cenk Kılıç <cenk@kilic.dev>" />
</svelte:head>

<div class="app">
  <main>
    {@render children?.()}
  </main>
  <Footer />
</div>
