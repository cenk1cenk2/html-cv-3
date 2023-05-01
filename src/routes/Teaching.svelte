<script lang="ts">
  import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons'

  import type { TimelineItemFile } from '$lib/components/timeline/timeline-item.interface'
  import Timeline from '$lib/components/timeline/Timeline.svelte'
  import CSWS_10, { metadata as CSWS_10_METADATA } from '$lib/content/timeline/teaching/10-csws.md'
  import CSWS_20, { metadata as CSWS_20_METADATA } from '$lib/content/timeline/teaching/20-csws.md'
  import UPLEVELED_30, { metadata as UPLEVELED_30_METADATA } from '$lib/content/timeline/teaching/30-upleveled.md'
  import UPLEVELED_40, { metadata as UPLEVELED_40_METADATA } from '$lib/content/timeline/teaching/40-upleveled.md'
  import CSWS_50, { metadata as CSWS_50_METADATA } from '$lib/content/timeline/teaching/50-csws.md'
  import CSWS_60, { metadata as CSWS_60_METADATA } from '$lib/content/timeline/teaching/60-csws.md'

  export let TIMELINE: TimelineItemFile[] = [
    { default: CSWS_60, metadata: CSWS_60_METADATA },
    { default: CSWS_50, metadata: CSWS_50_METADATA },
    { default: UPLEVELED_40, metadata: UPLEVELED_40_METADATA },
    { default: UPLEVELED_30, metadata: UPLEVELED_30_METADATA },
    { default: CSWS_20, metadata: CSWS_20_METADATA },
    { default: CSWS_10, metadata: CSWS_10_METADATA }
  ]
</script>

<Timeline name="Teaching Experience" items={TIMELINE} icon={faChalkboardUser} />
