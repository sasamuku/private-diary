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

  const { data } = await supabase
    .from('posts')
    .select('*, user: users(*)')
    .gte('happened_at', startOfMonth(targetDate).toISOString())
    .lte('happened_at', endOfMonth(targetDate).toISOString())
    .order('happened_at', { ascending: false })

  const posts =
    data?.map((post) => ({
      ...post,
      user: Array.isArray(post.user) ? post.user[0] : post.user,
    })) ?? []

  return (
    <div className="w-full max-x-xl mx-auto">
      <div className="flex justify-between px-4 py-6 border border-gray-800">
        <h1 className="text-xl font-bold">Private Diary</h1>
        <AuthButtonServer />
      </div>
      <MainView targetDate={targetDate} session={session} posts={posts} />
    </div>
  )
}
