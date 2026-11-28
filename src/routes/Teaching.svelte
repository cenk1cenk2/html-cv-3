<script lang="ts">
  import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons'

  import type { TimelineItemFile } from '#lib/components/timeline/timeline-item.interface.js'
  import Timeline from '#lib/components/timeline/Timeline.svelte'
  import * as CSWS_10 from '#lib/content/timeline/teaching/10-csws.md'
  import * as CSWS_20 from '#lib/content/timeline/teaching/20-csws.md'
  import * as UPLEVELED_30 from '#lib/content/timeline/teaching/30-upleveled.md'
  import * as UPLEVELED_40 from '#lib/content/timeline/teaching/40-upleveled.md'
  import * as CSWS_50 from '#lib/content/timeline/teaching/50-csws.md'
  import * as CSWS_60 from '#lib/content/timeline/teaching/60-csws.md'

  const TIMELINE: TimelineItemFile[] = [CSWS_60, CSWS_50, UPLEVELED_40, UPLEVELED_30, CSWS_20, CSWS_10]
</script>

<Timeline name="Teaching Experience" items={TIMELINE} icon={faChalkboardUser} />
