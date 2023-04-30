<script lang="ts">
  export let title: string
</script>

<section id={title}>
  <div class="grid grid-cols-12 py-4 lg:py-8">
    <div class="hidden text-8xl text-center 2xl:grid 2xl:col-span-2">
      <p class="side-text">{title}</p>
    </div>
    <div class="flex col-span-full justify-center p-2 w-full rounded-xl shadow-xl lg:p-4 2xl:col-span-8 dark:bg-gray-800 max-w-11/12">
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
