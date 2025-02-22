'use client'

import {
  type Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { LogIn, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AuthButtonClient<Database>({
  session,
}: {
  session: Session | null
}) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return session ? (
    <button
      type="button"
      onClick={handleSignOut}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium
                 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100
                 rounded-lg transition-colors duration-200"
    >
      <LogOut className="h-4 w-4" />
      <span>Sign out</span>
    </button>
  ) : (
    <button
      type="button"
      onClick={handleSignIn}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium
                 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100
                 rounded-lg transition-colors duration-200"
    >
      <LogIn className="h-4 w-4" />
      <span>Sign in</span>
    </button>
  )
}
