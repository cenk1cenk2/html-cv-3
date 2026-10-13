<script lang="ts">
  import { reveal } from '#lib/actions/reveal.js'
  import { spotlight } from '#lib/actions/spotlight.js'
</script>

<footer
  id="company"
  class="group relative isolate flex min-h-[calc(100svh-7rem)] flex-col overflow-clip px-6 pt-12 pb-28 max-md:snap-start"
  use:spotlight
  use:reveal={{ above: true }}
>
  <div class="parallax-in absolute inset-0 -z-10">
    <div class="grid-lines absolute inset-x-0 -top-[15vh] bottom-0 [mask-image:linear-gradient(to_top,black_10%,transparent_80%)]"></div>
  </div>

  <div class="flex flex-1 flex-col">
    <div class="light-up mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-6 border-t-2 border-gray-200 pt-8 dark:border-gray-800">
      <a href="https://kilic.dev" rel="noopener" class="flex flex-1 flex-col items-center justify-center gap-6 md:gap-8">
        <span class="footer-logo reveal-item relative">
          <span class="bg-primary-500/15 glow absolute -inset-8 -z-10 rounded-xl blur-3xl" aria-hidden="true"></span>
          <img
            alt=""
            src="https://main.s3.kilic.dev/html/android-chrome-192x192.png"
            loading="lazy"
            decoding="async"
            class="size-[min(20svh,calc(100vw-3rem))] rounded-xl md:size-[min(24svh,22.375rem)]"
          />
        </span>
        <span class="footer-name reveal-item text-5xl leading-[0.9] font-bold tracking-tighter delay-150 sm:text-6xl lg:text-7xl">kilic.dev</span>
      </a>

      <address class="footer-impressum reveal-item w-full max-w-2xl not-italic delay-300 lg:max-w-5xl">
        <p class="impressum-title">Impressum</p>
        <dl class="impressum">
          <dt>Owner</dt>
          <dd>Cenk Kılıç, MSc · kilic.dev</dd>
          <dt>Address</dt>
          <dd>1100 Wien, Austria</dd>
          <dt>Contact</dt>
          <dd><a href="mailto:cenk@kilic.dev">cenk@kilic.dev</a></dd>
          <dt>Business</dt>
          <dd>IT services (Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik)</dd>
          <dt>Registry</dt>
          <dd>GISA 38709401 · UID ATU82540939</dd>
          <dt>Member of</dt>
          <dd>
            <a href="https://firmen.wko.at/cenk-kl-msc-kilicdev/wien/?firmaid=1d65d6ac-9436-4a3f-8e22-b273d54b9c39" target="_blank" rel="noopener">WKO Wien</a>, FG UBIT
          </dd>
          <dt>Authority</dt>
          <dd>Magistratisches Bezirksamt des X. Bezirkes</dd>
          <dt>Applicable law</dt>
          <dd>Gewerbeordnung (<a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener">ris.bka.gv.at</a>)</dd>
          <dt>Offenlegung</dt>
          <dd>§ 25 MedienG: personal CV and professional profile of Cenk Kılıç</dd>
        </dl>
      </address>
    </div>
  </div>
</footer>

<style lang="postcss">
  @reference "../app.css";

  .impressum-title {
    @apply mb-4 text-center text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400;
  }

  .impressum {
    @apply grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 text-xs leading-snug text-gray-600 md:leading-relaxed dark:text-gray-300;
    @apply lg:max-w-none lg:grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-6;
  }

  .impressum dt {
    @apply pt-px text-right text-[0.65rem] font-medium tracking-wide text-gray-400 uppercase md:pt-0.5 dark:text-gray-500;
  }

  .impressum a {
    @apply hover:text-primary-500 underline underline-offset-2;
  }

  footer {
    view-timeline-inset: 0px;
    view-timeline-name: --footer;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .footer-logo,
      .footer-name,
      .footer-impressum {
        animation: parallax-rise linear both;
        animation-timeline: --footer;
      }

      .footer-logo {
        animation-range: entry 0% entry 60%;
      }

      .footer-name {
        animation-range: entry 20% entry 80%;
      }

      .footer-impressum {
        animation-range: entry 40% entry 100%;
      }
    }
  }
</style>
