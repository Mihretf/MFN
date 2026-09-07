import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Post } from "../../types/gallery.type";
import { fetchGalleryPosts } from "../../services/gallery.service";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";

interface GalleryCard {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

export default function GalleryHighlight() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cards, setCards] = useState<GalleryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchGalleryPosts()
      .then((all) => {
        const galleryPosts = all.filter((p) => p.type === "gallery");
        const list = galleryPosts.length > 0 ? galleryPosts : all;

        const mappedCards: GalleryCard[] = list.slice(0, 6).map((post, idx) => ({
          id: post.id || `gallery-${idx}`,
          title: post.title || "30th Anniversary Celebration",
          category: post.church?.name || "Mission for Nation Church",
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

  if (loading) {
    return (
      <section className="py-20 bg-alabaster w-full">
        <LoadingState message="Loading Gallery Highlights..." />
      </section>
    );
  }

  if (error || cards.length === 0) {
    return (
      <section className="py-20 bg-alabaster w-full">
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
    <section className="py-20 bg-[#F8F7F4] w-full relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(174,143,5,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] border border-[#AE8F05]/30 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-sacred-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-sacred-gold">
              Gallery Highlights
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-warm-slate tracking-tight">
            {t("nav.gallery") || "Church Life & Jubilee Moments"}
          </h2>

          <p className="mt-4 text-lg text-[#5C5854]">
            {t("gallery.heroSubtitle") ||
              "Capturing moments of worship, regional conferences, and pastoral graduation ceremonies."}
          </p>
        </div>

        {/* Photo Grid — click any photo to go to Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {cards.map((card, idx) => (
            <button
              key={card.id || idx}
              onClick={() => navigate("/gallery")}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 text-left focus:outline-none focus:ring-2 focus:ring-[#AE8F05] focus:ring-offset-2"
              aria-label={`View ${card.title} in gallery`}
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  style={{ transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/90 text-warm-slate text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    View in Gallery →
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#AE8F05]">
                  {card.category}
                </span>
                <h3 className="font-serif text-base font-bold text-warm-slate mt-1 group-hover:text-[#AE8F05] transition-colors line-clamp-1">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="text-sm text-[#5C5854] mt-1 line-clamp-2">
                    {card.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* CTA to full gallery */}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AE8F05] to-[#7E6503] text-[#FFFFF0] font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
