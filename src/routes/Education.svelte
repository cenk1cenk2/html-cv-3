<script lang="ts">
  import { faUserGraduate } from '@fortawesome/free-solid-svg-icons'

  import type { TimelineItemFile } from '$lib/components/timeline/timeline-item.interface'
  import Timeline from '$lib/components/timeline/Timeline.svelte'
  import KAL, { metadata as KAL_METADATA } from '$lib/content/timeline/education/10-kal.md'
  import KOC, { metadata as KOC_METADATA } from '$lib/content/timeline/education/20-koc.md'
  import FH_TW, { metadata as FH_TW_METADATA } from '$lib/content/timeline/education/30-fh-tw.md'

  export let TIMELINE: TimelineItemFile[] = [
    { default: FH_TW, metadata: FH_TW_METADATA },
    { default: KOC, metadata: KOC_METADATA },
    { default: KAL, metadata: KAL_METADATA }
  ]
</script>

<Timeline name="Education" items={TIMELINE} icon={faUserGraduate} />
