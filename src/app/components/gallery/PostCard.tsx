import React from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export type PostType = "event" | "news" | "sermon" | "announcement" | "gallery";

export interface Post {
  id: string;
  title: string;
  description: string;
  media_url: string;
  type: PostType;
  show_on_homepage: boolean;
  created_at: string;
  deadline?: string | null;
  region: {
    id: string;
    name: string;
  };
  church: {
    id: string;
    name: string;
  };
}

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <div className="group bg-[#FFFFF0] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#AE8F05]/20">
      <div
        className="relative aspect-square overflow-hidden bg-[#F2F0EB] cursor-pointer"
        onClick={onClick}
      >
        <ImageWithFallback
          src={post.media_url}
          alt={post.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider border font-semibold bg-[#F7E7CE] text-[#AE8F05] border-[#AE8F05]/30">
            {post.type}
          </span>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-bold mb-1 text-[#2C2A28] group-hover:text-[#AE8F05] transition-colors line-clamp-1">
          {post.title}
        </h3>
        <div className="text-xs text-[#5C5854]">
          <span className="line-clamp-1 font-medium">{post.church?.name || "Mission for Nation Church"}</span>
        </div>
      </div>
    </div>
  );
}

