import type { TimelineItem } from '$lib/components/timeline/timeline-item.interface'

export const EDUCATION_TIMELINE: TimelineItem[] = [
  {
    end: '2020',
    start: '2018',
    note: 'Master\'s Degree',
    logo: 'fhtw.png',
    name: 'FH Technikum Wien',
    location: 'Vienna, Austria',
    role: 'Telecommunication and Internet Technologies'
  },

  {
    end: '2015',
    start: '2010',
    note: 'Bachelor\'s Degree',
    logo: 'koc.png',
    name: 'Koç University',
    location: 'İstanbul, Turkey',
    role: 'Electrical and Electronics Engineering (English)'
  },

  {
    end: '2010',
    start: '2005',
    note: 'High School',
    logo: 'kal.png',
    name: 'Kadıköy Anadolu Lisesi',
    location: 'İstanbul, Turkey',
    role: 'MF (English)'
  }
]
