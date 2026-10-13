<script lang="ts">
  import { reveal } from '#lib/actions/reveal.js'
  import type { TimelineItemFile } from './timeline-item.interface'
  import TimelineItemInfo from './TimelineItemInfo.svelte'
  import TimelineItemLogo from './TimelineItemLogo.svelte'
  import TimelineItemText from './TimelineItemText.svelte'
  import TimelineItemTime from './TimelineItemTime.svelte'

  interface Props {
    item: TimelineItemFile
  }

  let { item }: Props = $props()

  let expanded = $state(false)

  const toggle = (event: MouseEvent): void => {
    if (!item.metadata.more || (event.target as Element).closest('a, button') || window.getSelection()?.toString()) {
      return
    }

    expanded = !expanded
  }
</script>

{#snippet tetherOut(extra: string = 'flex')}
  <span class="tether tether-out {extra}"><span class="tether-stub"></span><span class="tether-half tether-half-left"></span></span>
{/snippet}

{#snippet tetherIn(extra: string = 'flex')}
  <span class="tether tether-in {extra}"><span class="tether-half tether-half-right"></span><span class="tether-stub"></span></span>
{/snippet}

<li class="timeline-item group" class:expanded use:reveal>
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
    <span class="tether-down"></span>
  </div>
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
  <article class="timeline-card reveal-slide" class:cursor-pointer={item.metadata.more} onclick={toggle}>
    {@render tetherIn('hidden md:flex')}
    <span class="tether-up"></span>
    <div class="reveal-item delay-150">
      <TimelineItemInfo {item}></TimelineItemInfo>
    </div>
    <div class="reveal-item delay-300">
      <TimelineItemText {item} bind:expanded></TimelineItemText>
    </div>
  </article>
</li>

<style lang="postcss">
  @reference "../../../app.css";

  .timeline-item {
    @apply [--chain:var(--color-gray-300)] dark:[--chain:var(--color-gray-600)];
    @apply relative grid grid-cols-[minmax(0,1fr)_11rem_1.5rem_5rem_minmax(0,1fr)] items-center gap-y-4 py-6 [view-timeline-inset:0px] [view-timeline-name:--row];
    @apply content-center max-md:min-h-svh max-md:snap-start;
  }

  li:first-child.timeline-item {
    @apply max-md:scroll-mt-28;
    @apply md:grid-cols-[11rem_6rem_minmax(0,1fr)] md:gap-x-6 md:gap-y-3 md:py-3;
  }

  .timeline-date-cell {
    @apply relative col-start-2 row-start-1 [--slide-x:-1.5rem] [--slide-y:0px] md:col-start-1 md:[--slide-x:0.75rem];
  }

  .timeline-logo-cell {
    @apply relative col-start-4 row-start-1 flex items-center justify-center self-stretch [--slide-x:0px] [--slide-y:0px] md:col-start-2 md:self-center md:[--slide-x:1.5rem];
  }

  .timeline-chain {
    @apply pointer-events-none absolute inset-0 -z-10 [--chain-x:calc(50%+6.25rem)] md:[--chain-x:15.5rem];
  }

  .timeline-line {
    @apply absolute top-[5px] bottom-[5px] left-(--chain-x) w-1 origin-top -translate-x-1/2 bg-(--chain);
  }

  li:first-child .timeline-line {
    @apply top-0;
  }

  li:last-child .timeline-line {
    @apply bottom-0;
  }

  .timeline-link {
    @apply absolute left-(--chain-x) h-[5px] w-2.5 -translate-x-1/2 border-[3px] border-(--chain);
  }

  .timeline-link-top {
    @apply top-0 rounded-b-full border-t-0;
  }

  .timeline-link-bottom {
    @apply bottom-0 rounded-t-full border-b-0;
  }

  li:first-child .timeline-link-top {
    @apply h-1 w-4 rounded-full border-0 bg-(--chain);
  }

  li:last-child .timeline-link-bottom {
    @apply hidden;
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
    @apply h-1 w-[7px] bg-(--chain);
  }

  .tether-out .tether-stub {
    @apply origin-left;
  }

  .tether-in .tether-stub {
    @apply origin-right;
  }

  .tether-half {
    @apply h-2.5 w-[5px] border-[3px] border-(--chain);
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .timeline-line {
        animation: draw-y linear both;
        animation-timeline: --row;
        animation-range: entry-crossing 200px entry-crossing calc(100% + 200px);
      }

      .timeline-link-top {
        animation: fade-in linear both;
        animation-timeline: --row;
        animation-range: entry-crossing calc(200px - 20px) entry-crossing 200px;
      }

      .timeline-link-bottom {
        animation: fade-in linear both;
        animation-timeline: --row;
        animation-range: entry-crossing calc(100% + 200px - 20px) entry-crossing calc(100% + 200px);
      }

      .expanded .timeline-line,
      .expanded .timeline-link-bottom {
        animation: none;
      }

      .tether-stub {
        animation: draw-x ease-out both;
        animation-timeline: --row;
        animation-range: entry-crossing calc(200px + 30px) entry-crossing calc(200px + 70px);
      }

      .tether-down,
      .tether-up {
        animation: fade-in linear both;
        animation-timeline: --row;
        animation-range: entry-crossing calc(200px + 90px) entry-crossing calc(200px + 110px);
      }

      .tether-half {
        animation: fade-in linear both;
        animation-timeline: --row;
        animation-range: entry-crossing calc(200px + 60px) entry-crossing calc(200px + 90px);
      }

      .timeline-logo-cell :global(.timeline-logo) {
        animation: light-up linear both;
        animation-timeline: --row;
        animation-range: entry-crossing 200px entry-crossing calc(200px + 140px);
      }

      .timeline-logo-cell :global(.timeline-logo-halo) {
        animation: fade-in linear both;
        animation-timeline: --row;
        animation-range: entry-crossing 200px entry-crossing calc(200px + 140px);
      }

      .timeline-date-cell :global(.timeline-date),
      .timeline-card {
        animation: light-up linear both;
        animation-timeline: --row;
        animation-range: entry-crossing calc(200px + 140px) entry-crossing calc(200px + 360px);
      }

      @media (width >= 48rem) {
        .timeline-logo-cell :global(.timeline-logo),
        .timeline-logo-cell :global(.timeline-logo-halo) {
          animation-range: entry-crossing calc(50% + 200px - 120px) entry-crossing calc(50% + 200px + 40px);
        }

        .timeline-date-cell :global(.timeline-date),
        .timeline-card {
          animation-range: entry-crossing calc(50% + 200px + 40px) entry-crossing calc(50% + 200px + 260px);
        }

        .tether-stub {
          animation-range: entry-crossing calc(50% + 200px - 40px) entry-crossing calc(50% + 200px);
        }

        .tether-half {
          animation-range: entry-crossing calc(50% + 200px - 10px) entry-crossing calc(50% + 200px + 20px);
        }
      }
    }
  }

  .tether-down {
    @apply absolute top-[calc(100%+3px)] left-1/2 h-[5px] w-2.5 -translate-x-1/2 rounded-t-full border-[3px] border-b-0 border-(--chain) bg-white md:hidden dark:bg-gray-900;
  }

  .tether-up {
    @apply absolute -top-[10px] left-[calc(50%+6.25rem)] h-[5px] w-2.5 -translate-x-1/2 rounded-b-full border-[3px] border-t-0 border-(--chain) bg-white md:hidden dark:bg-gray-900;
  }

  .tether-half-left {
    @apply rounded-l-full border-r-0;
  }

  .tether-half-right {
    @apply rounded-r-full border-l-0;
  }

  .timeline-card {
    @apply relative col-span-full row-start-2 md:col-span-1 md:col-start-3 md:row-start-1;
    @apply [--slide-x:0px] [--slide-y:1.5rem] md:[--slide-x:3rem] md:[--slide-y:0px];
    @apply rounded-xl border-2 border-gray-200 bg-white p-5 shadow-xl backdrop-blur md:bg-white/60 md:p-6 lg:border-4 dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-800/50;
    @apply hover:border-primary-500/50 max-md:opacity-100;
  }

  .timeline-card .tether-in {
    @apply right-[calc(100%+2px)] lg:right-[calc(100%+4px)];
  }
</style>
