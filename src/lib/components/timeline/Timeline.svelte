<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import type { TimelineItemFile } from './timeline-item.interface'
  import TimelineItem from './Timeline-Item.svelte'
  import Container from '../Container.svelte'
  import Divider from '../Divider.svelte'

  export let name: string
  export let icon: IconDefinition
  export let items: TimelineItemFile[]
</script>

<Container>
  <h2 class="text-3xl font-bold text-center">
    <Fa {icon} class="inline-block self-center mr-2" />
    {name}
  </h2>

  <Divider />
  <ul class="pt-2">
    {#each items as item}
      <TimelineItem {item} />
    {/each}
  </ul>
</Container>
