import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, TrendingUp, Shuffle } from "lucide-react";
import { Post } from "../types/gallery.type";
import { FilterSection } from "../components/gallery/FilterSection";
import { Pagination } from "../components/gallery/Pagination";
import { PostCard } from "../components/gallery/PostCard";
import { GalleryViewer } from "../components/gallery/GalleryViewer";
import { fetchGalleryPosts } from "../services/gallery.service";
import { regionService } from "../services/app.service";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";

// regions list is fetched from backend instead of hardcoded
interface RegionAPI {
  id: string;
  name: string;
}

// Utility functions
function getRecentPosts(posts: Post[], limit: number = 5): Post[] {
  return [...posts]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, limit);
}

function getRandomPosts(posts: Post[], limit: number = 3): Post[] {
  const shuffled = [...posts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}

function filterPosts(
  posts: Post[],
  regionId: string,
  postType: string,
): Post[] {
  return posts.filter((post) => {
    const matchesRegion = regionId === "all" || post.region.id === regionId;
    const matchesType = postType === "all" || post.type === postType;
    return matchesRegion && matchesType;
  });
}

function getHomepagePosts(posts: Post[]): Post[] {
  // Get posts where show_on_homepage is true
  return posts.filter((post) => post.show_on_homepage);
}

export default function App() {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedPostType, setSelectedPostType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // viewer state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerSection, setViewerSection] = useState<"all" | "recent">("all");
  const [viewerIndex, setViewerIndex] = useState(0);

  // arrays passed to viewer to navigate; defaults updated when opening
  const [viewerAllPosts, setViewerAllPosts] = useState<Post[]>([]);
  const [viewerRecentPosts, setViewerRecentPosts] = useState<Post[]>([]);

  const openViewer = (
    section: "all" | "recent",
    idx: number,
    allArr: Post[] = filteredPosts,
    recentArr: Post[] = recentPosts,
  ) => {
    setViewerSection(section);
    setViewerIndex(idx);
    setViewerAllPosts(allArr);
    setViewerRecentPosts(recentArr);
    setViewerOpen(true);
  };

  // region state
  const [regions, setRegions] = useState<RegionAPI[]>([]);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [errorRegions, setErrorRegions] = useState<string | null>(null);

  // load region list from service
  useEffect(() => {
    setLoadingRegions(true);
    regionService
      .getRegions()
      .then((res: any) => {
        const list: RegionAPI[] = res?.regions || res || [];
        setRegions(list);
      })
      .catch((err) => {
        console.error("failed to fetch regions", err);
        setErrorRegions(err.message || "Unable to load regions");
      })
      .finally(() => setLoadingRegions(false));
  }, []);

  // fetch posts once on mount
  useEffect(() => {
    setLoading(true);
    fetchGalleryPosts()
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message || "Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  // Get filtered posts
  const filteredPosts = useMemo(() => {
    return filterPosts(posts, selectedRegion, selectedPostType);
  }, [posts, selectedRegion, selectedPostType]);

  // if filter set changes while viewer is open close it to avoid stale index
  useEffect(() => {
    if (viewerOpen) {
      setViewerOpen(false);
    }
  }, [filteredPosts]);

  // Get recent posts
  const recentPosts = useMemo(() => getRecentPosts(posts, 3), [posts]);

  // Get random posts

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  // Reset to page 1 when filters change
  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
    setCurrentPage(1);
  };

  const handlePostTypeChange = (postType: string) => {
    setSelectedPostType(postType);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 mt-16 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl text-gray-900 dark:text-gray-100 text-center mb-2 transition-colors">
            {t("gallery.heroTitle")}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 transition-colors">
            {t("gallery.heroSubtitle")}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && <LoadingState message="Loading gallery..." className="py-20" />}
        {!loading && error && (
          <ErrorState 
            title="Failed to load gallery" 
            message={error} 
            className="my-10" 
            onRetry={() => window.location.reload()} 
          />
        )}
        {!loading && !error && (
          <>
            {/* Recent Posts Section */}
            {recentPosts.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl text-gray-900 dark:text-gray-100">{t("gallery.recentPosts")}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentPosts.map((post, idx) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onClick={() => openViewer("recent", idx)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Filters */}
            {loadingRegions && (
              <LoadingState message="Loading regions..." className="py-8" />
            )}
            {errorRegions && (
              <ErrorState 
                message={errorRegions} 
                className="mb-8"
                onRetry={() => window.location.reload()}
              />
            )}
            <FilterSection
              selectedRegion={selectedRegion}
              selectedPostType={selectedPostType}
              regions={regions}
              onRegionChange={handleRegionChange}
              onPostTypeChange={handlePostTypeChange}
            />

            {/* All Posts Grid */}
            <section>
              {filteredPosts.length > 0 && (
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl text-gray-900 dark:text-gray-100">{t("gallery.allPosts")}</h2>
                  <span className="text-sm text-gray-500">
                    ({filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? t("gallery.post") : t("gallery.posts")})
                  </span>
                </div>
              )}

              {paginatedPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedPosts.map((post, idx) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onClick={() => openViewer("all", startIndex + idx)}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                // No Results State
                <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                      <Sparkles className="w-8 h-8 text-[#d4af37]" />
                    </div>
                    <h3 className="text-xl text-gray-900 dark:text-gray-100 mb-2 transition-colors">
                      {t("gallery.noPosts")}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {t("gallery.noPostsDesc")}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedRegion("all");
                        setSelectedPostType("all");
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {t("gallery.clearFilters")}
                    </button>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Footer */}

      {/* gallery viewer modal */}
      {viewerOpen && (
        <GalleryViewer
          allPosts={viewerAllPosts}
          recentPosts={viewerRecentPosts}
          initialSection={viewerSection}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm transition-colors">
            {t("footer.copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
}
