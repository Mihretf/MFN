import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Crown,
  UserCheck,
  Shield,
  Building2,
  BookOpen,
  Compass,
  Briefcase,
  Network,
  Globe2,
  Users,
  Award,
  Layers,
  Sparkles,
  MapPin,
  ChevronDown
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export interface LeaderMember {
  id: string;
  nameEn: string;
  nameAm: string;
  roleEn: string;
  roleAm: string;
  category: "council" | "network" | "dept";
  photoUrl?: string;
}

const LEADERS_DIRECTORY: LeaderMember[] = [
  {
    id: "l1",
    nameEn: "Pastor Dr. Tesfatsion Dawit",
    nameAm: "መጋቢ ዶ/ር ተስፋጽዮን ዳዊት",
    roleEn: "Council Member & Senior Pastor of Addis Ababa Jerusalem Local Church",
    roleAm: "የካውንስል አባል እና የአዲስ አበባ ኢየሩሳሌም አጥቢያ ዋና መጋቢ",
    category: "council",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788707849/Screenshot_2026-09-06_181144_dfwtwg.png"
  },
  {
    id: "l2",
    nameEn: "Brother Wubliqar Teklu",
    nameAm: "ወንድም ውብሊቀር ተክሉ",
    roleEn: "Council Member & General Administrator of Tele'qo LeTeweld",
    roleAm: "የካውንስል አባልና የተልዕኮ ለትውልድ ዋና አስተዳደር",
    category: "council"
  },
  {
    id: "l3",
    nameEn: "Sister Roza Shewangultu",
    nameAm: "እህት ሮዛ ሸዋንጉልቱ",
    roleEn: "Council Member & Head of Finance of Tele'qo LeTeweld",
    roleAm: "የካውንስል አባልና የተልዕኮ ለትውልድ ዋና ፋይናንስ ኃላፊ",
    category: "council"
  },
  {
    id: "l4",
    nameEn: "Pastor Daniel Niguse",
    nameAm: "ፓስተር ዳንኤል ንጉሴ",
    roleEn: "Council Head, Dean of Bible College & Adama Network Leader",
    roleAm: "የካውንስል ኃላፊ፣ የባይብል ኮሌጅ ዲን እና የአዳማ ኔትወርክ መሪ",
    category: "council"
  },
  {
    id: "l5",
    nameEn: "Pastor Paulos Hailu",
    nameAm: "ፓስተር ጳውሎስ ኃይሉ",
    roleEn: "Council Head & Nekemte Network Leader",
    roleAm: "የካውንስል ኃላፊ እና የነቀምቴ ኔትወርክ መሪ",
    category: "council"
  },
  {
    id: "l6",
    nameEn: "Sister Aynalem Merse",
    nameAm: "ሲር አይናለም መርሴ",
    roleEn: "Council Member & Burayu Network Leader",
    roleAm: "የካውንስል አባልና የቡራዩ ኔትወርክ መሪ",
    category: "council"
  },
  {
    id: "l7",
    nameEn: "Sister Aklil Girma",
    nameAm: "እህት አክሊል ግርማ",
    roleEn: "Council Member & Professional Department Leader",
    roleAm: "የካውንስል አባልና የፕሮፌሽናል ዲፓርትመንት መሪ",
    category: "council"
  },
  {
    id: "l8",
    nameEn: "Pastor Tariku Belayneh",
    nameAm: "ፓስተር ታሪኩ በላይነህ",
    roleEn: "Council Member",
    roleAm: "የካውንስል አባል",
    category: "council"
  },
  {
    id: "l9",
    nameEn: "Pastor Driba Degefa",
    nameAm: "ፓስተር ድሪባ ደገፋ",
    roleEn: "Council Member & Dire Dawa Network Leader",
    roleAm: "የካውንስል አባልና የድሬዳዋ ኔትወርክ መሪ",
    category: "council"
  },
  {
    id: "l10",
    nameEn: "Pastor Sofonias Qalbeso",
    nameAm: "ፓስተር ሶፎንያስ ቀልቤሶ",
    roleEn: "Council Member & Sawla Network Leader",
    roleAm: "የካውንስል አባልና የሳውላ ኔትወርክ መሪ",
    category: "council"
  },
  {
    id: "l11",
    nameEn: "Prophet Yared Samuel",
    nameAm: "ነብይ ያሬድ ሳሙኤል",
    roleEn: "Council Member & Head of the Healing School",
    roleAm: "የካውንስል አባልና የሂሊንግ ስኩል ኃላፊ",
    category: "council"
  },
  {
    id: "l12",
    nameEn: "Pastor Million Tegenework",
    nameAm: "ፓስተር ሚሊዮን ተገኘወርቅ",
    roleEn: "Council Member & Head of Campaign Exodus Department",
    roleAm: "የካውንስል አባልና የዘመቻ ኤክሶደስ ዲፓርትመንት ዋና ኃላፊ",
    category: "council"
  },
  {
    id: "l13",
    nameEn: "Prophet Biniyam Aboye",
    nameAm: "ነብይ ቢኒያም አቦዬ",
    roleEn: "Wolaita Sodo Network Leader",
    roleAm: "የወላይታ ሶዶ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l14",
    nameEn: "Pastor Biniyam Haile",
    nameAm: "ፓስተር ቢኒያም ኃይሌ",
    roleEn: "Bishoftu / Debre Zeit Network Leader",
    roleAm: "የቢሾፍቱ / ደብረዘይት ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l15",
    nameEn: "Pastor Israel Wondimu",
    nameAm: "ፓስተር እስራኤል ወንድሙ",
    roleEn: "Shashamene Network Leader",
    roleAm: "የሻሸመኔ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l16",
    nameEn: "Pastor Aweke Yigeremu",
    nameAm: "ፓስተር አወቀ ይገረሙ",
    roleEn: "Dilla Network Leader",
    roleAm: "የዲላ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l17",
    nameEn: "Pastor Aberash Gelebo",
    nameAm: "ፓስተር አበራሽ ገለቦ",
    roleEn: "Jinka Network Leader",
    roleAm: "የጂንካ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l18",
    nameEn: "Pastor Emebet Kabamo",
    nameAm: "ፓስተር እመቤት ካባሞ",
    roleEn: "Hosanna Network Leader",
    roleAm: "የሆሳዕና ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l19",
    nameEn: "Pastor Elizabeth Amare",
    nameAm: "ፓስተር ኤልሳቤጥ አማረ",
    roleEn: "CMC Network Leader",
    roleAm: "የሲ.ኤም.ሲ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l20",
    nameEn: "Pastor Senait Mulugeta",
    nameAm: "ፓስተር ሰናይት ሙሉጌታ",
    roleEn: "Bethel Network Leader",
    roleAm: "የቤቴል ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l21",
    nameEn: "Pastor Beyene Tekalign",
    nameAm: "ፓስተር በየነ ተካልኝ",
    roleEn: "Jimma Network Leader",
    roleAm: "የጅማ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l22",
    nameEn: "Pastor Eyob Alemu",
    nameAm: "ፓስተር ኢዮብ ዓለሙ",
    roleEn: "Salem Network Leader",
    roleAm: "የሳይለም ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l23",
    nameEn: "Pastor Tesfaye Regasa",
    nameAm: "ፓስተር ተስፋዬ ረጋሳ",
    roleEn: "Asella Network Leader",
    roleAm: "የአሰላ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l24",
    nameEn: "Pastor Solomon Buraqa",
    nameAm: "ፓስተር ሰለሞን ቡራቃ",
    roleEn: "Arba Minch Coordination Center Leader",
    roleAm: "አርባምንጭ ማስተባበሪያ ማዕከል መሪ",
    category: "network"
  },
  {
    id: "l25",
    nameEn: "Pastor Zacharias Bayu",
    nameAm: "ፓስተር ዘካሪያስ ባዩ",
    roleEn: "Assistant Pastor of Jerusalem Local Church",
    roleAm: "የኢየሩሳሌም አጥቢያ ረዳት ፓስተር",
    category: "dept"
  },
  {
    id: "l26",
    nameEn: "Pastor Surafel Tefera",
    nameAm: "ፓስተር ሱራፌል ተፈራ",
    roleEn: "Head of Evangelism Dept & President of Ethiopian Evangelists Association",
    roleAm: "የወንጌል ዲፓርትመንት ኃላፊና የኢትዮጵያ የወንጌል ማህበርተኞች ፕሬዚዳንት",
    category: "dept"
  },
  {
    id: "l27",
    nameEn: "Pastor Hana Getachew",
    nameAm: "ፓስተር ሀና ጌታቸው",
    roleEn: "Head of Intercession Department",
    roleAm: "የምልጃ ዲፓርትመንት ኃላፊ",
    category: "dept"
  },
  {
    id: "l28",
    nameEn: "Youth Prophet Nebiyu Samuel",
    nameAm: "ወጣት ነብዩ ሳሙኤል",
    roleEn: "National Youth Ministry Leader",
    roleAm: "አገር አቀፍ የወጣቶች አገልግሎት ኃላፊ",
    category: "dept"
  },
  {
    id: "l29",
    nameEn: "Teacher Endale Chala",
    nameAm: "አስተማሪ እንዳለ ጫላ",
    roleEn: "Secretary of Network Coordination Office, Head of Planning & Monitoring",
    roleAm: "የኔትወርኮች ማስተባበሪያ ቢሮ ፀሐፊ፣ የእቅድና ክትትል ክፍል ኃላፊ እና የኢየሩሳሌም አጥቢያ አስተዳደር",
    category: "dept"
  },
  {
    id: "l30",
    nameEn: "Teacher Biniyam Gebrehiwot",
    nameAm: "አስተማሪ ቢኒያም ገ/ህይወት",
    roleEn: "Network Coordination Office & Jerusalem Local Church Finance",
    roleAm: "የኔትወርኮች ማስተባበሪያ ቢሮና የኢየሩሳሌም አጥቢያ ፋይናንስ",
    category: "dept"
  },
  {
    id: "l31",
    nameEn: "Worship Leader Beki Kebede",
    nameAm: "ዘማሪ ቤኪ ከበደ",
    roleEn: "National & Jerusalem Local Church Choir & Worship Leader",
    roleAm: "አገር አቀፍና የኢየሩሳሌም አጥቢያ የዘማሪዎችና የመዘምራን ኃላፊ",
    category: "dept"
  },
  {
    id: "l32",
    nameEn: "Brother Yonas Alemayehu",
    nameAm: "ወንድም ዮናስ አለማየሁ",
    roleEn: "National Head of Construction Affairs",
    roleAm: "አገር አቀፍ የግንባታ ጉዳይ ኃላፊ",
    category: "dept"
  },
  {
    id: "l33",
    nameEn: "Pastor Daniel Hailu",
    nameAm: "ፓስተር ዳንኤል ኃይሉ",
    roleEn: "Tepi Network Leader",
    roleAm: "የቴፒ ኔትወርክ ዋና መሪ",
    category: "network"
  },
  {
    id: "l34",
    nameEn: "Pastor Yoseph Amerga",
    nameAm: "ፓስተር ዮሴፍ አመርጋ",
    roleEn: "Assistant Leader of Bethel Network",
    roleAm: "የቤቴል ኔትወርክ ረዳት መሪ",
    category: "network"
  }
];

