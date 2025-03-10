import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import StarButton from './StarButton'

type Props = {
  post: PostWithUser
  onEdit: (postId: string, newBody: string, newHappenedAt: string) => void
  onDelete: (postId: string) => void
  isLastWeekPost?: boolean
  isLastMonthPost?: boolean
}

export function PostItem({
  post,
  onEdit,
  onDelete,
  isLastWeekPost,
  isLastMonthPost,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedBody, setEditedBody] = useState(post.body)
  const [editedHappenedAt, setEditedHappenedAt] = useState(
    post.happened_at.split('T')[0],
  )

  const handleSubmit = () => {
    onEdit(post.id, editedBody, editedHappenedAt)
    setIsEditing(false)
  }

  return (
    <div className="rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-md p-6 space-y-4 relative">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {new Date(post.happened_at).toLocaleDateString('ja-JP', {
              timeZone: 'Asia/Tokyo',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            })}
            {isLastWeekPost && (
              <span
                className="ml-2 text-xs font-medium bg-gradient-to-r from-amber-500/10 to-yellow-500/10
                             text-amber-600 dark:text-amber-400 px-2 py-1 rounded-full border border-amber-200/20"
              >
                Last Week
              </span>
            )}
            {isLastMonthPost && (
              <span
                className="ml-2 text-xs font-medium bg-gradient-to-r from-blue-500/10 to-cyan-500/10
                             text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full border border-blue-200/20"
              >
                Last Month
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center space-x-1 relative z-10">
          <StarButton post={post} />
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600">
              <MoreHorizontal className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
                           rounded-lg shadow-lg py-1.5 z-[100] min-w-[150px] overflow-hidden"
                sideOffset={5}
                align="end"
                alignOffset={0}
                avoidCollisions={true}
                collisionPadding={10}
              >
                <DropdownMenuItem
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-slate-500 dark:text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (window.confirm('Are you sure?')) {
                      onDelete(post.id)
                    }
                  }}
                  className="flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-red-500 dark:text-red-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4 mt-2">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="date"
                value={editedHappenedAt}
                onChange={(e) => setEditedHappenedAt(e.target.value)}
                className="w-full bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              />
            </div>
            <div className="relative">
              <textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                rows={4}
                className="w-full bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 p-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors resize-none"
              />
            </div>
            <div className="flex space-x-3 justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
            {post.body}
          </p>
        </div>
      )}
    </div>
  )
}
