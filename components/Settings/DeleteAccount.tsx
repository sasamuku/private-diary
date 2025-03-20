'use client'

import {
  type User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type DeleteAccountProps = {
  user: User
}

export function DeleteAccount({ user }: DeleteAccountProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true)
      setError(null)

      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete account')
      }

      // Redirect to home page
      router.push('/')
      router.refresh()
    } catch (err) {
      console.error('Error deleting account:', err)
      setError('Failed to delete account. Please try again later.')
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
        <span className="inline-block w-1 h-6 bg-gradient-to-b from-red-500 to-red-700 rounded-full" />
        Delete Account
      </h2>
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        {!isConfirmOpen ? (
          <div className="p-6 space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              Deleting your account will permanently remove all your diary
              entries and personal data. This action cannot be undone.
            </p>
            <button
              type="button"
              onClick={() => setIsConfirmOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            <div className="flex items-start gap-3 p-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-medium text-red-800 dark:text-red-400">
                  Warning: This action cannot be undone
                </p>
                <ul className="text-sm text-red-700 dark:text-red-300 list-disc pl-5 space-y-1">
                  <li>All your diary entries will be permanently deleted</li>
                  <li>Your account information will be removed</li>
                  <li>
                    You will need to create a new account to use the app again
                  </li>
                </ul>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
