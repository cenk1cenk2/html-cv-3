<script lang="ts">
  import type { TimelineItemFile } from './timeline-item.interface'

  export let item: TimelineItemFile
</script>

<li class="flex place-items-stretch">
  <div class="timeline-time-column">
    <div class="flex flex-col w-32 text-center">
      {#if typeof item.metadata.end === 'boolean' && !item.metadata.end}
        <p class="font-semibold text-green-600">Present</p>
      {:else if typeof item.metadata.end === 'string'}
        <p>{item.metadata.end}</p>
      {/if}
      {#if typeof item.metadata.end !== 'undefined'}
        <p>–</p>
      {/if}
      <p>{item.metadata.start}</p>
      {#if item.metadata.type}
        <p class="text-sm italic text-gray-400">{item.metadata.type}</p>
      {/if}
    </div>
  </div>

  <div class="timeline-logo-column">
    <img src="/logo/{item.metadata.logo}" alt={item.metadata.name} class="object-contain" />
  </div>

  <div class="timeline-info-column">
    <p class="font-semibold">{item.metadata.name}</p>
    <p class="text-sm text-gray-600 dark:text-gray-400">{item.metadata.location}</p>
    {#if item.metadata.role}
      <p>{item.metadata.role}</p>
    {/if}
    <div class="pt-2 max-w-none leading-tight text-gray-600 dark:text-gray-400 prose dark:prose-dark">
      <svelte:component this={item.default} />
    </div>
  </div>
</li>

<style lang="postcss">
  .timeline-time-column {
    @apply flex items-center pr-9 -mr-9 border-r-4 border-gray-300 lg:pr-12 lg:-mr-12 dark:border-gray-600;
  }

  .timeline-logo-column {
    @apply flex place-self-center overflow-hidden p-1 min-w-[theme('spacing.16')] lg:min-w-[theme('spacing.24')] w-16 h-16 bg-white border-2 rounded-xl border-gray-300 shadow-xl lg:w-24 lg:h-24 lg:border-4 dark:border-gray-600;
    @apply shadow-2xl;
  }

  .timeline-info-column {
    @apply flex flex-col flex-grow justify-center py-6 pl-4 lg:pl-8;
  }
</style>
