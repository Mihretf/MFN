import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const postTypes: Array<{ value: string; label: string }> = [
    { value: "all", label: t("gallery.allTypes") || "All" },
    { value: "event", label: "Events" },
    { value: "news", label: "News" },
    { value: "sermon", label: "Sermons" },
    { value: "announcement", label: "Announcements" },
    { value: "gallery", label: "Gallery" },
  ];

  return (
    <div className="mb-8">
      {/* Region Circular Pill Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <button
          onClick={() => onRegionChange("all")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
            selectedRegion === "all"
              ? "bg-[#AE8F05] text-[#FFFFF0] border-[#AE8F05] shadow-md"
              : "bg-[#FFFFF0] text-[#5C5854] border-[#AE8F05]/25 hover:border-[#AE8F05] hover:text-[#AE8F05]"
          }`}
        >
          {t("services.allRegions") || "All Regions"}
        </button>
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => onRegionChange(region.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
              selectedRegion === region.id
                ? "bg-[#AE8F05] text-[#FFFFF0] border-[#AE8F05] shadow-md"
                : "bg-[#FFFFF0] text-[#5C5854] border-[#AE8F05]/25 hover:border-[#AE8F05] hover:text-[#AE8F05]"
            }`}
          >
            {region.name}
          </button>
        ))}
      </div>

      {/* Post Type Circular Pill Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {postTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => onPostTypeChange(type.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              selectedPostType === type.value
                ? "bg-[#2C2A28] text-[#FFFFF0] border-[#2C2A28] shadow-md"
                : "bg-[#FFFFF0] text-[#5C5854] border-[#AE8F05]/20 hover:border-[#2C2A28] hover:text-[#2C2A28]"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
