<script lang="ts">
  import type { Snippet } from 'svelte'

  import Footer from './Footer.svelte'
  import '@fontsource-variable/dm-sans'
  import '../app.css'

  interface Props {
    children?: Snippet
  }

  let { children }: Props = $props()
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
