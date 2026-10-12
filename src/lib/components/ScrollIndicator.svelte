<script lang="ts">
  import { onMount } from 'svelte'

  let visible = $state(false)

  const scrollToNext = () => {
    const sections = document.querySelectorAll('section')
    const section = sections.item(1)

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const isVisible = () => {
    return window.scrollY < 100
  }

  onMount(() => {
    setTimeout(() => {
      visible = isVisible()
    }, 100)

    const handleScroll = () => {
      visible = isVisible()
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
</script>

<button
  type="button"
  class="scroll-hint"
  class:opacity-0={!visible}
  class:pointer-events-none={!visible}
  inert={!visible}
  onclick={scrollToNext}
  aria-label="Scroll down to see more content"
>
  <span class="scroll-hint-label">Scroll</span>
  <span class="scroll-hint-track">
    <span class="scroll-hint-thumb"></span>
  </span>
</button>

<style lang="postcss">
  @reference "../../app.css";

  .scroll-hint {
    @apply fixed top-1/2 right-10 z-40 hidden -translate-y-1/2 cursor-pointer flex-col items-center gap-4 transition-opacity duration-500 lg:flex;
    @apply hover:text-primary-500 text-gray-700 dark:text-white/80;
  }

  .scroll-hint-label {
    @apply text-xs font-semibold tracking-[0.3em] uppercase;

    writing-mode: vertical-lr;
  }

  .scroll-hint-track {
    @apply relative h-20 w-0.5 overflow-hidden rounded-full bg-gray-900/20 dark:bg-white/25;
  }

  .scroll-hint-thumb {
    @apply bg-primary-500 motion-safe:animate-scroll-line absolute inset-x-0 top-0 h-1/2;
  }
</style>
