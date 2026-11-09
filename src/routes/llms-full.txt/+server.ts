import { bio, capitalize, experience, profile, SECTIONS } from '#lib/cv.js'
import type { RequestHandler } from './$types'

export const prerender = true

const section = (name: (typeof SECTIONS)[number]): string =>
  [
    `## ${capitalize(name)}`,
    ...experience(name).map(({ section, name, role, type, location, attendance, start, end, websites, description }) =>
      [
        `### ${name}`,
        [
          role && `- ${section === 'education' ? 'Field' : 'Role'}: ${role}`,
          type && `- Type: ${type}`,
          `- Location: ${location}${attendance ? ` (${attendance})` : ''}`,
          `- Dates: ${[start, end].filter(Boolean).join(' – ')}`,
          websites?.length && `- Websites: ${websites.join(', ')}`
        ]
          .filter(Boolean)
          .join('\n'),
        description
      ].join('\n\n')
    )
  ].join('\n\n')

export const GET: RequestHandler = () =>
  new Response(
    [
      `# ${profile.name}, ${profile.suffix}`,
      `> ${profile.description}`,
      [`- Website: ${profile.url}`, `- Email: ${profile.email}`, ...Object.entries(profile.links).map(([name, url]) => `- ${name}: ${url}`)].join('\n'),
      '## Profile',
      bio,
      ...SECTIONS.map(section)
    ].join('\n\n') + '\n',
    { headers: [['content-type', 'text/plain; charset=utf-8']] }
  )
