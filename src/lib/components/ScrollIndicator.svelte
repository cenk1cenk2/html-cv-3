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
    <span class="scroll-hint-plug">
      <span class="scroll-hint-cable"></span>
      <svg class="scroll-hint-plug-head" viewBox="0 0 16 20" fill="currentColor">
        <path d="M5 0h6v3h2a2 2 0 0 1 2 2v5a5 5 0 0 1-5 5H6a5 5 0 0 1-5-5V5a2 2 0 0 1 2-2h2z" />
        <rect x="4" y="14" width="2" height="6" rx="1" />
        <rect x="10" y="14" width="2" height="6" rx="1" />
      </svg>
    </span>
    <svg class="scroll-hint-socket" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <circle class="scroll-hint-recess" cx="12" cy="12" r="7.5" />
      <circle class="scroll-hint-hole" cx="8.5" cy="12" r="1.6" />
      <circle class="scroll-hint-hole" cx="15.5" cy="12" r="1.6" />
    </svg>
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
    @apply relative flex h-24 w-5 flex-col items-center justify-end overflow-hidden;
  }

  .scroll-hint-plug {
    @apply motion-safe:animate-plug-in absolute bottom-3 z-0 flex flex-col items-center;
  }

  .scroll-hint-cable {
    @apply h-20 w-0.5 rounded-full bg-current;
  }

  .scroll-hint-socket {
    --socket-off: var(--color-gray-400);

    @apply motion-safe:animate-socket-glow relative z-10 size-5 text-(--socket-off) dark:[--socket-off:var(--color-gray-500)];
  }

  .scroll-hint-plug-head {
    @apply w-3;
  }

  .scroll-hint-recess {
    @apply fill-black/15 dark:fill-black/30;
  }

  .scroll-hint-hole {
    @apply fill-white dark:fill-gray-900;
  }
</style>
