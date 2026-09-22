import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  MapPin,
  Sparkles,
} from "lucide-react";

export interface RegionalAnnouncement {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  churchId: string;
  churchName: string;
  regionId: string;
}

interface RegionalAnnouncementsProps {
  announcements: RegionalAnnouncement[];
  regionName: string;
}

export function RegionalAnnouncements({
  announcements,
  regionName,
}: RegionalAnnouncementsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState<RegionalAnnouncement | null>(null);

  // Safe date formatter (never returns "Invalid Date")
  const formatSafeDate = (dateStr?: string) => {
    if (!dateStr || !dateStr.trim()) return null;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Keyboard close for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModalItem(null);
    };
    if (activeModalItem) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalItem]);

  // Smooth continuous automatic sliding/scrolling to the left
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || announcements.length <= 1) return;

    let animationFrameId: number;
    const speed = 0.8; // Smooth reading pace

    const step = () => {
      if (!isHovered && container) {
        container.scrollLeft += speed;
        // If reached halfway of duplicated list, loop smoothly back to start
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, announcements.length]);

  const handleManualScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const offset = direction === "left" ? -340 : 340;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  if (announcements.length === 0) return null;

  // Duplicate the announcements array to create a continuous infinite loop
  const displayItems =
    announcements.length > 1
      ? [...announcements, ...announcements]
      : announcements;

  return (
    <section className="mb-12">
      {/* Header with Title and Total Updates Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#ae8f05]/15 text-[#ae8f05] flex items-center justify-center shadow-sm shrink-0">
            <Bell className="w-5 h-5 animate-bounce-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#1a3c34] dark:text-[#f0d082]">
                Regional Announcements & Events
              </h2>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#ae8f05] text-white shadow-sm font-sans">
                Total: {announcements.length} Updates
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5c5854] dark:text-gray-400 mt-0.5">
              Upcoming events and announcements from churches across this network.
            </p>
          </div>
        </div>

        {/* Manual navigation chevrons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => handleManualScroll("left")}
            aria-label="Scroll left"
            className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-[#e5dfd0] dark:border-gray-700 text-[#1a3c34] dark:text-white hover:bg-[#ae8f05] hover:text-white hover:border-[#ae8f05] transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleManualScroll("right")}
            aria-label="Scroll right"
            className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-[#e5dfd0] dark:border-gray-700 text-[#1a3c34] dark:text-white hover:bg-[#ae8f05] hover:text-white hover:border-[#ae8f05] transition-all shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Automatic Smooth Sliding Carousel Track */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide select-none"
        style={{ scrollBehavior: "auto" }}
      >
        {displayItems.map((item, index) => {
          const formattedDate = formatSafeDate(item.date);

          return (
            <article
              key={`${item.id}-${index}`}
              className="w-72 sm:w-80 shrink-0 bg-white dark:bg-gray-800 rounded-2xl border border-[#e5dfd0] dark:border-gray-700 shadow-md hover:shadow-2xl hover:border-[#ae8f05] hover:ring-2 hover:ring-[#ae8f05]/30 transition-all duration-300 flex flex-col group p-4"
            >
              {/* Clean Standalone Portrait Image Container - NO duplicate background layers or overlapping effects */}
              <div
                onClick={() => item.image && setActiveModalItem(item)}
                className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-stone-50 dark:bg-gray-900 border border-[#e5dfd0]/80 dark:border-gray-700 shadow-sm flex items-center justify-center cursor-pointer"
                title="Click to view full photo"
              >
                {item.image ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 hover:bg-black text-white text-[11px] font-semibold backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-opacity shadow-sm">
                      <Maximize2 className="w-3 h-3 text-[#f0d082]" />
                      <span>Full Photo</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 text-stone-400">
                    <Sparkles className="w-10 h-10 mx-auto mb-2 text-[#ae8f05]/60" />
                    <span className="text-xs font-medium">Church Event</span>
                  </div>
                )}
              </div>

              {/* Announcement Details */}
              <div className="mt-4 flex flex-col flex-1 justify-between">
                <div>
                  {/* Church Name Tag */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1a3c34] text-[#f0d082] text-[11px] font-bold truncate max-w-full">
                      <MapPin className="w-3 h-3 text-[#ae8f05] shrink-0" />
                      <span className="truncate">{item.churchName}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setActiveModalItem(item)}
                    className="font-serif font-bold text-base text-[#1a3c34] dark:text-white line-clamp-1 group-hover:text-[#ae8f05] transition-colors cursor-pointer"
                    title={item.title}
                  >
                    {item.title}
                  </h3>

                  {/* Date & Time */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-xs text-[#5c5854] dark:text-gray-400">
                    {formattedDate ? (
                      <span className="inline-flex items-center gap-1 text-[#80650a] dark:text-[#f0d082] font-semibold">
                        <Calendar className="w-3 h-3 text-[#ae8f05]" />
                        {formattedDate}
                      </span>
                    ) : (
                      <span className="text-[#80650a] font-semibold">Special Program</span>
                    )}

                    {item.time && item.time.trim() && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#1a3c34] dark:text-[#ae8f05]" />
                        {item.time} local time
                      </span>
                    )}
                  </div>

                  {/* Brief description */}
                  {item.description && (
                    <p className="text-xs text-[#5c5854] dark:text-gray-400 line-clamp-2 mt-2 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Footer action */}
                <div className="mt-4 pt-3 border-t border-[#f0ebe0] dark:border-gray-700 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    className="font-semibold text-[#1a3c34] dark:text-[#f0d082] hover:text-[#ae8f05] transition-colors"
                  >
                    View details
                  </button>

                  <Link
                    to={`/services/${item.churchId}#events`}
                    className="font-semibold text-[#ae8f05] hover:text-[#1a3c34] dark:hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Church page</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lightbox Modal for Full Portrait Photo & Details */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              aria-label="Close modal"
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all backdrop-blur-sm shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Standalone Full Photo View */}
            <div className="w-full md:w-3/5 bg-stone-950 flex items-center justify-center p-4 relative min-h-[300px] md:min-h-[500px]">
              {activeModalItem.image ? (
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-xl"
                />
              ) : (
                <div className="text-center p-8 text-white/60">
                  <Sparkles className="w-12 h-12 mx-auto mb-2 text-[#ae8f05]" />
                  <p className="text-sm">No photo available</p>
                </div>
              )}
            </div>

            {/* Details Panel */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh] bg-[#faf9f5] dark:bg-gray-900">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a3c34] text-[#f0d082] text-xs font-bold mb-3 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#ae8f05]" />
                  {activeModalItem.churchName}
                </span>

                <h3 className="text-2xl font-bold font-serif text-[#1a3c34] dark:text-white leading-snug">
                  {activeModalItem.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  {formatSafeDate(activeModalItem.date) ? (
                    <span className="px-2.5 py-1 rounded-full bg-[#ae8f05]/15 text-[#80650a] dark:text-[#f0d082]">
                      {formatSafeDate(activeModalItem.date)}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-[#ae8f05]/15 text-[#80650a] dark:text-[#f0d082]">
                      Special Program
                    </span>
                  )}

                  {activeModalItem.time && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200">
                      {activeModalItem.time} local time
                    </span>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-[#e5dfd0] dark:border-gray-700">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#80650a] mb-2">
                    Program Details
                  </h4>
                  <p className="text-sm text-[#444] dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {activeModalItem.description || "Join us for this special service."}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e5dfd0] dark:border-gray-700 space-y-2">
                {activeModalItem.image && (
                  <a
                    href={activeModalItem.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-[#e5dfd0] dark:border-gray-700 text-[#1a3c34] dark:text-gray-200 text-xs font-semibold hover:bg-stone-50 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#ae8f05]" />
                    <span>Open High-Res Photo in New Tab</span>
                  </a>
                )}

                <Link
                  to={`/services/${activeModalItem.churchId}#events`}
                  onClick={() => setActiveModalItem(null)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a3c34] hover:bg-[#132d27] text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <span>Go to {activeModalItem.churchName}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
