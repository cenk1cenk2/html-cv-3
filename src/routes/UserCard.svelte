<script lang="ts">
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
  import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import { spotlight } from '#lib/actions/spotlight.js'
  import Bio from '#lib/content/bio.md'
</script>

<section id="profile" class="relative isolate overflow-hidden" use:spotlight>
  <div class="hero-background parallax">
    <picture>
      <source srcset="/hero-background.avif" type="image/avif" />
      <img src="/hero-background.jpg" alt="" class="absolute inset-0 size-full scale-110 object-cover" />
    </picture>
    <div class="hero-scrim"></div>
  </div>
  <div class="hero-fade"></div>
  <div class="hero-grid"></div>

  <div class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-16 px-2 py-24 md:px-6">
    <div class="flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16">
      <div class="motion-safe:animate-rise relative shrink-0 motion-safe:[animation-delay:450ms] lg:order-last">
        <div class="bg-primary-500/30 absolute -inset-6 -z-10 rounded-xl blur-3xl"></div>
        <picture>
          <source srcset="/portrait.avif" type="image/avif" />
          <img src="/portrait.jpg" alt="Cenk Kılıç" width="800" height="800" class="container-border size-56 rounded-xl object-cover sm:size-64 lg:size-80" />
        </picture>
      </div>

      <div class="text-center lg:text-left">
        <p class="hero-eyebrow motion-safe:animate-rise">
          <span class="inline-flex items-center gap-1.5"><Fa icon={faLocationDot} /> Vienna, Austria</span>
        </p>
        <h1 class="motion-safe:animate-rise mt-4 text-6xl leading-[0.9] font-bold tracking-tighter motion-safe:[animation-delay:100ms] sm:text-7xl lg:text-8xl">
          Cenk <span class="whitespace-nowrap"
            >Kılıç<span class="text-3xl font-medium tracking-normal text-gray-500 sm:text-4xl lg:text-5xl dark:text-gray-400">,&nbsp;MSc.</span></span
          >
        </h1>
        <p class="motion-safe:animate-rise mt-6 max-w-xl text-xl text-gray-500 motion-safe:[animation-delay:200ms] lg:text-2xl dark:text-gray-300">
          Electrical & Electronics Engineer by trade, <span class="text-primary-500 font-semibold">developer by heart.</span>
        </p>
        <div class="motion-safe:animate-rise mt-10 flex flex-wrap justify-center gap-3 motion-safe:[animation-delay:300ms] lg:justify-start">
          <a href="mailto:cenk@kilic.dev" target="_blank" class="pill-link" aria-label="Link for mailing me."><Fa icon={faEnvelope} /> Email</a>
          <a href="https://srcs.kilic.dev" target="_blank" class="pill-link" aria-label="Link for GitHub profile."><Fa icon={faGithub} /> GitHub</a>
          <a href="https://linkedin.com/in/cenkkilic" target="_blank" class="pill-link" aria-label="Link for Linkedin profile."><Fa icon={faLinkedin} /> LinkedIn</a>
        </div>
      </div>
    </div>

    <div class="hero-card container-border motion-safe:animate-rise motion-safe:[animation-delay:600ms]">
      <div class="prose prose-lg dark:prose-dark max-w-none">
        <Bio />
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  @reference "../app.css";

  .hero-background {
    @apply absolute inset-x-0 -top-1/4 -bottom-1/4 -z-20;
  }

  .hero-scrim {
    @apply absolute inset-0 bg-white/40 lg:bg-transparent lg:bg-linear-to-r lg:from-white/70 lg:via-white/25 lg:to-transparent;
    @apply dark:bg-gray-900/40 dark:lg:bg-transparent dark:lg:from-gray-900/70 dark:lg:via-gray-900/25;
  }

  .hero-grid {
    @apply grid-lines absolute inset-0 -z-10;

    mask-image: linear-gradient(to bottom, black 15%, transparent 62%);
  }

  .hero-fade {
    @apply absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-b from-transparent to-white dark:to-gray-900;
  }

  .hero-eyebrow {
    @apply inline-flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-gray-500 backdrop-blur;
    @apply dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300;
  }

  .hero-card {
    @apply mx-auto max-w-4xl rounded-xl bg-white/60 p-5 backdrop-blur-xl md:p-8 lg:p-12 dark:bg-gray-800/50;
  }
</style>
