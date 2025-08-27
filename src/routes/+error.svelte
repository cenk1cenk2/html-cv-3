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
    class="mx-auto w-11/12 rounded-xl border-2 border-gray-200 bg-gray-50/90 shadow-2xl transition duration-300 ease-in-out lg:max-w-3xl lg:border-4
    dark:border-gray-700 dark:bg-gray-800/90"
  >
    <div class="p-9 lg:p-12">
      <h1 class="m-0 text-center font-mono text-7xl font-extrabold text-red-500 lg:text-9xl">{$page.status}</h1>

      <div class="border-primary-500 mx-auto mt-12 border-b-2 pt-3 opacity-50 lg:mx-0"></div>

      <h1 class="text-primary-500 truncate pt-8 text-center text-4xl leading-none font-bold whitespace-nowrap uppercase">{$page.error.message}</h1>

      <div class="mx-auto mt-12 flex w-4/5 flex-wrap items-center justify-evenly pb-16 text-5xl lg:pb-0">
        <a href="/" aria-label="Go back to home page." class="action-button"><Fa icon={faHome} /></a>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "../app.css";

  .action-button {
    @apply text-white;
    @apply hover:scale-110;
  }
</style>
