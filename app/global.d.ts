import { Database as DB } from "@/lib/database.types";

type Post = DB["public"]["Tables"]["posts"]["Row"]

declare global {
  type Database = DB;
  type Post = Post;
}
