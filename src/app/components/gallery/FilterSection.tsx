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
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg text-gray-900">Filter Posts</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Region Filter */}
        <div>
          <label
            htmlFor="region-filter"
            className="block text-sm text-gray-700 mb-2"
          >
            Filter by Region
          </label>
          <select
            id="region-filter"
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
            className="block text-sm text-gray-700 mb-2"
          >
            Filter by Type
          </label>
          <select
            id="type-filter"
            value={selectedPostType}
            onChange={(e) => onPostTypeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
          <span className="text-sm text-gray-600">Active filters:</span>
          {selectedRegion !== "all" && (
            <button
              onClick={() => onRegionChange("all")}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
            >
              {regions.find((r) => r.id === selectedRegion)?.name} ✕
            </button>
          )}
          {selectedPostType !== "all" && (
            <button
              onClick={() => onPostTypeChange("all")}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
            >
              {postTypes.find((t) => t.value === selectedPostType)?.label} ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
}
