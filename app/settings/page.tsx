import { SettingsForm } from '@/components/Settings'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Settings } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <SettingsForm user={session.user} />
    </div>
  )
}
