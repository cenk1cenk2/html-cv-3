<script lang="ts">
  import type { SkillSetItemFile } from './skill-set.interface'

  export let skill: SkillSetItemFile
</script>

<div class="prose dark:prose-dark grid max-w-none md:grid-cols-6">
  <div class="flex place-items-center border-b-2 border-gray-300 p-4 md:col-span-2 md:border-r-4 md:border-b-0 dark:border-gray-700">
    <p class="m-0 mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">{skill.metadata.title}</p>
  </div>
  <div class="p-4 leading-snug md:col-span-4">
    <svelte:component this={skill.default} />
  </div>
</div>
