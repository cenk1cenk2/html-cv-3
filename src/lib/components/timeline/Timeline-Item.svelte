<script lang="ts">
  import { calculateWorkDuration } from '$lib/utils/date'
  import type { TimelineItemFile } from './timeline-item.interface'

  export let item: TimelineItemFile

  $: duration = item.metadata.duration !== false ? (item.metadata.end ? calculateWorkDuration(item.metadata.start, item.metadata.end) : '< 1 month') : null
</script>

<li class="flex place-items-stretch">
  <div class="timeline-time-column">
    <div class="flex w-32 flex-col text-center">
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

  <div class="timeline-logo-column">
    <img src="/logo/{item.metadata.logo}" alt={item.metadata.name} class="object-contain" />
  </div>

  <div class="timeline-info-column">
    <p class="text-lg font-semibold">{item.metadata.name}</p>
    <p class="text-sm text-gray-700 dark:text-gray-300">
      {item.metadata.location}
      {#if item.metadata.attendance}<span class="text-sm text-gray-700 italic dark:text-gray-300">({item.metadata.attendance})</span>{/if}
    </p>
    {#if item.metadata.role}
      <p class="font-semibold">{item.metadata.role}</p>
    {/if}
    <div class="prose dark:prose-dark max-w-none pt-2 leading-tight text-gray-700 dark:text-gray-300">
      <svelte:component this={item.default} />
    </div>
  </div>
</li>

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-time-column {
    @apply -mr-9 flex items-center border-r-4 border-gray-300 pr-9 lg:-mr-12 lg:pr-12 dark:border-gray-600;
  }

  .timeline-logo-column {
    @apply flex h-16 w-16 min-w-16 place-self-center overflow-hidden;
    @apply rounded-xl border-2 border-gray-300 bg-white p-1 shadow-xl lg:h-24 lg:w-24 lg:min-w-24 lg:border-4 dark:border-gray-600;
    @apply shadow-2xl;
  }

  .timeline-info-column {
    @apply flex grow flex-col justify-center py-6 pl-4 lg:pl-8;
  }
</style>
