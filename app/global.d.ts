import type { Database as DB } from '@/lib/database.types'

type Post = DB['public']['Tables']['posts']['Row']
type User = DB['public']['Tables']['users']['Row']

declare global {
  type Database = DB
  type PostWithUser = Post & {
    user: User
  }
}
