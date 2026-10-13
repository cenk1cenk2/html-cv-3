<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { section } from '#lib/stores/section.svelte.js'

  interface Props {
    items: { icon: IconDefinition; href: string; text: string }[]
  }

  let { items }: Props = $props()
</script>

<nav class="navbar" aria-label="Sections">
  <span class="scroll-progress border-primary-500 pointer-events-none absolute -inset-0.5 rounded-xl border-2" aria-hidden="true"></span>
  {#each items as item (item.href)}
    {@const active = item.href === `#${section.active}`}
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a href={item.href} class="navbar-item" class:active aria-current={active ? 'location' : undefined}>
      <Fa icon={item.icon} size="lg" />
      <span>{item.text}</span>
    </a>
  {/each}
</nav>

<style lang="postcss">
  @reference "../app.css";

  .navbar {
    @apply fixed bottom-2 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-xl border-2 border-gray-200 bg-white/60 p-1.5 shadow-xl backdrop-blur-xl dark:shadow-black/40;
    @apply md:bottom-4 dark:border-gray-700 dark:bg-gray-800/60;
  }

  .navbar-item {
    @apply flex min-w-14 flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-medium text-gray-500 transition-colors md:min-w-16 md:px-3 dark:text-gray-300;
  }

  .navbar-item.active {
    @apply bg-primary-500/10 text-primary-600 dark:text-primary-500;
  }
</style>
