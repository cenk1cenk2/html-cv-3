<script lang="ts">
  import { faPlug } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'

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
      <Fa icon={faPlug} class="rotate-180" />
    </span>
    <svg class="scroll-hint-socket" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
      <rect class="scroll-hint-hole" x="7" y="6" width="3" height="7" rx="1" />
      <rect class="scroll-hint-hole" x="14" y="6" width="3" height="7" rx="1" />
      <circle class="scroll-hint-hole" cx="12" cy="17" r="1.5" />
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
    @apply motion-safe:animate-plug-in absolute bottom-4 flex flex-col items-center text-sm;
  }

  .scroll-hint-cable {
    @apply h-20 w-0.5 rounded-full bg-current;
  }

  .scroll-hint-socket {
    --socket-off: color-mix(in oklab, var(--color-gray-900) 40%, transparent);

    @apply motion-safe:animate-socket-glow relative size-5 text-(--socket-off) dark:[--socket-off:color-mix(in_oklab,white_40%,transparent)];
  }

  .scroll-hint-hole {
    @apply fill-white dark:fill-gray-900;
  }
</style>
