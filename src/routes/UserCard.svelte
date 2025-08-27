<script lang="ts">
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
  import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import Divider from '$lib/components/Divider.svelte'
  import Bio from './Bio.svelte'
</script>

<section id="profile">
  <div class="cover">
    <div class="flex h-auto items-start pt-20 pb-20 lg:my-0 lg:h-screen lg:items-center lg:pt-0 lg:pb-0">
      <div class="mx-auto lg:pl-48">
        <div class="container-border rounded-xl bg-white/90 shadow-2xl transition duration-300 ease-in-out dark:bg-gray-800/90">
          <div class="p-4 text-center lg:p-12 lg:text-left">
            <div class="-mt-16 lg:relative lg:top-72 lg:-left-64 lg:-mt-96 lg:mr-64">
              <div class="profile-image container-border"></div>
            </div>
            <div class="lg:pl-48">
              <h1 class="pt-8 text-center text-4xl font-bold lg:pt-0">Cenk Kılıç, M.Sc.</h1>

              <Divider />
              <p class="flex justify-center pt-4 text-base font-bold">Electrical&Electronics Engineer by trait, developer by heart.</p>
              <p class="flex justify-center pt-4 text-sm">Vienna, Austria</p>

              <div class="mx-auto mt-6 flex w-4/5 flex-wrap items-center justify-evenly lg:w-full">
                <a href="mailto:cenk@kilic.dev" target="_blank" class="action-button" aria-label="Link for mailing me."><Fa icon={faEnvelope} /></a>
                <a href="https://srcs.kilic.dev" target="_blank" class="action-button" aria-label="Link for GitHub profile."><Fa icon={faGithub} /></a>
                <a href="https://linkedin.com/in/cenkkilic" target="_blank" class="action-button" aria-label="Link for Linkedin profile."><Fa icon={faLinkedin} /></a>
              </div>
            </div>
          </div>
          <div class="px-4 lg:pt-12">
            <Divider />
            <Bio />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  @reference "../app.css";

  .cover {
    @apply bg-cover;
    background-image: url('/cover.png');
  }

  .profile-image {
    @apply mx-auto block h-48 w-48 rounded-xl border-2 bg-cover bg-center lg:mx-0 lg:h-96 lg:w-96 lg:border-4;
    background-image: url('/profile.png');
  }

  .action-button {
    @apply text-4xl hover:scale-125;
  }
</style>
