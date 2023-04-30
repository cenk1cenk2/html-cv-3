<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import type { TimelineItemFile } from './timeline-item.interface'
  import TimelineItem from './Timeline-Item.svelte'
  import Container from '../Container.svelte'

  export let name: string
  export let icon: IconDefinition
  export let items: TimelineItemFile[]
</script>

<Container>
  <h2 class="text-3xl font-bold text-center">
    <Fa {icon} class="inline-block self-center mr-2" />
    {name}
  </h2>

  <div class="pt-3 mx-auto border-b-2 opacity-50 lg:mx-0 border-primary-500" />
  <ul class="pt-2">
    {#each items as item}
      <TimelineItem {item} />
    {/each}
  </ul>
</Container>
