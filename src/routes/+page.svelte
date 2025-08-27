<script lang="ts">
  import { faChalkboardUser, faUser, faUserGraduate, faUserTie } from '@fortawesome/free-solid-svg-icons'

  import Section from '$lib/components/Section.svelte'
  import Education from './Education.svelte'
  import Menu from './Menu.svelte'
  import Teaching from './Teaching.svelte'
  import UserCard from './UserCard.svelte'
  import Work from './Work.svelte'
</script>

<svelte:head>
  <title>Cenk Kılıç</title>
  <meta name="description" content="Cenk Kılıç" />

  <!-- Open Graph Tags -->
  <meta property="og:title" content="Cenk Kılıç" />
  <meta property="og:description" content="Cenk Kılıç" />
  <meta property="og:type" content="profile" />
  <meta property="og:url" content="https://cenk.kilic.dev" />
  <meta property="og:image" content="https://cenk.kilic.dev/profile.png" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />
  <meta property="og:site_name" content="Cenk Kılıç" />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Cenk Kılıç" />
  <meta name="twitter:description" content="Cenk Kılıç" />
  <meta name="twitter:image" content="https://cenk.kilic.dev/profile.png" />

  <!-- Additional SEO Tags -->
  <link rel="canonical" href="https://cenk.kilic.dev" />
  <meta name="robots" content="index, follow" />

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Cenk Kılıç",
      "url": "https://cenk.kilic.dev",
      "image": "https://cenk.kilic.dev/profile.png",
      "sameAs": ["https://github.com/cenk1cenk2", "https://linkedin.com/in/cenk1cenk2"]
    }
  </script>
</svelte:head>

<UserCard />

<Section title="work">
  <Work />
</Section>

<Section title="teaching">
  <Teaching />
</Section>

<Section title="education">
  <Education />
</Section>

<Menu
  items={[
    {
      text: 'Profile',
      href: '#profile',
      icon: faUser
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
