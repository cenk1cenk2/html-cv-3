<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { slugify } from '#lib/utils/index.js'
  import type { TimelineItemFile } from './timeline-item.interface'
  import TimelineItem from './TimelineItem.svelte'
  import Divider from '../Divider.svelte'

  export let name: string
  export let icon: IconDefinition
  export let items: TimelineItemFile[]
</script>

<div class="w-full" id={slugify(name)}>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <h2 class="flex items-center justify-center gap-3 text-3xl font-bold" tabindex="0">
    <Fa {icon} />
    {name}
  </h2>
  <Divider />

  <ul class="mt-8">
    {#each items as item (JSON.stringify(item.metadata))}
      <TimelineItem {item} />
    {/each}
  </ul>
</div>
