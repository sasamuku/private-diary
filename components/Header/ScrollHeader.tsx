'use client'

import { useScrollDirection } from '@/hooks/useScrollDirection'
import type { ReactNode } from 'react'

interface ScrollHeaderProps {
  children: ReactNode
}

export function ScrollHeader({ children }: ScrollHeaderProps) {
  const scrollDirection = useScrollDirection(15)

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800
      bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm transition-transform duration-300
      ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="container max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        {children}
      </div>
    </header>
  )
}
