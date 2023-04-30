export interface TimelineItem {
  name: string
  logo: string
  location: string
  start: string
  end?: string | false
  note?: string
  role?: string
  description?: string[]
}
