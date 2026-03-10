import React from "react";
import { Calendar, MapPin, Church, ArrowRight } from "lucide-react";
import { Post } from "../../types/gallery.type";
import { fetchGalleryPosts } from "../../services/gallery.service";

const postTypeBadgeColors: Record<string, string> = {
  event: "bg-blue-100 text-blue-700 border-blue-200",
  news: "bg-green-100 text-green-700 border-green-200",
  sermon: "bg-purple-100 text-purple-700 border-purple-200",
  announcement: "bg-amber-100 text-amber-700 border-amber-200",
  gallery: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function GalleryHighlight() {
  const [displayPosts, setDisplayPosts] = React.useState<Post[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  React.useEffect(() => {
    fetchGalleryPosts()
      .then((all) => {
        setDisplayPosts(all.filter((p) => p.show_on_homepage).slice(0, 6));
      })
      .catch((err) => console.error("failed to fetch homepage posts", err));
  }, []);

  if (displayPosts.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Latest Updates</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay connected with what's happening in our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
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
              <div className="p-6">
                <h3 className="text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.description}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{post.region.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Church className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{post.church.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>

                <button className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1 group/btn">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
}
