<script lang="ts">
  import { reveal } from '#lib/actions/reveal.js'
  import type { TimelineItemFile } from './timeline-item.interface'
  import TimelineItemInfo from './TimelineItemInfo.svelte'
  import TimelineItemLogo from './TimelineItemLogo.svelte'
  import TimelineItemText from './TimelineItemText.svelte'
  import TimelineItemTime from './TimelineItemTime.svelte'

  export let item: TimelineItemFile
</script>

{#snippet tetherOut(extra: string = 'flex')}
  <span class="tether tether-out {extra}"><span class="tether-stub"></span><span class="tether-half tether-half-left"></span></span>
{/snippet}

{#snippet tetherIn(extra: string = 'flex')}
  <span class="tether tether-in {extra}"><span class="tether-half tether-half-right"></span><span class="tether-stub"></span></span>
{/snippet}

<li class="timeline-item group" use:reveal>
  <div class="timeline-chain">
    <span class="timeline-line"></span>
    <span class="timeline-link timeline-link-top"></span>
    <span class="timeline-link timeline-link-bottom"></span>
  </div>
  <div class="timeline-date-cell reveal-slide">
    <TimelineItemTime {item}></TimelineItemTime>
    {@render tetherOut()}
  </div>
  <div class="timeline-logo-cell reveal-slide">
    <div class="relative">
      {@render tetherIn()}
      <TimelineItemLogo {item}></TimelineItemLogo>
      {@render tetherOut('hidden md:flex')}
    </div>
  </div>
  <article class="timeline-card reveal-slide">
    {@render tetherIn('hidden md:flex')}
    <div class="reveal-item delay-450 md:delay-150">
      <TimelineItemInfo {item}></TimelineItemInfo>
    </div>
    <div class="reveal-item delay-600 md:delay-300">
      <TimelineItemText {item}></TimelineItemText>
    </div>
  </article>
</li>

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-item {
    @apply relative isolate grid grid-cols-[minmax(0,1fr)_11rem_1.5rem_5rem_minmax(0,1fr)] items-center gap-y-4 py-4 [view-timeline-name:--row];
    @apply md:grid-cols-[11rem_6rem_minmax(0,1fr)] md:gap-x-6 md:gap-y-3 md:py-3;
  }

  .timeline-date-cell {
    @apply relative col-start-2 row-start-1 [--slide-x:-1.5rem] [--slide-y:0px] md:col-start-1 md:[--slide-x:0.75rem];
  }

  .timeline-logo-cell {
    @apply col-start-4 row-start-1 flex justify-center [--slide-x:0px] [--slide-y:0px] md:col-start-2 md:[--slide-x:1.5rem];
  }

  .timeline-chain {
    @apply pointer-events-none absolute inset-0 -z-10 [--chain-x:calc(50%+6.25rem)] md:[--chain-x:15.5rem];
  }

  .timeline-line {
    @apply absolute top-1.5 bottom-1.5 left-(--chain-x) w-[3px] origin-top -translate-x-1/2 bg-gray-300 dark:bg-gray-600;
  }

  li:first-child .timeline-line {
    @apply top-0;
  }

  li:last-child .timeline-line {
    @apply bottom-0;
  }

  .timeline-link {
    @apply absolute left-(--chain-x) h-1.5 w-3 -translate-x-1/2 border-[3px] border-gray-300 dark:border-gray-600;
  }

  .timeline-link-top {
    @apply top-0 rounded-b-full border-t-0;
  }

  .timeline-link-bottom {
    @apply bottom-0 rounded-t-full border-b-0;
  }

  li:first-child .timeline-link-top,
  li:last-child .timeline-link-bottom {
    @apply h-[3px] w-4 rounded-full border-0 bg-gray-300 dark:bg-gray-600;
  }

  .tether {
    @apply absolute top-1/2 -translate-y-1/2 items-center;
  }

  .tether-out {
    @apply left-full;
  }

  .tether-in {
    @apply right-full;
  }

  .tether-stub {
    @apply h-[3px] w-1.5 bg-gray-300 dark:bg-gray-600;
  }

  .tether-out .tether-stub {
    @apply origin-left;
  }

  .tether-in .tether-stub {
    @apply origin-right;
  }

  .tether-half {
    @apply h-3 w-1.5 border-[3px] border-gray-300 dark:border-gray-600;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .timeline-line {
        animation: draw-y linear both;
        animation-timeline: --row;
        animation-range: entry 0% entry 350px;
      }

      .timeline-link-top {
        animation: fade-in linear both;
        animation-timeline: --row;
        animation-range: entry 0% entry 60px;
      }

      .timeline-link-bottom {
        animation: fade-in linear both;
        animation-timeline: --row;
        animation-range: entry 330px entry 380px;
      }

      .tether-stub {
        animation: draw-x ease-out both;
        animation-timeline: --row;
        animation-range: entry 40px entry 160px;
      }

      .tether-half {
        animation: fade-in linear both;
        animation-timeline: --row;
        animation-range: entry 140px entry 200px;
      }
    }
  }

  .tether-half-left {
    @apply rounded-l-full border-r-0;
  }

  .tether-half-right {
    @apply rounded-r-full border-l-0;
  }

  .timeline-card {
    @apply relative col-span-full row-start-2 md:col-span-1 md:col-start-3 md:row-start-1;
    @apply delay-300 [--slide-x:0px] [--slide-y:1.5rem] md:delay-0 md:[--slide-x:3rem] md:[--slide-y:0px];
    @apply rounded-xl border-2 border-gray-200 bg-white p-5 shadow-xl backdrop-blur md:bg-white/60 md:p-6 lg:border-4 dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-800/50;
    @apply hover:border-primary-500/50;
  }

  .timeline-card .tether-in {
    @apply right-[calc(100%+2px)] lg:right-[calc(100%+4px)];
  }
</style>
