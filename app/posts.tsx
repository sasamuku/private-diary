"use client";

import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Posts({ posts }: { posts: PostWithUser[] }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase.channel("realtime posts").on
    (
      "postgres_changes", {
        event: "*",
        schema: "public",
        table: "posts",
      }, (payload) => {
        router.refresh();
      }
    ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return posts.map((post) => (
    <div key={post.id} className="border border-gray-800 border-t-0 px-4 py-8 flex">
      <div className="ml-4">
        <p>
          <span className="text-base text-gray-400">
            {new Date(post.happened_at).toLocaleDateString("ja-JP", {
              timeZone: "Asia/Tokyo",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              weekday: "short",
            })}
          </span>
        </p>
        <p>{post.body}</p>
      </div>
    </div>
  ));
}
