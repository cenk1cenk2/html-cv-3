<script lang="ts">
  interface Props {
    class?: string
  }

  let { class: className = '' }: Props = $props()
</script>

<svg class="socket {className}" viewBox="0 0 24 24" aria-hidden="true">
  <circle cx="12" cy="12" r="11" fill="currentColor" />
  <circle class="socket-recess" cx="12" cy="12" r="7.5" />
  <circle class="socket-hole" cx="8.5" cy="12" r="1.6" />
  <circle class="socket-hole" cx="15.5" cy="12" r="1.6" />
</svg>

<style lang="postcss">
  @reference "../../../app.css";

  .socket {
    @apply text-(--socket-off) [--socket-off:var(--color-gray-300)] dark:[--socket-off:var(--color-gray-200)];
  }

  .socket-recess {
    @apply fill-black/10;
  }

  .socket-hole {
    @apply fill-gray-600 dark:fill-gray-900;
  }
</style>
