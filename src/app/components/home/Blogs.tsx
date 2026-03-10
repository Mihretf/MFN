import React from "react";
import { blogService } from "../../services/app.service";
import type { BlogPost } from "../../types/blog.type";

export default function Highlights() {
  const [items, setItems] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    blogService
      .getBlogs({ include_expired: false })
      .then((res) => {
        if (res?.blogs) {
          setItems(res.blogs);
        } else {
          setError("Unexpected response format");
        }
      })
      .catch((err) => {
        console.error("Failed to load highlights", err);
        setError(err.message || "Could not load content");
      })
      .finally(() => setLoading(false));
  }, []);

  const sortedItems = React.useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [items],
  );

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goNext = () =>
    setCurrentIndex((i) =>
      sortedItems.length ? (i + 1) % sortedItems.length : 0,
    );
  const goPrev = () =>
    setCurrentIndex((i) =>
      sortedItems.length
        ? (i - 1 + sortedItems.length) % sortedItems.length
        : 0,
    );

  // reset when items list changes
  React.useEffect(() => {
    if (currentIndex >= sortedItems.length) {
      setCurrentIndex(0);
    }
  }, [sortedItems, currentIndex]);

  // auto rotation
  React.useEffect(() => {
    if (sortedItems.length === 0) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [sortedItems]);

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading updates…</p>
        </div>
      </section>
    );
  }

  if (error || sortedItems.length === 0) {
    return null; // silent fail — or show minimal message if preferred
  }

  const current = sortedItems[currentIndex];

  const hasText = current.text && current.text.trim().length > 0;
  const hasImage =
    current.image_url != null && current.image_url.trim().length > 0;
  const hasVideo =
    current.video_url != null && current.video_url.trim().length > 0;

  // You can extend this logic later (e.g. from post.category or tags)
  const getLabel = (post: BlogPost) => {
    const text = post.text?.toLowerCase() || "";
    if (text.includes("quote") || text.includes("”") || text.includes("“"))
      return "Quote";
    if (text.includes("offer") || text.includes("discount")) return "Offer";
    if (new Date(post.created_at) > new Date(Date.now() - 1000 * 60 * 60 * 72))
      return "New"; // last 3 days
    return "Update";
  };

  return (
    <section className="py-16 md:py-20 bg-gray-50/70">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Highlights & Updates
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Latest announcements, quotes, offers and community moments
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Previous button */}
          <button
            onClick={goPrev}
            className="absolute left-0 sm:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all"
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Card */}
          <div
            className={`
              w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl 
              mx-6 sm:mx-12 md:mx-16 
              bg-white rounded-2xl shadow-xl overflow-hidden
              transition-all duration-300
              flex flex-col
            `}
          >
            {(hasImage || hasVideo) && (
              <div className="w-full max-h-[60vh] overflow-hidden">
                {hasImage && current.image_url && (
                  <img
                    src={current.image_url || ""}
                    alt=""
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                )}
                {hasVideo && current.video_url && (
                  <video
                    controls
                    className="w-full h-auto object-contain"
                    poster={current.image_url || undefined}
                  >
                    <source src={current.video_url} />
                    <track kind="captions" srcLang="en" />
                    {/* captions could be added here if available */}
                  </video>
                )}
              </div>
            )}

            {hasText && (
              <div className="p-5 sm:p-7 md:p-9 space-y-4">
                {/* Optional label pill */}
                <div className="flex justify-center">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-indigo-100 text-indigo-800">
                    {getLabel(current)}
                  </span>
                </div>

                <p
                  className={`
                    text-center leading-relaxed
                    ${hasImage || hasVideo ? "text-base sm:text-lg" : "text-lg sm:text-xl md:text-2xl font-medium"}
                    text-gray-800 whitespace-pre-line
                  `}
                >
                  {current.text}
                </p>

                {/* Optional author/date line (not currently available in type) */}
                {/* <p className="text-center text-sm text-gray-500 mt-4">
                  — {current.author}
                </p> */}
              </div>
            )}

            {/* Fallback when no content at all */}
            {!hasText && !hasImage && !hasVideo && (
              <div className="p-12 text-center text-gray-400 italic">
                (No content available)
              </div>
            )}
          </div>

          {/* Next button */}
          <button
            onClick={goNext}
            className="absolute right-0 sm:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all"
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Optional dots indicator */}
        {sortedItems.length > 1 && (
          <div className="flex justify-center gap-2.5 mt-8">
            {sortedItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`
                  w-2.5 h-2.5 rounded-full transition-all
                  ${idx === currentIndex ? "bg-indigo-600 w-6" : "bg-gray-300 hover:bg-gray-400"}
                `}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
