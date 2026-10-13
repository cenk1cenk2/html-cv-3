<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { slugify } from '#lib/utils/index.js'
  import type { TimelineItemFile } from './timeline-item.interface'
  import TimelineItem from './TimelineItem.svelte'
  import Divider from '../Divider.svelte'
  import Socket from '../power/Socket.svelte'

  interface Props {
    name: string
    icon: IconDefinition
    items: TimelineItemFile[]
  }

  let { name, icon, items }: Props = $props()
</script>

<div class="timeline w-full" id={slugify(name)}>
  <div class="timeline-header">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <h2 class="flex items-center justify-center gap-3 text-2xl font-bold md:text-3xl" tabindex="0">
      <Fa {icon} />
      {name}
    </h2>
    <Divider />
  </div>

  <div class="relative isolate mt-4 md:mt-8">
    <ul>
      {#each items as item (JSON.stringify(item.metadata))}
        <TimelineItem {item} />
      {/each}
    </ul>
    <div class="timeline-plug-track" aria-hidden="true">
      <Socket class="timeline-socket" />
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-header {
    @apply max-md:sticky max-md:top-0 max-md:z-20 max-md:-mx-2 max-md:bg-white max-md:px-4 max-md:pt-6 max-md:pb-1 dark:max-md:bg-gray-900;
  }

  @media (prefers-reduced-motion: no-preference) and (width < 48rem) {
    @supports (animation-timeline: view()) {
      .timeline {
        view-timeline: --section block;
      }

      .timeline-header :global(.divider-line) {
        @apply opacity-100;

        animation-timing-function: linear;
        animation-timeline: --section;
        animation-range: contain 0% contain 100%;
      }
    }
  }

  .timeline-plug-track {
    @apply pointer-events-none absolute top-0 -bottom-10 left-[calc(50%+6.25rem)] -z-10 -translate-x-1/2 md:left-[15.5rem];
  }

  .timeline-plug-track :global(.timeline-socket) {
    @apply absolute bottom-0 left-1/2 z-10 size-7 -translate-x-1/2 [--socket-off:var(--color-gray-300)] dark:[--socket-off:var(--color-gray-600)];
  }

  @media (prefers-reduced-motion: no-preference) and (width >= 48rem) {
    .timeline-plug-track :global(.timeline-socket) {
      opacity: var(--socket, 1);
    }
  }
</style>
