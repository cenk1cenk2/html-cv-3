<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import type { TimelineItem } from './timeline-item.interface'

  export let name: string
  export let icon: IconDefinition
  export let items: TimelineItem[]
</script>

<div class="w-full">
  <h2 class="text-3xl font-bold text-center">
    <Fa {icon} class="inline-block self-center mr-2" />
    {name}
  </h2>

  <div class="pt-3 mx-auto border-b-2 opacity-50 lg:mx-0 border-primary-500" />
  <ul class="pt-2">
    {#each items as item}
      <li class="flex flex-row items-center">
        <div class="flex items-center pr-9 -mr-9 h-[calc(100%+theme(space.8))] border-r-4 border-gray-200 lg:pr-12 lg:-mr-12 dark:border-gray-700">
          <div class="flex flex-col w-32 text-center">
            {#if typeof item.end === 'boolean' && !item.end}
              <p class="text-green-600">Present</p>
            {:else if typeof item.end === 'string'}
              <p>{item.end}</p>
            {/if}
            {#if item.end}
              <p>–</p>
            {/if}
            <p>{item.start}</p>
            {#if item.note}
              <p class="text-sm italic text-gray-400">{item.note}</p>
            {/if}
          </div>
        </div>
        <div
          class="flex overflow-hidden items-center p-1 w-16 h-16 bg-white bg-cover rounded-xl border-gray-200 shadow-xl lg:w-24 lg:h-24 lg:border-4 dark:border-gray-700 border-1"
        >
          <img src="logo/{item.logo}" alt={item.name} />
        </div>

        <div class="grid flex-grow grid-cols-1 py-6 pl-4 lg:grid-cols-2 lg:pl-8">
          <div class="flex flex-col justify-center">
            <p class="font-semibold lg:text-lg">{item.name}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{item.location}</p>
            {#if item.role}
              <p class="text-sm 2xl:text-base">{item.role}</p>
            {/if}
          </div>

          {#if item.description}
            <ul class="text-sm text-gray-600 dark:text-gray-400">
              {#each item.description as description}
                <li>{description}</li>
              {/each}
            </ul>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
</div>
