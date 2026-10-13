<script lang="ts">
  import { chain, hold } from '#lib/actions/chain.js'
  import { reveal } from '#lib/actions/reveal.js'
  import type { TimelineItemFile } from './timeline-item.interface'
  import TimelineItemInfo from './TimelineItemInfo.svelte'
  import TimelineItemLogo from './TimelineItemLogo.svelte'
  import TimelineItemText from './TimelineItemText.svelte'
  import TimelineItemTime from './TimelineItemTime.svelte'
  import Plug from '../power/Plug.svelte'

  interface Props {
    item: TimelineItemFile
  }

  let { item }: Props = $props()

  let expanded = $state(false)
  let row: HTMLElement
  let wasExpanded = false
  let release: (() => void) | undefined
  let moving = $state(false)
  let settle: ReturnType<typeof setTimeout> | undefined

  const holdInPlace = (element: Element | null, duration: number): void => {
    release?.()

    if (!element) {
      return
    }

    const top = element.getBoundingClientRect().top
    const observer = new ResizeObserver(() => {
      window.scrollBy({ top: element.getBoundingClientRect().top - top, behavior: 'instant' })
    })
    const timer = setTimeout(() => release?.(), duration)

    observer.observe(row)
    release = (): void => {
      observer.disconnect()
      clearTimeout(timer)
      release = undefined
    }
  }

  $effect(() => () => {
    release?.()
    clearTimeout(settle)
  })

  $effect(() => {
    if (expanded === wasExpanded) {
      return
    }

    hold(600)
    moving = true
    clearTimeout(settle)
    settle = setTimeout(() => (moving = false), 500)

    if (!expanded && row.getBoundingClientRect().top < 0) {
      if (window.matchMedia('(width < 48rem)').matches) {
        row.scrollIntoView({ block: 'start' })
      } else {
        holdInPlace(row.querySelector('.timeline-toggle'), 600)
      }
    }

    wasExpanded = expanded
  })

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

