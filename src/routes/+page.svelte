<script lang="ts">
  import { faChalkboardUser, faUser, faUserGraduate, faUserTie } from '@fortawesome/free-solid-svg-icons'

  import ScrollIndicator from '#lib/components/ScrollIndicator.svelte'
  import Section from '#lib/components/Section.svelte'
  import Education from './Education.svelte'
  import Navbar from './Navbar.svelte'
  import Teaching from './Teaching.svelte'
  import UserCard from './UserCard.svelte'
  import Work from './Work.svelte'

  const title = 'Cenk Kılıç, MSc. – Software Platform Engineer'
  const description = 'Software Platform Engineer at Laravel, based in Vienna, Austria. Kubernetes operators, CI/CD and infrastructure automation with Go, Ansible and Terraform.'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Open Graph Tags -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="profile" />
  <meta property="og:url" content="https://cenk.kilic.dev" />
  <meta property="og:image" content="https://cenk.kilic.dev/og-card.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Cenk Kılıç, Software Platform Engineer, Vienna, Austria" />
  <meta property="og:site_name" content="Cenk Kılıç" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="https://cenk.kilic.dev/og-card.jpg" />

  <link rel="canonical" href="https://cenk.kilic.dev" />
  <meta name="robots" content="index, follow" />

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Cenk Kılıç",
      "url": "https://cenk.kilic.dev",
      "image": "https://cenk.kilic.dev/portrait.jpg",
      "jobTitle": "Software Platform Engineer",
      "honorificSuffix": "MSc.",
      "worksFor": { "@type": "Organization", "name": "Laravel", "url": "https://laravel.com" },
      "address": { "@type": "PostalAddress", "addressLocality": "Vienna", "addressCountry": "AT" },
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "FH Technikum Wien" },
        { "@type": "CollegeOrUniversity", "name": "Koç University" }
      ],
      "knowsAbout": ["Kubernetes", "Platform Engineering", "CI/CD", "Go", "Ansible", "Terraform", "Infrastructure Automation"],
      "sameAs": ["https://github.com/cenk1cenk2", "https://www.linkedin.com/in/cenkkilic/"]
    }
  </script>
</svelte:head>

<Navbar
  items={[
    {
      text: 'Profile',
      href: '#profile',
      icon: faUser
    },
    {
      text: 'Work',
      href: '#work',
      icon: faUserTie
    },
    {
      text: 'Teaching',
      href: '#teaching',
      icon: faChalkboardUser
    },
    {
      text: 'Education',
      href: '#education',
      icon: faUserGraduate
    }
  ]}
/>

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

<ScrollIndicator />
