<script lang="ts">
  import { faCode } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import Container from '$lib/components/Container.svelte'
  import type { SkillSetItemFile } from '$lib/components/skills/skill-set.interface'
  import SkillSet from '$lib/components/skills/SkillSet.svelte'
  import PROGRAMMING, { metadata as PROGRAMMING_METADATA } from '$lib/content/skills/10-programming.md'
  import CONTAINERIZATION, { metadata as CONTAINERIZATION_METADATA } from '$lib/content/skills/100-containerization.md'
  import VIRTUALIZATION, { metadata as VIRTUALIZATION_METADATA } from '$lib/content/skills/110-virtualization.md'
  import CLOUD_PLATFORMS, { metadata as CLOUD_PLATFORMS_METADATA } from '$lib/content/skills/120-cloud-platforms.md'
  import WEBSERVERS, { metadata as WEBSERVERS_METADATA } from '$lib/content/skills/130-webservers.md'
  import VERSIONING, { metadata as VERSIONING_METADATA } from '$lib/content/skills/140-versioning.md'
  import GENERAL, { metadata as GENERAL_METADATA } from '$lib/content/skills/150-general.md'
  import FRONTEND_PROGRAMMING, { metadata as FRONTEND_PROGRAMMING_METADATA } from '$lib/content/skills/20-frontend-programming.md'
  import FRONTEND_FRAMEWORKS, { metadata as FRONTEND_FRAMEWORKS_METADATA } from '$lib/content/skills/30-frontend-frameworks.md'
  import BACKEND_FRAMEWORKS, { metadata as BACKEND_FRAMEWORKS_METADATA } from '$lib/content/skills/40-backend-frameworks.md'
  import DATABASES, { metadata as DATABASES_METADATA } from '$lib/content/skills/50-databases.md'
  import TOOLS, { metadata as TOOLS_METADATA } from '$lib/content/skills/60-tools.md'
  import CI_CD, { metadata as CI_CD_METADATA } from '$lib/content/skills/70-ci-cd.md'
  import IAC, { metadata as IAC_METADATA } from '$lib/content/skills/80-iac.md'
  import MONITORING, { metadata as MONITORING_METADATA } from '$lib/content/skills/90-monitoring.md'

  let skills: SkillSetItemFile[] = [
    { default: PROGRAMMING, metadata: PROGRAMMING_METADATA },
    { default: FRONTEND_PROGRAMMING, metadata: FRONTEND_PROGRAMMING_METADATA },
    { default: FRONTEND_FRAMEWORKS, metadata: FRONTEND_FRAMEWORKS_METADATA },
    { default: BACKEND_FRAMEWORKS, metadata: BACKEND_FRAMEWORKS_METADATA },
    { default: DATABASES, metadata: DATABASES_METADATA },
    { default: TOOLS, metadata: TOOLS_METADATA },
    { default: CI_CD, metadata: CI_CD_METADATA },
    { default: IAC, metadata: IAC_METADATA },
    { default: MONITORING, metadata: MONITORING_METADATA },
    { default: CONTAINERIZATION, metadata: CONTAINERIZATION_METADATA },
    { default: VIRTUALIZATION, metadata: VIRTUALIZATION_METADATA },
    { default: CLOUD_PLATFORMS, metadata: CLOUD_PLATFORMS_METADATA },
    { default: WEBSERVERS, metadata: WEBSERVERS_METADATA },
    { default: VERSIONING, metadata: VERSIONING_METADATA },
    { default: GENERAL, metadata: GENERAL_METADATA }
  ]
</script>

<Container title="skills"
  ><svelte:fragment slot="title">
    <Fa icon={faCode} class="inline-block self-center mr-2" />
    Skills
  </svelte:fragment>
  <div class="grid py-4 lg:grid-cols-2">
    {#each skills as skill}
      <SkillSet {skill} />
    {/each}
  </div>
  <div class="italic font-thin text-gray-600 dark:text-gray-400">
    Note: the items that I am only familiar rather than comfortable with, due to either knowledge getting a bit rusty or lower level of interaction is marked with a *
  </div>
</Container>
