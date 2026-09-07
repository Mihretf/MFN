import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, TrendingUp } from "lucide-react";
import { Post } from "../types/gallery.type";
import { FilterSection } from "../components/gallery/FilterSection";
import { PostCard } from "../components/gallery/PostCard";
import { GalleryViewer } from "../components/gallery/GalleryViewer";
import { fetchGalleryPosts } from "../services/gallery.service";
import { regionService } from "../services/app.service";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";

interface RegionAPI {
  id: string;
  name: string;
}

function getRecentPosts(posts: Post[], limit: number = 5): Post[] {
  return [...posts]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, limit);
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

export default function GalleryPage() {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedPostType, setSelectedPostType] = useState("all");

  // Infinite scroll: number of posts visible grows as user scrolls
  const BATCH_SIZE = 20;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // viewer state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerSection, setViewerSection] = useState<"all" | "recent">("all");
  const [viewerIndex, setViewerIndex] = useState(0);
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

  const [regions, setRegions] = useState<RegionAPI[]>([]);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [errorRegions, setErrorRegions] = useState<string | null>(null);

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

  useEffect(() => {
    setLoading(true);
    fetchGalleryPosts()
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message || "Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    return filterPosts(posts, selectedRegion, selectedPostType);
  }, [posts, selectedRegion, selectedPostType]);

  useEffect(() => {
    if (viewerOpen) {
      setViewerOpen(false);
    }
  }, [filteredPosts]);

  const recentPosts = useMemo(() => getRecentPosts(posts, 5), [posts]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [selectedRegion, selectedPostType]);

  // The posts currently shown
  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  // Infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredPosts.length));
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, filteredPosts.length]);

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
  };

  const handlePostTypeChange = (postType: string) => {
    setSelectedPostType(postType);
  };

  return (
    <div className="min-h-screen bg-alabaster mt-16">
      {/* Header */}
      <header className="bg-[#FFFFF0] border-b border-[#AE8F05]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-serif font-extrabold text-warm-slate text-center mb-2">
            {t("gallery.heroTitle") || "Gallery"}
          </h1>
          <p className="text-center text-[#5C5854]">
            {t("gallery.heroSubtitle") || "Browse photos and media from our ministry"}
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
            {/* Circular Pill Filters at the top */}
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

            {/* All Posts Grid — 4-5 columns, compact cards */}
            <section>
              {filteredPosts.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-sacred-gold" />
                  <h2 className="text-xl font-serif font-bold text-warm-slate">
                    {t("gallery.allPosts") || "All Posts"}
                  </h2>
                  <span className="text-sm text-[#5C5854]">
                    ({filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? t("gallery.post") || "post" : t("gallery.posts") || "posts"})
                  </span>
                </div>
              )}

              {displayedPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {displayedPosts.map((post, idx) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onClick={() => openViewer("all", idx)}
                      />
                    ))}
                  </div>

                  {/* Infinite Scroll Sentinel */}
                  {hasMore && (
                    <div ref={sentinelRef} className="flex justify-center py-8">
                      <div className="w-8 h-8 border-3 border-[#AE8F05]/40 border-t-[#AE8F05] rounded-full animate-spin" />
                    </div>
                  )}

                  {!hasMore && filteredPosts.length > BATCH_SIZE && (
                    <p className="text-center text-sm text-[#5C5854] py-6">
                      Showing all {filteredPosts.length} posts
                    </p>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-[#FFFFF0] rounded-xl border border-[#AE8F05]/20">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-[#F7E7CE] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-sacred-gold" />
                    </div>
                    <h3 className="text-xl font-serif text-warm-slate mb-2">
                      {t("gallery.noPosts") || "No posts found"}
                    </h3>
                    <p className="text-[#5C5854] mb-6">
                      {t("gallery.noPostsDesc") || "Try adjusting your filters."}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedRegion("all");
                        setSelectedPostType("all");
                      }}
                      className="px-6 py-2 bg-[#AE8F05] text-[#FFFFF0] rounded-full font-semibold hover:bg-[#7E6503] transition-colors"
                    >
                      {t("gallery.clearFilters") || "Clear Filters"}
                    </button>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Gallery Viewer Modal */}
      {viewerOpen && (
        <GalleryViewer
          allPosts={viewerAllPosts}
          recentPosts={viewerRecentPosts}
          initialSection={viewerSection}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
}
