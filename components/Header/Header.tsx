'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'
import { HamburgerMenu } from './HamburgerMenu'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Private Diary
        </h1>
      </div>
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={toggleMenu}
          className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5 text-slate-600 dark:text-slate-400" />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-1 z-50">
            <HamburgerMenu onClose={() => setIsMenuOpen(false)} />
          </div>
        )}
      </div>
    </div>
  )
}
