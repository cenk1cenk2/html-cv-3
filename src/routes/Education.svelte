<script lang="ts">
  import { faUserGraduate } from '@fortawesome/free-solid-svg-icons'

  import type { TimelineItemFile } from '#lib/components/timeline/timeline-item.interface.js'
  import Timeline from '#lib/components/timeline/Timeline.svelte'
  import * as KAL from '#lib/content/timeline/education/10-kal.md'
  import * as KOC from '#lib/content/timeline/education/20-koc.md'
  import * as FH_TW from '#lib/content/timeline/education/30-fh-tw.md'

  const TIMELINE: TimelineItemFile[] = [FH_TW, KOC, KAL]
</script>

<Timeline name="Education" items={TIMELINE} icon={faUserGraduate} />
