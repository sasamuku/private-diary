import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import StarButton from './StarButton'

type Props = {
  post: PostWithUser
  onEdit: (postId: string) => void
}

export default function PostItem({ post, onEdit }: Props) {
  return (
    <div
      key={post.id}
      className="border border-gray-800 border-t-0 px-4 py-8 flex justify-between"
    >
      <div className="ml-4">
        <p>
          <span className="text-base text-gray-400">
            {new Date(post.happened_at).toLocaleDateString('ja-JP', {
              timeZone: 'Asia/Tokyo',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            })}
          </span>
        </p>
        <p>{post.body}</p>
      </div>

      <div className="flex items-center space-x-4">
        <StarButton post={post} />
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-700">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-gray-800 text-gray-100"
          >
            <DropdownMenuItem
              onClick={() => onEdit(post.id)}
              className="cursor-pointer hover:bg-gray-700"
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
