'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/auth-helpers-nextjs'
import { ArrowRight, LogIn, Menu } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { HamburgerMenu } from './HamburgerMenu/HamburgerMenu'

export function Header({ session }: { session: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  const navigateToApp = () => {
    router.push('/home')
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Private Diary
        </h1>
      </div>
      <div className="relative flex items-center">
        {session ? (
          pathname === '/' ? (
            <button
              type="button"
              onClick={navigateToApp}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium
                        bg-gradient-to-r from-purple-600 to-cyan-600 text-white
                        rounded-lg transition-colors duration-200"
              aria-label="Go to App"
            >
              <span>Go to App</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <>
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
            </>
          )
        ) : (
          <button
            type="button"
            onClick={handleSignIn}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium
                      text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100
                      rounded-lg transition-colors duration-200"
            aria-label="Sign in"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign in</span>
          </button>
        )}
      </div>
    </div>
  )
}
