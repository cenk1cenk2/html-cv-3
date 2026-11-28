<script lang="ts">
  import { faUserTie } from '@fortawesome/free-solid-svg-icons'

  import type { TimelineItemFile } from '#lib/components/timeline/timeline-item.interface.js'
  import Timeline from '#lib/components/timeline/Timeline.svelte'
  import * as TEKFEN from '#lib/content/timeline/work/10-tekfen.md'
  import * as WS from '#lib/content/timeline/work/20-ws.md'
  import * as SORWE from '#lib/content/timeline/work/30-sorwe.md'
  import * as REWE from '#lib/content/timeline/work/40-rewe.md'
  import * as LARAVEL from '#lib/content/timeline/work/50-laravel.md'

  const TIMELINE: TimelineItemFile[] = [LARAVEL, SORWE, REWE, WS, TEKFEN]
</script>

<Timeline name="Work Experience" items={TIMELINE} icon={faUserTie} />
