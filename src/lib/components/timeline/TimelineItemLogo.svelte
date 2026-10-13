<script lang="ts">
  import type { TimelineItemFile } from './timeline-item.interface'

  interface Props {
    item: TimelineItemFile
  }

  let { item }: Props = $props()
</script>

<picture class="relative block">
  <span class="timeline-logo-halo" aria-hidden="true"></span>
  <source srcset="/logo/{item.metadata.logo.replace(/\.[^.]+$/, '.avif')}" type="image/avif" />
  <img src="/logo/{item.metadata.logo}" alt={item.metadata.name} loading="lazy" decoding="async" class="timeline-logo" />
</picture>

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-logo {
    @apply size-20 overflow-hidden rounded-xl border-2 border-gray-300 bg-white object-contain p-1 md:size-24 md:border-4 dark:border-gray-600;
    @apply shadow-xl;
  }

  .timeline-logo-halo {
    @apply bg-primary-500/30 absolute -inset-3 -z-10 rounded-xl blur-2xl;
  }
</style>
