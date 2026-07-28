import { parse, intervalToDuration, formatDuration, addMonths } from 'date-fns'

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

  // count end month inclusively, like linkedin does, so a single-month stint reads as 1 month
  const duration = intervalToDuration({ start: startDate, end: addMonths(endDate, 1) })

  return (
    formatDuration(duration, {
      format: ['years', 'months'],
      delimiter: ' ',
      zero: true
    }) || '< 1 month'
  )
}
