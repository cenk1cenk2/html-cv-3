<script lang="ts">
  import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { menu } from '$lib/stores/menu.store'

  $: icon = $menu ? faTimes : faBars

  const handleMenu = (): void => {
    menu.update((data) => !data)
  }
</script>

<div class="menu-button" role="button" tabindex="0" aria-label={$menu ? 'Close menu' : 'Open menu'} onclick={handleMenu} onkeypress={handleMenu}><Fa {icon} /></div>

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
