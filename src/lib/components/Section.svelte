<script lang="ts">
  import type { Snippet } from 'svelte'

  import { reveal } from '#lib/actions/reveal.js'
  import { spotlight } from '#lib/actions/spotlight.js'
  import { slugify } from '#lib/utils/index.js'

  interface Props {
    title: string
    children?: Snippet
  }

  let { title, children }: Props = $props()
</script>

<section
  id={slugify(title)}
  class="group/section overflow-x-clip transition duration-500 data-[spotlight=off]:opacity-30 data-[spotlight=off]:grayscale contrast-more:opacity-100! contrast-more:grayscale-0!"
  use:spotlight
>
  <div class="reveal-fade grid grid-cols-12 px-2 pt-4" use:reveal>
    <div class="hidden text-center text-8xl xl:col-span-1 xl:grid 2xl:col-span-2">
      <p class="side-text">{title}</p>
    </div>
    <div class="col-span-full flex py-4 md:p-4 xl:col-span-10 2xl:col-span-8">
      {@render children?.()}
    </div>
  </div>
</section>

<style lang="postcss">
  @reference "../../app.css";

  .side-text {
    @apply p-4 text-gray-200 opacity-0 transition-opacity duration-700 ease-out group-data-[spotlight=on]/section:opacity-100 dark:text-gray-700;

    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }
</style>
