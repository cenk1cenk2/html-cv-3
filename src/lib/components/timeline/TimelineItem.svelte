<script lang="ts">
  import type { TimelineItemFile } from './timeline-item.interface'
  import TimelineItemInfo from './TimelineItemInfo.svelte'
  import TimelineItemLogo from './TimelineItemLogo.svelte'
  import TimelineItemText from './TimelineItemText.svelte'
  import TimelineItemTime from './TimelineItemTime.svelte'

  export let item: TimelineItemFile
</script>

<li class="md:flex md:place-items-stretch">
  <!-- mobile view -->
  <div class="my-8 border-t-2 border-gray-300 first:border-t-0 md:hidden dark:border-gray-600">
    <div class="mb-4 flex gap-4">
      <TimelineItemLogo {item}></TimelineItemLogo>
      <TimelineItemInfo {item}></TimelineItemInfo>
      <TimelineItemTime {item}></TimelineItemTime>
    </div>

    <TimelineItemText {item}></TimelineItemText>
  </div>

  <!-- desktop view -->
  <div class="hidden md:flex md:w-full md:place-items-stretch">
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

  .timeline-info-column {
    @apply flex grow flex-col py-6 pl-4 md:justify-center lg:pl-8;
  }
</style>
