import { Calendar, MapPin } from "lucide-react";
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

const postTypeBadgeColors: Record<PostType, string> = {
  event: "bg-[#F7E7CE] text-[#AE8F05] border-[#AE8F05]/30",
  news: "bg-[#F7E7CE] text-[#AE8F05] border-[#AE8F05]/30",
  sermon: "bg-[#F7E7CE] text-[#AE8F05] border-[#AE8F05]/30",
  announcement: "bg-[#F7E7CE] text-[#AE8F05] border-[#AE8F05]/30",
  gallery: "bg-[#F7E7CE] text-[#AE8F05] border-[#AE8F05]/30",
};

export function PostCard({ post, onClick }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group bg-[#FFFFF0] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#AE8F05]/20">
      {/* Image — fixed aspect ratio with object-top to preserve heads */}
      <div
        className="relative aspect-square overflow-hidden bg-[#F2F0EB] cursor-pointer"
        onClick={onClick}
      >
        <ImageWithFallback
          src={post.media_url}
          alt={post.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {/* Post Type Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider border font-semibold ${postTypeBadgeColors[post.type]}`}
          >
            {post.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-bold mb-1 text-[#2C2A28] group-hover:text-[#AE8F05] transition-colors line-clamp-1">
          {post.title}
        </h3>

        <div className="space-y-1 text-xs text-[#5C5854]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#AE8F05]" />
            <span className="line-clamp-1">{post.region.name}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-[#AE8F05]" />
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
