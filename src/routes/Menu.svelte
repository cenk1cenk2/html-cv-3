<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'

  import { menu } from '$lib/stores/menu.store'

  export let items: { icon: IconDefinition; href: string; text: string }[]

  let menuElement: HTMLElement

  $: state = $menu

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element

    if (menuElement && !menuElement.contains(target) && $menu) {
      const menuButton = document.querySelector('.menu-button')

      if (menuButton && menuButton.contains(target)) {
        return
      }

      menu.set(false)
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })
</script>

<aside class="menu container-border" class:hidden={!state} bind:this={menuElement}>
  <div class="divide grid grid-cols-1 divide-y-2 divide-gray-700 border-gray-700">
    {#each items as item (JSON.stringify(item))}
      <a href={item.href} class="menu-item" aria-label={item.text} onclick={() => menu.set(false)}>
        <Fa icon={item.icon} />
        <p>{item.text}</p></a
      >
    {/each}
  </div>
</aside>

<style lang="postcss">
  @reference "../app.css";

  .menu {
    @apply z-50;
    @apply rounded-xl bg-white/90 dark:bg-gray-800/90;
    @apply fixed right-8 bottom-24 max-h-max;
  }

  .menu-item {
    @apply flex flex-row place-items-center p-4 font-semibold;

    p {
      @apply pl-1;
    }
  }
</style>
