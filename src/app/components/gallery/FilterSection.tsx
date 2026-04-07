import { Filter } from "lucide-react";

interface FilterSectionProps {
  selectedRegion: string;
  selectedPostType: string;
  regions: Array<{ id: string; name: string }>;
  onRegionChange: (regionId: string) => void;
  onPostTypeChange: (postType: string) => void;
}

export function FilterSection({
  selectedRegion,
  selectedPostType,
  regions,
  onRegionChange,
  onPostTypeChange,
}: FilterSectionProps) {
  const postTypes: Array<{ value: string; label: string }> = [
    { value: "all", label: "All Types" },
    { value: "event", label: "Events" },
    { value: "news", label: "News" },
    { value: "sermon", label: "Sermons" },
    { value: "announcement", label: "Announcements" },
    { value: "gallery", label: "Gallery" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors" />
        <h2 className="text-lg text-gray-900 dark:text-gray-100 transition-colors">Filter Posts</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Region Filter */}
        <div>
          <label
            htmlFor="region-filter"
            className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors"
          >
            Filter by Region
          </label>
          <select
            id="region-filter"
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all outline-none"
          >
            <option value="all">All Regions</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {/* Post Type Filter */}
        <div>
          <label
            htmlFor="type-filter"
            className="block text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors"
          >
            Filter by Type
          </label>
          <select
            id="type-filter"
            value={selectedPostType}
            onChange={(e) => onPostTypeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all outline-none"
          >
            {postTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Indicator */}
      {(selectedRegion !== "all" || selectedPostType !== "all") && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active filters:</span>
          {selectedRegion !== "all" && (
            <button
              onClick={() => onRegionChange("all")}
              className="px-3 py-1 bg-[#1a3c34]/10 dark:bg-[#d4af37]/20 text-[#1a3c34] dark:text-[#d4af37] rounded-full text-sm hover:bg-[#1a3c34]/20 dark:hover:bg-[#d4af37]/30 transition-colors flex items-center gap-1"
            >
              {regions.find((r) => r.id === selectedRegion)?.name} ✕
            </button>
          )}
          {selectedPostType !== "all" && (
            <button
              onClick={() => onPostTypeChange("all")}
              className="px-3 py-1 bg-[#d4af37]/10 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-[#d4af37]/20 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
            >
              {postTypes.find((t) => t.value === selectedPostType)?.label} ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
}
