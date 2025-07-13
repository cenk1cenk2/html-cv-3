<script lang="ts">
  import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'

  export let showOnPx = 150
  let hidden = true

  const goTop = (): void => {
    // TODO: fix the eslint configuration with globals at somepoint
    // eslint-disable-next-line no-undef
    document.body.scrollIntoView()
  }

    // TODO: fix the eslint configuration with globals at somepoint
    // eslint-disable-next-line no-undef
  const scrollContainer = (): HTMLElement => {
    // TODO: fix the eslint configuration with globals at somepoint
    // eslint-disable-next-line no-undef
    return document.documentElement || document.body
  }

  const handleOnScroll = () => {
    if (!scrollContainer()) {
      return
    }

    if (scrollContainer().scrollTop > showOnPx) {
      hidden = false
    } else {
      hidden = true
    }
  }

  onMount(() => {
    handleOnScroll()
  })
</script>

<svelte:window on:scroll={handleOnScroll} />

    // TODO: fix the eslint configuration with globals at somepoint
    // eslint-disable-next-line no-undef
<div class="back-to-top" aria-label="back to top" on:click={goTop} on:keypress={goTop} class:hidden class:opacity-0={hidden}><Fa icon={faChevronUp} /></div>

<style lang="postcss">
  @reference "../../app.css";

  .back-to-top {
    @apply w-12;
    @apply rounded-xl bg-gray-300 dark:bg-gray-700 p-4 shadow-xl;
    @apply transform md:hover:text-primary-500;
  }
</style>
