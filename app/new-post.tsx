import {
  type User,
  createServerActionClient,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default function NewPost({ user }: { user: User }) {
  const addPost = async (formData: FormData) => {
    'use server'
    const body = String(formData.get('body'))
    const happened_at = new Date(
      formData.get('happened_at') as string,
    ).toISOString()
    const supabase = createServerActionClient<Database>({ cookies })

    await supabase.from('posts').insert({ body, happened_at, user_id: user.id })
  }

  return (
    <form className="border border-gray-800 border-t-0 p-6" action={addPost}>
      <div className="space-y-6">
        <div>
          <input
            id="happened_at"
            type="date"
            name="happened_at"
            className="bg-inherit border border-gray-700 rounded p-3 text-sm h-12 w-48 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            required
          />
        </div>

        <div>
          <textarea
            id="post-body"
            name="body"
            rows={6}
            className="bg-inherit w-full resize-none border border-gray-700 rounded p-4 text-lg leading-relaxed placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            placeholder="What's good today?"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded transition-colors duration-200 min-w-[120px]"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  )
}
