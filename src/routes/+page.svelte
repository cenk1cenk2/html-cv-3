<script lang="ts">
  import { faChalkboardUser, faCode, faUserGraduate, faUserTie } from '@fortawesome/free-solid-svg-icons'

  import Section from '$lib/components/Section.svelte'
  import Education from './Education.svelte'
  import Menu from './Menu.svelte'
  import Skills from './Skills.svelte'
  import Teaching from './Teaching.svelte'
  import UserCard from './UserCard.svelte'
  import Work from './Work.svelte'
</script>

<svelte:head>
  <title>Cenk Kılıç</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<UserCard />

<Section title="education">
  <Education />
</Section>

<Section title="experience">
  <div class="grid grid-cols-1 gap-8 w-full lg:grid-cols-2">
    <Work />
    <Teaching />
  </div>
</Section>

<Section title="skills">
  <Skills />
</Section>

<Menu
  items={[
    {
      text: 'Education',
      href: '#education',
      icon: faUserGraduate
    },
    {
      text: 'Work Experience',
      href: '#work-experience',
      icon: faUserTie
    },
    {
      text: 'Teaching Experience',
      href: '#teaching-experience',
      icon: faChalkboardUser
    },

    {
      text: 'Skills',
      href: '#skills',
      icon: faCode
    }
  ]}
/>