<li bind:this={row} class="timeline-item group" use:chain use:reveal={{ above: true, mobileMargin: '-30% 0px -35% 0px' }}>
  <div class="timeline-chain">
    <span class="timeline-wire">
      <span class="timeline-line"></span>
      <span class="timeline-link timeline-link-top"></span>
      <span class="timeline-link timeline-link-bottom"></span>
    </span>
    <span class="timeline-tip-track"><Plug class="timeline-tip" /></span>
  </div>
  <div class="timeline-date-cell reveal-slide max-md:delay-150">
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
  <article class="timeline-card reveal-slide max-md:delay-100" class:cursor-pointer={item.metadata.more} class:lit={moving} onclick={toggle}>
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
    @apply [--chain:var(--color-gray-300)] [--tip-end:5px] [--tip-start:5px] dark:[--chain:var(--color-gray-600)];
    @apply relative grid grid-cols-[minmax(0,1fr)_11rem_1.5rem_5rem_minmax(0,1fr)] items-center gap-y-4 py-6;
    @apply content-center max-md:min-h-[calc(100svh-8.5rem)] max-md:snap-start max-md:scroll-mb-12;
    @apply md:grid-cols-[11rem_6rem_minmax(0,1fr)] md:gap-x-6 md:gap-y-3 md:py-3;
  }

  li:first-child.timeline-item {
    @apply max-md:scroll-mt-28;
  }

  .timeline-date-cell {
    @apply relative z-10 col-start-2 row-start-1 [--slide-x:-1.5rem] [--slide-y:0px] md:col-start-1 md:[--slide-x:0.75rem];
  }

  .timeline-logo-cell {
    @apply relative col-start-4 row-start-1 flex items-center justify-center self-stretch md:col-start-2 md:self-center;
    @apply [--slide-x:0px] [--slide-y:2rem];
  }

  .timeline-logo-cell {
    --light: entry-crossing 100px entry-crossing 400px;
  }

  .timeline-date-cell {
    --light: entry-crossing 200px entry-crossing 500px;
  }

  .timeline-card {
    --light: entry-crossing 100px entry-crossing 420px;
  }

  @media (width >= 48rem) {
    .timeline-logo-cell {
      --light: entry-crossing 60px entry-crossing 360px;
    }

    .timeline-date-cell {
      --light: entry-crossing 220px entry-crossing 560px;
    }

    .timeline-card {
      --light: entry-crossing 280px entry-crossing 640px;
    }
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

  li:first-child {
    @apply [--tip-start:0px];
  }

  li:last-child {
    @apply [--tip-end:0px];
  }

  .timeline-tip-track {
    @apply [container-type:size] absolute top-(--tip-start) bottom-(--tip-end) left-(--chain-x) w-0;
  }

  .timeline-tip-track :global(.timeline-tip) {
    @apply absolute top-0 left-0 hidden w-5 text-(--chain);

    translate: -50% 100cqh;
  }

  .timeline-wire {
    @apply absolute inset-0;
  }

  .timeline-item:global([data-chain]) .timeline-wire {
    mask-image:
      linear-gradient(to bottom, #000 var(--hole-top, 0px), transparent var(--hole-top, 0px), transparent var(--hole-bottom, 0px), #000 var(--hole-bottom, 0px)),
      linear-gradient(to bottom, #000 var(--joint-top, 0px), transparent var(--joint-top, 0px), transparent var(--joint-bottom, 0px), #000 var(--joint-bottom, 0px));
    mask-composite: intersect;
  }

  .timeline-item:global([data-chain]) .timeline-line {
    scale: 1 var(--draw, 0);
  }

  .timeline-item:global([data-chain]) .timeline-link-top {
    opacity: clamp(0, var(--draw, 0) * 40, 1);
  }

  .timeline-item:global([data-chain]) .timeline-link-bottom {
    opacity: clamp(0, (var(--draw, 0) - 0.97) * 34, 1);
  }

  .timeline-item:global([data-chain]) .timeline-tip-track :global(.timeline-tip) {
    @apply block;

    translate: -50% calc(var(--draw, 0) * 100cqh);
    opacity: calc(clamp(0, var(--draw, 0) * 200, 1) * clamp(0, (1 - var(--draw, 0)) * 200, 1));
  }

  li:last-child.timeline-item:global([data-chain]) .timeline-tip-track :global(.timeline-tip) {
    opacity: clamp(0, var(--draw, 0) * 200, 1);
  }

  li:last-child .timeline-tip-track :global(.timeline-tip) {
    @apply block;
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
      .tether-stub {
        animation: draw-x ease-out both;
        animation-timeline: view(block 0px);
        animation-range: entry-crossing 230px entry-crossing 280px;
      }

      .tether-down {
        animation: fade-in linear both;
        animation-timeline: view(block 0px);
        animation-range: entry-crossing 200px entry-crossing 240px;
      }

      .tether-up {
        animation: fade-in linear both;
        animation-timeline: view(block 0px);
        animation-range: entry-crossing 190px entry-crossing 230px;
      }

      .tether-half {
        animation: fade-in linear both;
        animation-timeline: view(block 0px);
        animation-range: entry-crossing 250px entry-crossing 300px;
      }

      .timeline-logo-cell :global(.timeline-logo),
      .timeline-date-cell :global(.timeline-date),
      .timeline-card {
        animation: light-up linear both;
        animation-timeline: view(block 0px);
        animation-range: var(--light);
      }

      @media (width >= 48rem) {
        .tether-stub {
          animation-range: entry-crossing 162px entry-crossing 202px;
        }

        .tether-half {
          animation-range: entry-crossing 197px entry-crossing 227px;
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
    @apply relative z-10 col-span-full row-start-2 md:col-span-1 md:col-start-3 md:row-start-1;
    @apply [--slide-x:0px] [--slide-y:1.5rem] md:[--slide-x:3rem] md:[--slide-y:0px];
    @apply shadow-glow rounded-xl border-2 border-gray-200 bg-white p-5 md:bg-white/60 md:p-6 md:backdrop-blur lg:border-4;
    @apply dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-800/50;
    @apply hover:border-primary-500/50 max-md:opacity-100;
  }

  .timeline-card {
    transition-property: translate, opacity, border-color;
    transition-duration: 700ms, 700ms, 150ms;
  }

  .timeline-card.lit {
    @apply border-primary-500/50;
  }

  @media (width < 48rem) {
    .timeline-card {
      transition-delay: 100ms, 100ms, 0s;
    }
  }

  .timeline-card .tether-in {
    @apply right-[calc(100%+2px)] lg:right-[calc(100%+4px)];
  }
</style>
