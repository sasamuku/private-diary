'use client'

import type { User } from '@supabase/auth-helpers-nextjs'
import { GithubIcon, User as UserIcon } from 'lucide-react'
import Image from 'next/image'
import { DeleteAccount } from './DeleteAccount'

type SettingsFormProps = {
  user: User
}

export function SettingsForm({ user }: SettingsFormProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
          <span className="inline-block w-1 h-6 bg-gradient-to-b from-purple-600 to-cyan-600 rounded-full" />
          Account Information
        </h2>
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-5">
              {user.user_metadata.avatar_url ? (
                <div className="relative rounded-full overflow-hidden ring-2 ring-purple-200 dark:ring-purple-800">
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    width={72}
                    height={72}
                    className="rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-[72px] h-[72px] rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                  <UserIcon className="h-8 w-8 text-slate-500 dark:text-slate-400" />
                </div>
              )}
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {user.user_metadata.name || user.email}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <GithubIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm">
                Connected with GitHub:{' '}
                <span className="font-medium">
                  {user.user_metadata.preferred_username || 'Not available'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <DeleteAccount user={user} />
    </div>
  )
}
