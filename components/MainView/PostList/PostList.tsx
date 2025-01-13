'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PostItem from './PostItem/PostItem'

export function PostList({ posts }: { posts: PostWithUser[] }) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel('realtime posts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
        },
        (payload) => {
          router.refresh()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  const handleEdit = (postId: string) => {
    // not implemented
    router.push(`/posts/edit/${postId}`)
  }
  return posts.map((post) => (
    <PostItem key={post.id} post={post} onEdit={handleEdit} />
  ))
}
