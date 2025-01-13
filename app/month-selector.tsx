'use client'

import { addMonths, format } from 'date-fns'
import { useRouter } from 'next/navigation'

type MonthSelectorProps = {
  targetDate: Date
}

export default function MonthSelector({ targetDate }: MonthSelectorProps) {
  const router = useRouter()

  const handleMonthChange = (monthOffset: number) => {
    const newDate = addMonths(targetDate, monthOffset)
    const newMonth = format(newDate, 'yyyy-MM')
    router.push(`/?month=${newMonth}`)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <button
        type="button"
        onClick={() => handleMonthChange(-1)}
        className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
      >
        Previous
      </button>
      <span>{format(targetDate, 'yyyy-MM')}</span>
      <button
        type="button"
        onClick={() => handleMonthChange(1)}
        className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
      >
        Next
      </button>
    </div>
  )
}
