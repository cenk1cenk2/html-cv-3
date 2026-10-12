<script lang="ts">
  import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'

  import type { TimelineItemFile } from './timeline-item.interface'

  export let item: TimelineItemFile
  export let expanded = false
  export let collapsible = false

  let content: HTMLElement

  onMount(() => {
    collapsible = content.querySelector('.more') !== null
  })
</script>

<div class="timeline-text" class:collapsed={collapsible && !expanded} bind:this={content}>
  <svelte:component this={item.default} />
</div>

{#if collapsible}
  <button type="button" class="timeline-toggle" aria-expanded={expanded} onclick={() => (expanded = !expanded)}>
    {expanded ? 'Show less' : 'Show more'}
    <Fa icon={faChevronDown} class="transition-transform duration-300 {expanded ? 'rotate-180' : ''}" />
  </button>
{/if}

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-text {
    @apply prose dark:prose-dark mt-4 max-w-none leading-snug text-gray-700 dark:text-gray-300;
  }

  .timeline-text :global(.more) {
    @apply h-auto overflow-hidden transition-[height] duration-500 ease-out motion-reduce:transition-none;

    interpolate-size: allow-keywords;
  }

  .timeline-text.collapsed :global(.more) {
    @apply h-0;
  }

  .timeline-toggle {
    @apply text-primary-500 mt-2 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium hover:underline;
  }
</style>
