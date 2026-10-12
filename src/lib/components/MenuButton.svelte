<script lang="ts">
  import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { menu } from '#lib/stores/menu.store.js'

  $: icon = $menu ? faTimes : faBars

  const handleMenu = (): void => {
    menu.update((data) => !data)
  }
</script>

<button type="button" class="menu-button" aria-label={$menu ? 'Close menu' : 'Open menu'} onclick={handleMenu}><Fa {icon} /></button>

<style lang="postcss">
  @reference "../../app.css";

  .menu-button {
    @apply w-12 transition-all;
    @apply rounded-xl bg-gray-300 p-4 shadow-xl dark:bg-gray-700;
    @apply md:hover:text-primary-500 transform;
    @apply text-center;
    @apply select-none;
  }
</style>
