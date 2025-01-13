'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Star as StarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Star({
  post,
}: {
  post: PostWithUser
}) {
  const router = useRouter()

  const toggleStar = async () => {
    const supabase = createClientComponentClient<Database>()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      if (post.is_starred) {
        await supabase
          .from('posts')
          .update({ is_starred: false })
          .match({ user_id: user.id, id: post.id })
      } else {
        await supabase
          .from('posts')
          .update({ is_starred: true })
          .match({ user_id: user.id, id: post.id })
      }
      router.refresh()
    }
  }

  return (
    <button
      type="button"
      onClick={toggleStar}
      className="p-2 hover:bg-gray-700 rounded-full"
      aria-label={post.is_starred ? 'Unstar this post' : 'Star this post'}
    >
      {post.is_starred ? (
        <StarIcon className="text-yellow-400" />
      ) : (
        <StarIcon className="text-gray-400" />
      )}
    </button>
  )
}
