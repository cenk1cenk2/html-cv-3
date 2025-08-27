import { parse, intervalToDuration, formatDuration } from 'date-fns'

export function calculateWorkDuration(start: string, end: string | false): string {
  const startDate = parse(start, 'MMMM yyyy', new Date())
  const endDate = end === false ? new Date() : parse(end, 'MMMM yyyy', new Date())

  const duration = intervalToDuration({ start: startDate, end: endDate })

  return formatDuration(duration, {
    format: ['years', 'months'],
    delimiter: ' '
  })
}
