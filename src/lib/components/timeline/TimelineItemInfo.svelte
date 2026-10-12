<script lang="ts">
  import { faBuilding, faHouseLaptop, faLocationDot } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import type { TimelineItemFile } from './timeline-item.interface'

  export let item: TimelineItemFile
</script>

<div class="min-w-0">
  <h3 class="text-lg leading-tight font-semibold md:text-xl">{item.metadata.name}</h3>
  {#if item.metadata.role}
    <p class="mt-1 font-medium text-gray-700 dark:text-gray-200">{item.metadata.role}</p>
  {/if}
  <div class="mt-3 flex flex-wrap gap-2">
    <span class="tag-pill"><Fa icon={faLocationDot} /> {item.metadata.location}</span>
    {#if item.metadata.attendance}
      <span class="tag-pill"><Fa icon={item.metadata.attendance === 'Remote' ? faHouseLaptop : faBuilding} /> {item.metadata.attendance}</span>
    {/if}
  </div>
</div>
