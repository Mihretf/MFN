import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Sparkles,
  Award,
  BookOpen,
  Building2,
  Users,
  Globe2,
  Heart,
  TrendingUp,
  ShieldCheck,
  Tv,
  CheckCircle2,
  ExternalLink,
  Play
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { OrgStructure } from "../components/ui/OrgStructure";

export function AboutUs() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<"en" | "am">(i18n.language === "am" ? "am" : "en");
  const isAm = lang === "am";

  return (
    <div className="pt-24 pb-16 bg-alabaster dark:bg-gray-950 text-warm-slate dark:text-gray-100 min-h-screen transition-colors">
      
      {/* Top Banner / Hero */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-b from-[#F7E7CE]/40 via-transparent to-transparent dark:from-[#AE8F05]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="flex justify-center mb-6">
            <div className="flex items-center bg-[#F7E7CE] dark:bg-gray-800 p-1.5 rounded-2xl border border-[#AE8F05]/30 shadow-md">
              <button
                onClick={() => { setLang("en"); i18n.changeLanguage("en"); }}
                className={`px-5 py-2 rounded-xl font-bold text-xs transition-all ${
                  !isAm 
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#AE8F05] text-white shadow-md scale-105" 
                    : "text-warm-slate dark:text-gray-300 hover:text-sacred-gold"
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => { setLang("am"); i18n.changeLanguage("am"); }}
                className={`px-5 py-2 rounded-xl font-bold text-xs transition-all ${
                  isAm 
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#AE8F05] text-white shadow-md scale-105" 
                    : "text-warm-slate dark:text-gray-300 hover:text-sacred-gold"
                }`}
              >
                አማርኛ
              </button>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] dark:bg-gray-900 border border-[#AE8F05]/30 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-sacred-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-sacred-gold">
              {isAm ? "የ30 ዓመታት የእግዚአብሔር ታማኝነት (1996 - 2026)" : "30 Years of Divine Grace & Impact (1996 - 2026)"}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-warm-slate dark:text-white tracking-tight mb-6">
            {isAm ? "የተልዕኮ ለትውልድ ቤተ ክርስቲያን አጭር ታሪክ" : "A Brief History of Mission for Nation Church"}
          </h1>

          <p className="text-base sm:text-xl text-[#5C5854] dark:text-gray-300 leading-relaxed max-w-4xl mx-auto font-medium">
            {isAm 
              ? "የዛሬ 32 ዓመት በአዲስ አበባ አውቶቡስ ተራ አካባቢ በአንድ የ19 ዓመት ወጣት የተጀመረው የመለኮት ራዕይ፣ ዛሬ አገር አቀፍና ዓለም አቀፍ ተፅዕኖ የፈጠረ ተቋም ሆኗል፡፡"
              : "Laid 32 years ago by a 19-year-old table-tennis player—today Apostle Dr. Zelalem Getachew—Mission for Nation has grown from a kitchen fellowship of six to a global institutional network."}
          </p>
        </div>
      </section>

      {/* History Narrative & Apostle Photos Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Narrative Text */}
            <div className="lg:col-span-7 space-y-6 ivory-glass-card dark:bg-[#1F1D1A]/95 rounded-3xl p-8 md:p-10 border border-[#AE8F05]/30 shadow-xl">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-warm-slate dark:text-white">
                {isAm ? "የጅማሮው ታሪክ እና የሐዋርያው ጉዞ" : "Origin Story & Apostle's Journey"}
              </h2>

              <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-[#5C5854] dark:text-gray-300 leading-relaxed space-y-4 font-normal">
                {isAm ? (
                  <>
                    <p>
                      የተልዕኮ ለትውልድ ቤተ ክርስቲያን እንደ ተቋም ከመዋቀሩ በፊት የተጠነሰሰው የዛሬ 32 ዓመት ራዕዩን በተቀበለው አንድ የ19 ዓመት ወጣት የብሔራዊ ቡድን ጠረዼዛ ቴኒስ ተጫዋች፣ የዛሬው <strong>ሐዋርያ ዶ/ር ዘላለም ጌታቸው</strong>፣ እዚሁ አዲስ አበባ ውስጥ አውቶቡስ ተራ አካባቢ ነበር፡፡ ራዕዩ የተገለጠበት ሚሽን ፎር ኔሽን (MISSION FOR NATION) የሚለው የመጀመሪያ ድምጽ፣ በወቅቱ ቃል በቃል ተልዕኮ ለትውልድ የሚል ተቀራራቢ ፍቺ ተሰጥቶታል፡፡
                    </p>
                    <p>
                      ሐዋርያ ዶ/ር ዘላለም ጌታቸው በአሁኑ ሰዓት የአንድ ሚስት ባል እና የሶስት ልጆች አባት ሲሆን፣ አገልጋይ የሆኑ አንድ ወንድም እና ሶስት እህቶች አሉት፡፡ በአሁኑ ወቅት የኢትዮጵያ ወንጌል አማኞች አብያተ ክርስቲያናት ካውንስል (ECGBC) የሥራ አስፈፃሚ አባል እና የወቅቱ የኢትዮጵያ ቪዥነሪ አብያተ ክርስቲያናት ሕብረት (EVCF) ፕሬዝዳንት ነው፡፡
                    </p>
                    <p>
                      ተልዕኮ ለትውልድ ቤተ ክርስቲያን ከላይ በተጠቀሰው አካባቢ በሚገኝ የሐዋርያው ወላጆች ምግብ ማብሰያ ኩሽና ውስጥ ቁጥራቸው ከስድስት የማይበልጡ ወጣቶችን በማስተማር የዛሬ 30 ዓመት በይፋ ተጀመረ፡፡ እጅግ ፈታኝ የሆኑ የጅማሮ ዓመታቱን ገፍቶ በ1995 ዓ.ም የወቅቱ ሕጋዊ ፈቃድ ሰጪ ከሆነው የኢፌዲሪ ፍትሕ ሚኒስቴር <strong>912ኛ ሆኖ በመመዝገብ</strong> ሕጋዊ ፈቃድ እና እውቅና አገኘ፡፡
                    </p>
                    <p>
                      የተልዕኮ ለትውልድ ቤተ ክርስቲያን ለመጀመሪያ ጊዜ በብር 70 በተከራየው አፈር ቤት ለመጀመሪያ ጊዜ በታሪክ ከምእመናን <strong>2 ብር ከሰላሳ አምስት ሳንቲም</strong> ገቢ እንዳደረገ ይወሳል፡፡
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Before <strong>Mission for Nation Church</strong> was formally established as an institution, its foundation was laid 32 years ago in the Bus Station area of Addis Ababa by a 19-year-old young man who had received the vision—today known as <strong>Apostle Dr. Zelalem Getachew</strong>, who at the time was a national table-tennis player. The first expression of the vision was “MISSION FOR NATION,” which at the time was given the closely corresponding Amharic meaning “ተልዕኮ ለትውልድ”.
                    </p>
                    <p>
                      Apostle Dr. Zelalem Getachew is currently a husband to one wife and a father of three children. He has one brother and three sisters who are also engaged in ministry. At present, he is an executive member of the <strong>Ethiopian Evangelical Churches Believers Council (ECGBC)</strong> and the current President of the <strong>Ethiopian Visionary Churches Fellowship (EVCF)</strong>.
                    </p>
                    <p>
                      Mission for Nation Church officially began 30 years ago by teaching a group of no more than six young people in the kitchen of the Apostle's parents. After going through extremely challenging early years, the church obtained legal registration, license, and recognition in <strong>1995 E.C.</strong>, becoming the <strong>912th organization registered by the Ministry of Justice of FDRE</strong>.
                    </p>
                    <p>
                      It is recorded that, during its early history, Mission for Nation Church held its first services in a rented basement for <strong>70 Ethiopian Birr</strong>, and received its first recorded offering from its members amounting to <strong>2 Birr and 35 cents</strong>.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Right Photos & Media Highlights */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Photo 1: Starting at 19 */}
              <div className="ivory-glass-card dark:bg-[#1F1D1A]/95 rounded-3xl p-4 border border-[#AE8F05]/30 shadow-lg group">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/droslno9i/image/upload/v1788691829/9b6cf1d4-9c00-42d8-8709-c52067bd319d_auqtmk.jpg"
                    alt="Apostle starting ministry at age 19"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white text-xs font-semibold">
                    {isAm ? "ሐዋርያው በ19 ዓመቱ አገልግሎቱን ሲጀምሩ (Bus Station Area)" : "Apostle Dr. Zelalem Getachew at age 19 starting the vision"}
                  </div>
                </div>
              </div>

              {/* Photos Grid: Graduation & PHD */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl overflow-hidden aspect-square border border-[#AE8F05]/30 shadow-md group">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/droslno9i/image/upload/v1788694065/FB_IMG_1788680250348_fjuyj6.jpg"
                    alt="Apostle Graduation 1"
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square border border-[#AE8F05]/30 shadow-md group">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/droslno9i/image/upload/v1788694065/FB_IMG_1788680484395_fq0qp2.jpg"
                    alt="Apostle Graduation 2"
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square border border-[#AE8F05]/30 shadow-md group">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/droslno9i/image/upload/v1788694065/FB_IMG_1788680275136_hm9znx.jpg"
                    alt="Apostle Graduation 3"
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* YouTube PHD Distinction Feature Card */}
              <a
                href="https://www.youtube.com/watch?si=pvq5IHwD9SAM3gbs&v=ZSQ6_PLRGWQ&feature=youtu.be"
                target="_blank"
                rel="noopener noreferrer"
                className="block ivory-glass-card dark:bg-[#1F1D1A]/95 rounded-3xl p-5 border border-[#AE8F05]/40 shadow-xl hover:border-[#D4AF37] hover:scale-[1.02] transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sacred-gold">
                      HERITAGE OF FAITH BIBLE INSTITUTE
                    </span>
                    <h4 className="font-serif text-sm font-bold text-warm-slate dark:text-white truncate">
                      PHD with Distinction Ceremony - South Africa
                    </h4>
                    <p className="text-xs text-[#5C5854] dark:text-gray-400">
                      #heritage_of_faith #PHD_with_distinction #Apostle_Zelalem_Getachew
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sacred-gold" />
                </div>
              </a>

            </div>

          </div>
        </div>
      </section>

      {/* 10 Major Achievements / Significance Section */}
      <section className="py-20 bg-champagne-pearl/20 dark:bg-gray-900/50 border-y border-[#AE8F05]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-warm-slate dark:text-white tracking-tight">
              {isAm ? "የተልዕኮ ለትውልድ የመፈጠሩ ፋይዳ እና የተመዘገቡ አበይት ውጤቶች" : "What Is the Significance of the Establishment of Mission for Nation?"}
            </h2>
            <p className="mt-4 text-base text-[#5C5854] dark:text-gray-300 font-medium">
              {isAm 
                ? "ባለፉት 30 የአገልግሎት ዓመታት በተቋሙ ምክንያት የተመዘገቡት 10 አበይት ውጤቶችና ታሪካዊ ፋይዳዎች" 
                : "A review of the major achievements recorded as a result of the institution's 30 years of ministry."}
            </p>
            <div className="w-20 h-1 bg-[#AE8F05] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Point 1 */}
            <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-lg hover:scale-[1.01] transition-transform">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold font-serif font-bold text-lg flex items-center justify-center border border-[#AE8F05]/30">
                  1
                </div>
                <h3 className="font-serif text-xl font-bold text-warm-slate dark:text-white">
                  {isAm ? "1. ከአንድ ሰው ወደ ተስፋፋ ኔትወርክ" : "1. From One Person to a Growing Network"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5854] dark:text-gray-300 leading-relaxed font-normal">
                {isAm 
                  ? "አገልግሎቱ የተጀመረው ከአንድ ሰው (ከሐዋርያው) ነው፣ ዛሬ ግን ከአዲስ አበባ ኢየሩሳሌም አጥቢያ በተጨማሪ በ16 የኔትወርክ ማዕከላት ስር ያሉ እና በባለራዕይ አመራር (Visionary Leadership) የሚመሩ ከ130 በላይ አጥቢያዎች በአገር ውስጥና በውጪ አገራት ማለትም በአፍሪካ፣ በመካከለኛ ምስራቅ፣ በአውሮፓ፣ እና በአሜሪካ መስርቷል፡፡ ከ350 ለማያንሱ የሙሉ ጊዜ አገልጋዮች እና ከ150 በላይ ለሆኑ የበጎ ፈቃድ ባለሙያዎች የሥራ መስክ ፈጥሯል፡፡"
                  : "The ministry began with one person—the Apostle. Today, in addition to its Jerusalem local church in Addis Ababa, it has established more than 130 local churches under 16 network centers across Africa, the Middle East, Europe, and America, creating employment for 350+ full-time ministers and 150+ volunteer professionals."}
              </p>
            </div>

            {/* Point 2 */}
            <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-lg hover:scale-[1.01] transition-transform">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold font-serif font-bold text-lg flex items-center justify-center border border-[#AE8F05]/30">
                  2
                </div>
                <h3 className="font-serif text-xl font-bold text-warm-slate dark:text-white">
                  {isAm ? "2. ከስድስት ወጣቶች ወደ ዓለም አቀፍ ተደራሽነት" : "2. From Six Young People to Global Reach"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5854] dark:text-gray-300 leading-relaxed font-normal">
                {isAm 
                  ? "ተልዕኮ ለትውልድ ስድስት ወጣቶችን ከማገልገል ነው የጀመረው፣ ዛሬ ዓለም አቀፍ ማህበረሰቡን በቀላሉ በሰከንዶች ውስጥ መድረስ የሚችልበት አቅም የፈጠረ ተቋም ሆኖአል፡፡"
                  : "Mission for Nation began by serving just six young people. Today, it has developed into an institution with the capacity to reach the global community within seconds through modern communication and media technologies."}
              </p>
            </div>

            {/* Point 3 */}
            <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-lg hover:scale-[1.01] transition-transform">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold font-serif font-bold text-lg flex items-center justify-center border border-[#AE8F05]/30">
                  3
                </div>
                <h3 className="font-serif text-xl font-bold text-warm-slate dark:text-white">
                  {isAm ? "3. የራሱ ቦታ ከሌለው ወደ የራሱ ማዕከላት ግንባታ" : "3. From Having No Property to Building Its Own Centers"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5854] dark:text-gray-300 leading-relaxed font-normal">
                {isAm 
                  ? "ተልዕኮ ለትውልድ የራሱ የሆነ ቦታ ሳይኖረው አገልግሎቱን ቢጀምርም፣ ዛሬ በልዩ ልዩ ከተሞች የራሱን ማዕከላት የመገንባት አቅም ላይ ደርሷል፡፡ በአዳማ እና በነቀምቴ የተገነቡ ሁለገብ ኮሌጆች እና በአዲስ አበባ የተገነባው ዘመናዊ ባለ 6 ፎቅ ህንጻ እና የማምለኪያ አዳራሽ ለዚህ ጉልህ ማሳያዎች ናቸው፡፡"
                  : "Although Mission for Nation began its ministry without its own premises, it has built multipurpose colleges in Adama and Nekemte, as well as a modern six-story building and worship hall constructed in Addis Ababa."}
              </p>
            </div>

            {/* Point 4 */}
            <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-lg hover:scale-[1.01] transition-transform">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold font-serif font-bold text-lg flex items-center justify-center border border-[#AE8F05]/30">
                  4
                </div>
                <h3 className="font-serif text-xl font-bold text-warm-slate dark:text-white">
                  {isAm ? "4. የሰዎችን ህይወት በልዩ ልዩ መርሃ-ግብሮች መለወጥ" : "4. Transforming People's Lives Through Multiple Ministries"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5854] dark:text-gray-300 leading-relaxed font-normal">
                {isAm 
                  ? "ወደ ተቋሙ የሚመጡ ሰዎች ከቆይታ በኋላ በቤተ ክርስቲያን አገልግሎት (Church Ministry) ፣ በትምህርት (Bible School) ፣ በጀማ ወንጌል እና የነብያት ማሰልጠኛ (Gospel Outreach & Prophets Training Center) እና በቢዝነስ (Business) መርሐ-ግብሮች ታቅፈው፣ የአመለካከት ለውጥ በማምጣት ራዕይ እንዲሰንቁ ይደረጋል፡፡"
                  : "People come from many backgrounds and are incorporated into Church Ministry, Bible School, Gospel Outreach & Prophets Training Center, and Business programs, enabling a complete transformation of perspective and vision."}
              </p>
            </div>

            {/* Point 5 */}
            <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-lg hover:scale-[1.01] transition-transform">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold font-serif font-bold text-lg flex items-center justify-center border border-[#AE8F05]/30">
                  5
                </div>
                <h3 className="font-serif text-xl font-bold text-warm-slate dark:text-white">
                  {isAm ? "5. አዳዲስ የአገልግሎት ባህሎችን ማስተዋወቅና መሥራት" : "5. Introducing and Establishing New Ministry Cultures"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5854] dark:text-gray-300 leading-relaxed font-normal">
                {isAm 
                  ? "ሐዋርያነት፣ ስልጣንን የመቀበል አጀንዳ፣ የእምነት ተቋማትንና መሪዎቻቸውን በልዩ ልዩ ሚዲያ ማስተዋወቅ፣ አማራጭ የአብያተ ክርስቲያናት ሕብረት መመስረት፣ በማህበራዊ፣ ኢኮኖሚያዊ እና ፖለቲካዊ ጉዳዮች ዙሪያ ትምህርት መስጠት እና በአገርና በትውልድ ጉዳይ የእግዚአብሔርን አቋም ይፋ ማድረግን ባህል አድርጓል፡፡"
                  : "Pioneered the apostolic ministry, recognition of spiritual authority, broadcasting faith institutions on media, forming alternative church fellowships, and speaking on social, economic, and national issues according to the Word of God."}
              </p>
            </div>

            {/* Point 6 */}
            <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-lg hover:scale-[1.01] transition-transform">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold font-serif font-bold text-lg flex items-center justify-center border border-[#AE8F05]/30">
                  6
                </div>
                <h3 className="font-serif text-xl font-bold text-warm-slate dark:text-white">
                  {isAm ? "6. የፋይናንስና አስተዳደር ስርዓቶችን ማልማት" : "6. Development of Financial & Administrative Systems"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5854] dark:text-gray-300 leading-relaxed font-normal">
                {isAm 
                  ? "ዛሬ ከ100 በላይ የሚሆኑ ተንቀሳቃሽ ሒሳቦች ያሉት፣ ዓመታዊ የሒሳብ እንቅስቃሴውን መንግስት ፈቃድ በሰጣቸው ኦዲት ፈርሞች የሚያስመረምር፣ በግብር ክፍያ ስመ-ጥሩ የሆነ እና ለአገሪቱ ፋይናንስ እንቅስቃሴ ድርሻውን የተወጣ ተቋም ሆኗል፡፡"
                  : "Now maintains more than 100 active financial accounts, audited annually by government-licensed audit firms, maintaining an exemplary record in fulfilling tax obligations and financial stewardship."}
              </p>
            </div>

            {/* Point 7 */}
            <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-lg hover:scale-[1.01] transition-transform">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold font-serif font-bold text-lg flex items-center justify-center border border-[#AE8F05]/30">
                  7
                </div>
                <h3 className="font-serif text-xl font-bold text-warm-slate dark:text-white">
                  {isAm ? "7. ለሌሎች ተቋማትና አገራዊ ልማት የገንዘብ ድጋፍ" : "7. Support for Other Institutions & National Development"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5854] dark:text-gray-300 leading-relaxed font-normal">
                {isAm 
                  ? "የተልዕኮ ለትውልድ ገቢ በዋናነት ከአስራትና መባ የሚሰበሰብ ቢሆንም፣ በየዓመቱ ከብር ከ1 ሚሊዮን ያላነሰ የገንዘብ ድጋፍ ለሌሎች መሰል ተቋማት እና ለአገራዊ የልማት ተግባራት ከአስራት አስራት ሒሳቡ ድጋፍ እያደረገ የመጣ ተቋም ነው፡፡"
                  : "Despite relying primarily on member tithes and offerings, the church consistently provides at least one million Ethiopian Birr annually from tithe funds to support other institutions and national development projects."}
              </p>
            </div>

            {/* Point 8 */}
            <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-lg hover:scale-[1.01] transition-transform">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold font-serif font-bold text-lg flex items-center justify-center border border-[#AE8F05]/30">
                  8
                </div>
                <h3 className="font-serif text-xl font-bold text-warm-slate dark:text-white">
                  {isAm ? "8. የሚዲያ አገልግሎትን ማሳደግ" : "8. Development of Media Ministry"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5854] dark:text-gray-300 leading-relaxed font-normal">
                {isAm 
                  ? "የሚዲያ አገልግሎቱን ከበራሪ ወረቀት እና የቴፕ ካሴት የጀመረው ተልዕኮ ለትውልድ፣ በአሁኑ ሰዓት የተደራጀ እና ለብዙ ባለሙያዎች የሥራ እድል የፈጠረ የ24 ሰዓት የቴሌቪዥን ፕሮግራም (7 Spirit TV) አለው፡፡"
                  : "Evolved from flyers and cassette tapes into an organized 24-hour television broadcasting network (7 Spirit TV), creating employment opportunities for many media professionals."}
              </p>
            </div>

            {/* Point 9 */}
            <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-lg hover:scale-[1.01] transition-transform md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold font-serif font-bold text-lg flex items-center justify-center border border-[#AE8F05]/30">
                  9 & 10
                </div>
                <h3 className="font-serif text-xl font-bold text-warm-slate dark:text-white">
                  {isAm ? "9 & 10. የክርስቲያን ህብረት ማደግ እና ዘመናዊ የተቋም አስተዳደር" : "9 & 10. Evangelical Church Fellowships & Management Manuals"}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-[#5C5854] dark:text-gray-300 leading-relaxed">
                <div>
                  <h4 className="font-bold text-warm-slate dark:text-white mb-1">
                    {isAm ? "9. የወንጌል አማኞች ሕብረት ማደግ" : "9. Contribution to Church Fellowships"}
                  </h4>
                  <p>
                    {isAm 
                      ? "በአገር አቀፍ ደረጃ ከነበረው አንድ ሕብረት ባለፈ በርካታ አማራጭ ሕብረቶች ከመቋቋማቸውም በላይ ወንጌል አማኙ ማህበረሰብ እንደ አንደ ሃይማኖት በአዋጅ የጸደቀ ሕጋዊ እውቅና ባገኘበት ሂደት ውስጥ የተልዕኮ ለትውልድ ድርሻ ከፍተኛ ነው፡፡"
                      : "Played a pivotal role in establishing alternative evangelical fellowships and securing official legal recognition for evangelical Christians through government proclamation."}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-warm-slate dark:text-white mb-1">
                    {isAm ? "10. የተቋም አስተዳደር ስርዓቶች" : "10. Institutional Management Systems"}
                  </h4>
                  <p>
                    {isAm 
                      ? "የሰው ሃብት አስተዳደር ማኑዋል፣ የሂሳብ አስተዳደር ማኑዋል፣ የስነ-ምግባር ደንብ እና መሪ እቅድ (Strategic Plan) አዘጋጅቶ አገልግሎት የመስጠት ፕሮፌሽናል ባህል አዳብሯል፡፡"
                      : "Developed comprehensive HR Manuals, Financial Management Manuals, Codes of Ethics, and Strategic Plans, fostering an increasingly professional culture of service."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Message of Gratitude */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="ivory-glass-card dark:bg-[#1F1D1A]/95 rounded-3xl p-8 sm:p-12 border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden">
            <Heart className="w-12 h-12 text-sacred-gold mx-auto mb-4 animate-pulse" />
            <h2 className="font-serif text-3xl font-extrabold text-warm-slate dark:text-white mb-4">
              {isAm ? "የምስጋና መልእክት" : "A Message of Gratitude"}
            </h2>
            <p className="text-base sm:text-lg text-[#5C5854] dark:text-gray-200 leading-relaxed max-w-2xl mx-auto font-medium">
              {isAm 
                ? "በዚህ ሁሉ የረዳንን እግዚአብሔርን ከሁሉም በላይ ለማመስገን እንወዳለን፡፡ በዚሁ አጋጣሚ ባሳለፍናቸው 30 የአገልግሎት ዓመታት ከጎናችን በመሆን አብራችሁን ለሠራችሁ፣ በልዩ ልዩ መንገድ ለረዳችሁን እና ላገዛችሁን ሁሉ ልባዊ ምስጋናችንን እናቀርባለን፡፡"
                : "Above all, we would like to give thanks to God, who has helped us throughout this journey. We would also like to express our heartfelt gratitude to everyone who has stood beside us and worked with us throughout these 30 years of ministry."}
            </p>
            <div className="mt-6 pt-6 border-t border-[#AE8F05]/20">
              <span className="font-serif font-bold text-[#AE8F05] text-lg uppercase tracking-wider block">
                Mission for Nation Church / የተልዕኮ ለትውልድ ቤተ ክርስቲያን
              </span>
              <span className="text-xs text-[#5C5854] dark:text-gray-400 mt-1 block">
                {isAm ? "መጋቢት 1/2018 ዓ.ም" : "March 2026"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Organizational Structure Component */}
      <OrgStructure />

    </div>
  );
}
