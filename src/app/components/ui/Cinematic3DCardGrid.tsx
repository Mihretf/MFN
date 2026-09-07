import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface CinematicCard {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

interface Cinematic3DCardGridProps {
  cards: CinematicCard[];
  className?: string;
}

export const Cinematic3DCardGrid: React.FC<Cinematic3DCardGridProps> = ({ cards, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Entrance animation for cards
      gsap.fromTo(
        ".card-3d-item",
        {
          rotateX: -90,
          opacity: 0,
          scale: 0.8,
          y: 60,
        },
        {
          rotateX: 0,
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: "elastic.out(1, 0.75)",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [cards]);

  // Handle Cycling Loop
  useEffect(() => {
    if (cards.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div ref={containerRef} className={`perspective-container relative w-full py-8 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={card.id || idx}
              className={`card-3d-item card-3d-rotate ivory-glass-card rounded-2xl overflow-hidden p-4 relative group cursor-pointer transition-all duration-700 ${
                isActive ? "border-2 border-[#AE8F05] shadow-2xl scale-[1.03]" : "opacity-90 hover:opacity-100"
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Image Container */}
              <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A28]/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#FFFFF0]/90 backdrop-blur-md rounded-full text-xs font-semibold text-[#AE8F05] tracking-wider uppercase border border-[#AE8F05]/30">
                  {card.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="p-2">
                <h3 className="font-serif text-lg font-bold text-[#2C2A28] group-hover:text-[#AE8F05] transition-colors">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="text-sm text-[#5C5854] mt-1 line-clamp-2">
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
