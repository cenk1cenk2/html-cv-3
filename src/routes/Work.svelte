<script lang="ts">
  import { faUserTie } from '@fortawesome/free-solid-svg-icons'

  import type { TimelineItemFile } from '$lib/components/timeline/timeline-item.interface'
  import Timeline from '$lib/components/timeline/Timeline.svelte'
  import TEKFEN, { metadata as TEKFEN_METADATA } from '$lib/content/timeline/work/10-tekfen.md'
  import WS, { metadata as WS_METADATA } from '$lib/content/timeline/work/20-ws.md'
  import SORWE, { metadata as SORWE_METADATA } from '$lib/content/timeline/work/30-sorwe.md'

  export let TIMELINE: TimelineItemFile[] = [
    { default: WS, metadata: WS_METADATA },
    { default: SORWE, metadata: SORWE_METADATA },
    { default: TEKFEN, metadata: TEKFEN_METADATA }
  ]
</script>

<Timeline name="Work Experience" items={TIMELINE} icon={faUserTie} />
