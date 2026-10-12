<script lang="ts">
  import { reveal } from '#lib/actions/reveal.js'
  import { spotlight } from '#lib/actions/spotlight.js'
  import { slugify } from '#lib/utils/index.js'

  export let title: string
</script>

<section id={slugify(title)} class="transition duration-500 data-[spotlight=off]:opacity-30 data-[spotlight=off]:grayscale" use:spotlight>
  <div class="reveal-stagger grid grid-cols-12 px-2 pt-4" use:reveal>
    <div class="hidden text-center text-8xl xl:col-span-1 xl:grid 2xl:col-span-2">
      <p class="side-text">{title}</p>
    </div>
    <div class="col-span-full flex py-4 md:p-4 xl:col-span-10 2xl:col-span-8">
      <slot />
    </div>
  </div>
</section>

<style lang="postcss">
  @reference "../../app.css";

  .side-text {
    @apply p-4 text-gray-200 dark:text-gray-700;

    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }
</style>
