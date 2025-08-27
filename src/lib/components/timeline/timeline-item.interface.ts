import type { SvelteComponent } from 'svelte'

export interface TimelineItemEntry {
  name: string
  logo: string
  location: string
  attendance?: string
  start: string
  end?: string | false
  type?: string
  role?: string
  description?: string[]
  duration?: boolean
}

export interface TimelineItemFile {
  default: typeof SvelteComponent
  metadata: TimelineItemEntry
}
