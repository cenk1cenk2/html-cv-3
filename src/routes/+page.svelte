<script lang="ts">
  import { faBuilding, faChalkboardUser, faUser, faUserGraduate, faUserTie } from '@fortawesome/free-solid-svg-icons'

  import ScrollIndicator from '#lib/components/ScrollIndicator.svelte'
  import Section from '#lib/components/Section.svelte'
  import { metadata as profile } from '#lib/content/bio.md'
  import Education from './Education.svelte'
  import Navbar from './Navbar.svelte'
  import Teaching from './Teaching.svelte'
  import UserCard from './UserCard.svelte'
  import Work from './Work.svelte'

  const title = `${profile.name}, ${profile.suffix} – ${profile.title}`
  const description = profile.description
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Open Graph Tags -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="profile" />
  <meta property="og:url" content="{profile.url}/" />
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

  <link rel="canonical" href="{profile.url}/" />
  <meta name="robots" content="index, follow" />

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Cenk Kılıç",
      "url": "https://cenk.kilic.dev/",
      "image": "https://cenk.kilic.dev/portrait.jpg",
      "jobTitle": "Software Platform Engineer",
      "honorificSuffix": "MSc.",
      "email": "mailto:cenk@kilic.dev",
      "worksFor": { "@type": "Organization", "name": "Laravel", "url": "https://laravel.com" },
      "address": { "@type": "PostalAddress", "postalCode": "1100", "addressLocality": "Vienna", "addressCountry": "AT" },
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "FH Technikum Wien", "url": "https://technikum-wien.at" },
        { "@type": "CollegeOrUniversity", "name": "Koç University", "url": "https://ku.edu.tr" },
        { "@type": "HighSchool", "name": "Kadıköy Anadolu Lisesi", "url": "https://kadikoyanadolulisesi.meb.k12.tr" }
      ],
      "knowsAbout": ["Kubernetes", "Platform Engineering", "CI/CD", "Go", "Ansible", "Terraform", "Infrastructure Automation"],
      "sameAs": ["https://srcs.kilic.dev", "https://github.com/cenk1cenk2", "https://www.linkedin.com/in/cenkkilic/"]
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
    },
    {
      text: 'Company',
      href: '#company',
      icon: faBuilding
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
