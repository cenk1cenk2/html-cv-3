<div class="speed-dial">
  <div class="flex space-x-4 flex-end">
    <slot />
  </div>
</div>

<style lang="postcss">
  .speed-dial {
    @apply z-50 right-8 bottom-8 fixed;
  }
</style>
