<script lang="ts">
  import { slugify } from '$lib/utils'

  export let id: string = ''
</script>

<div class="p-4 w-full bg-gray-100 rounded-xl shadow-xl dark:bg-gray-800 container-border" id={slugify(id)}>
  <slot />
</div>
