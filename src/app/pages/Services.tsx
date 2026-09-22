import { ImageWithFallback } from "../components/figma/ImageWithFallback";
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
  Bell,
  Sparkles,
} from "lucide-react";
import { regionService, churchService } from "../services/app.service";
import { getCache, setCache } from "../utils/cache";
import type { Branch } from "../data/mockData";
import { ErrorState } from "../components/ui/ErrorState";
import {
  RegionSidebarSkeleton,
  ChurchCardsSkeleton,
} from "../components/services/ServiceSkeleton";
import {
  RegionalAnnouncements,
  RegionalAnnouncement,
} from "../components/services/RegionalAnnouncements";

interface RegionAPI {
  id: string;
  name: string;
  description?: string;
}

export function Services() {
  const { t } = useTranslation();

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
    location: String(
      church?.location || church?.address || "Location available",
    ),
    address: String(church?.address || church?.location || ""),
    phone: String(church?.phone ?? ""),
    email: String(church?.email ?? ""),
    description: String(church?.description ?? ""),
    heroImage: String(church?.hero_image ?? ""),
    serviceTimes: Array.isArray(church?.service_times)
      ? church.service_times
      : [],
    announcements: Array.isArray(church?.announcements)
      ? church.announcements
      : [],
    pastor:
      church?.pastor && typeof church.pastor === "object"
        ? {
            name: String(
              church.pastor.name ?? "Pastor information unavailable",
            ),
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
    locationLink: church?.location_link
      ? String(church.location_link)
      : undefined,
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
    try {
      const cached = getCache<any>("regions");
      if (cached) {
        const raw = extractArrayPayload(cached, ["regions", "data", "results"]);
        return raw.map((region, index) => normalizeRegion(region, index));
      }
    } catch {
      // Ignore cache reading error
    }
    return [];
  });

  const [churches, setChurches] = useState<Branch[]>(() => {
    try {
      const cached = getCache<any>("churches:all");
      if (cached) {
        const raw: any[] = extractArrayPayload(cached, [
          "churches",
          "data",
          "results",
        ]);
        return raw.map((c, i) => normalizeChurch(c, i));
      }
    } catch {
      // Ignore cache reading error
    }
    return [];
  });

  const [loadingRegions, setLoadingRegions] = useState(() => regions.length === 0);
  const [loadingChurches, setLoadingChurches] = useState(() => churches.length === 0);
  const [errorRegions, setErrorRegions] = useState<string | null>(null);
  const [errorChurches, setErrorChurches] = useState<string | null>(null);

  const [selectedRegionId, setSelectedRegionId] = useState<string>("");

  // Load regions with safe fallback
  useEffect(() => {
    let isMounted = true;
    const cacheKey = "regions";

    regionService
      .getRegions()
      .then((res) => {
        if (!isMounted) return;
        const rawList: any[] = extractArrayPayload(res, [
          "regions",
          "data",
          "results",
        ]);
        const list: RegionAPI[] = rawList.map((r, i) => normalizeRegion(r, i));
        if (list.length > 0) {
          setRegions(list);
          setCache(cacheKey, list);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch live regions, using available data:", err);
        if (isMounted && regions.length === 0) {
          setErrorRegions("Unable to load regions. Please check your connection.");
        }
      })
      .finally(() => {
        if (isMounted) setLoadingRegions(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Load churches with safe fallback
  useEffect(() => {
    let isMounted = true;
    const cacheKey = "churches:all";

    churchService
      .getChurches({}, "")
      .then((res: any) => {
        if (!isMounted) return;
        setCache(cacheKey, res);
        const raw: any[] = extractArrayPayload(res, [
          "churches",
          "data",
          "results",
        ]);
        const mapped: Branch[] = raw.map((c, i) => normalizeChurch(c, i));
        if (mapped.length > 0) {
          setChurches(mapped);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch live churches, using available data:", err);
        if (isMounted && churches.length === 0) {
          setErrorChurches("Unable to load church branches. Please try again.");
        }
      })
      .finally(() => {
        if (isMounted) setLoadingChurches(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Exclude Eyursalem Main Coordination Church from regional announcements
  const isMainCoordinationChurch = (c: Branch) =>
    /jerusalem|eyursalem/i.test(c.name);

  // Transform church events from non-main churches into regional announcements
  const regionalAnnouncements: RegionalAnnouncement[] = useMemo(() => {
    return churches
      .filter((c) => !isMainCoordinationChurch(c))
      .flatMap((church) => {
        const churchEvents = Array.isArray(church.events) ? church.events : [];
        return churchEvents
          .filter((evt) => evt && (evt.title || evt.image || evt.description))
          .map((evt, idx) => ({
            id: evt.id || `${church.id}-evt-${idx}`,
            title: evt.title || `${church.name} Program`,
            description: evt.description || "",
            date: evt.date || "",
            time: evt.time || "",
            image: evt.image || church.heroImage || "",
            churchId: church.id,
            churchName: church.name,
            regionId: church.regionId,
          }));
      });
  }, [churches]);

  // Count helper for regional announcements
  const getRegionAnnouncementCount = (regionId: string) => {
    return regionalAnnouncements.filter((a) => a.regionId === regionId).length;
  };

  // Announcements to display for the currently selected region or all regions
  const activeAnnouncements = useMemo(() => {
    if (!selectedRegionId) return regionalAnnouncements;
    return regionalAnnouncements.filter((a) => a.regionId === selectedRegionId);
  }, [regionalAnnouncements, selectedRegionId]);

  const selectedRegionName = useMemo(() => {
    if (!selectedRegionId) return "All Regional";
    const found = regions.find((r) => r.id === selectedRegionId);
    return found?.name || "Regional";
  }, [regions, selectedRegionId]);

  // Clicking same region toggles filter off
  const handleRegionClick = (id: string) => {
    setSelectedRegionId((prev) => (prev === id ? "" : id));
  };

  // Filter churches for the main column - ALWAYS place Eyerusalem branch at the top as main center
  const filteredBranches = useMemo(() => {
    const list = selectedRegionId
      ? churches.filter((branch) => branch.regionId === selectedRegionId)
      : churches;

    return [...list].sort((a, b) => {
      const aIsMain = /jerusalem|eyursalem/i.test(a.name);
      const bIsMain = /jerusalem|eyursalem/i.test(b.name);
      if (aIsMain && !bIsMain) return -1;
      if (!aIsMain && bIsMain) return 1;
      return 0;
    });
  }, [churches, selectedRegionId]);

  // Count helper for branches in a region
  const getRegionBranchCount = (regionId: string) => {
    return churches.filter((branch) => branch.regionId === regionId).length;
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#faf8f5] dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#1a3c34] dark:text-gray-100 mb-4 transition-colors">
            {t("services.heroTitle") || "Our Church Locations"}
          </h1>
          <p className="text-lg md:text-xl text-[#5c5854] dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            {t("services.heroSubtitle") ||
              "Find a Mission for Nation church family near you and join us for worship."}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar - Region/Network Filter */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-[#e5dfd0] dark:border-gray-700 p-5 sticky top-28">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold font-serif text-[#1a3c34] dark:text-[#f0d082]">
                  {t("services.selectRegion") || "Networks & Regions"}
                </h3>
                {selectedRegionId && (
                  <button
                    onClick={() => setSelectedRegionId("")}
                    className="text-xs font-semibold text-[#ae8f05] hover:underline"
                  >
                    View All
                  </button>
                )}
              </div>

              {loadingRegions ? (
                <RegionSidebarSkeleton />
              ) : errorRegions && regions.length === 0 ? (
                <ErrorState
                  message={errorRegions}
                  className="mb-4 text-xs"
                  onRetry={() => window.location.reload()}
                />
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-hide">
                  {/* All Regions Button */}
                  <button
                    onClick={() => setSelectedRegionId("")}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 group ${
                      selectedRegionId === ""
                        ? "bg-[#1a3c34] text-white shadow-md"
                        : "bg-stone-50 dark:bg-gray-700/50 text-[#2c2a28] dark:text-gray-200 hover:bg-[#ae8f05]/10 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm">
                        {t("services.allRegions") || "All Regions"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {regionalAnnouncements.length > 0 && (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-sm"
                            title="Total regional announcements"
                          >
                            <Bell className="w-3 h-3" />
                            {regionalAnnouncements.length}
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            selectedRegionId === ""
                              ? "bg-[#ae8f05] text-white"
                              : "bg-stone-200 dark:bg-gray-600 text-[#1a3c34] dark:text-white"
                          }`}
                        >
                          {churches.length}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Individual Regions */}
                  {regions
                    .slice()
                    .sort((a, b) => getRegionBranchCount(b.id) - getRegionBranchCount(a.id))
                    .map((region) => {
                      const branchCount = getRegionBranchCount(region.id);
                      const annCount = getRegionAnnouncementCount(region.id);
                      const isSelected = selectedRegionId === region.id;

                      return (
                        <motion.button
                          key={region.id}
                          onClick={() => handleRegionClick(region.id)}
                          className={`w-full text-left p-3 rounded-xl transition-all duration-200 group ${
                            isSelected
                              ? "bg-[#1a3c34] text-white shadow-md"
                              : "bg-stone-50 dark:bg-gray-700/50 text-[#2c2a28] dark:text-gray-200 hover:bg-[#ae8f05]/10 hover:shadow-sm"
                          }`}
                          whileHover={{ x: 3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 mr-2">
                              <div className="font-semibold text-sm flex items-center gap-1.5">
                                <span>{region.name}</span>
                                {isSelected && <ChevronRight className="w-4 h-4 text-[#ae8f05]" />}
                              </div>
                              {region.description && (
                                <p
                                  className={`text-xs mt-0.5 line-clamp-1 ${
                                    isSelected ? "text-white/80" : "text-[#5c5854] dark:text-gray-400"
                                  }`}
                                >
                                  {region.description}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {/* Announcement Notification Badge */}
                              {annCount > 0 && (
                                <span
                                  className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-sm"
                                  title={`${annCount} announcement(s) in this region`}
                                >
                                  <Bell className="w-2.5 h-2.5" />
                                  {annCount}
                                </span>
                              )}

                              {/* Branch Count */}
                              {branchCount > 0 && (
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                    isSelected
                                      ? "bg-[#ae8f05] text-white"
                                      : "bg-stone-200 dark:bg-gray-600 text-[#1a3c34] dark:text-white"
                                  }`}
                                >
                                  {branchCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {/* Right Main Column - Announcements & Church Locations */}
          <div className="lg:col-span-9">
            {/* Regional Announcements Section with Horizontal Sliding Motion */}
            <RegionalAnnouncements
              announcements={activeAnnouncements}
              regionName={selectedRegionName}
            />

            {/* Selected Region Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-[#e5dfd0] dark:border-gray-700 pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1a3c34] dark:text-gray-100">
                  {selectedRegionId
                    ? regions.find((r) => r.id === selectedRegionId)?.name
                    : t("services.allRegions") || "All Church Locations"}
                </h2>
                <p className="text-sm text-[#5c5854] dark:text-gray-400 mt-1">
                  Showing {filteredBranches.length}{" "}
                  {filteredBranches.length === 1
                    ? t("services.location") || "location"
                    : t("services.locations") || "locations"}
                </p>
              </div>
            </div>

            {errorChurches && churches.length === 0 && (
              <ErrorState
                message={errorChurches}
                className="mb-8"
                onRetry={() => window.location.reload()}
              />
            )}

            {/* Branch Listings or Skeleton Loader */}
            {loadingChurches ? (
              <ChurchCardsSkeleton />
            ) : filteredBranches.length > 0 ? (
              <div className="space-y-6">
                {filteredBranches.map((branch, index) => (
                  <motion.article
                    key={branch.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.06, 0.3) }}
                  >
                    <Link to={`/services/${branch.id}`} className="block group">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-[#e5dfd0] dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
                        {/* Church Image Container - Standalone photo without duplicated background layers or overlapping effects */}
                        <div className="w-full md:w-2/5 min-h-[220px] md:min-h-[280px] flex-shrink-0 relative overflow-hidden bg-stone-50 dark:bg-gray-900 rounded-2xl m-3 border border-[#e5dfd0]/80 dark:border-gray-700 shadow-md flex items-center justify-center group-hover:shadow-2xl group-hover:border-[#ae8f05] group-hover:ring-2 group-hover:ring-[#ae8f05]/30 transition-all duration-300">
                          <ImageWithFallback
                            src={
                              branch.heroImage ||
                              "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=1080"
                            }
                            alt={branch.name}
                            className="w-full h-full max-h-[280px] object-contain object-center p-3 transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Church Details */}
                        <div className="md:w-3/5 p-6 sm:p-8 flex flex-col justify-between flex-1">
                          <div>
                            {/jerusalem|eyursalem/i.test(branch.name) && (
                              <div className="mb-2.5">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ae8f05] text-white text-xs font-bold shadow-sm">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  Main Center / Headquarters
                                </span>
                              </div>
                            )}

                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#1a3c34] dark:text-white group-hover:text-[#ae8f05] transition-colors leading-snug">
                                {branch.name}
                              </h3>
                            </div>

                            <div className="flex items-center text-sm text-[#5c5854] dark:text-gray-400 mb-4">
                              <MapPin className="w-4 h-4 mr-2 text-[#ae8f05] shrink-0" />
                              <span className="line-clamp-1">{branch.location}</span>
                            </div>

                            {branch.description && (
                              <p className="text-sm text-[#5c5854] dark:text-gray-300 mb-5 line-clamp-2 leading-relaxed">
                                {branch.description}
                              </p>
                            )}

                            {/* Service Times Pills */}
                            {Array.isArray(branch.serviceTimes) &&
                              branch.serviceTimes.length > 0 && (
                                <div className="space-y-1.5 mb-5">
                                  <div className="text-xs font-bold uppercase tracking-wider text-[#ae8f05] flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{t("services.serviceTimes") || "Service Times"}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2 pt-1">
                                    {branch.serviceTimes.slice(0, 3).map((service, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-gray-700 text-[#2c2a28] dark:text-gray-300 font-medium"
                                      >
                                        <strong className="text-[#1a3c34] dark:text-[#f0d082]">
                                          {service.day}:
                                        </strong>{" "}
                                        {service.time}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>

                          {/* Action Footer */}
                          <div className="pt-4 border-t border-[#f0ebe0] dark:border-gray-700 flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5c5854]">
                              {branch.pastor?.name && branch.pastor.name !== "Pastor information unavailable"
                                ? `Pastor: ${branch.pastor.name}`
                                : "Welcome to visit"}
                            </span>

                            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ae8f05] group-hover:text-[#1a3c34] dark:group-hover:text-[#f0d082] transition-colors">
                              <span>{t("services.viewDetails") || "View Details"}</span>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-[#e5dfd0] dark:border-gray-700 p-12 text-center">
                <Sparkles className="w-12 h-12 text-[#ae8f05] mx-auto mb-3" />
                <h3 className="text-xl font-bold font-serif text-[#1a3c34] dark:text-white mb-2">
                  No church branches found in this region
                </h3>
                <p className="text-sm text-[#5c5854] dark:text-gray-400 mb-6 max-w-md mx-auto">
                  We are expanding our network across Ethiopia and globally. Try selecting another region or view all locations.
                </p>
                <button
                  onClick={() => setSelectedRegionId("")}
                  className="px-6 py-2.5 rounded-xl bg-[#1a3c34] text-white text-sm font-semibold hover:bg-[#132d27] transition-all shadow-sm"
                >
                  View All Locations
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Services;
