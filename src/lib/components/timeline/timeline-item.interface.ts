import type { Component } from 'svelte'

export interface TimelineItemEntry {
  name: string
  logo: string
  location: string
  attendance?: string
  start: string
  end?: string | false
  type?: string
  role?: string
  duration?: boolean
  websites?: string[]
  more?: boolean
}

export interface TimelineItemFile {
  default: Component
  metadata: TimelineItemEntry
}
