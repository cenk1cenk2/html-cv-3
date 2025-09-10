<script lang="ts">
  import type { TimelineItemFile } from './timeline-item.interface'

  export let item: TimelineItemFile
</script>

<div class="prose dark:prose-dark max-w-none pt-2 leading-tight text-gray-700 dark:text-gray-300">
  <svelte:component this={item.default} />
</div>

<style lang="postcss">
  @reference "../../../app.css";
</style>
