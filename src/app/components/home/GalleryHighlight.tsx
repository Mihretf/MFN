import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Post } from "../../types/gallery.type";
import { fetchGalleryPosts } from "../../services/gallery.service";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";

export default function GalleryHighlight() {
  const { t } = useTranslation();
  const [displayPosts, setDisplayPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    fetchGalleryPosts()
      .then((all) => {
        // filter gallery posts and display the top 6
        const galleryPosts = all.filter((p) => p.type === "gallery");
        const list = galleryPosts.length > 0 ? galleryPosts : all;
        setDisplayPosts(list.slice(0, 6));
      })
      .catch((err) => {
        console.error("failed to fetch homepage posts", err);
        setError("Could not load gallery posts");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
        <LoadingState message="Loading latest gallery..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4">
          <ErrorState 
            title="Gallery Unavailable" 
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
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            {t("nav.gallery")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            {t("gallery.heroSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={post.media_url}
                  alt={post.title || "Gallery post"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.title && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold truncate w-full">{post.title}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* More Photos Button */}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#d4af37] text-gray-900 font-bold rounded-lg hover:bg-[#f0d082] transition-colors shadow-lg hover:text-white dark:hover:text-gray-900 transition-all hover:scale-105"
          >
            More Photos <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
