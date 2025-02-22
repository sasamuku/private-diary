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
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <NewPost user={session.user} />
        <MonthSelector targetDate={targetDate} />
        <div className="space-y-1">
          <PostList
            posts={posts}
            lastWeekPost={lastWeekPost}
            lastMonthPost={lastMonthPost}
          />
        </div>
      </div>
    </div>
  )
}
