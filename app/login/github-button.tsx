'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'

export default function GithubButton() {
  const supabase = createClientComponentClient<Database>()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="w-full flex items-center justify-center gap-3 px-6 py-3
                 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600
                 text-white font-medium rounded-lg transition-all duration-200
                 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
    >
      <Image
        src="/github-mark-white.png"
        alt="Github Logo"
        width={20}
        height={20}
      />
      <span>Continue with GitHub</span>
    </button>
  )
}
