<script lang="ts">
  import { faHome } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { page } from '$app/state'
</script>

<svelte:head>
  <title>kilic.dev: {page.status} - {page.error?.message}</title>
</svelte:head>

<section class="relative isolate flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center">
  <div class="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>

  <h1 class="text-primary-500 motion-safe:animate-rise text-9xl leading-none font-bold tracking-tighter lg:text-[12rem]">{page.status}</h1>
  <p class="motion-safe:animate-rise text-2xl font-medium text-gray-500 motion-safe:[animation-delay:100ms] lg:text-3xl dark:text-gray-300">{page.error?.message}</p>
  <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
  <a href="/" class="pill-link motion-safe:animate-rise motion-safe:[animation-delay:200ms]"><Fa icon={faHome} /> Back home</a>
</section>
