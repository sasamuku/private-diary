import type { Database } from '@/lib/database.types'
import {
  type User,
  createServerActionClient,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Textarea } from './Textarea'

export const dynamic = 'force-dynamic'

export function NewPost({ user }: { user: User }) {
  const now = new Date()
  const today =
    now.getHours() < 4
      ? new Date(now.setDate(now.getDate() - 1)).toISOString().split('T')[0]
      : now.toISOString().split('T')[0]

  const addPost = async (formData: FormData) => {
    'use server'
    const body = String(formData.get('body'))
    const happened_at = new Date(
      formData.get('happened_at') as string,
    ).toISOString()
    const supabase = createServerActionClient<Database>({ cookies })

    await supabase.from('posts').insert({
      body,
      happened_at,
      user_id: user.id,
    })
  }

  return (
    <form
      className="rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-lg p-6"
      action={addPost}
    >
      <div className="space-y-4">
        <input
          id="happened_at"
          type="date"
          name="happened_at"
          defaultValue={today}
          className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700
                     rounded-lg px-4 py-2 text-sm w-48 outline-none
                     focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
          required
        />

        <Textarea />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600
                       text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200
                       focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  )
}
