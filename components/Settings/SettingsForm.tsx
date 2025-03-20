'use client'

import type { User } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { DeleteAccount } from './DeleteAccount'

type SettingsFormProps = {
  user: User
}

export function SettingsForm({ user }: SettingsFormProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Account Information
        </h2>
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 space-y-4">
          <div className="flex items-center gap-4">
            {user.user_metadata.avatar_url && (
              <Image
                src={user.user_metadata.avatar_url}
                alt="Profile"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                {user.user_metadata.name || user.email}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              GitHub Account:{' '}
              {user.user_metadata.preferred_username || 'Not available'}
            </p>
          </div>
        </div>
      </div>

      <DeleteAccount user={user} />
    </div>
  )
}
