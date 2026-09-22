import { useTranslation } from "react-i18next";

interface FilterSectionProps {
  selectedRegion: string;
  selectedPostType?: string;
  regions: Array<{ id: string; name: string }>;
  onRegionChange: (regionId: string) => void;
  onPostTypeChange?: (postType: string) => void;
}

export function FilterSection({
  selectedRegion,
  regions,
  onRegionChange,
}: FilterSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      {/* Region Circular Pill Filters only - Category filters removed per request */}
      <div className="flex flex-wrap justify-center gap-2">
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
    </div>
  );
}
