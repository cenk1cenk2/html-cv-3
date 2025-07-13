<script lang="ts">
  import { faChalkboardUser, faUserGraduate, faUserTie } from '@fortawesome/free-solid-svg-icons'

  import Section from '$lib/components/Section.svelte'
  import Education from './Education.svelte'
  import Menu from './Menu.svelte'
  import Teaching from './Teaching.svelte'
  import UserCard from './UserCard.svelte'
  import Work from './Work.svelte'
</script>

<svelte:head>
  <title>Cenk Kılıç</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<UserCard />

<Section title="experience">
    <Work />
</Section>

<Section title="teaching">
    <Teaching />
</Section>

<Section title="education">
  <Education />
</Section>

<!-- <Section title="skills"> -->
<!--   <Skills /> -->
<!-- </Section> -->

<Menu
  items={[
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
      text: 'Education',
      href: '#education',
      icon: faUserGraduate
    }

    // {
    //   text: 'Skills',
    //   href: '#skills',
    //   icon: faCode
    // }
  ]}
/>
