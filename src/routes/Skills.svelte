<script lang="ts">
  import { faCode } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  import Container from '$lib/components/Container.svelte'
  import type { SkillSetItemFile } from '$lib/components/skills/skill-set.interface'
  import SkillSet from '$lib/components/skills/SkillSet.svelte'

  let skills: SkillSetItemFile[] = []
</script>

<Container title="skills"
  ><svelte:fragment slot="title">
    <Fa icon={faCode} class="inline-block self-center mr-2" />
    Skills
  </svelte:fragment>
  <div class="grid py-4 lg:grid-cols-2">
    {#each skills as skill (JSON.stringify(skill.metadata))}
      <SkillSet {skill} />
    {/each}
  </div>
  <div class="italic font-thin text-gray-600 dark:text-gray-400">
    Note: the items that I am only familiar rather than comfortable with, due to either knowledge getting a bit rusty or lower level of interaction is marked with a *
  </div>
</Container>
