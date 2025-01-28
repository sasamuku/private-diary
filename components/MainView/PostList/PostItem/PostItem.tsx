import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
    <div
      key={post.id}
      className="relative border border-gray-800 border-t-0 px-4 py-8 flex justify-between"
    >
      <div className="absolute top-0 right-0 mt-2 mr-2 p-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-700">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-gray-800 text-gray-100"
          >
            <DropdownMenuItem
              onClick={() => setIsEditing(true)}
              className="cursor-pointer hover:bg-gray-700"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (window.confirm('Are you sure?')) {
                  onDelete(post.id)
                }
              }}
              className="cursor-pointer hover:bg-gray-700"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="ml-4">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="date"
              value={editedHappenedAt}
              onChange={(e) => setEditedHappenedAt(e.target.value)}
              className="bg-gray-700 text-gray-100 p-2 rounded"
            />
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 p-2 rounded"
            />
            <div className="space-x-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p>
              <span className="text-base text-gray-400">
                {new Date(post.happened_at).toLocaleDateString('ja-JP', {
                  timeZone: 'Asia/Tokyo',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  weekday: 'short',
                })}
                {isLastWeekPost && (
                  <span className="ml-2 text-base border border-yellow-400/50 bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-md">
                    This day last week
                  </span>
                )}
                {isLastMonthPost && (
                  <span className="ml-2 text-base border border-blue-400/50 bg-blue-400/10 text-blue-400 px-2 py-0.5 rounded-md">
                    This day last month
                  </span>
                )}
              </span>
            </p>
            <p>{post.body}</p>
            <StarButton post={post} />
          </>
        )}
      </div>
    </div>
  )
}
