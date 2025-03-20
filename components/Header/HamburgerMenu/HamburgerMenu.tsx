'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

type HamburgerMenuProps = {
  onClose: () => void
}

export function HamburgerMenu({ onClose }: HamburgerMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    onClose()
  }

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-1 z-50"
    >
      <Link
        href="/settings"
        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        onClick={onClose}
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full text-left"
      >
        <LogOut className="h-4 w-4" />
        <span>Sign out</span>
      </button>
    </div>
  )
}
