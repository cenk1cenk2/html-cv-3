import { capitalize, experience, profile, SECTIONS } from '#lib/cv.js'
import type { RequestHandler } from './$types'

export const prerender = true

const organizations = [
  ...new Map(
    experience().flatMap(({ name, role, section, websites }) => (websites ?? []).map((website): [string, string] => [website, `- [${name}](${website}): ${role}, ${section}`]))
  ).values()
]

export const GET: RequestHandler = () =>
  new Response(
    [
      `# ${profile.name}`,
      `> ${profile.description}`,
      profile.tagline.join(', '),
      '## CV',
      [`- [Full CV](${profile.url}/llms-full.txt)`, ...['profile', ...SECTIONS].map((anchor) => `- [${capitalize(anchor)}](${profile.url}/#${anchor})`)].join('\n'),
      '## Profiles',
      [`- [Email](mailto:${profile.email})`, ...Object.entries(profile.links).map(([name, url]) => `- [${name}](${url})`)].join('\n'),
      '## Organizations',
      organizations.join('\n')
    ].join('\n\n') + '\n',
    { headers: [['content-type', 'text/plain; charset=utf-8']] }
  )
