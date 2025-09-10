<script lang="ts">
  import type { TimelineItemFile } from './timeline-item.interface'

  export let item: TimelineItemFile
</script>

<div class="grow flex-col content-center">
  <p class="text-lg font-semibold">{item.metadata.name}</p>
  <p class="text-sm text-gray-700 dark:text-gray-300">
    {item.metadata.location}
    {#if item.metadata.attendance}<span class="text-sm text-gray-700 italic dark:text-gray-300">({item.metadata.attendance})</span>{/if}
  </p>
  {#if item.metadata.role}
    <p class=" font-semibold">{item.metadata.role}</p>
  {/if}
</div>

<style lang="postcss">
  @reference "../../../app.css";
</style>
