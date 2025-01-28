'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PostItem } from './PostItem'

type Props = {
  posts: PostWithUser[]
  lastWeekPost?: PostWithUser
  lastMonthPost?: PostWithUser
}

export function PostList({ posts, lastWeekPost, lastMonthPost }: Props) {
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

  const handleEdit = async (
    postId: string,
    newBody: string,
    newHappenedAt: string,
  ) => {
    const supabase = createClientComponentClient<Database>()
    const { error } = await supabase
      .from('posts')
      .update({
        body: newBody,
        happened_at: new Date(newHappenedAt).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', postId)

    if (error) {
      console.error('Error updating post:', error)
      return
    }

    router.refresh()
  }

  const handleDelete = async (postId: string) => {
    const supabase = createClientComponentClient<Database>()
    const { error } = await supabase.from('posts').delete().eq('id', postId)
    if (error) {
      console.error('Error deleting post:', error)
      return
    }
    router.refresh()
  }

  return (
    <>
      {lastWeekPost && (
        <PostItem
          post={lastWeekPost}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLastWeekPost={true}
        />
      )}
      {lastMonthPost && (
        <PostItem
          post={lastMonthPost}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLastMonthPost={true}
        />
      )}
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </>
  )
}
