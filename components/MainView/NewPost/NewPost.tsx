import type { Database } from '@/lib/database.types'
import {
  type User,
  createServerActionClient,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NewPostForm } from './NewPostForm'

export const dynamic = 'force-dynamic'

export function NewPost({ user }: { user: User }) {
  const now = new Date()
  const today =
    now.getHours() < 4
      ? new Date(now.setDate(now.getDate() - 1)).toISOString().split('T')[0]
      : now.toISOString().split('T')[0]

  const addPost = async (formData: FormData) => {
    'use server'

    try {
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

      return { success: true }
    } catch (error) {
      console.error('Failed to add post:', error)
      return { success: false, error: 'Failed to add post' }
    }
  }

  return <NewPostForm addPost={addPost} today={today} />
}
