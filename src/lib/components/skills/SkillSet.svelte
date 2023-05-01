<script lang="ts">
  import type { SkillSetItemFile } from './skill-set.interface'

  export let skill: SkillSetItemFile
</script>

<div class="grid max-w-none md:grid-cols-6 prose dark:prose-dark">
  <div class="flex place-items-center p-4 border-b-2 border-gray-300 md:col-span-2 md:border-b-0 md:border-r-4 dark:border-gray-700">
    <p class="m-0 mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400">{skill.metadata.title}</p>
  </div>
  <div class="p-4 leading-snug md:col-span-4">
    <svelte:component this={skill.default} />
  </div>
</div>
