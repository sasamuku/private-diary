export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date)
  newDate.setMonth(date.getMonth() + months)
  return newDate
}

export function formatYearMonth(date: Date): string {
  return date.toISOString().slice(0, 7) // 'YYYY-MM'
}
