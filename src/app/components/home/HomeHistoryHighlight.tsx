import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Award,
  Globe2,
  Building2,
  Tv,
  ArrowRight,
  Play,
  ExternalLink,
  Users,
  GraduationCap
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export default function HomeHistoryHighlight() {
  const { i18n } = useTranslation();
  const isAm = i18n.language === "am";

  const keyAchievements = [
    {
      icon: Users,
      value: "130+",
      titleAm: "ከ130 በላይ አጥቢያዎች",
      titleEn: "130+ Local Churches",
      descAm: "በ16 የኔትወርክ ማዕከላት ስር በአገር ውስጥና በውጪ አገራት የተዘረጉ",
      descEn: "Across 16 network centers in Ethiopia, Africa, Middle East, Europe & USA"
    },
    {
      icon: GraduationCap,
      value: "350+",
      titleAm: "350+ የሙሉ ጊዜ አገልጋዮች",
      titleEn: "350+ Full-Time Ministers",
      descAm: "ለ150+ የበጎ ፈቃድ ባለሙያዎች የአገልግሎትና የሥራ መስክ የፈጠረ",
      descEn: "Plus 150+ volunteer professionals engaged in global ministry"
    },
    {
      icon: Building2,
      value: "Colleges",
      titleAm: "የአዳማ እና ነቀምቴ ሁለገብ ኮሌጆች",
      titleEn: "Adama & Nekemte Colleges",
      descAm: "በአዲስ አበባ የተገነባው ዘመናዊ ባለ 6 ፎቅ ህንጻ እና የማምለኪያ አዳራሽ",
      descEn: "Plus modern 6-story building & worship hall constructed in Addis Ababa"
    },
    {
      icon: Tv,
      value: "24/7",
      titleAm: "24 ሰዓት የቴሌቪዥን ፕሮግራም",
      titleEn: "24/7 7 Spirit TV Broadcast",
      descAm: "በበራሪ ወረቀት ከተጀመረው ሚዲያ ወደ ዓለም አቀፍ የቲቪ ስርጭት ያደገ",
      descEn: "Evolved from flyers to organized 24-hour global television network"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-alabaster via-[#F7E7CE]/30 to-alabaster dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 text-warm-slate dark:text-gray-100 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] dark:bg-gray-900 border border-[#AE8F05]/30 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-sacred-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-sacred-gold">
              {isAm ? "የ30 ዓመታት የተልዕኮና ታሪክ ማጠቃለያ" : "30-Year Heritage & Divine Impact"}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-warm-slate dark:text-white tracking-tight">
            {isAm ? "የተልዕኮ ለትውልድ ቤተ ክርስቲያን ታሪክና ፋይዳ" : "A Brief History & Kingdom Impact"}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#5C5854] dark:text-gray-300 leading-relaxed font-medium">
            {isAm 
              ? "የዛሬ 32 ዓመት በአዲስ አበባ አውቶቡስ ተራ አካባቢ በአንድ የ19 ዓመት ወጣት በሐዋርያ ዶ/ር ዘላለም ጌታቸው የተጀመረው የመለኮት ራዕይ፣ ዛሬ አገር አቀፍና ዓለም አቀፍ ተፅዕኖ የፈጠረ ተቋም ሆኗል፡፡"
              : "Founded 32 years ago by Apostle Dr. Zelalem Getachew at age 19 in the Bus Station area of Addis Ababa, Mission for Nation has transformed millions of lives across the globe."}
          </p>
        </div>

        {/* Narrative & Apostle Photos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Main Story Box */}
          <div className="lg:col-span-7 ivory-glass-card dark:bg-[#1F1D1A]/95 rounded-3xl p-8 md:p-10 border border-[#AE8F05]/30 shadow-xl space-y-5">
            <div className="inline-block px-3 py-1 rounded-full bg-[#F7E7CE] dark:bg-gray-800 text-sacred-gold text-xs font-bold uppercase tracking-wider">
              {isAm ? "የመሠረቱ ታሪክ" : "Foundational Vision"}
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-warm-slate dark:text-white">
              {isAm ? "ከስድስት ወጣቶች ኩሽና ወደ ዓለም አቀፍ አጥቢያዎች" : "From a Kitchen Fellowship of 6 to Global Impact"}
            </h3>

            <p className="text-sm sm:text-base text-[#5C5854] dark:text-gray-300 leading-relaxed">
              {isAm 
                ? "ተልዕኮ ለትውልድ ቤተ ክርስቲያን በሐዋርያው ወላጆች ምግብ ማብሰያ ኩሽና ውስጥ 6 ወጣቶችን በማስተማር 30 ዓመት በፊት ተጀመረ፡፡ በ1995 ዓ.ም በፍትሕ ሚኒስቴር 912ኛ ሆኖ ሕጋዊ ፈቃድ አገኘ፡፡ ለመጀመሪያ ጊዜ በ70 ብር በተከራየው አፈር ቤት የ2 ብር ከ35 ሳንቲም መባ የተቀበለው አገልግሎት ዛሬ ከ130+ አጥቢያዎች አሉት፡፡"
                : "Mission for Nation Church began 30 years ago by teaching six young people in the kitchen of the Apostle's parents. Legally registered in 1995 E.C. (912th organization), it held its first services in a rented basement for 70 Birr with a first offering of 2 Birr 35 cents."}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AE8F05] text-white font-bold text-sm shadow-md hover:scale-105 transition-all flex items-center space-x-2"
              >
                <span>{isAm ? "ሙሉ ታሪኩን ያንብቡ" : "Read Full Story & Achievements"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://www.youtube.com/watch?si=pvq5IHwD9SAM3gbs&v=ZSQ6_PLRGWQ&feature=youtu.be"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#FFFFF0] dark:bg-gray-900 border border-[#AE8F05]/40 text-warm-slate dark:text-white font-bold text-xs hover:bg-[#F7E7CE] transition-all flex items-center space-x-2 shadow-sm"
              >
                <Play className="w-4 h-4 text-red-600 fill-current" />
                <span>PHD Ceremony - South Africa</span>
                <ExternalLink className="w-3.5 h-3.5 text-sacred-gold" />
              </a>
            </div>
          </div>

          {/* Apostle Photos Stack */}
          <div className="lg:col-span-5 space-y-4">
            <div className="ivory-glass-card dark:bg-[#1F1D1A]/95 rounded-3xl p-3 border border-[#AE8F05]/30 shadow-xl overflow-hidden group">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] relative">
                <ImageWithFallback
                  src="https://res.cloudinary.com/droslno9i/image/upload/v1788691829/9b6cf1d4-9c00-42d8-8709-c52067bd319d_auqtmk.jpg"
                  alt="Apostle Dr. Zelalem Getachew at age 19"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 text-white text-xs font-bold">
                  {isAm ? "ሐዋርያ ዶ/ር ዘላለም ጌታቸው በ19 ዓመታቸው (1996 E.C.)" : "Apostle Dr. Zelalem Getachew at age 19"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl overflow-hidden aspect-square border border-[#AE8F05]/30 shadow-md group">
                <ImageWithFallback
                  src="https://res.cloudinary.com/droslno9i/image/upload/v1788694065/FB_IMG_1788680250348_fjuyj6.jpg"
                  alt="Graduation 1"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square border border-[#AE8F05]/30 shadow-md group">
                <ImageWithFallback
                  src="https://res.cloudinary.com/droslno9i/image/upload/v1788694065/FB_IMG_1788680484395_fq0qp2.jpg"
                  alt="Graduation 2"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square border border-[#AE8F05]/30 shadow-md group">
                <ImageWithFallback
                  src="https://res.cloudinary.com/droslno9i/image/upload/v1788694065/FB_IMG_1788680275136_hm9znx.jpg"
                  alt="Graduation 3"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* 4 Key Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyAchievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-2xl p-6 border border-[#AE8F05]/30 hover:border-[#D4AF37] hover:scale-[1.02] transition-all shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold flex items-center justify-center mb-4 border border-[#AE8F05]/20">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-serif font-extrabold text-3xl gold-gradient-text block mb-1">
                  {item.value}
                </span>
                <h4 className="font-serif font-bold text-base text-warm-slate dark:text-white mb-2">
                  {isAm ? item.titleAm : item.titleEn}
                </h4>
                <p className="text-xs text-[#5C5854] dark:text-gray-400 leading-relaxed">
                  {isAm ? item.descAm : item.descEn}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
