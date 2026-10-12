<script lang="ts">
  import ContactLinks from '#lib/components/ContactLinks.svelte'
</script>

<footer class="relative isolate overflow-hidden px-6 pt-32 pb-28">
  <div class="grid-lines absolute inset-0 -z-10 [mask-image:linear-gradient(to_top,black_10%,transparent_80%)]"></div>

  <div class="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
    <h2 class="text-5xl leading-[0.9] font-bold tracking-tighter sm:text-6xl lg:text-7xl">Get in touch<span class="text-primary-500">.</span></h2>
    <div class="flex flex-wrap justify-center gap-3">
      <ContactLinks />
    </div>
  </div>

  <div class="mx-auto mt-24 flex max-w-6xl justify-center border-t-2 border-gray-200 pt-8 dark:border-gray-800">
    <a href="https://kilic.dev" rel="noopener" class="flex items-center gap-3 text-xl font-semibold text-gray-700 dark:text-gray-300">
      <img alt="" src="https://main.s3.kilic.dev/html/android-chrome-192x192.png" class="size-10" />
      kilic.dev
    </a>
  </div>
</footer>
