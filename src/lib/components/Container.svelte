<script lang="ts">
  import { slugify } from '$lib/utils'
  import Divider from './Divider.svelte'

  export let title: string = ''
</script>

<div class="container-border w-full rounded-xl bg-gray-100 p-4 shadow-xl dark:bg-gray-800" id={slugify(title)}>
  {#if title}
    <h2 class="text-center text-3xl font-bold">
      <slot name="title" />
    </h2>
    <Divider />
  {/if}
  <slot />
</div>
