import React from "react";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import { ProportionalCollage, CollageItem } from "../ui/ProportionalCollage";

export default function Leaders() {
  const { t } = useTranslation();

  const collageItems: CollageItem[] = [
    {
      id: "leader-1",
      title: "Pastor Apostle & Founder",
      subtitle: "30 Years of Visionary Leadership, establishing Mission For Nation Church worldwide.",
      imageUrl: "https://res.cloudinary.com/di5zfjqlt/image/upload/v1773571945/photo_2026-03-15_13-51-33_rus4x4.jpg",
      badge: "Senior Apostle",
    },
    {
      id: "leader-2",
      title: "Pastors' College Faculty",
      subtitle: "Nazareth Campus Pastoral Training & Biblical Theology Department.",
      imageUrl: "https://images.unsplash.com/photo-1605518589548-27b44b941b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      badge: "Nazareth Campus",
    },
    {
      id: "leader-3",
      title: "Regional Leadership Council",
      subtitle: "Guiding regional church plants and international satellite centers.",
      imageUrl: "https://images.unsplash.com/photo-1620565404581-e0aea3f826ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      badge: "Regional Ministry",
    },
    {
      id: "leader-4",
      title: "7 Spirit TV Media Team",
      subtitle: "Broadcasting spiritual gospel services across continents 24/7.",
      imageUrl: "https://images.unsplash.com/photo-1623096939009-cb651b7700f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      badge: "7 Spirit TV",
    },
  ];

  return (
    <section className="py-20 bg-alabaster relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] border border-[#AE8F05]/30 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-sacred-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-sacred-gold">
              Proportional CMS Leadership Collage
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-warm-slate tracking-tight">
            {t("leader.title") || "Senior Leadership & Pastoral Faculty"}
          </h2>

          <p className="mt-4 text-lg text-[#5C5854]">
            Anointed servants dedicated to shepherding the flock, training ministers, and fulfilling the Great Commission.
          </p>
        </div>

        {/* Proportional em-based Collage Grid */}
        <ProportionalCollage items={collageItems} />
      </div>
    </section>
  );
}