const LOCAL_NETWORKS = [
  { en: "Eyerusalem Center", am: "ኢየሩሳሌም ማዕከል" },
  { en: "Nazerate Center", am: "ናዝሬት ማዕከል" },
  { en: "Burayu", am: "ቡራዩ" },
  { en: "Nikemete", am: "ነቀምቴ" },
  { en: "Hawasa", am: "ሐዋሳ" },
];

const INT_CHURCHES = [
  { en: "North Sudan (Khartoum)", am: "ሰሜን ሱዳን (ካርቱም)" },
  { en: "United Arab Emirates (Dubai)", am: "ተባበሩት አረብ ኤምሬትስ (ዱባይ)" },
  { en: "Turkey (Istanbul)", am: "ቱርክ (ኢስታንቡል)" },
  { en: "Denmark (Copenhagen)", am: "ዴንማርክ (ኮፐንሃገን)" },
  { en: "Sweden (Stockholm)", am: "ስዊድን (ስቶክሆልም)" },
  { en: "United States (Las Vegas)", am: "አሜሪካ (ላስ ቬጋስ)" }
];

const MINISTRY_TEAMS = [
  { en: "Worship & Choir Ministries", am: "የዘማሪዎችና የመዘምራን አገልግሎት" },
  { en: "Mothers' Choir", am: "የእናቶች መዘምራን" },
  { en: "Prayer Ministry", am: "የጸሎት አገልግሎት" },
  { en: "Intercession Ministry", am: "የምልጃ አገልግሎት" },
  { en: "Prophetic Ministry", am: "የነቢይነት አገልግሎት" },
  { en: "Teaching Ministry", am: "የትምህርት አገልግሎት" },
  { en: "Deacons Ministry", am: "የዲያቆናት አገልግሎት" },
  { en: "Home Cell Ministry", am: "የቤት ለቤት ጸሎትና ሕብረት (ሴል)" },
  { en: "Youth Ministry", am: "የወጣቶች አገልግሎት" },
  { en: "Teenagers Ministry", am: "የታዳጊዎች አገልግሎት" },
  { en: "Children's Ministry", am: "የሕፃናት አገልግሎት" },
  { en: "Practical Christianity Ministry", am: "የተግባራዊ ክርስትና አገልግሎት" },
  { en: "Gospel Outreach Ministry", am: "የጀማ ወንጌል ስርጭት" },
  { en: "Visitors Ministry", am: "የእንግዶች ተቀባይ አገልግሎት" },
  { en: "Media Ministry (24h TV)", am: "የሚዲያ አገልግሎት (24 ሰዓት)" },
  { en: "Technical & Sound Ministry", am: "የቴክኒክና ሳውንድ አገልግሎት" },
  { en: "Football & Sports Ministry", am: "የእግር ኳስና ስፖርት አገልግሎት" },
  { en: "Literature & Theatre Ministry", am: "የስነ-ጽሑፍና ቴአትር አገልግሎት" },
  { en: "Business & Economic Ministry", am: "የቢዝነስና ኢኮኖሚ አገልግሎት" },
  { en: "Pastoral & Eldership Staff", am: "የመጋቢዎችና የሽማግሌዎች አካል" },
  { en: "Specialized Outreach Ministries", am: "ልዩ ልዩ የዘመቻ አገልግሎቶች" }
];

