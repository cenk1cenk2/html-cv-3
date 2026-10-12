<script lang="ts">
  import type { TimelineItemFile } from './timeline-item.interface'

  export let item: TimelineItemFile
</script>

<img src="/logo/{item.metadata.logo}" alt={item.metadata.name} class="timeline-logo" />

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-logo {
    @apply size-20 overflow-hidden rounded-xl border-2 border-gray-300 bg-white object-contain p-1 shadow-2xl md:size-24 md:border-4 dark:border-gray-600;
  }
</style>
