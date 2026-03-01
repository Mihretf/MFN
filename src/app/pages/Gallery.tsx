import { useState, useMemo } from "react";
import { Sparkles, TrendingUp, Shuffle } from "lucide-react";
import { Post } from "../types/gallery.type";
import { FilterSection } from "../components/gallery/FilterSection";
import { Pagination } from "../components/gallery/Pagination";
import { mockPosts } from "../data/gallert.mockData";
import { PostCard } from "../components/gallery/PostCard";

const regions = [
  { id: "550e8400-e29b-41d4-a716-446655440011", name: "Addis Ababa Region" },
  { id: "550e8400-e29b-41d4-a716-446655440012", name: "Oromia Region" },
  { id: "550e8400-e29b-41d4-a716-446655440013", name: "Amhara Region" },
  { id: "550e8400-e29b-41d4-a716-446655440014", name: "Tigray Region" },
];

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
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedPostType, setSelectedPostType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Get filtered posts
  const filteredPosts = useMemo(() => {
    return filterPosts(mockPosts, selectedRegion, selectedPostType);
  }, [selectedRegion, selectedPostType]);

  // Get recent posts
  const recentPosts = useMemo(() => getRecentPosts(mockPosts, 3), []);

  // Get random posts
  const randomPosts = useMemo(() => getRandomPosts(mockPosts, 3), []);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 mt-16">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl text-gray-900 text-center mb-2">
            Church Posts & Gallery
          </h1>
          <p className="text-center text-gray-600">
            Stay connected with what's happening in our community
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recent Posts Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl text-gray-900">Recent Posts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Random Posts Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Shuffle className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl text-gray-900">Discover More</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Filters */}
        <FilterSection
          selectedRegion={selectedRegion}
          selectedPostType={selectedPostType}
          regions={regions}
          onRegionChange={handleRegionChange}
          onPostTypeChange={handlePostTypeChange}
        />

        {/* All Posts Grid */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl text-gray-900">All Posts</h2>
            <span className="text-sm text-gray-500">
              ({filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "post" : "posts"})
            </span>
          </div>

          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
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
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">No Posts Found</h3>
                <p className="text-gray-600 mb-6">
                  No posts match your current filters. Try adjusting your
                  selection.
                </p>
                <button
                  onClick={() => {
                    setSelectedRegion("all");
                    setSelectedPostType("all");
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2026 Church Posts Gallery. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
