<script lang="ts">
  import { slugify } from '$lib/utils'

  export let title: string
</script>

<section id={slugify(title)}>
  <div class="grid grid-cols-12 pt-4">
    <div class="hidden text-8xl text-center xl:grid xl:col-span-1 2xl:col-span-2">
      <p class="side-text">{title}</p>
    </div>
    <div class="flex col-span-full py-4 md:p-4 xl:col-span-10 2xl:col-span-8">
      <slot />
    </div>
  </div>
</section>

<style lang="postcss">
  .side-text {
    @apply text-gray-200 dark:text-gray-700 p-4;

    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }
</style>
