const fs = require('fs');
const heroContent = import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Download, User } from "lucide-react";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const isAm = i18n.language === "am";

  return (
    <section className="bg-alabaster pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Main Text Content */}
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F7E7CE] text-sacred-gold text-xs font-extrabold tracking-wider uppercase border border-[#AE8F05]/30">
            {isAm ? "ተልዕኮ ለትውልድ ዓለም አቀፍ" : "Mission for Nation International"}
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-warm-slate tracking-tight leading-[1.15]">
            {t("hero.welcome") || (isAm ? "እንኳን ወደ ተልዕኮ ለትውልድ ዓለም አቀፍ በደህና መጡ" : "Welcome to Mission For Nation International")}
          </h1>

          <p className="text-lg sm:text-xl text-[#3A3834] max-w-2xl mx-auto font-sans leading-relaxed font-medium">
            {t("hero.moto") || "Building lives, reaching nations, and establishing God's kingdom across the globe."}
          </p>

          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Link
              to="/services"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AE8F05] to-[#7E6503] text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>{t("hero.joinUs") || "Join Our Services"}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="https://mfni.church/apk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-white border border-[#AE8F05]/40 text-warm-slate font-bold hover:bg-[#F7E7CE] transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5 text-sacred-gold" />
              <span>Mobile App</span>
            </a>
            
            <a
              href="https://mfni.church/members/home"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-white border border-[#AE8F05]/40 text-warm-slate font-bold hover:bg-[#F7E7CE] transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <User className="w-5 h-5 text-sacred-gold" />
              <span>Members Home</span>
            </a>
          </div>

          <p className="text-sm text-[#5C5854] max-w-2xl mx-auto font-medium">
            This is a mobile app and website where you can listen to sermons, discover powerful teachings, and get new sermons every week. Download sermons with the audio player.
          </p>
        </div>

        {/* Video Below Text */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-white max-w-5xl mx-auto">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full max-h-[70vh] object-cover"
          >
            <source
              src="https://res.cloudinary.com/droslno9i/video/upload/v1788715993/%E1%8A%A5%E1%8A%95%E1%8A%B3%E1%8A%95_%E1%8B%B0%E1%88%B5_%E1%8A%A0%E1%88%88%E1%8A%95__%E1%8B%A8%E1%89%A4%E1%89%B0%E1%8A%AD%E1%88%AD%E1%88%B5%E1%89%B2%E1%8B%AB%E1%8A%95_%E1%88%9D%E1%88%A8%E1%89%83_1_e1meu0.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        
      </div>
    </section>
  );
}\;
fs.writeFileSync('src/app/components/home/Hero.tsx', heroContent);
