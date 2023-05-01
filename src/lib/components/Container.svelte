<script lang="ts">
  import { slugify } from '$lib/utils'

  export let title: string = ''
</script>

<div class="p-4 w-full bg-gray-100 rounded-xl shadow-xl dark:bg-gray-800 container-border" id={slugify(title)}>
  {#if title}
    <h2 class="text-3xl font-bold text-center">
      <slot name="title" />
    </h2>
  {/if}
  <slot />
</div>
