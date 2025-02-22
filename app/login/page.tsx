import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AuthButtonClient from '../auth-button-client'
import GithubButton from './github-button'

export const dynamic = 'force-dynamic'

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  return (
    <div className="container relative min-h-screen flex-1 flex flex-col justify-center items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-slate-950" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-3xl" />
      </div>

      <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-xl border border-slate-200/20">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Your Private Diary
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Sign in with GitHub to continue
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <GithubButton />
          </div>

          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            By signing in, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
