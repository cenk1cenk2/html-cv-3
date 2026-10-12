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

<svelte:window onscroll={handleOnScroll} />

<button type="button" class="back-to-top" aria-label="back to top" onclick={goTop} class:hidden class:opacity-0={hidden}>
  <Fa icon={faChevronUp} />
</button>

<style lang="postcss">
  @reference "../../app.css";

  .back-to-top {
    @apply w-12;
    @apply rounded-xl bg-gray-300 p-4 shadow-xl dark:bg-gray-700;
    @apply md:hover:text-primary-500 transform;
  }
</style>
