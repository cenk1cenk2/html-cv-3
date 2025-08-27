<div class="speed-dial">
  <div class="flex-end flex space-x-4">
    <slot />
  </div>
</div>

<style lang="postcss">
  @reference "../../app.css";

  .speed-dial {
    @apply fixed right-8 bottom-8 z-50;
  }
</style>
