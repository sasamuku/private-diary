'use client'

import { addMonths, formatYearMonth } from '@/lib/utils/date'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

type MonthSelectorProps = {
  targetDate: Date
}

export function MonthSelector({ targetDate }: MonthSelectorProps) {
  const router = useRouter()

  const handleMonthChange = (monthOffset: number) => {
    const newDate = addMonths(targetDate, monthOffset)
    const newMonth = formatYearMonth(newDate)
    router.push(`/home?month=${newMonth}`)
    router.refresh()
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/20 dark:border-slate-800/20 rounded-lg shadow-sm">
      <button
        type="button"
        onClick={() => handleMonthChange(-1)}
        className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200"
        aria-label="Previous month"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
        <Calendar className="h-4 w-4 text-purple-500" />
        <span>{formatYearMonth(targetDate)}</span>
      </div>

      <button
        type="button"
        onClick={() => handleMonthChange(1)}
        className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200"
        aria-label="Next month"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
