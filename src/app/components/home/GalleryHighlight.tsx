import React from "react";
import { Calendar, MapPin, Church, ArrowRight } from "lucide-react";
import { Post } from "../../types/gallery.type";
import { fetchGalleryPosts } from "../../services/gallery.service";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";

const postTypeBadgeColors: Record<string, string> = {
  event: "bg-blue-100 text-blue-700 border-blue-200",
  news: "bg-green-100 text-green-700 border-green-200",
  sermon: "bg-purple-100 text-purple-700 border-purple-200",
  announcement: "bg-amber-100 text-amber-700 border-amber-200",
  gallery: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function GalleryHighlight() {
  const [displayPosts, setDisplayPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  React.useEffect(() => {
    const mockHighlights: Post[] = [
      {
        id: "mock1",
        title: "Sunday Worship Service",
        description: "Join us as we worship and praise the Lord together in unity.",
        type: "event",
        media_url: "https://res.cloudinary.com/dj3wxiznw/image/upload/q_auto/f_auto/v1775808111/photo_1_2026-04-10_11-01-02_xpiqka.jpg",
        show_on_homepage: true,
        created_at: new Date().toISOString(),
        region: { id: "1", name: "Addis Ababa" },
        church: { id: "1", name: "Main Branch" },
      },
      {
        id: "mock2",
        title: "Community Outreach",
        description: "Reaching out to our local community with love and support.",
        type: "news",
        media_url: "https://res.cloudinary.com/dj3wxiznw/image/upload/q_auto/f_auto/v1775808111/photo_3_2026-04-10_11-01-02_tihnp6.jpg",
        show_on_homepage: true,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        region: { id: "1", name: "Addis Ababa" },
        church: { id: "1", name: "Main Branch" },
      },
      {
        id: "mock3",
        title: "Youth Ministry Highlights",
        description: "Empowering the next generation to lead with faith and courage.",
        type: "gallery",
        media_url: "https://res.cloudinary.com/dj3wxiznw/image/upload/q_auto/f_auto/v1775808111/photo_2_2026-04-10_11-01-02_ni3syh.jpg",
        show_on_homepage: true,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        region: { id: "1", name: "Addis Ababa" },
        church: { id: "1", name: "Main Branch" },
      }
    ];

    setLoading(true);
    fetchGalleryPosts()
      .then((all) => {
        const topPosts = all.filter((p) => p.show_on_homepage).slice(0, 6);
        if (topPosts.length === 0) {
          setDisplayPosts(mockHighlights);
        } else {
          // Instructed to use these mock images, so overriding the first three image urls
          setDisplayPosts(topPosts.map((p, i) => {
            if (i < mockHighlights.length) {
              return { ...p, media_url: mockHighlights[i].media_url };
            }
            return p;
          }));
        }
      })
      .catch((err) => {
        console.error("failed to fetch homepage posts, using mock fallback", err);
        setDisplayPosts(mockHighlights);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <LoadingState message="Loading latest updates..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <ErrorState 
            title="Updates Unavailable" 
            message={error} 
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  if (displayPosts.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Latest Updates</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            Stay connected with what's happening in our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayPosts.map((post) => (
              <div
              key={post.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={post.media_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Post Type Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide shadow-sm border ${postTypeBadgeColors[post.type]}`}
                  >
                    {post.type}
                  </span>
                </div>
              </div>


            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
