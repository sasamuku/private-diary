import { MainView } from '@/components/MainView'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { endOfMonth, startOfMonth } from '../lib/utils/date'
import AuthButtonServer from './auth-button-server'

export const dynamic = 'force-dynamic'

export default async function Home({
  searchParams,
}: {
  searchParams: { month?: string }
}) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const targetDate = searchParams.month
    ? new Date(searchParams.month)
    : new Date()

  const currentMonth = new Date()
  const isCurrentMonth =
    targetDate.getFullYear() === currentMonth.getFullYear() &&
    targetDate.getMonth() === currentMonth.getMonth()

  const lastWeekDate = new Date()
  lastWeekDate.setDate(lastWeekDate.getDate() - 7)

  const lastMonthDate = new Date()
  lastMonthDate.setDate(lastMonthDate.getDate() - 30)

  const [currentMonthPosts, lastWeekPosts, lastMonthPosts] = await Promise.all([
    supabase
      .from('posts')
      .select('*, user: users(*)')
      .gte('happened_at', startOfMonth(targetDate).toISOString())
      .lte('happened_at', endOfMonth(targetDate).toISOString())
      .order('happened_at', { ascending: false }),
    ...(isCurrentMonth
      ? [
          supabase
            .from('posts')
            .select('*, user: users(*)')
            .eq('happened_at', lastWeekDate.toISOString().split('T')[0]),
          supabase
            .from('posts')
            .select('*, user: users(*)')
            .eq('happened_at', lastMonthDate.toISOString().split('T')[0]),
        ]
      : [Promise.resolve({ data: null }), Promise.resolve({ data: null })]),
  ])

  const posts =
    currentMonthPosts.data?.map((post) => ({
      ...post,
      user: Array.isArray(post.user) ? post.user[0] : post.user,
    })) ?? []

  const lastWeekPost = lastWeekPosts.data?.[0]
    ? {
        ...lastWeekPosts.data[0],
        user: Array.isArray(lastWeekPosts.data[0].user)
          ? lastWeekPosts.data[0].user[0]
          : lastWeekPosts.data[0].user,
      }
    : undefined

  const lastMonthPost = lastMonthPosts.data?.[0]
    ? {
        ...lastMonthPosts.data[0],
        user: Array.isArray(lastMonthPosts.data[0].user)
          ? lastMonthPosts.data[0].user[0]
          : lastMonthPosts.data[0].user,
      }
    : undefined

  return (
    <div className="w-full">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
        <div className="container max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Private Diary
            </h1>
          </div>
          <AuthButtonServer />
        </div>
      </header>
      <MainView
        targetDate={targetDate}
        session={session}
        posts={posts}
        lastWeekPost={lastWeekPost}
        lastMonthPost={lastMonthPost}
      />
    </div>
  )
}
