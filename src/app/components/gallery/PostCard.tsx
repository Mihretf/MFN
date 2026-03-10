import { Calendar, MapPin, Church } from "lucide-react";
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
  // optional deadline added for events
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
  event: "bg-blue-100 text-blue-700 border-blue-200",
  news: "bg-green-100 text-green-700 border-green-200",
  sermon: "bg-purple-100 text-purple-700 border-purple-200",
  announcement: "bg-amber-100 text-amber-700 border-amber-200",
  gallery: "bg-gray-100 text-gray-700 border-gray-200",
};

export function PostCard({ post, onClick }: PostCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  console.log("rendering post card for post", post);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      {/* Image */}
      <div
        className="relative h-48 overflow-hidden bg-gray-100 cursor-pointer"
        onClick={onClick}
      >
        <ImageWithFallback
          src={post.media_url}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Post Type Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide border ${postTypeBadgeColors[post.type]}`}
          >
            {post.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {truncateText(post.description, 120)}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{post.region.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Church className="w-4 h-4 text-gray-400" />
            <span>{post.church.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{formatDate(post.created_at)}</span>
          </div>

          {post.type === "event" && post.deadline && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-semibold">
                Deadline: {formatDate(post.deadline)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
