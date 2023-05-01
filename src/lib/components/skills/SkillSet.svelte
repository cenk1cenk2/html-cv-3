<script lang="ts">
  import type { SkillSetItemFile } from './skill-set.interface'

  export let skill: SkillSetItemFile
</script>

<div class="grid max-w-none lg:grid-cols-6 prose dark:prose-dark">
  <div class="flex place-items-center p-4 border-b-2 border-gray-300 lg:col-span-2 lg:border-b-0 lg:border-r-4 dark:border-gray-700">
    <p class="m-0 mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400">{skill.metadata.title}</p>
  </div>
  <div class="p-4 leading-none lg:col-span-4">
    <svelte:component this={skill.default} />
  </div>
</div>
