import React from "react";
import { Users, Heart, Globe, GraduationCap, Tv, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SlideUpCounter } from "../ui/SlideUpCounter";

export default function Impact() {
  const { t } = useTranslation();

  const stats = [
    {
      id: 1,
      icon: Users,
      numericValue: 200,
      suffix: "k+",
      label: t("impact.churchMembers") || "Church Members & Believers",
    },
    {
      id: 2,
      icon: GraduationCap,
      numericValue: 1500,
      suffix: "+",
      label: "Pastors Trained in Nazareth",
    },
    {
      id: 3,
      icon: Tv,
      numericValue: 5,
      suffix: "M+",
      label: "7 Spirit TV Monthly Viewers",
    },
    {
      id: 4,
      icon: Globe,
      numericValue: 30,
      suffix: " Yrs",
      label: "Jubilee Years of Divine Grace",
    },
  ];

  return (
    <section className="py-20 bg-alabaster relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] border border-[#AE8F05]/30 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-sacred-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-sacred-gold">
              30 Years of Kingdom Impact
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-warm-slate tracking-tight">
            {t("impact.title") || "Our Kingdom Impact Across Nations"}
          </h2>

          <p className="mt-4 text-lg text-[#5C5854] max-w-2xl mx-auto">
            Together, through 7 Spirit TV, Pastors' College, and regional church planting, we are making an eternal difference.
          </p>
        </div>

        {/* Animated Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="ivory-glass-card rounded-3xl p-8 text-center border border-[#AE8F05]/30 transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-champagne-pearl border border-[#AE8F05]/30 text-sacred-gold mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8" />
                </div>

                <div className="text-4xl font-serif font-extrabold text-warm-slate mb-2">
                  <SlideUpCounter value={stat.numericValue} suffix={stat.suffix} className="text-4xl" />
                </div>

                <div className="text-[#5C5854] font-medium tracking-wide uppercase text-xs mt-3">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Impact Statement */}
        <div className="mt-16 ivory-glass-card rounded-3xl p-8 md:p-12 border border-[#AE8F05]/30 text-center max-w-4xl mx-auto shadow-lg">
          <h3 className="font-serif text-2xl font-bold text-warm-slate mb-4">
            Building a Global Generation of Faith
          </h3>
          <p className="text-[#5C5854] leading-relaxed font-medium text-base md:text-lg">
            For 30 years (1996 - 2026), Mission for Nation Church has been a beacon of spiritual revival.
            Through our Pastors' College campuses in Nazareth and regional centers, as well as satellite broadcasts via 7 Spirit TV,
            we empower leaders, establish local assemblies, and glorify God across all continents.
          </p>
        </div>
      </div>
    </section>
  );
}
