<script lang="ts">
  interface Props {
    class?: string
  }

  let { class: className = '' }: Props = $props()
</script>

<svg class={className} viewBox="0 0 16 20" fill="currentColor" aria-hidden="true">
  <path d="M5 0h6v3h2a2 2 0 0 1 2 2v5a5 5 0 0 1-5 5H6a5 5 0 0 1-5-5V5a2 2 0 0 1 2-2h2z" />
  <rect x="4" y="14" width="2" height="6" rx="1" />
  <rect x="10" y="14" width="2" height="6" rx="1" />
</svg>
