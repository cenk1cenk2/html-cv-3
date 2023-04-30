import type { TimelineItem } from '$lib/components/timeline/timeline-item.interface'

export const WORK_TIMELINE: TimelineItem[] = [
  {
    end: false,
    start: 'February 2020',
    logo: 'ws.png',
    name: 'Web&Söhne',
    location: 'Vienna, Austria',
    role: 'Backend Developer',
    note: 'Full-Time'
  },

  {
    end: false,
    start: 'August 2021',
    logo: 'sorwe.jpeg',
    name: 'Sorwe',
    location: 'İstanbul, Turkey',
    role: 'DevOps Architect',
    note: 'Freelance'
  },

  {
    end: 'September 2018',
    start: 'May 2016',
    logo: 'tekfen.png',
    name: 'Tekfen Engineering',
    location: 'İstanbul, Turkey',
    role: 'Instrumentation and Control Systems Engineer',
    note: 'Full-Time'
  }
]
