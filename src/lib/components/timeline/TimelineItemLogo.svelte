<script lang="ts">
  import type { TimelineItemFile } from './timeline-item.interface'

  export let item: TimelineItemFile
</script>

<div class="timeline-logo-column">
  <img src="/logo/{item.metadata.logo}" alt={item.metadata.name} class="timeline-logo" />
</div>

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-logo-column {
    @apply place-self-center;
  }

  .timeline-logo {
    @apply object-contain;
    @apply flex h-16 w-16 min-w-16 overflow-hidden;
    @apply rounded-xl border-2 border-gray-300 bg-white p-1 shadow-xl md:h-24 md:w-24 md:min-w-24 md:border-4 dark:border-gray-600;
    @apply shadow-2xl;
    @apply place-self-center;
  }
</style>
