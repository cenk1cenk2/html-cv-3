<script lang="ts">
  import BackToTopButton from '$lib/components/BackToTopButton.svelte'
  import MenuButton from '$lib/components/MenuButton.svelte'
  import SpeedDial from '$lib/components/SpeedDial.svelte'
  import Footer from './Footer.svelte'
  import '../app.css'
</script>

<svelte:head>
  <meta name="description" content="Personal resume website for Cenk Kılıç" />
  <meta name="keywords" content="Personal CV, CV, Cenk, Cenk Kılıç, Kılıç, Cenk Kilic, Kilic, kilic.dev, Resume" />
  <meta name="author" content="Cenk Cenk Kılıç <cenk@kilic.dev>" />
</svelte:head>

<div class="app">
  <main>
    <slot />
  </main>
  <SpeedDial>
    <BackToTopButton />
    <MenuButton />
  </SpeedDial>
  <Footer />
</div>

<style lang="postcss">
  :global(.container-border) {
    @apply border-2;
    @apply lg:border-4;
    @apply border-gray-200;
    @apply shadow-xl transition-colors duration-500 ease-in-out;
  }

  :global(.container-border, .dark) {
    @apply border-gray-700;
  }
</style>
