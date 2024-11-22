import { createServerActionClient, User } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export const dynamic = "force-dynamic"

export default function NewPost({ user }: { user: User }) {
  const addPost = async (formData: FormData) => {
    "use server"
    const body = String(formData.get('body'));
    const happened_at = new Date(formData.get("happened_at") as string).toISOString();
    const supabase = createServerActionClient<Database>({ cookies });

    await supabase.from('posts').insert({ body, happened_at, user_id: user.id });
  }

  return (
    <form
      className="border border-gray-800 border-t-0"
      action={addPost}
    >
      <div className="flex flex-col px-4 py-8">
        <div className="flex">
          <div className="h-12 w-12">
            <Image
              className="rounded-full"
              src={user.user_metadata.avatar_url}
              alt="user avatar"
              width={48}
              height={48}
            />
          </div>
          <input
            type="date"
            name="happened_at"
            className="bg-inherit border border-gray-700 rounded px-2 py-1 ml-2 text-sm h-10"
            required
          />
        </div>
        <div className="pl-14">
          <textarea
            name="body"
            rows={4}
            className="bg-inherit w-full resize-none border border-gray-700 rounded p-2 text-lg leading-relaxed placeholder-gray-500"
            placeholder="What's good today?"
            required
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
