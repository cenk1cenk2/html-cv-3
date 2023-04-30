<script lang="ts">
  import Section from '$lib/components/Section.svelte'
  import Education from './Education.svelte'
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
  <div class="grid grid-cols-1 gap-4 w-full lg:grid-cols-2">
    <Work />
    <Teaching />
  </div>
</Section>
