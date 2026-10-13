<script lang="ts">
  import { reveal } from '#lib/actions/reveal.js'
  import { spotlight } from '#lib/actions/spotlight.js'
</script>

<footer
  id="company"
  class="group relative isolate flex min-h-[calc(100svh-1.5rem)] flex-col justify-center overflow-clip px-6 pb-28 max-md:snap-start"
  use:spotlight
  use:reveal={{ above: true }}
>
  <div class="parallax-in absolute inset-0 -z-10">
    <div class="grid-lines absolute inset-x-0 -top-[15vh] bottom-0 [mask-image:linear-gradient(to_top,black_10%,transparent_80%)]"></div>
  </div>

  <div class="footer-content">
    <div class="light-up mx-auto flex max-w-6xl flex-col items-center gap-8 border-t-2 border-gray-200 pt-8 dark:border-gray-800">
      <a href="https://kilic.dev" rel="noopener" class="reveal-item flex items-center gap-3 text-xl font-semibold text-gray-700 delay-150 dark:text-gray-300">
        <img alt="" src="https://main.s3.kilic.dev/html/android-chrome-192x192.png" class="size-10" />
        kilic.dev
      </a>

      <address class="reveal-item max-w-2xl text-center text-xs leading-relaxed text-gray-500 not-italic delay-300 dark:text-gray-400">
        <p class="mb-1 font-semibold text-gray-600 dark:text-gray-300">Impressum</p>
        <p>Cenk Kılıç, MSc · kilic.dev</p>
        <p>1100 Wien, Austria · <a href="mailto:cenk@kilic.dev" class="hover:text-primary-500 underline">cenk@kilic.dev</a></p>
        <p>IT services (Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik)</p>
        <p>
          GISA 38709401 · UID ATU82540939 · Member of
          <a
            href="https://firmen.wko.at/cenk-kl-msc-kilicdev/wien/?firmaid=1d65d6ac-9436-4a3f-8e22-b273d54b9c39"
            target="_blank"
            rel="noopener"
            class="hover:text-primary-500 underline">WKO Wien</a
          >, FG UBIT
        </p>
        <p>Authority: Magistratisches Bezirksamt des X. Bezirkes</p>
        <p>
          Applicable law: Gewerbeordnung (<a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener" class="hover:text-primary-500 underline">ris.bka.gv.at</a>)
        </p>
        <p>Offenlegung (§ 25 MedienG): personal CV and professional profile of Cenk Kılıç</p>
      </address>
    </div>
  </div>
</footer>

<style lang="postcss">
  footer {
    view-timeline-inset: 0px;
    view-timeline-name: --footer;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .footer-content {
        animation: parallax-rise linear both;
        animation-timeline: --footer;
        animation-range: entry 0% entry 100%;
      }
    }
  }
</style>
