<div class="divider">
  <div class="divider-line border-primary-500 draw-x shadow-glow border-b-2 opacity-50"></div>
</div>

<style lang="postcss">
  @reference "../../app.css";

  .divider {
    @apply relative mx-auto pt-4 lg:mx-0;
  }

  .divider::before {
    @apply absolute inset-x-0 bottom-0 h-0.5 bg-gray-200 content-[''] md:hidden dark:bg-gray-700;
  }
</style>
