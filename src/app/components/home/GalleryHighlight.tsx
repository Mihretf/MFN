import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Post } from "../../types/gallery.type";
import { fetchGalleryPosts } from "../../services/gallery.service";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, initAnimations, killAllAnimations } from "../../lib/animations";

gsap.registerPlugin(ScrollTrigger);

interface CinematicCard {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

export default function GalleryHighlight() {
  const { t } = useTranslation();
  const [cards, setCards] = useState<CinematicCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetchGalleryPosts()
      .then((all) => {
        const galleryPosts = all.filter((p) => p.type === "gallery");
        const list = galleryPosts.length > 0 ? galleryPosts : all;
        
        const mappedCards: CinematicCard[] = list.slice(0, 6).map((post, idx) => ({
          id: post.id || `gallery-${idx}`,
          title: post.title || "30th Anniversary Celebration",
          category: post.region_name || "Mission for Nation",
          imageUrl: post.media_url,
          description: post.content || "Glorious worship and gathering in His presence.",
        }));

        setCards(mappedCards);
      })
      .catch((err) => {
        console.error("Failed to fetch gallery posts", err);
        setError("Could not load gallery highlights.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!gridRef.current || cards.length === 0 || prefersReducedMotion()) return;

    initAnimations();

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll<HTMLElement>(".sticky-grid-item");
      if (!items?.length) return;

      gsap.set(items, { autoAlpha: 0, scale: 0.8, y: 60 });

      gsap.to(items, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, gridRef);

    return () => {
      ctx.revert();
      killAllAnimations();
    };
  }, [cards]);

  if (loading) {
    return (
      <section className="py-20 bg-alabaster">
        <LoadingState message="Loading 3D Gallery Showcase..." />
      </section>
    );
  }

  if (error || cards.length === 0) {
    return (
      <section className="py-20 bg-alabaster">
        <div className="max-w-4xl mx-auto px-4">
          <ErrorState 
            title="Gallery Unavailable" 
            message={error || "No gallery highlights found."} 
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-alabaster relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] border border-[#AE8F05]/30 shadow-sm mb-4" data-gallery-badge>
            <Sparkles className="w-4 h-4 text-sacred-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-sacred-gold">
              3D Cinematic Highlights
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-warm-slate tracking-tight" data-gallery-title>
            {t("nav.gallery") || "Church Life & Jubilee Moments"}
          </h2>

          <p className="mt-4 text-lg text-[#5C5854]" data-gallery-desc>
            {t("gallery.heroSubtitle") || "Capturing moments of worship, regional conferences, and pastoral graduation ceremonies."}
          </p>
        </div>

        {/* Sticky Grid Scroll */}
        <div ref={gridRef} className="perspective-container relative w-full py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <div
                key={card.id || idx}
                className="sticky-grid-item ivory-glass-card rounded-2xl overflow-hidden p-4 relative group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A28]/80 via-transparent to-transparent" />
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
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AE8F05] to-[#7E6503] text-[#FFFFF0] font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
