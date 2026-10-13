import type { TimelineItemEntry } from '#lib/components/timeline/timeline-item.interface.js'
import bio from './content/bio.md?raw'

interface ModelContextTool {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  annotations?: { readOnlyHint?: boolean }
  execute: (input: Record<string, unknown>) => unknown
}

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: ModelContextTool, options?: { signal?: AbortSignal }) => unknown
    }
  }
}

const SECTIONS = ['work', 'teaching', 'education'] as const
const ANCHORS = ['profile', ...SECTIONS, 'company'] as const

const metadata = import.meta.glob<TimelineItemEntry>('./content/timeline/*/*.md', { import: 'metadata', eager: true })
const bodies = import.meta.glob<string>('./content/timeline/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

const text = (markdown: string): string =>
  markdown
    .replace(/^---[\s\S]*?---/, '')
    .replace(/<!--\s*more\s*-->/, '')
    .trim()

const reply = (data: unknown): { content: { type: 'text'; text: string }[] } => ({ content: [{ type: 'text', text: JSON.stringify(data) }] })

const experience = (section?: string): Record<string, unknown>[] =>
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

const tools: ModelContextTool[] = [
  {
    name: 'get_profile',
    description: 'Get the profile of Cenk Kılıç: name, job title, location, employer, education, contact links and a short bio.',
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
    execute: () =>
      reply({
        ...JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}'),
        bio: text(bio)
      })
  },
  {
    name: 'list_experience',
    description: 'List the work, teaching and education history of Cenk Kılıç, newest first, with role, dates, location, links and description.',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          enum: SECTIONS,
          description: 'Only return entries from this section.'
        }
      }
    },
    annotations: { readOnlyHint: true },
    execute: ({ section }) => reply(experience(section as string | undefined))
  },
  {
    name: 'get_contact',
    description: 'Get the contact details and the legal notice (Impressum) of kilic.dev.',
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
    execute: () =>
      reply(
        Object.fromEntries(
          [...document.querySelectorAll('.impressum dt')].map((term) => [term.textContent?.trim(), term.nextElementSibling?.textContent?.replace(/\s+/g, ' ').trim()])
        )
      )
  },
  {
    name: 'show_section',
    description: 'Scroll the page to a section so the visitor can see it.',
    inputSchema: {
      type: 'object',
      properties: { section: { type: 'string', enum: ANCHORS } },
      required: ['section']
    },
    execute: ({ section }): ReturnType<typeof reply> => {
      document.getElementById(section as string)?.scrollIntoView({ block: 'start' })

      return reply({ shown: section })
    }
  }
]

export const register = (signal: AbortSignal): void => {
  for (const tool of tools) {
    document.modelContext?.registerTool(tool, { signal })
  }
}
