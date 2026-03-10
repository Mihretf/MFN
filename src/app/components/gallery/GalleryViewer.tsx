import React, { useEffect } from "react";
import { Post } from "../../types/gallery.type";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryViewerProps {
  allPosts: Post[]; // full set for "All" tab
  recentPosts: Post[]; // subset for "Recent" tab
  initialSection?: "all" | "recent";
  initialIndex: number; // starting index within active section
  onClose: () => void;
}

export function GalleryViewer({
  allPosts,
  recentPosts,
  initialSection = "all",
  initialIndex,
  onClose,
}: Readonly<GalleryViewerProps>) {
  const [section, setSection] = React.useState<"all" | "recent">(
    initialSection,
  );
  const [index, setIndex] = React.useState(initialIndex);

  const posts = section === "recent" ? recentPosts : allPosts;
  const current = posts[index];

  const goto = (i: number) => {
    const len = posts.length;
    setIndex((i + len) % len);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") goto(index + 1);
    else if (e.key === "ArrowLeft") goto(index - 1);
    else if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  if (!current) return null;

  const handleOverlayKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onClose();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-lg z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(12px)" }}
      onClick={onClose}
      onKeyDown={handleOverlayKey}
    >
      <div
        role="dialog"
        tabIndex={0}
        className="relative max-w-4xl max-h-full w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-black/40"
          aria-label="Close gallery"
        >
          <X className="w-6 h-6" />
        </button>

        {/* section switcher (hidden on mobile) */}
        <div className="absolute top-4 left-4 hidden sm:flex space-x-2">
          <button
            onClick={() => {
              setSection("all");
              setIndex(0);
            }}
            className={`px-3 py-1 rounded ${
              section === "all"
                ? "bg-white text-black"
                : "bg-white/30 text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setSection("recent");
              setIndex(0);
            }}
            className={`px-3 py-1 rounded ${
              section === "recent"
                ? "bg-white text-black"
                : "bg-white/30 text-white"
            }`}
          >
            Recent
          </button>
        </div>

        <img
          src={current.media_url}
          alt={current.title}
          className="w-full h-auto max-h-[80vh] object-contain"
        />
        {/* navigation */}
        {posts.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goto(index - 1);
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-black/40"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goto(index + 1);
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-black/40"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
