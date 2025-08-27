import { parse, intervalToDuration, formatDuration } from 'date-fns'

export function calculateDuration(start: string, end: string | false): string {
  const startDate = parse(start, 'MMMM yyyy', new Date())
  let endDate: Date

  if (typeof end === 'undefined') {
    endDate = startDate
  } else if (typeof end === 'boolean' && !end) {
    endDate = new Date()
  } else {
    endDate = parse(end, 'MMMM yyyy', new Date())
  }

  const duration = intervalToDuration({ start: startDate, end: endDate })

  return (
    formatDuration(duration, {
      format: ['years', 'months'],
      delimiter: ' ',
      zero: true
    }) || '< 1 month'
  )
}
