import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import GithubButton from './github-button'

export const dynamic = 'force-dynamic'

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/home')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-slate-950" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-3xl" />
      </div>

      <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-xl border border-slate-200/20">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Sign in with GitHub to continue
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <GithubButton />
          </div>

          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            By signing in, you agree to our{' '}
            <a
              href="/terms"
              className="underline hover:text-slate-700 dark:hover:text-slate-300"
            >
              Terms
            </a>{' '}
            and{' '}
            <a
              href="/privacy"
              className="underline hover:text-slate-700 dark:hover:text-slate-300"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
