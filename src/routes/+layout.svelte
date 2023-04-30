<script lang="ts">
  import Footer from './Footer.svelte'
  import '../app.css'
</script>

<div class="app">
  <main>
    <slot />
  </main>

  <Footer />
</div>
