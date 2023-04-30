<script lang="ts">
  import { faUserGraduate, faUserTie, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'

  import Section from '$lib/components/Section.svelte'
  import Timeline from '$lib/components/timeline/Timeline.svelte'
  import { EDUCATION_TIMELINE } from '$lib/constants/education.data'
  import { TEACHING_TIMELINE } from '$lib/constants/teaching.data'
  import { WORK_TIMELINE } from '$lib/constants/work.data'
  import Bio from './Bio.svelte'
  import UserCard from './UserCard.svelte'
</script>

<svelte:head>
  <title>Cenk Kılıç</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<UserCard />

<Section title="bio">
  <Bio />
</Section>

<Section title="education">
  <Timeline name="Education" items={EDUCATION_TIMELINE} icon={faUserGraduate} />
</Section>

<Section title="work">
  <Timeline name="Work Experience" items={WORK_TIMELINE} icon={faUserTie} />
</Section>

<Section title="teaching">
  <Timeline name="Teaching Experience" items={TEACHING_TIMELINE} icon={faChalkboardTeacher} />
</Section>
