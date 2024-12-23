"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import Star from "./star";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export default function Posts({ posts }: { posts: PostWithUser[] }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime posts")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "posts",
      }, (payload) => {
        router.refresh();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  const handleEdit = (postId: string) => {
    // not implemented
    router.push(`/posts/edit/${postId}`);
  };

  return posts.map((post) => (
    <div key={post.id} className="border border-gray-800 border-t-0 px-4 py-8 flex justify-between">
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

      <div className="flex items-center space-x-4">
        <Star post={post} />
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-700">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 text-gray-100">
            <DropdownMenuItem
              onClick={() => handleEdit(post.id)}
              className="cursor-pointer hover:bg-gray-700"
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ));
}
