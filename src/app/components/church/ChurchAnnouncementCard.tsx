import React from "react";
import {
  ExternalLink,
  Calendar,
  Play,
  Video,
  Share2,
  AlertCircle,
} from "lucide-react";
import type { AnnouncementAPI } from "../../types/church.type";

interface ChurchAnnouncementCardProps {
  announcement: AnnouncementAPI;
}

export function ChurchAnnouncementCard({
  announcement,
}: ChurchAnnouncementCardProps) {
  const content = announcement.content || "";

  // Safe date parsing
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

  // Detect and extract URLs
  const urlMatch = content.match(/https?:\/\/[^\s]+(?:\b|[cite:\s0-9]+)?/);
  let rawUrl: string | null = null;
  if (urlMatch) {
    rawUrl = urlMatch[0].replace(/\[cite:[^\]]*\]/g, "").trim();
  }

  // Extract YouTube ID if present
  const getYouTubeId = (url: string | null): string | null => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const isFacebook = rawUrl
    ? /facebook\.com|fb\.watch|fb\.me/i.test(rawUrl)
    : false;
  const youTubeId = getYouTubeId(rawUrl);

  // Clean text by removing raw URL to display text gracefully
  const cleanContent = rawUrl
    ? content
        .replace(urlMatch![0], "")
        .replace(/ተጨማሪ መረጃ ለማግኘት ቪዲዮውን ይመልከቱ:\s*/i, "")
        .replace(/Watch video for more info:\s*/i, "")
        .replace(/\[cite:\s*\d+\]/g, "")
        .trim()
    : content.replace(/\[cite:\s*\d+\]/g, "").trim();

  const formattedDate = formatSafeDate(announcement.date);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-[#e5dfd0] dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden p-6">
      {/* Top Header: Date & Priority */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        {formattedDate ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ae8f05]/15 text-[#80650a] dark:text-[#f0d082] text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#ae8f05]" />
            {formattedDate}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ae8f05]/10 text-[#80650a] dark:text-[#f0d082] text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-[#ae8f05]" />
            Church Announcement
          </span>
        )}

        {announcement.priority && announcement.priority !== "normal" && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            {announcement.priority}
          </span>
        )}
      </div>

      {/* Announcement Title */}
      <h3 className="text-xl font-bold font-serif text-[#1a3c34] dark:text-white leading-snug mb-3">
        {announcement.title || "Special Church Announcement"}
      </h3>

      {/* Clean Text Content */}
      {cleanContent && (
        <p className="text-sm sm:text-base text-[#4a4744] dark:text-gray-300 leading-relaxed whitespace-pre-line mb-4">
          {cleanContent}
        </p>
      )}

      {/* Media Embedding / Preview */}
      {youTubeId && (
        <div className="my-4 rounded-xl overflow-hidden shadow-md border border-stone-200 dark:border-gray-700 bg-black aspect-video max-w-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${youTubeId}`}
            title={announcement.title || "Church Announcement Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      )}

      {/* Facebook Link Preview Card */}
      {isFacebook && rawUrl && (
        <div className="my-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-lg">
              f
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">
                Facebook Post / Video
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                {rawUrl}
              </p>
            </div>
          </div>
          <a
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold shrink-0 shadow-sm transition-colors"
          >
            <span>View on Facebook</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Action Button for Links (YouTube or other external link) */}
      {rawUrl && !isFacebook && (
        <div className="mt-4 pt-4 border-t border-[#f0ebe0] dark:border-gray-700 flex items-center justify-between">
          <a
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all ${
              youTubeId
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-[#1a3c34] hover:bg-[#122822] text-white"
            }`}
          >
            {youTubeId ? (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Watch on YouTube</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                <span>Open Link / Watch Media</span>
              </>
            )}
          </a>
        </div>
      )}
    </div>
  );
}
