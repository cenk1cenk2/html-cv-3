<script lang="ts">
  import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'

  export let showOnPx = 150
  let hidden = true

  const goTop = (): void => {
    document.body.scrollIntoView()
  }

  const scrollContainer = (): HTMLElement => {
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

<div class="back-to-top" on:click={goTop} on:keypress={goTop} class:hidden class:opacity-0={hidden}><Fa icon={faChevronUp} /></div>

<style lang="postcss">
  .back-to-top {
    @apply transition-all w-12;
    @apply rounded-xl bg-gray-300 dark:bg-gray-700 p-4 shadow-xl;
    @apply transform hover:text-primary-500;
  }
</style>
