<script lang="ts">
  import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { calculateDuration, formatMonth } from '#lib/utils/date.js'
  import type { TimelineItemFile } from './timeline-item.interface'

  export let item: TimelineItemFile

  $: current = item.metadata.end === false
  $: duration = item.metadata.duration !== false ? calculateDuration(item.metadata.start, item.metadata.end) : null
</script>

<div class="timeline-date">
  {#if duration}
    <p class="text-base leading-tight font-semibold text-gray-900 dark:text-white">{duration}</p>
  {/if}
  <p class="inline-flex items-center gap-1.5 whitespace-nowrap tabular-nums {duration ? 'mt-1 text-sm text-gray-900 dark:text-white' : 'font-medium'}">
    {#if current}
      <span class="relative flex size-2">
        <span class="absolute inline-flex size-full rounded-full bg-green-500 opacity-75 motion-safe:animate-ping"></span>
        <span class="relative inline-flex size-2 rounded-full bg-green-500"></span>
      </span>
    {/if}
    {formatMonth(item.metadata.start)}{#if typeof item.metadata.end !== 'undefined'}&nbsp;– {current ? 'Now' : formatMonth(String(item.metadata.end))}{/if}
  </p>
  {#if item.metadata.type}
    <span class="tag-pill mt-2"><Fa icon={/degree|school/i.test(item.metadata.type) ? faGraduationCap : faBriefcase} /> {item.metadata.type}</span>
  {/if}
</div>

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-date {
    @apply flex w-full flex-col items-center px-2 py-3 text-center text-xs leading-snug md:text-sm;
    @apply rounded-xl border-2 border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900;
  }
</style>
