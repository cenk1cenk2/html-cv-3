<script lang="ts">
  import Footer from './Footer.svelte'
  import '@fontsource-variable/dm-sans'
  import '../app.css'
</script>

<svelte:head>
  <meta name="description" content="Personal resume website for Cenk Kılıç" />
  <meta name="keywords" content="Personal CV, CV, Cenk, Cenk Kılıç, Kılıç, Cenk Kilic, Kilic, kilic.dev, Resume" />
  <meta name="author" content="Cenk Kılıç <cenk@kilic.dev>" />
</svelte:head>

<div class="app">
  <main>
    <slot />
  </main>
  <Footer />
</div>
