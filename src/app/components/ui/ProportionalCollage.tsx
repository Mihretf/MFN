import React from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export interface CollageItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  badge?: string;
}

interface ProportionalCollageProps {
  items: CollageItem[];
  className?: string;
}

export const ProportionalCollage: React.FC<ProportionalCollageProps> = ({ items, className = "" }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={`cq-collage-container relative my-6 ${className}`}>
      <div className="cq-collage-grid">
        {items.map((item, index) => (
          <div key={item.id || index} className="cq-collage-item group cursor-pointer">
            {/* Image - object-top ensures heads and faces are fully visible */}
            <ImageWithFallback
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Ambient Glass Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A28]/85 via-[#2C2A28]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

            {/* Badge */}
            {item.badge && (
              <div className="absolute top-[0.8em] right-[0.8em] px-[0.8em] py-[0.3em] bg-[#FFFFF0]/90 dark:bg-gray-900/90 backdrop-blur-md border border-[#AE8F05]/40 rounded-full text-[0.65em] font-semibold text-[#AE8F05] tracking-wider uppercase shadow-md z-10">
                {item.badge}
              </div>
            )}

            {/* Content Container */}
            <div className="absolute bottom-0 inset-x-0 p-[1.2em] flex flex-col justify-end transform transition-transform duration-300 group-hover:translate-y-[-0.2em] z-10">
              <h4 className="font-serif text-[1.1em] font-bold text-[#FFFFF0] drop-shadow-md leading-tight group-hover:text-[#F7E7CE] transition-colors">
                {item.title}
              </h4>
              {item.subtitle && (
                <p className="text-[0.75em] text-[#F7E7CE]/90 font-medium tracking-wide mt-[0.3em] line-clamp-2">
                  {item.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
