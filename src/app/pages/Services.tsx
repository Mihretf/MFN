import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { regionService, churchService } from "../services/app.service";
import { getCache, setCache } from "../utils/cache";
import { fetchGalleryPosts } from "../services/gallery.service";
import type { Branch } from "../data/mockData"; // reuse Branch shape
import type { Post } from "../types/gallery.type"; // for announcements
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";

export function Services() {
  const { t } = useTranslation();

  interface RegionAPI {
    id: string;
    name: string;
    description?: string; // may be provided by API
  }

  const normalizeRegion = (region: any, index: number): RegionAPI => ({
    id: String(region?.id ?? region?.external_id ?? `region-${index}`),
    name: String(region?.name ?? "Unnamed Region"),
    description:
      typeof region?.description === "string" ? region.description : "",
  });

  const normalizeChurch = (church: any, index: number): Branch => ({
    id: String(church?.id ?? church?.external_id ?? `church-${index}`),
    name: String(church?.name ?? "Unnamed Church"),
    externalId:
      church?.external_id != null ? String(church.external_id) : undefined,
    location: String(church?.location || church?.address || "Location unavailable"),
    address: String(church?.address || church?.location || ""),
    phone: String(church?.phone ?? ""),
    email: String(church?.email ?? ""),
    description: String(church?.description ?? ""),
    heroImage: String(church?.hero_image ?? ""),
    serviceTimes: Array.isArray(church?.service_times) ? church.service_times : [],
    announcements: Array.isArray(church?.announcements)
      ? church.announcements
      : [],
    pastor:
      church?.pastor && typeof church.pastor === "object"
        ? {
            name: String(church.pastor.name ?? "Pastor information unavailable"),
            role: String(church.pastor.role ?? ""),
            image: String(church.pastor.image ?? ""),
            bio: String(church.pastor.bio ?? ""),
          }
        : {
            name: "Pastor information unavailable",
            role: "",
            image: "",
            bio: "",
          },
    events: Array.isArray(church?.events) ? church.events : [],
    ministries: Array.isArray(church?.ministries) ? church.ministries : [],
    gallery: Array.isArray(church?.gallery) ? church.gallery : [],
    mapUrl: String(church?.map_url ?? ""),
    locationLink: church?.location_link ? String(church.location_link) : undefined,
    regionId: String(church?.region_id ?? ""),
  });

  const extractArrayPayload = (payload: any, candidates: string[]): any[] => {
    if (Array.isArray(payload)) return payload;
    for (const key of candidates) {
      if (Array.isArray(payload?.[key])) return payload[key];
    }
    return [];
  };

  const [regions, setRegions] = useState<RegionAPI[]>(() => {
    const cached = getCache<any>("regions");
    const raw = extractArrayPayload(cached, ["regions", "data", "results"]);
    return raw.map((region, index) => normalizeRegion(region, index));
  });
  const [churches, setChurches] = useState<Branch[]>(() => {
    const cached = getCache<any>("churches:all");
    if (cached) {
      const raw: any[] = extractArrayPayload(cached, [
        "churches",
        "data",
        "results",
      ]);
      return raw.map((c, i) => normalizeChurch(c, i));
    }
    return [];
  });
  const [loadingRegions, setLoadingRegions] = useState(() => !getCache("regions"));
  const [loadingChurches, setLoadingChurches] = useState(() => !getCache("churches:all"));
  const [errorRegions, setErrorRegions] = useState<string | null>(null);
  const [errorChurches, setErrorChurches] = useState<string | null>(null);

  const [selectedRegionId, setSelectedRegionId] = useState<string>("");

  // announcements area: upcoming events from gallery
  const [announcements, setAnnouncements] = useState<Post[]>([]);

  // carousel helpers for announcements
  const sortedAnnouncements = useMemo(
    () =>
      [...announcements].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [announcements],
  );

  const [currentAnnIndex, setCurrentAnnIndex] = useState(0);
  const goNextAnn = () =>
    setCurrentAnnIndex((i) =>
      sortedAnnouncements.length ? (i + 1) % sortedAnnouncements.length : 0,
    );
  const goPrevAnn = () =>
    setCurrentAnnIndex((i) =>
      sortedAnnouncements.length
        ? (i - 1 + sortedAnnouncements.length) % sortedAnnouncements.length
        : 0,
    );

  // reset index when list changes
  useEffect(() => {
    if (currentAnnIndex >= sortedAnnouncements.length) {
      setCurrentAnnIndex(0);
    }
  }, [sortedAnnouncements, currentAnnIndex]);

  // auto-advance announcements at interval
  useEffect(() => {
    if (sortedAnnouncements.length === 0) return;
    const timer = setInterval(goNextAnn, 5000);
    return () => clearInterval(timer);
  }, [sortedAnnouncements]);

  // optional label logic copied from home blogs
  const getAnnLabel = (post: Post) => {
    const text = post.description?.toLowerCase() || "";
    if (text.includes("quote") || text.includes("”") || text.includes("“"))
      return "Quote";
    if (text.includes("offer") || text.includes("discount")) return "Offer";
    if (new Date(post.created_at) > new Date(Date.now() - 1000 * 60 * 60 * 72))
      return "New";
    return "Update";
  };

  // clicking same region toggles filter off
  const handleRegionClick = (id: string) => {
    setSelectedRegionId((prev) => (prev === id ? "" : id));
  };

  // filter to show in main column
  const filteredBranches = churches.filter((branch) => {
    if (!selectedRegionId) return true;
    return branch.regionId === selectedRegionId;
  });

  // count helper
  const getRegionBranchCount = (regionId: string) => {
    return churches.filter((branch) => branch.regionId === regionId).length;
  };

  // load regions on mount (with explicit cache check as example)
  useEffect(() => {
    setLoadingRegions(true);
    const cacheKey = "regions";
    const cached = getCache<any>(cacheKey);
    if (cached) {
      const rawList = extractArrayPayload(cached, [
        "regions",
        "data",
        "results",
      ]);
      setRegions(rawList.map((region, index) => normalizeRegion(region, index)));
      setLoadingRegions(false);
      return;
    }

    regionService
      .getRegions()
      .then((res) => {
        const rawList: any[] = extractArrayPayload(res, [
          "regions",
          "data",
          "results",
        ]);
        const list: RegionAPI[] = rawList.map((r, i) => normalizeRegion(r, i));
        setRegions(list);
        setCache(cacheKey, list);
      })
      .catch((err) => {
        console.error("failed to fetch regions", err);
        setErrorRegions(err.message || "Unable to load regions");
      })
      .finally(() => setLoadingRegions(false));
  }, []);

  // load churches once (cache handled by service already, but demonstrating)
  useEffect(() => {
    setLoadingChurches(true);
    const cacheKey = "churches:all";
    const cached = getCache<any>(cacheKey);
    if (cached) {
      const raw: any[] = extractArrayPayload(cached, [
        "churches",
        "data",
        "results",
      ]);
      const mapped: Branch[] = raw.map((c, i) => normalizeChurch(c, i));
      setChurches(mapped);
      setLoadingChurches(false);
      return;
    }

    churchService
      .getChurches({}, "")
      .then((res: any) => {
        setCache(cacheKey, res);
        const rawResponse = res as import("../types/church.type").ChurchListResponse;
        const raw: any[] = extractArrayPayload(rawResponse, [
          "churches",
          "data",
          "results",
        ]);
        const mapped: Branch[] = raw.map((c, i) => normalizeChurch(c, i));
        setChurches(mapped);
      })
      .catch((err) => {
        console.error("failed to fetch churches", err);
        setErrorChurches(err.message || "Unable to load churches");
      })
      .finally(() => setLoadingChurches(false));
  }, []);

  // fetch announcement posts (events not expired); fall back to mock if empty
  useEffect(() => {
    fetchGalleryPosts()
      .then((posts) => {
        const now = new Date();
        const events = posts.filter((p) => {
          if (p.type !== "event") return false;
          if (!p.deadline) return true;
          return new Date(p.deadline) > now;
        });
        setAnnouncements(events);
      })
      .catch((err) => {
        console.error("failed to load announcements", err);
        // on error just clear announcements; UI hides section automatically
        setAnnouncements([]);
      });
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#f5f5f5] dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a3c34] dark:text-gray-100 mb-4 transition-colors">
            {t("services.heroTitle")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            {t("services.heroSubtitle")}
          </p>
        </div>

        {/* announcement carousel (same style as home blogs) */}
        {sortedAnnouncements.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3c34] mb-4">
              Announcements
            </h2>

            <div className="relative flex items-center justify-center">
              {/* previous */}
              <button
                onClick={goPrevAnn}
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

              {/* card */}
              {(() => {
                const current = sortedAnnouncements[currentAnnIndex];
                if (!current) return null;
                const hasText =
                  current.description && current.description.trim().length > 0;
                const hasImage =
                  current.media_url != null &&
                  current.media_url.trim().length > 0;
                return (
                  <div
                    className={`
                      w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl 
                      mx-6 sm:mx-12 md:mx-16 
                      bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden
                      transition-all duration-300
                      flex flex-col
                    `}
                  >
                    {hasImage && (
                      <div className="w-full max-h-[60vh] overflow-hidden">
                        <img
                          src={current.media_url || ""}
                          alt=""
                          className="w-full h-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {hasText && (
                      <div className="p-5 sm:p-7 md:p-9 space-y-4">
                        <div className="flex justify-center">
                          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-[#d4af37]/20 text-[#1a3c34] dark:text-[#d4af37]">
                            {getAnnLabel(current)}
                          </span>
                        </div>

                        <p
                          className={`
                            text-center leading-relaxed
                            ${hasImage ? "text-base sm:text-lg" : "text-lg sm:text-xl md:text-2xl font-medium"}
                            text-gray-800 dark:text-gray-200 whitespace-pre-line
                          `}
                        >
                          {current.description}
                        </p>
                      </div>
                    )}

                    {!hasText && !hasImage && (
                      <div className="p-12 text-center text-gray-400 dark:text-gray-500 italic">
                        (No content available)
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* next */}
              <button
                onClick={goNextAnn}
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
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Regions */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-md p-6 sticky top-24 transition-colors duration-300">
              <h3 className="text-lg font-bold text-[#1a3c34] dark:text-[#d4af37] mb-4">
                {t("services.selectRegion")}
              </h3>

              {loadingRegions && <LoadingState message="Loading regions..." className="py-8" />}
              {errorRegions && (
                <ErrorState 
                  message={errorRegions} 
                  className="mb-4"
                  onRetry={() => window.location.reload()}
                />
              )}

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
                {regions
                  .slice()
                  .sort((a, b) => {
                    // sort by descending branch count
                    return (
                      getRegionBranchCount(b.id) - getRegionBranchCount(a.id)
                    );
                  })
                  .map((region) => {
                    const branchCount = getRegionBranchCount(region.id);
                    const isSelected = selectedRegionId === region.id;

                    return (
                      <motion.button
                        key={region.id}
                        onClick={() => handleRegionClick(region.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                          isSelected
                            ? "bg-[#1a3c34] dark:bg-[#d4af37] text-white dark:text-gray-900 shadow-md"
                            : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#d4af37]/10 dark:hover:bg-gray-700 hover:shadow-sm"
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold mb-1 flex items-center gap-2">
                              <span>{region.name}</span>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                  }}
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </motion.div>
                              )}
                            </div>
                            <p
                              className={`text-xs ${isSelected ? "text-white/80" : "text-gray-500"}`}
                            >
                              {region.description}
                            </p>
                          </div>
                          {branchCount > 0 && (
                            <div
                              className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                                isSelected
                                  ? "bg-[#d4af37] text-[#1a3c34]"
                                  : "bg-[#d4af37]/20 text-[#1a3c34]"
                              }`}
                            >
                              {branchCount}
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Right Side - Church Locations */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRegionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Selected Region Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#1a3c34] dark:text-gray-100 mb-2 transition-colors">
                    {selectedRegionId
                      ? regions.find((r) => r.id === selectedRegionId)?.name
                      : t("services.allRegions")}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors">
                    {filteredBranches.length}{" "}
                    {filteredBranches.length === 1 ? t("services.location") : t("services.locations")}{" "}
                    {selectedRegionId ? t("services.inThisRegion") : t("services.total")}
                  </p>
                </div>

                {errorChurches && (
                  <ErrorState 
                    message={errorChurches} 
                    className="mb-8"
                    onRetry={() => window.location.reload()}
                  />
                )}

                {/* Branch Listings or Loading State */}
                {loadingChurches ? (
                  <div className="py-16">
                    <LoadingState message="Loading church locations..." className="py-12" />
                  </div>
                ) : filteredBranches.length > 0 ? (
                  <div className="space-y-6">
                    {filteredBranches.map((branch, index) => (
                      <motion.div
                        key={branch.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link to={`/services/${branch.id}`}>
                          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <div className="flex flex-col md:flex-row">
                              {/* Image */}
                              <div className="w-full md:w-2/5 min-h-64 md:min-h-72 flex-shrink-0 relative overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                                <ImageWithFallback 
                                  src={branch.heroImage || "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=1080"} 
                                  alt={branch.name} 
                                  className="w-full h-auto max-h-72 object-contain object-center brightness-105 contrast-[1.02] group-hover:scale-[1.02] transition-transform duration-500" 
                                />
                              </div>

                              {/* Content */}
                              <div className="md:w-3/5 p-8">
                                <div className="flex items-start justify-between mb-4">
                                  <div>
                                    <h2 className="text-3xl font-bold text-[#1a3c34] dark:text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                                      {branch.name}
                                    </h2>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3 transition-colors">
                                      <MapPin className="w-4 h-4 mr-2 text-[#d4af37]" />
                                      <span>{branch.location}</span>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-2 transition-colors">
                                  {branch.description}
                                </p>

                                {/* Quick Info Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                  <div className="flex items-start space-x-2">
                                    <Clock className="w-4 h-4 text-[#d4af37] mt-1 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm font-semibold text-[#1a3c34] dark:text-gray-200 transition-colors">
                                        {t("services.serviceTimes")}
                                      </p>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">
                                        {branch.serviceTimes[0]?.day}{" "}
                                        {branch.serviceTimes[0]?.time}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-2">
                                    <Phone className="w-4 h-4 text-[#d4af37] mt-1 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm font-semibold text-[#1a3c34] dark:text-gray-200 transition-colors">
                                        {t("services.contact")}
                                      </p>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">
                                        {branch.phone || "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-2">
                                    <Mail className="w-4 h-4 text-[#d4af37] mt-1 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm font-semibold text-[#1a3c34] dark:text-gray-200 transition-colors">
                                        {t("services.pastor")}
                                      </p>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">
                                        {branch.pastor.name}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* CTA Button */}
                                <div className="flex items-center text-[#d4af37] font-semibold group-hover:gap-2 transition-all">
                                  {t("services.viewDetails")}
                                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-xl shadow-md border border-[#EAE6DE]">
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-[#d4af37]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1a3c34] mb-2">
                        No Locations Yet
                      </h3>
                      <p className="text-gray-600">
                        {selectedRegionId
                          ? "No church locations found in this region. Please select another region or view all."
                          : "We're currently expanding. Check back soon for updates on new church locations!"}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
