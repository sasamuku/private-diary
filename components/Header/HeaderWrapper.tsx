import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Header } from './Header'
import { ScrollHeader } from './ScrollHeader'

export const dynamic = 'force-dynamic'

export async function HeaderWrapper() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <ScrollHeader>
      <Header session={session} />
    </ScrollHeader>
  )
}
