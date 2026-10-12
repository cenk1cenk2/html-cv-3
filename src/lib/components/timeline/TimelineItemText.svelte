<script lang="ts">
  import type { TimelineItemFile } from './timeline-item.interface'

  export let item: TimelineItemFile
</script>

<div class="prose dark:prose-dark mt-4 max-w-none leading-snug text-gray-700 dark:text-gray-300">
  <svelte:component this={item.default} />
</div>
