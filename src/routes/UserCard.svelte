<script lang="ts">
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
  import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import Divider from '$lib/components/Divider.svelte'
  import Bio from './Bio.svelte'
</script>

<section id="user-card">
  <div class="cover">
    <div class="flex items-start pt-20 pb-20 h-auto lg:items-center lg:pt-0 lg:pb-0 lg:pl-48 lg:my-0 lg:h-screen">
      <div
        class="mx-auto max-w-lg bg-white bg-opacity-90 rounded-xl border-2 border-gray-200 shadow-2xl transition duration-300 ease-in-out lg:max-w-3xl lg:border-4 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-4 text-center lg:p-12 lg:text-left">
          <div class="-mt-16 lg:relative lg:-left-64 lg:top-72 lg:mr-64 lg:-mt-96">
            <div class="profile-image" />
          </div>
          <div class="lg:pl-48">
            <h1 class="pt-8 text-4xl font-bold text-center lg:pt-0">Cenk Kılıç</h1>

            <div class="pt-3 mx-auto border-b-2 opacity-50 lg:mx-0 border-primary-500" />
            <p class="flex justify-center pt-4 text-base font-bold">Electrical&Electronics Engineer by trait, developer by heart.</p>
            <p class="flex justify-center pt-4 text-sm">Vienna, Austria</p>

            <div class="flex flex-wrap justify-evenly items-center pb-16 mx-auto mt-6 w-4/5 lg:pb-0 lg:w-full">
              <a href="mailto:cenk@kilic.dev" target="_blank" class="action-button"><Fa icon={faEnvelope} /></a>
              <a href="https://srcs.kilic.dev" target="_blank" class="action-button"><Fa icon={faGithub} /></a>
              <a href="https://linkedin.com/in/cenkkilic" target="_blank" class="action-button"><Fa icon={faLinkedin} /></a>
            </div>
          </div>
        </div>
        <div class="lg:pt-12" />
        <Divider />
        <Bio />
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  .cover {
    @apply bg-cover;
    background-image: url('$lib/assets/images/cover.png');
  }

  .profile-image {
    @apply block mx-auto bg-center bg-cover rounded-xl  border-gray-300 shadow-xl transition duration-500 ease-in-out
    w-48 h-48 border-2
    lg:mx-0 lg:w-96 lg:h-96 lg:border-4
    dark:border-gray-600;
    background-image: url('$lib/assets/images/profile.png');
  }

  .action-button {
    @apply text-4xl transform hover:scale-125 hover:text-primary-500;
  }
</style>
