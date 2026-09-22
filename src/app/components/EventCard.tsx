import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  Maximize2,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import type { EventAPI } from "../types/church.type";

interface EventCardProps {
  event: EventAPI | any;
}

export function EventCard({ event }: EventCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Keyboard close for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(null as any);
    };
    if (modalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modalOpen]);

  // Extract a fallback title if event.title is empty
  const getDisplayTitle = () => {
    if (event.title && event.title.trim()) return event.title.trim();
    if (event.description) {
      const firstLine = event.description.split("\n")[0];
      const cleaned = firstLine.replace(/^Title:\s*/i, "").trim();
      if (cleaned.length > 0) return cleaned;
    }
    return "Church Program & Gathering";
  };

  // Safe date formatting that never outputs "Invalid Date"
  const formatSafeDate = (dateStr?: string) => {
    if (!dateStr || !dateStr.trim()) return null;
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return null;
    return parsed.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const title = getDisplayTitle();
  const formattedDate = formatSafeDate(event.date);
  const hasTime = Boolean(event.time && event.time.trim());
  const hasImage = Boolean(event.image && event.image.trim());

  // Extract URL (YouTube or external)
  const extractUrl = (text?: string) => {
    if (!text) return null;
    const match = text.match(/https?:\/\/[^\s]+/);
    return match ? match[0] : null;
  };

  const externalUrl = extractUrl(event.description);

  return (
    <>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-[#e5dfd0] dark:border-gray-700 overflow-hidden flex flex-col group transition-all duration-300"
      >
        {/* Full Flyer Photo Container */}
        <div
          onClick={() => hasImage && setModalOpen(true)}
          className={`relative w-full h-72 sm:h-80 bg-[#16211d] overflow-hidden flex items-center justify-center ${
            hasImage ? "cursor-pointer" : ""
          }`}
          title="Click to view full photo"
        >
          {hasImage ? (
            <>
              {/* Blurred atmospheric glow */}
              <img
                src={event.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
              />
              {/* Full uncropped photo */}
              <img
                src={event.image}
                alt={title}
                className="relative z-10 w-full h-full max-h-80 object-contain p-2.5 drop-shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/70 hover:bg-black/90 text-white text-xs font-semibold rounded-lg backdrop-blur-md shadow-sm">
                <Maximize2 className="w-3.5 h-3.5 text-[#e5dfd0]" />
                <span>Full Poster</span>
              </div>
            </>
          ) : (
            <div className="text-center p-8 text-white/60">
              <Sparkles className="w-12 h-12 mx-auto mb-2 text-[#ae8f05]" />
              <p className="text-sm font-medium">Regular Church Event</p>
            </div>
          )}
        </div>

        {/* Event Content & Details */}
        <div className="p-6 flex flex-col flex-1">
          {/* Badges: Date & Time */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {formattedDate ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ae8f05]/15 text-[#80650a] dark:text-[#f0d082] text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#ae8f05]" />
                {formattedDate}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ae8f05]/15 text-[#80650a] dark:text-[#f0d082] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#ae8f05]" />
                Upcoming Program
              </span>
            )}

            {hasTime && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1a3c34]/10 dark:bg-gray-700 text-[#1a3c34] dark:text-gray-200 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#1a3c34] dark:text-[#ae8f05]" />
                {event.time} local time
              </span>
            )}
          </div>

          {/* Event Title */}
          <h3
            onClick={() => hasImage && setModalOpen(true)}
            className="text-xl font-bold font-serif text-[#1a3c34] dark:text-white mb-2.5 line-clamp-2 leading-snug group-hover:text-[#ae8f05] cursor-pointer transition-colors"
          >
            {title}
          </h3>

          {/* Full Event Details & Description */}
          {event.description ? (
            <p className="text-sm text-[#5c5854] dark:text-gray-300 leading-relaxed whitespace-pre-line line-clamp-4 mb-4">
              {event.description}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic mb-4">
              Join us for fellowship, teaching, and worship. Everyone is warmly welcome.
            </p>
          )}

          {/* Card Action Footer */}
          <div className="mt-auto pt-4 border-t border-[#f0ebe0] dark:border-gray-700 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-[#1a3c34] dark:text-[#f0d082] font-semibold hover:text-[#ae8f05] transition-colors"
            >
              View full details
            </button>

            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#ae8f05] font-semibold hover:underline"
              >
                <span>Watch video</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </motion.article>

      {/* Lightbox Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-3/5 bg-stone-950 flex items-center justify-center p-3 relative min-h-[280px] md:min-h-[480px]">
              {hasImage ? (
                <>
                  <img
                    src={event.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
                  />
                  <img
                    src={event.image}
                    alt={title}
                    className="relative z-10 max-h-[75vh] max-w-full object-contain rounded-lg shadow-xl"
                  />
                </>
              ) : (
                <div className="text-center text-white/60 p-8">
                  <Sparkles className="w-16 h-16 mx-auto mb-2 text-[#ae8f05]" />
                  <p className="text-sm">Church Event</p>
                </div>
              )}
            </div>

            {/* Modal Details */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh] bg-[#faf9f5] dark:bg-gray-900">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formattedDate && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ae8f05]/15 text-[#80650a] dark:text-[#f0d082] text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#ae8f05]" />
                      {formattedDate}
                    </span>
                  )}
                  {hasTime && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a3c34]/15 text-[#1a3c34] dark:text-gray-200 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#1a3c34] dark:text-[#ae8f05]" />
                      {event.time} local time
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold font-serif text-[#1a3c34] dark:text-white leading-snug">
                  {title}
                </h3>

                <div className="mt-5 pt-4 border-t border-[#e5dfd0] dark:border-gray-700">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#80650a] mb-2">
                    Event Details
                  </h4>
                  <p className="text-sm text-[#444] dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {event.description || "No additional description provided."}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e5dfd0] dark:border-gray-700 space-y-2">
                {externalUrl && (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <span>Watch Video on Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {hasImage && (
                  <a
                    href={event.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-[#e5dfd0] dark:border-gray-700 text-[#1a3c34] dark:text-gray-200 text-xs font-semibold hover:bg-stone-50 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#ae8f05]" />
                    <span>Open High-Res Photo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default EventCard;
