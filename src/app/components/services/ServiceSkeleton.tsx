import React from "react";

export function RegionSidebarSkeleton() {
  return (
    <div className="space-y-2.5 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="p-3.5 rounded-xl bg-stone-200/70 dark:bg-gray-800 flex items-center justify-between"
        >
          <div className="space-y-2 flex-1 mr-3">
            <div className="h-4 bg-stone-300/80 dark:bg-gray-700 rounded w-2/3" />
            <div className="h-3 bg-stone-300/50 dark:bg-gray-700/60 rounded w-1/2" />
          </div>
          <div className="w-6 h-6 bg-stone-300/80 dark:bg-gray-700 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function AnnouncementSkeleton() {
  return (
    <div className="w-full rounded-2xl bg-white dark:bg-gray-800 border border-stone-200 dark:border-gray-700 p-6 shadow-sm animate-pulse mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-amber-200 dark:bg-amber-900/50 rounded-full" />
        <div className="h-4 bg-stone-300 dark:bg-gray-700 rounded w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-48 bg-stone-200 dark:bg-gray-700 rounded-xl" />
        <div className="space-y-3 flex flex-col justify-center">
          <div className="h-3 bg-stone-200 dark:bg-gray-700 rounded w-24" />
          <div className="h-6 bg-stone-300 dark:bg-gray-600 rounded w-3/4" />
          <div className="h-4 bg-stone-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-stone-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}

export function ChurchCardsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-stone-200/80 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row"
        >
          {/* Image placeholder */}
          <div className="w-full md:w-2/5 min-h-[220px] md:min-h-[260px] bg-stone-200 dark:bg-gray-800 flex items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-stone-300/80 dark:bg-gray-700" />
          </div>

          {/* Content placeholder */}
          <div className="md:w-3/5 p-6 sm:p-8 space-y-4 flex-1">
            <div className="space-y-2">
              <div className="h-7 bg-stone-300 dark:bg-gray-700 rounded-lg w-3/5" />
              <div className="h-4 bg-stone-200 dark:bg-gray-800 rounded w-2/5" />
            </div>

            <div className="space-y-2 pt-2">
              <div className="h-3.5 bg-stone-200 dark:bg-gray-800 rounded w-full" />
              <div className="h-3.5 bg-stone-200 dark:bg-gray-800 rounded w-4/5" />
            </div>

            <div className="pt-4 flex flex-wrap gap-2">
              <div className="h-8 bg-stone-200/70 dark:bg-gray-800 rounded-lg w-28" />
              <div className="h-8 bg-stone-200/70 dark:bg-gray-800 rounded-lg w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
