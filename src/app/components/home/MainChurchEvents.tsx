import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Maximize2,
  X,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { churchService } from "../../services/app.service";
import type { EventAPI } from "../../types/church.type";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";

interface EnhancedEvent extends EventAPI {
  churchId?: string;
  churchName?: string;
}

export default function MainChurchEvents() {
  const [events, setEvents] = useState<EnhancedEvent[]>([]);
  const [churchId, setChurchId] = useState<string | null>(null);
  const [churchName, setChurchName] = useState<string>("Addis Ababa Jerusalem Main Church");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeModalEvent, setActiveModalEvent] = useState<EnhancedEvent | null>(null);

  useEffect(() => {
    let isMounted = true;
    churchService
      .getChurches({}, "")
      .then(async (response: any) => {
        if (!isMounted) return;
        const churches = Array.isArray(response)
          ? response
          : response?.churches || response?.data || [];

        // Look for Jerusalem / Eyursalem Main Church
        const jerusalem = churches.find((church: any) =>
          /jerusalem|eyursalem|main/i.test(String(church?.name || ""))
        ) || churches[0];

        if (!jerusalem?.id) {
          setLoading(false);
          return;
        }

        setChurchId(String(jerusalem.id));
        if (jerusalem.name) {
          setChurchName(jerusalem.name);
        }

        try {
          const detailResponse = await churchService.getChurch(String(jerusalem.id));
          const church = detailResponse?.church || detailResponse || jerusalem;
          let list: EnhancedEvent[] = Array.isArray(church?.events)
            ? church.events.map((e: EventAPI) => ({
                ...e,
                churchId: String(jerusalem.id),
                churchName: jerusalem.name || "Jerusalem Main Church",
              }))
            : [];

          // If Jerusalem has no events or few events, supplement with other churches' events
          if (list.length === 0) {
            const otherEvents: EnhancedEvent[] = churches.flatMap((c: any) =>
              Array.isArray(c?.events)
                ? c.events.map((e: EventAPI) => ({
                    ...e,
                    churchId: String(c.id),
                    churchName: c.name,
                  }))
                : []
            );
            list = otherEvents;
          }

          // Filter out events with no title and no image if completely empty
          const validEvents = list.filter(
            (e) => (e.title && e.title.trim()) || (e.image && e.image.trim())
          );

          if (isMounted) {
            setEvents(validEvents.length > 0 ? validEvents : list);
          }
        } catch (detailErr) {
          console.warn("Could not fetch detailed church events, using list data:", detailErr);
          if (Array.isArray(jerusalem?.events) && isMounted) {
            setEvents(
              jerusalem.events.map((e: EventAPI) => ({
                ...e,
                churchId: String(jerusalem.id),
                churchName: jerusalem.name,
              }))
            );
          }
        }
      })
      .catch((requestError) => {
        console.error("Failed to load church events", requestError);
        if (isMounted) {
          setError("Could not load the latest church events.");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalEvent(null);
      }
    };
    if (activeModalEvent) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalEvent]);

  // Safe date formatter that NEVER returns "Invalid Date"
  const formatEventDate = (dateStr?: string) => {
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

  // Helper to extract URLs (like YouTube) from description
  const extractUrl = (text?: string) => {
    if (!text) return null;
    const match = text.match(/https?:\/\/[^\s]+/);
    return match ? match[0] : null;
  };

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-[#f8f7f2] border-y border-[#e5dfd0]">
        <LoadingState message="Loading upcoming events and programs..." />
      </section>
    );
  }

  if (error && events.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-[#f8f7f2] border-y border-[#e5dfd0]">
        <div className="max-w-4xl mx-auto px-5">
          <ErrorState title="Events unavailable" message={error} />
        </div>
      </section>
    );
  }

  if (events.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-[#f8f7f2] border-y border-[#e5dfd0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-[#ae8f05] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em]">
              <Sparkles className="w-4 h-4 text-[#ae8f05]" />
              {churchName}
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold font-serif text-[#1a3c34]">
              Upcoming Events & Programs
            </h2>
            <p className="mt-2 text-[#5c5854] max-w-2xl text-sm sm:text-base">
              Explore our latest gatherings, fasting prayers, special anointings, and spiritual programs.
            </p>
          </div>
          <Link
            to={churchId ? `/services/${churchId}#events` : "/services"}
            className="inline-flex items-center gap-2 text-[#ae8f05] hover:text-[#1a3c34] font-semibold text-sm group transition-colors self-start sm:self-auto"
          >
            <span>View all church programs</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((event) => {
            const formattedDate = formatEventDate(event.date);
            const externalUrl = extractUrl(event.description);
            const hasImage = Boolean(event.image && event.image.trim());

            return (
              <article
                key={event.id || event.title}
                className="bg-white border border-[#e5dfd0] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Event Portrait Photo Container - Clean standalone photo without duplicated background layers */}
                <div
                  onClick={() => setActiveModalEvent(event)}
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-stone-50 dark:bg-gray-900 border border-[#e5dfd0]/80 shadow-md flex items-center justify-center cursor-pointer group-hover:shadow-2xl group-hover:border-[#ae8f05] group-hover:ring-2 group-hover:ring-[#ae8f05]/30 transition-all duration-300"
                  title="Click to view full photo"
                >
                  {hasImage ? (
                    <>
                      {/* Standalone clean uncropped photo */}
                      <img
                        src={event.image}
                        alt={event.title || "Event Flyer"}
                        className="w-full h-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* "Full Photo" badge / button */}
                      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-black/75 hover:bg-black text-white text-[11px] font-semibold rounded-lg backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-opacity shadow-sm">
                        <Maximize2 className="w-3 h-3 text-[#f0d082]" />
                        <span>Full Photo</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-stone-300">
                      <Sparkles className="w-12 h-12 mb-3 text-[#ae8f05]/70" />
                      <span className="text-sm font-medium">Mission for Nation Event</span>
                    </div>
                  )}
                </div>

                {/* Event Details Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Date & Time Badges (Guaranteed No "Invalid Date") */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {formattedDate ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ae8f05]/10 text-[#80650a] text-xs font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#ae8f05]" />
                        {formattedDate}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ae8f05]/10 text-[#80650a] text-xs font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-[#ae8f05]" />
                        Special Program
                      </span>
                    )}

                    {event.time && event.time.trim() && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1a3c34]/10 text-[#1a3c34] text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#1a3c34]" />
                        {event.time} local time
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setActiveModalEvent(event)}
                    className="text-lg font-bold font-serif text-[#1a3c34] line-clamp-2 hover:text-[#ae8f05] cursor-pointer transition-colors leading-snug"
                  >
                    {event.title || "Church Program"}
                  </h3>

                  {/* Detail / Description */}
                  {event.description && event.description.trim() && (
                    <p className="mt-2.5 text-sm text-[#5c5854] line-clamp-3 leading-relaxed whitespace-pre-line">
                      {event.description}
                    </p>
                  )}

                  {/* Card Actions Footer */}
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#f0ebe0] text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveModalEvent(event)}
                      className="text-[#1a3c34] font-semibold hover:text-[#ae8f05] transition-colors"
                    >
                      View details
                    </button>

                    {externalUrl ? (
                      <a
                        href={externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#ae8f05] font-semibold hover:underline"
                      >
                        Watch Video
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        to={event.churchId ? `/services/${event.churchId}#events` : "/services"}
                        className="inline-flex items-center gap-1 text-[#80650a] font-semibold hover:text-[#1a3c34]"
                      >
                        <MapPin className="w-3 h-3" />
                        Church info
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Full Photo & Event Detail Modal */}
      {activeModalEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setActiveModalEvent(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalEvent(null)}
              aria-label="Close modal"
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all backdrop-blur-sm shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Display (Clean Standalone Photo) */}
            <div className="w-full md:w-3/5 bg-stone-950 flex items-center justify-center p-4 relative min-h-[300px] md:min-h-[500px]">
              {activeModalEvent.image ? (
                <img
                  src={activeModalEvent.image}
                  alt={activeModalEvent.title || "Full Event Photo"}
                  className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-xl"
                />
              ) : (
                <div className="text-center text-white/60 p-8">
                  <Sparkles className="w-16 h-16 mx-auto mb-3 text-[#ae8f05]" />
                  <p className="text-sm">No photo available for this event</p>
                </div>
              )}
            </div>

            {/* Modal Event Details Drawer */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh] bg-[#faf9f5]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {formatEventDate(activeModalEvent.date) ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ae8f05]/15 text-[#80650a] text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#ae8f05]" />
                      {formatEventDate(activeModalEvent.date)}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ae8f05]/15 text-[#80650a] text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#ae8f05]" />
                      Special Program
                    </span>
                  )}

                  {activeModalEvent.time && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a3c34]/15 text-[#1a3c34] text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#1a3c34]" />
                      {activeModalEvent.time} local time
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold font-serif text-[#1a3c34] leading-snug">
                  {activeModalEvent.title || "Special Church Event"}
                </h3>

                {activeModalEvent.churchName && (
                  <div className="mt-2 text-xs font-semibold text-[#ae8f05] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeModalEvent.churchName}</span>
                  </div>
                )}

                <div className="mt-5 border-t border-[#e5dfd0] pt-4">
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-[#80650a] mb-2">
                    Program Details & Description
                  </h4>
                  {activeModalEvent.description ? (
                    <p className="text-sm text-[#444] whitespace-pre-line leading-relaxed">
                      {activeModalEvent.description}
                    </p>
                  ) : (
                    <p className="text-sm text-[#888] italic">No extra description provided.</p>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#e5dfd0] flex flex-col gap-2.5">
                {extractUrl(activeModalEvent.description) && (
                  <a
                    href={extractUrl(activeModalEvent.description)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-sm transition-all"
                  >
                    <span>Watch Related Video</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {activeModalEvent.image && (
                  <a
                    href={activeModalEvent.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-100 border border-[#e5dfd0] text-[#1a3c34] text-xs font-semibold transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#ae8f05]" />
                    <span>Open High-Res Photo in New Tab</span>
                  </a>
                )}

                <Link
                  to={activeModalEvent.churchId ? `/services/${activeModalEvent.churchId}#events` : "/services"}
                  onClick={() => setActiveModalEvent(null)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a3c34] hover:bg-[#122822] text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <span>View Branch Location & Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
