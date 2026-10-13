<script lang="ts">
  import type { TimelineItemFile } from './timeline-item.interface'

  interface Props {
    item: TimelineItemFile
  }

  let { item }: Props = $props()
</script>

<picture class="shadow-glow block rounded-xl">
  <span class="timeline-logo-glow" aria-hidden="true"><span class="timeline-logo-halo glow"></span></span>
  <source srcset="/logo/{item.metadata.logo.replace(/\.[^.]+$/, '.avif')}" type="image/avif" />
  <img src="/logo/{item.metadata.logo}" alt={item.metadata.name} loading="lazy" decoding="async" class="timeline-logo" />
</picture>

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-logo {
    @apply size-20 overflow-hidden rounded-xl border-2 border-gray-300 bg-white object-contain p-1 md:size-24 md:border-4 dark:border-gray-600;
  }

  .timeline-logo-glow {
    @apply absolute -inset-3 -z-10 transition-opacity duration-700 ease-out;
  }

  :global([data-reveal='below']) .timeline-logo-glow,
  :global([data-reveal='above']) .timeline-logo-glow {
    @apply opacity-0;
  }

  .timeline-logo-halo {
    @apply bg-primary-500/30 absolute inset-0 rounded-xl blur-2xl;
  }
</style>
