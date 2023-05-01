<script lang="ts">
  import { faHome } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { page } from '$app/stores'
</script>

<svelte:head>
  <title>kilic.dev: {$page.status} - {$page.error.message}</title>
</svelte:head>

<div class="flex items-center py-20 antialiased">
  <div
    class="mx-auto w-11/12 bg-gray-50 bg-opacity-90 rounded-xl border-2 border-gray-200 shadow-2xl transition duration-300 ease-in-out lg:max-w-3xl lg:border-4 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-9 lg:p-12">
      <h1 class="m-0 font-mono text-7xl font-extrabold text-center text-red-500 lg:text-9xl">{$page.status}</h1>

      <div class="pt-3 mx-auto mt-12 border-b-2 opacity-50 lg:mx-0 border-primary-500" />

      <h1 class="pt-8 text-4xl font-bold leading-none text-center uppercase whitespace-nowrap text-primary-500 truncate">{$page.error.message}</h1>

      <div class="flex flex-wrap justify-evenly items-center pb-16 mx-auto mt-12 w-4/5 text-5xl lg:pb-0">
        <a href="/" aria-label="Go back to home page." class="action-button"><Fa icon={faHome} /></a>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .action-button {
    @apply text-white;
    @apply hover:scale-110;
  }
</style>
