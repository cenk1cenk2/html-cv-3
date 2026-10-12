<script lang="ts">
  import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import type { TimelineItemFile } from './timeline-item.interface'

  interface Props {
    item: TimelineItemFile
    expanded?: boolean
  }

  let { item, expanded = $bindable(false) }: Props = $props()

  const id = $props.id()
</script>

<div id="{id}-text" class="timeline-text" class:collapsed={item.metadata.more && !expanded}>
  <item.default />
</div>

{#if item.metadata.more}
  <button type="button" class="timeline-toggle" aria-expanded={expanded} aria-controls="{id}-text" onclick={() => (expanded = !expanded)}>
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
    @apply h-auto overflow-hidden transition-[height,visibility] duration-500 ease-out motion-reduce:transition-none;

    interpolate-size: allow-keywords;
  }

  .timeline-text.collapsed :global(.more) {
    @apply invisible h-0;
  }

  .timeline-toggle {
    @apply text-primary-500 mt-2 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium hover:underline;
  }
</style>
