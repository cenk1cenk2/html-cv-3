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

<Container title={name}>
  <svelte:fragment slot="title">
    <Fa {icon} class="inline-block self-center mr-2" />
    {name}
  </svelte:fragment>

  <ul class="pt-4">
    {#each items as item}
      <TimelineItem {item} />
    {/each}
  </ul>
</Container>
