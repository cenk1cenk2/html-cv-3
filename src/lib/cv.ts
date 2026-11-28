import type { DocumentText } from 'mdsvex'

import type { TimelineItemEntry } from '#lib/components/timeline/timeline-item.interface.js'
import { metadata as about } from './content/bio.md'
import biography from './content/bio.md?text'

export const SECTIONS = ['work', 'teaching', 'education'] as const

export interface Profile {
  name: string
  suffix: string
  title: string
  tagline: string[]
  description: string
  location: string
  url: string
  email: string
  links: Record<string, string>
}

export interface Experience extends Omit<TimelineItemEntry, 'logo' | 'end' | 'duration'> {
  section: (typeof SECTIONS)[number]
  end?: string
  description: string
}

const metadata = import.meta.glob<TimelineItemEntry>('./content/timeline/*/*.md', { import: 'metadata', eager: true })
const bodies = import.meta.glob<DocumentText>('./content/timeline/*/*.md', {
  query: '?text',
  import: 'default',
  eager: true
})

export const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1)

export const profile: Profile = about

export const bio = biography.text

export const experience = (section?: string): Experience[] =>
  Object.keys(metadata)
    .filter((path) => !section || path.includes(`/${section}/`))
    .sort()
    .reverse()
    .map((path) => {
      const { name, role, type, location, attendance, start, end, websites } = metadata[path]

      return {
        section: SECTIONS.find((candidate) => path.includes(`/${candidate}/`)),
        name,
        role,
        type,
        location,
        attendance,
        start,
        end: end === false ? 'present' : end,
        websites,
        description: bodies[path].text
      }
    })
