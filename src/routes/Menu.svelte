<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { menu } from '$lib/stores/menu.store'

  export let items: { icon: IconDefinition; href: string; text: string }[]

  let state: boolean

  menu.subscribe((data) => (state = data))
</script>

<aside class="menu container-border" class:hidden={!state}>
  <div class="grid grid-cols-1 border-gray-700 divide-y-2 divide-gray-700 divide-dashed">
    {#each items as item}
      <a href={item.href} class="menu-item"
        ><Fa icon={item.icon} />
        <p>{item.text}</p></a
      >
    {/each}
  </div>
</aside>

<style lang="postcss">
  .menu {
    @apply z-50;
    @apply bg-white bg-opacity-90 rounded-xl dark:bg-gray-800;
    @apply fixed right-8 max-h-max bottom-24;
  }

  .menu-item {
    @apply p-4 flex flex-row place-items-center font-semibold;

    p {
      @apply pl-1;
    }
  }
</style>
