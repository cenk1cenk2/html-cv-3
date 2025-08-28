<script lang="ts">
  import { faMouse } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'

  let visible = $state(false)
  let scrollIndicator: HTMLElement = $state()!

  const scrollToNext = () => {
    const sections = document.querySelectorAll('section')
    const section = sections.item(2)

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

{#if visible}
  <div
    bind:this={scrollIndicator}
    class="scroll-indicator"
    onclick={scrollToNext}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === 'Enter' && scrollToNext()}
    aria-label="Scroll down to see more content"
  >
    <div class="scroll-icon">
      <Fa icon={faMouse} size="2x" />
    </div>
    <div class="scroll-arrow">
      <div class="chevron"></div>
      <div class="chevron"></div>
      <div class="chevron"></div>
    </div>
  </div>
{/if}

<style lang="postcss">
  @reference "../../app.css";

  .scroll-indicator {
    @apply absolute top-1/2 right-8 z-50 flex cursor-pointer flex-col items-center text-white transition-all duration-300 hover:scale-110;
    transform: translateY(-50%);
    animation: bounce 2s infinite;
  }

  .scroll-icon {
    @apply mb-2 flex items-center justify-center opacity-75;
    animation: pulse 2s infinite;
  }

  .scroll-arrow {
    @apply flex flex-col items-center;
  }

  .chevron {
    @apply mb-1 h-3 w-3 rotate-45 border-r-2 border-b-2 border-white opacity-75;
    animation: fade 2s infinite;
  }

  .chevron:nth-child(1) {
    animation-delay: 0s;
  }

  .chevron:nth-child(2) {
    animation-delay: 0.15s;
  }

  .chevron:nth-child(3) {
    animation-delay: 0.3s;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(-50%);
    }
    40% {
      transform: translateY(-60px);
    }
    60% {
      transform: translateY(-55px);
    }
  }

  @media (max-width: 768px) {
    @keyframes bounce {
      0%,
      20%,
      50%,
      80%,
      100% {
        transform: translateX(-50%) translateY(0);
      }
      40% {
        transform: translateX(-50%) translateY(-10px);
      }
      60% {
        transform: translateX(-50%) translateY(-5px);
      }
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @media (prefers-color-scheme: dark) {
    .scroll-indicator {
      @apply text-gray-200;
    }

    .chevron {
      @apply border-gray-200;
    }
  }

  @media (max-width: 768px) {
    .scroll-indicator {
      @apply top-auto right-auto bottom-6 left-1/2;
      transform: translateX(-50%);
    }

    .chevron {
      @apply h-2 w-2;
    }
  }
</style>
