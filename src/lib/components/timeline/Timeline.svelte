<script lang="ts">
  import { faPlug, type IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { slugify } from '#lib/utils/index.js'
  import type { TimelineItemFile } from './timeline-item.interface'
  import TimelineItem from './TimelineItem.svelte'
  import Divider from '../Divider.svelte'

  interface Props {
    name: string
    icon: IconDefinition
    items: TimelineItemFile[]
  }

  let { name, icon, items }: Props = $props()
</script>

<div class="w-full" id={slugify(name)}>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <h2 class="flex items-center justify-center gap-3 text-3xl font-bold" tabindex="0">
    <Fa {icon} />
    {name}
  </h2>
  <Divider />

  <div class="relative isolate mt-8">
    <ul>
      {#each items as item (JSON.stringify(item.metadata))}
        <TimelineItem {item} />
      {/each}
    </ul>
    <div class="timeline-plug-track" aria-hidden="true">
      <span class="timeline-plug"><Fa icon={faPlug} /></span>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-plug-track {
    @apply pointer-events-none absolute top-0 -bottom-[1.125rem] left-[calc(50%+6.25rem)] -z-10 flex -translate-x-1/2 flex-col justify-end md:left-[15.5rem];
  }

  .timeline-plug {
    @apply flex rotate-180 text-lg text-gray-300 dark:text-gray-600;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .timeline-plug-track {
        @apply justify-start;
      }

      .timeline-plug {
        @apply sticky top-[calc(100vh-200px)];
      }
    }
  }
</style>
