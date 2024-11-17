import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import AuthButtonServer from './auth-button-server';
import NewPost from './new-post';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: { session }} = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: posts } = await supabase.from("posts").select("*")
  return (
    <div className="w-full max-x-xl mx-auto">
      <div className="flex justify-between px-4 py-6 border border-gray-800">
        <h1 className="text-xl font-bold">Positive Diary</h1>
        <AuthButtonServer />
      </div>
      <NewPost user={session.user}/>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  )

  return
}
