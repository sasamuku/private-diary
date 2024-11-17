import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import AuthButtonServer from './auth-button-server';
import NewPost from './new-post';
import Posts from './posts';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: { session }} = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("posts")
    .select("*, user: users(*)")
    .order("created_at", { ascending: false });

  const posts = data?.map(post => ({
    ...post,
    user: Array.isArray(post.user) ? post.user[0] : post.user,
  })) ?? [];

  return (
    <div className="w-full max-x-xl mx-auto">
      <div className="flex justify-between px-4 py-6 border border-gray-800">
        <h1 className="text-xl font-bold">Positive Diary</h1>
        <AuthButtonServer />
      </div>
      <NewPost user={session.user}/>
      <Posts posts={posts}/>
    </div>
  )

  return
}
