<script lang="ts">
  import { calculateDuration } from '#lib/utils/date.js'
  import type { TimelineItemFile } from './timeline-item.interface'

  export let item: TimelineItemFile

  $: duration = item.metadata.duration !== false ? calculateDuration(item.metadata.start, item.metadata.end) : null
</script>

<div class="timeline-time-column">
  <div class="flex w-24 flex-col text-center text-xs md:w-32 md:text-base">
    {#if typeof item.metadata.end === 'boolean' && !item.metadata.end}
      <p class="font-semibold text-green-600">Present</p>
    {:else if typeof item.metadata.end === 'string'}
      <p>{item.metadata.end}</p>
    {/if}
    {#if typeof item.metadata.end !== 'undefined'}
      <p>–</p>
    {/if}
    <p>{item.metadata.start}</p>
    {#if duration}
      <p class="text-sm text-gray-800 dark:text-gray-200">({duration})</p>
    {/if}
    {#if item.metadata.type}
      <p class="text-sm text-gray-700 italic dark:text-gray-300">{item.metadata.type}</p>
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-time-column {
    @apply flex items-center md:items-center;
  }
</style>
