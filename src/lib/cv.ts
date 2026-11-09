import type { TimelineItemEntry } from '#lib/components/timeline/timeline-item.interface.js'
import { metadata as about } from './content/bio.md'
import raw from './content/bio.md?raw'

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

export interface Experience extends Omit<TimelineItemEntry, 'logo' | 'end' | 'duration' | 'more'> {
  section: (typeof SECTIONS)[number]
  end?: string
  description: string
}

const metadata = import.meta.glob<TimelineItemEntry>('./content/timeline/*/*.md', { import: 'metadata', eager: true })
const bodies = import.meta.glob<string>('./content/timeline/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

export const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1)

const text = (markdown: string): string =>
  markdown
    .replace(/^---[\s\S]*?---/, '')
    .replace(/\n*<!--\s*more\s*-->\n*/, '\n\n')
    .trim()

export const profile: Profile = about

export const bio = text(raw)

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
        description: text(bodies[path])
      }
    })
