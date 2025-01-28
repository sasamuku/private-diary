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
  lastWeekPost?: PostWithUser
  lastMonthPost?: PostWithUser
}

export function MainView({
  targetDate,
  session,
  posts,
  lastWeekPost,
  lastMonthPost,
}: MainViewProps) {
  return (
    <div>
      <NewPost user={session.user} />
      <MonthSelector targetDate={targetDate} />
      <PostList
        posts={posts}
        lastWeekPost={lastWeekPost}
        lastMonthPost={lastMonthPost}
      />
    </div>
  )
}
