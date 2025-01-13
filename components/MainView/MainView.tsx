import type { User } from '@supabase/auth-helpers-nextjs'
import { MonthSelector } from './MonthSelector'
import { NewPost } from './NewPost'
import { PostList } from './PostList'

type MainViewProps = {
  targetDate: Date
  session: {
    user: User
  }
  posts: PostWithUser[]
}

export function MainView({ targetDate, session, posts }: MainViewProps) {
  return (
    <div>
      <NewPost user={session.user} />
      <MonthSelector targetDate={targetDate} />
      <PostList posts={posts} />
    </div>
  )
}
