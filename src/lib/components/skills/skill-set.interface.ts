import type { SvelteComponent } from 'svelte'

export interface SkillSetItemEntry {
  title: string
}

export interface SkillSetItemFile {
  default: typeof SvelteComponent
  metadata: SkillSetItemEntry
}
