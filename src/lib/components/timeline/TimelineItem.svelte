<script lang="ts">
  import { reveal } from '#lib/actions/reveal.js'
  import type { TimelineItemFile } from './timeline-item.interface'
  import TimelineItemInfo from './TimelineItemInfo.svelte'
  import TimelineItemLogo from './TimelineItemLogo.svelte'
  import TimelineItemText from './TimelineItemText.svelte'
  import TimelineItemTime from './TimelineItemTime.svelte'

  export let item: TimelineItemFile
</script>

<li class="md:flex md:place-items-stretch">
  <!-- mobile view -->
  <div class="reveal-stagger my-8 border-t-2 border-gray-300 first:border-t-0 md:hidden dark:border-gray-600" use:reveal>
    <div class="mb-4 flex gap-4">
      <TimelineItemLogo {item}></TimelineItemLogo>
      <TimelineItemInfo {item}></TimelineItemInfo>
      <TimelineItemTime {item}></TimelineItemTime>
    </div>

    <TimelineItemText {item}></TimelineItemText>
  </div>

  <!-- desktop view -->
  <div class="reveal-stagger hidden md:relative md:isolate md:flex md:w-full md:place-items-stretch" use:reveal>
    <div class="timeline-chain">
      <span class="timeline-line"></span>
      <span class="timeline-link timeline-link-top"></span>
      <span class="timeline-link timeline-link-bottom"></span>
    </div>
    <TimelineItemTime {item}></TimelineItemTime>
    <TimelineItemLogo {item}></TimelineItemLogo>
    <div class="timeline-info-column">
      <TimelineItemInfo {item}></TimelineItemInfo>
      <TimelineItemText {item}></TimelineItemText>
    </div>
  </div>
</li>

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-chain {
    @apply pointer-events-none absolute inset-0 -z-10;
  }

  .timeline-line {
    @apply absolute top-2 bottom-2 left-44 w-1 -translate-x-1/2 bg-gray-300 dark:bg-gray-600;
  }

  li:first-child .timeline-line {
    @apply top-0;
  }

  li:last-child .timeline-line {
    @apply bottom-0;
  }

  .timeline-link {
    @apply absolute left-44 h-2 w-4 -translate-x-1/2 border-4 border-gray-300 dark:border-gray-600;
  }

  .timeline-link-top {
    @apply top-0 rounded-b-full border-t-0;
  }

  .timeline-link-bottom {
    @apply bottom-0 rounded-t-full border-b-0;
  }

  li:first-child .timeline-link-top,
  li:last-child .timeline-link-bottom {
    @apply hidden;
  }

  .timeline-info-column {
    @apply flex grow flex-col py-6 pl-4 md:justify-center lg:pl-8;
  }
</style>
