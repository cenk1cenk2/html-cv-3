import { bio, experience, SECTIONS } from './cv.js'

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

const ANCHORS = ['profile', ...SECTIONS, 'company'] as const

const reply = (data: unknown): { content: { type: 'text'; text: string }[] } => ({ content: [{ type: 'text', text: JSON.stringify(data) }] })

const tools: ModelContextTool[] = [
  {
    name: 'get_profile',
    description: 'Get the profile of Cenk Kılıç: name, job title, location, employer, education, contact links and a short bio.',
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
    execute: () =>
      reply({
        ...JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}'),
        bio
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
