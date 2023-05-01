<script lang="ts">
  import { faBars, faTimes, type IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { menu } from '$lib/stores/menu.store'

  let icon: IconDefinition
  menu.subscribe((data) => {
    if (!data) {
      icon = faBars
    } else {
      icon = faTimes
    }
  })

  const handleMenu = (): void => {
    menu.update((data) => !data)
  }
</script>

<div class="menu-button" on:click={handleMenu} on:keypress={handleMenu}><Fa {icon} /></div>

<style lang="postcss">
  .menu-button {
    @apply transition-all w-12;
    @apply rounded-xl bg-gray-300 dark:bg-gray-700 p-4 shadow-xl;
    @apply transform hover:text-primary-500;
  }
</style>