export function OrgStructure() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language === "am" ? "am" : "en");
  const isAm = lang === "am";

  return (
    <section className="py-20 bg-alabaster dark:bg-gray-950 text-warm-slate dark:text-gray-100 relative overflow-hidden transition-colors">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-champagne-pearl/40 dark:bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Language Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 pb-8 border-b border-[#AE8F05]/20">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] dark:bg-gray-900 border border-[#AE8F05]/30 shadow-sm mb-3">
              <Sparkles className="w-4 h-4 text-sacred-gold" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sacred-gold">
                {isAm ? "የተቋማዊ መዋቅር እና የአገልግሎት ማዕከላት" : "Institutional Structure & Global Directory"}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-warm-slate dark:text-white">
              {isAm ? "የተልዕኮ ለትውልድ ቤተ ክርስቲያን መዋቅር" : "Organizational Structure & Governance"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5C5854] dark:text-gray-400 max-w-2xl">
              {isAm 
                ? "ከሐዋርያዊ አመራር እስከ 130+ አጥቢያዎች እና ዓለም አቀፍ ማዕከላት ያለዉ የተቀናጀ የመዋቅር ፍሰት" 
                : "Sequential flow from Divine Vision & Apostolic Leadership to 130+ Global Local Assemblies and Specialized Ministries."}
            </p>
          </div>

          {/* Bilingual Switcher */}
          <div className="flex items-center bg-[#F7E7CE] dark:bg-gray-800 p-1.5 rounded-2xl border border-[#AE8F05]/30 shadow-md">
            <button
              onClick={() => { setLang("en"); i18n.changeLanguage("en"); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                !isAm 
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#AE8F05] text-white shadow-lg scale-105" 
                  : "text-warm-slate dark:text-gray-300 hover:text-sacred-gold"
              }`}
            >
              ENGLISH
            </button>
            <button
              onClick={() => { setLang("am"); i18n.changeLanguage("am"); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                isAm 
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#AE8F05] text-white shadow-lg scale-105" 
                  : "text-warm-slate dark:text-gray-300 hover:text-sacred-gold"
              }`}
            >
              አማርኛ
            </button>
          </div>
        </div>

        {/* SECTION 1: Leadership & Administrative Hierarchy */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text uppercase tracking-wider">
              {isAm ? "ክፍል 1: ሐዋርያዊ እና አስተዳደራዊ መዋቅር" : "Section 1: Leadership & Administrative Hierarchy"}
            </h3>
            <div className="w-24 h-1 bg-[#AE8F05] mx-auto mt-3 rounded-full" />
          </div>

          <div className="relative max-w-4xl mx-auto space-y-12">
            
            {/* Connecting Line */}
            <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-[#D4AF37] via-[#AE8F05] to-[#7E6503] opacity-30 rounded-full z-0 hidden md:block" />

            {/* Root: GOD */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 max-w-md mx-auto"
            >
              <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 text-center border-2 border-[#D4AF37] shadow-2xl hover:scale-[1.02] transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#AE8F05] text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Crown className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-sacred-gold block">DIVINE AUTHORITY</span>
                <h4 className="font-serif text-2xl font-black text-warm-slate dark:text-white mt-1">
                  {isAm ? "እግዚአብሔር (የመለኮት ጥሪ እና ራዕይ)" : "GOD (Divine Calling and Vision)"}
                </h4>
                <p className="text-xs text-[#5C5854] dark:text-gray-400 mt-2 font-medium">
                  {isAm ? "የአገልግሎቱ ባለቤት፣ ምንጭ እና መሪ" : "The Supreme Sovereign Head and Vision Giver of Mission for Nation"}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center text-sacred-gold">
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Tier 2: Founder & Apostle */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10 max-w-lg mx-auto"
            >
              <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 text-center border border-[#AE8F05]/40 shadow-xl hover:scale-[1.02] transition-transform">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#D4AF37] shadow-md">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/di5zfjqlt/image/upload/v1773571945/photo_2026-03-15_13-51-33_rus4x4.jpg"
                    alt="Apostle Dr. Zelalem Getachew"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-sacred-gold px-3 py-1 rounded-full bg-[#F7E7CE] dark:bg-gray-800">
                  FOUNDER & VISIONARY APOSTLE
                </span>
                <h4 className="font-serif text-2xl font-extrabold text-warm-slate dark:text-white mt-3">
                  {isAm ? "ባለራዕይ ሐዋርያ (ሐዋርያ ዶ/ር ዘለአለም ጌታቸው)" : "Apostle Dr. Zelalem Getachew"}
                </h4>
                <p className="text-xs text-[#5C5854] dark:text-gray-300 mt-2 font-medium">
                  {isAm ? "የተልዕኮ ለትውልድ መሥራች እና ዋና መሪ (President of EVCF, ECGBC Exec)" : "Founder & General Overseer (President of EVCF, Executive Member of ECGBC)"}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center text-sacred-gold">
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Tier 3: Apostolic Council */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 max-w-xl mx-auto"
            >
              <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 text-center border border-[#AE8F05]/30 shadow-lg hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sacred-gold">HIGHEST GOVERNING BODY</span>
                <h4 className="font-serif text-xl font-bold text-warm-slate dark:text-white mt-1">
                  {isAm ? "ሐዋርያዊ ቡድን / ካውንስል (12 አባላት)" : "Apostolic Council (12 Key Executive Members)"}
                </h4>
                <p className="text-xs text-[#5C5854] dark:text-gray-400 mt-1">
                  {isAm ? "ስልታዊ መምሪያ፣ የዶክትሪንና የፖሊሲ ውሳኔ ሰጪ አካል" : "Strategic Directive Body overseeing Doctrine, Global Missions & Governance"}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center text-sacred-gold">
              <ChevronDown className="w-6 h-6" />
            </div>

            {/* Tier 4: 4 Main Pillars Grid */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-2xl p-5 text-center border border-[#AE8F05]/30 hover:border-[#D4AF37] hover:scale-[1.02] transition-all">
                <Building2 className="w-8 h-8 text-sacred-gold mx-auto mb-3" />
                <h5 className="font-serif font-bold text-base text-warm-slate dark:text-white">
                  {isAm ? "ቤተክርስቲያን ማዕከል" : "Church Ministry Center"}
                </h5>
                <p className="text-[11px] text-[#5C5854] dark:text-gray-400 mt-2">
                  {isAm ? "የአምልኮ፣ የቃል እና የምእመናን እረኝነት ማዕከል" : "Local Assemblies, Worship & Pastoral Care"}
                </p>
              </div>

              <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-2xl p-5 text-center border border-[#AE8F05]/30 hover:border-[#D4AF37] hover:scale-[1.02] transition-all">
                <BookOpen className="w-8 h-8 text-sacred-gold mx-auto mb-3" />
                <h5 className="font-serif font-bold text-base text-warm-slate dark:text-white">
                  {isAm ? "የመጽሐፍ ቅዱስ ኮሌጅ" : "Bible College"}
                </h5>
                <p className="text-[11px] text-[#5C5854] dark:text-gray-400 mt-2">
                  {isAm ? "የአዳማ እና ነቀምቴ ሁለገብ ኮሌጆች" : "Adama & Nekemte Multipurpose Theological Colleges"}
                </p>
              </div>

              <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-2xl p-5 text-center border border-[#AE8F05]/30 hover:border-[#D4AF37] hover:scale-[1.02] transition-all">
                <Compass className="w-8 h-8 text-sacred-gold mx-auto mb-3" />
                <h5 className="font-serif font-bold text-base text-warm-slate dark:text-white">
                  {isAm ? "የጀማ ወንጌል እና የነብያት ማሰልጠኛ" : "Gospel Outreach & Prophetic Training"}
                </h5>
                <p className="text-[11px] text-[#5C5854] dark:text-gray-400 mt-2">
                  {isAm ? "ወንጌል ስርጭት እና የነብያት ትምህርት ቤት" : "Evangelistic Campaigns & Prophetic School"}
                </p>
              </div>

              <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-2xl p-5 text-center border border-[#AE8F05]/30 hover:border-[#D4AF37] hover:scale-[1.02] transition-all">
                <Briefcase className="w-8 h-8 text-sacred-gold mx-auto mb-3" />
                <h5 className="font-serif font-bold text-base text-warm-slate dark:text-white">
                  {isAm ? "የቢዝነስ ማዕከል" : "Business Center"}
                </h5>
                <p className="text-[11px] text-[#5C5854] dark:text-gray-400 mt-2">
                  {isAm ? "ፋይናንስ፣ ልማት እና ዘበንዊ ፕሮጀክቶች" : "Financial Systems, Assets & Development"}
                </p>
              </div>
            </motion.div>

            {/* Tier 5 Cascade Flow */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative z-10 bg-[#FFFFF0]/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-lg text-center"
            >
              <h4 className="font-serif text-lg font-bold text-warm-slate dark:text-white mb-4">
                {isAm ? "የኔትወርክ ማዕከላት አስተዳደር ፍሰት (Cascade Flow)" : "Operational Cascade Flow"}
              </h4>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-semibold">
                <div className="px-4 py-2 rounded-xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold border border-[#AE8F05]/20">
                  {isAm ? "1. የኔትወርክ ማዕከላት ማስተባበሪያ ቢሮ" : "1. Network Centers Coordination Office"}
                </div>
                <span className="text-sacred-gold font-bold">→</span>
                <div className="px-4 py-2 rounded-xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold border border-[#AE8F05]/20">
                  {isAm ? "2. የኔትወርክ ማዕከላት መሪዎች" : "2. Network Center Leaders"}
                </div>
                <span className="text-sacred-gold font-bold">→</span>
                <div className="px-4 py-2 rounded-xl bg-champagne-pearl dark:bg-gray-800 text-sacred-gold border border-[#AE8F05]/20">
                  {isAm ? "3. የአጥቢያ መሪዎችና መጋቢዎች" : "3. Branch Pastors & Local Leaders"}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* SECTION 2: Global Network & Ministries Directory */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text uppercase tracking-wider">
              {isAm ? "ክፍል 2: አገር አቀፍና ዓለም አቀፍ የአገልግሎት ማውጫ" : "Section 2: Global Network & Ministries Directory"}
            </h3>
            <div className="w-24 h-1 bg-[#AE8F05] mx-auto mt-3 rounded-full" />
          </div>

          {/* Subsection C Milestone Banner */}
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            className="mb-16 rounded-3xl p-8 bg-gradient-to-r from-[#D4AF37] via-[#AE8F05] to-[#7E6503] text-white shadow-2xl text-center relative overflow-hidden"
          >
            <Award className="w-12 h-12 mx-auto mb-3 text-white drop-shadow-md" />
            <h4 className="font-serif text-3xl sm:text-5xl font-black tracking-tight">
              {isAm ? "130+ አጥቢያ ቤተክርስቲያናት በ16 ማዕከላት" : "130+ Local Churches Across 16 Network Centers"}
            </h4>
            <p className="mt-3 text-sm sm:text-base text-white/90 font-medium max-w-3xl mx-auto">
              {isAm 
                ? "በኢትዮጵያ፣ አፍሪካ፣ መካከለኛ ምስራቅ፣ አውሮፓ እና አሜሪካ የተዘረጉ የበለጸጉ አጥቢያዎች እና 350+ የሙሉ ጊዜ አገልጋዮች"
                : "Spanning Ethiopia, Africa, the Middle East, Europe, and North America with over 350+ full-time ministers & 150+ volunteer professionals."}
            </p>
          </motion.div>

          {/* Grid Layout: Local Networks & International Churches */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Subsection A: Local Network Centers */}
            <div className="lg:col-span-7 ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-xl">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#AE8F05]/20">
                <Network className="w-6 h-6 text-sacred-gold" />
                <h4 className="font-serif text-xl font-bold text-warm-slate dark:text-white">
                  {isAm ? "ሀገር ውስጥ የኔትወርክ ማዕከላት (17+)" : "Local Regional Network Centers (17+)"}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LOCAL_NETWORKS.map((loc, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 p-3 rounded-xl bg-alabaster/70 dark:bg-gray-900/60 border border-[#AE8F05]/15 hover:border-[#D4AF37] transition-colors">
                    <MapPin className="w-4 h-4 text-sacred-gold flex-shrink-0" />
                    <span className="text-xs font-semibold text-warm-slate dark:text-gray-200">
                      {isAm ? loc.am : loc.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subsection B: International Churches */}
            <div className="lg:col-span-5 ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-8 border border-[#AE8F05]/30 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#AE8F05]/20">
                  <Globe2 className="w-6 h-6 text-sacred-gold" />
                  <h4 className="font-serif text-xl font-bold text-warm-slate dark:text-white">
                    {isAm ? "ዓለም አቀፍ አጥቢያዎች" : "International Branches"}
                  </h4>
                </div>

                <div className="space-y-3">
                  {INT_CHURCHES.map((ch, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-alabaster/70 dark:bg-gray-900/60 border border-[#AE8F05]/15 hover:border-[#D4AF37] transition-colors">
                      <div className="flex items-center space-x-3">
                        <Globe2 className="w-4 h-4 text-sacred-gold" />
                        <span className="text-xs font-bold text-warm-slate dark:text-gray-100">
                          {isAm ? ch.am : ch.en}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#F7E7CE] dark:bg-gray-800 text-sacred-gold">
                        Active Branch
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subsection E: Final Assembly */}
              <div className="mt-8 pt-6 border-t border-[#AE8F05]/20 bg-[#F7E7CE]/40 dark:bg-gray-900/80 p-4 rounded-2xl text-center">
                <Users className="w-6 h-6 text-sacred-gold mx-auto mb-1" />
                <h5 className="font-serif font-bold text-sm text-warm-slate dark:text-white">
                  {isAm ? "ጉባኤ (ምዕመናን - እስራኤል)" : "General Assembly (\"Gubaé\" / Israel)"}
                </h5>
                <p className="text-[11px] text-[#5C5854] dark:text-gray-400 mt-1">
                  {isAm ? "የመላው ምዕመናን እና የክርስቶስ አካል የመጨረሻ መሰብሰቢያ" : "The Collective Congregation & Sovereign Body of Believers"}
                </p>
              </div>
            </div>
          </div>

          {/* Subsection D: Excellence & Ministry Teams */}
          <div className="ivory-glass-card dark:bg-[#1F1D1A]/90 rounded-3xl p-6 md:p-10 border border-[#AE8F05]/30 shadow-xl mb-16">
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-[#AE8F05]/20">
              <Layers className="w-7 h-7 text-sacred-gold" />
              <div>
                <h4 className="font-serif text-2xl font-bold text-warm-slate dark:text-white">
                  {isAm ? "የልህቀት ማዕከላት እና የአገልግሎት ክፍል ቡድኖች" : "Excellence Teams & Ministry Departments"}
                </h4>
                <p className="text-xs text-[#5C5854] dark:text-gray-400 mt-1">
                  {isAm ? "በየዘርፉ የተሰማሩ የልህቀት ማዕከላትና የበጎ ፈቃድ ባለሙያዎች" : "Over 20 Specialized Ministerial Teams & 150+ Volunteer Professionals"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {MINISTRY_TEAMS.map((team, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-alabaster/60 dark:bg-gray-900/60 border border-[#AE8F05]/20 hover:border-[#D4AF37] hover:scale-[1.02] transition-all flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-sacred-gold flex-shrink-0" />
                  <span className="text-xs font-bold text-warm-slate dark:text-gray-200">
                    {isAm ? team.am : team.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FULL DIRECTORY: Leaders Cards */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-warm-slate dark:text-white">
                {isAm ? "የካውንስል አባላት፣ የኔትወርክና የዲፓርትመንት መሪዎች ማውጫ" : "Council Members, Network Leaders & Section Heads Directory"}
              </h4>
              <p className="text-xs sm:text-sm text-[#5C5854] dark:text-gray-400 mt-2 max-w-xl mx-auto">
                {isAm ? "የተልዕኮ ለትውልድ አገልግሎትን በታማኝነት የሚመሩ መሪዎች" : "Faithful Leaders & Ministers guiding the vision across all local and national networks."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEADERS_DIRECTORY.map((leader) => (
                <motion.div
                  key={leader.id}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  className="ivory-glass-card dark:bg-[#1F1D1A]/95 rounded-2xl p-5 border border-[#AE8F05]/30 hover:border-[#D4AF37] hover:scale-[1.02] transition-all flex items-start space-x-4 shadow-md"
                >
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-champagne-pearl dark:bg-gray-800 border border-[#AE8F05]/40 flex-shrink-0 flex items-center justify-center shadow-sm">
                    {leader.photoUrl ? (
                      <ImageWithFallback
                        src={leader.photoUrl}
                        alt={leader.nameEn}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <UserCheck className="w-7 h-7 text-sacred-gold" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-sacred-gold px-2 py-0.5 rounded-md bg-[#F7E7CE]/60 dark:bg-gray-800 inline-block mb-1">
                      {leader.category === "council" ? "COUNCIL MEMBER" : leader.category === "network" ? "NETWORK LEADER" : "DEPARTMENT HEAD"}
                    </span>
                    <h5 className="font-serif font-bold text-sm text-warm-slate dark:text-white truncate">
                      {isAm ? leader.nameAm : leader.nameEn}
                    </h5>
                    <p className="text-xs text-[#5C5854] dark:text-gray-300 font-medium leading-tight mt-1">
                      {isAm ? leader.roleAm : leader.roleEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
