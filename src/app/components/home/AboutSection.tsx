import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Sparkles, GraduationCap, Building2, Users, ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Data ─────────────────────────────────────────────────────────────
const MAIN_LEADERS = [
  {
    nameEn: "Pastor Dr. Tesfatsion Dawit",
    nameAm: "መጋቢ ዶ/ር ተስፋጽዮን ዳዊት",
    roleEn: "Council Member & Senior Pastor, Addis Ababa Jerusalem Local Church",
    roleAm: "የካውንስል አባል እና የአዲስ አበባ ኢየሩሳሌም አጥቢያ ዋና መጋቢ",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788754481/photo_5834843952614411947_y_zgqdco.jpg",
  },
  {
    nameEn: "Pastor Daniel Niguse",
    nameAm: "ፓስተር ዳንኤል ንጉሴ",
    roleEn: "Council Head, Dean of Bible College & Adama Network Leader",
    roleAm: "የካውንስል ኃላፊ፣ የባይብል ኮሌጅ ዲን እና የአዳማ ኔትወርክ መሪ",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788753339/photo_5832592152800727176_y_pceso7.jpg",
  },
  {
    nameEn: "Pastor Paulos Hailu",
    nameAm: "ፓስተር ጳውሎስ ኃይሉ",
    roleEn: "Council Head & Nekemte Network Leader",
    roleAm: "የካውንስል ኃላፊ እና የነቀምቴ ኔትወርክ መሪ",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788753339/photo_5832592152800727193_y_1_wmqcmx.jpg",
  },
  {
    nameEn: "Sister Aynalem Merse",
    nameAm: "ሲር አይናለም መርሴ",
    roleEn: "Council Member & Burayu Network Leader",
    roleAm: "የካውንስል አባልና የቡራዩ ኔትወርክ መሪ",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788753339/photo_2025-03-30_15-28-05_-_Aynalem_Mersie_1_s6lgji.jpg",
  },
  {
    nameEn: "Prophet Yared Samuel",
    nameAm: "ነብይ ያሬድ ሳሙኤል",
    roleEn: "Council Member & Head of the Healing School",
    roleAm: "የካውንስል አባልና የሂሊንግ ስኩል ኃላፊ",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788753339/Screenshot_20260906-203454_Facebook_ouead5.jpg",
  },
];

// ── Animated Stat Counter ─────────────────────────────────────────
function StatBar({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(value / 60);
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 25);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-extrabold text-[#D4AF37]"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {count}{suffix}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
        className="text-sm mt-1 text-[#5C5854] font-semibold uppercase tracking-wider"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {label}
      </motion.p>
    </div>
  );
}

// ── Leader Card (full image, hover effect) ────────────────────────
function LeaderCard({
  leader,
  isAm,
  index,
}: {
  leader: (typeof MAIN_LEADERS)[0];
  isAm: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-[#AE8F05]/20 hover:border-[#D4AF37]/60 hover:-translate-y-2"
      style={{ aspectRatio: "3/4" }}
    >
      {/* Full image */}
      <ImageWithFallback
        src={leader.photoUrl}
        alt={leader.nameEn}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Gold ambient glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ boxShadow: "inset 0 -80px 80px rgba(212,175,55,0.18)" }} />

      {/* Text info */}
      <div className="absolute bottom-0 inset-x-0 p-5 text-white">
        <h3
          className="font-bold text-base leading-tight"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {isAm ? leader.nameAm : leader.nameEn}
        </h3>
        <p className="text-white/75 text-xs mt-1 leading-snug" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {isAm ? leader.roleAm : leader.roleEn}
        </p>
      </div>
    </motion.div>
  );
}

// ── History Timeline Item ─────────────────────────────────────────
function TimelineItem({
  year,
  title,
  text,
  imgSrc,
  imgAlt,
  reverse,
  index,
}: {
  year: string;
  title: string;
  text: string;
  imgSrc: string;
  imgAlt: string;
  reverse: boolean;
  index: number;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(textRef, { once: true, margin: "-80px" });

  return (
    <div className={`flex flex-col lg:flex-row gap-10 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
      {/* Text side */}
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 space-y-3"
      >
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/15 text-[#AE8F05] border border-[#D4AF37]/30 uppercase tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {year}
        </span>
        <h3 className="text-xl font-bold text-[#2C2A28]" style={{ fontFamily: "'Cinzel', serif" }}>
          {title}
        </h3>
        <p className="text-[#5C5854] leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {text}
        </p>
      </motion.div>

      {/* Photo side */}
      <motion.div
        ref={imgRef}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 rounded-3xl overflow-hidden shadow-xl border border-[#AE8F05]/20 hover:shadow-2xl transition-all duration-500"
        style={{ aspectRatio: "16/9" }}
      >
        <ImageWithFallback
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
        />
      </motion.div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────
export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const isAm = i18n.language === "am";
  const [expanded, setExpanded] = useState(false);

  const historyItems = [
    {
      year: "1994",
      title: "A Vision Ignited",
      text: "A 19-year-old national table-tennis player received a divine vision in the Bus Station area of Addis Ababa. He was Apostle Dr. Zelalem Getachew, and the name given was Mission For Nation—\"ተልዕኮ ለትውልድ.\"",
      imgSrc: "https://res.cloudinary.com/droslno9i/image/upload/v1788691829/9b6cf1d4-9c00-42d8-8709-c52067bd319d_auqtmk.jpg",
      imgAlt: "Apostle Dr. Zelalem Getachew starting the vision",
    },
    {
      year: "Early Years",
      title: "Kitchen Fellowship of Six",
      text: "The church began by teaching a group of no more than six young people in the kitchen of the Apostle's parents—a humble beginning that would grow into a global movement.",
      imgSrc: "https://res.cloudinary.com/droslno9i/image/upload/v1788694065/FB_IMG_1788680250348_fjuyj6.jpg",
      imgAlt: "Early fellowship gathering",
    },
    {
      year: "1995 E.C.",
      title: "Legal Recognition",
      text: "After extremely challenging early years, the church obtained legal registration—becoming the 912th organization registered by the Ministry of Justice of FDRE. Services were first held in a rented basement for just 70 Birr.",
      imgSrc: "https://res.cloudinary.com/droslno9i/image/upload/v1788694065/FB_IMG_1788680484395_fq0qp2.jpg",
      imgAlt: "Church legal registration",
    },
  ];

  return (
    <section className="py-24 w-full" style={{ background: "linear-gradient(180deg, #FAF8F5 0%, #FDFBF7 100%)" }}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">

        {/* ── Stat Counter Bar ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-3xl p-8 border border-[#D4AF37]/30 shadow-xl"
          style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(255,255,255,0.9) 100%)", backdropFilter: "blur(16px)" }}
        >
          <div className="grid grid-cols-3 gap-8 divide-x divide-[#D4AF37]/20">
            <StatBar value={30} suffix="+" label="Years of Grace" delay={0} />
            <StatBar value={130} suffix="+" label="Global Branches" delay={0.15} />
            <StatBar value={350} suffix="+" label="Full-time Ministers" delay={0.3} />
          </div>
        </motion.div>

        {/* ── History Timeline ─────────────────────────────────── */}
        <div className="space-y-14">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] border border-[#AE8F05]/30 shadow-sm mb-4"
            >
              <Sparkles className="w-4 h-4 text-[#AE8F05]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#AE8F05]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {isAm ? "አጭር ታሪክ" : "A Brief History"}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-extrabold text-[#2C2A28] tracking-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {isAm ? "የተልዕኮ ለትውልድ ቤተክርስቲያን ታሪክ" : "A Brief History of Mission for Nation Church"}
            </motion.h2>
          </div>

          {/* Timeline items */}
          <div className="space-y-16">
            {historyItems.map((item, idx) => (
              <TimelineItem
                key={idx}
                year={item.year}
                title={item.title}
                text={item.text}
                imgSrc={item.imgSrc}
                imgAlt={item.imgAlt}
                reverse={idx % 2 !== 0}
                index={idx}
              />
            ))}
          </div>

          {/* Read More CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center pt-4"
          >
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #AE8F05 60%, #7E6503 100%)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span>Read the Full History</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <p className="text-[#5C5854] text-sm mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Discover the complete story on our About Us page
            </p>
          </motion.div>
        </div>

        {/* ── Key Leaders ──────────────────────────────────────── */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] border border-[#AE8F05]/30 shadow-sm mb-4"
            >
              <Users className="w-4 h-4 text-[#AE8F05]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#AE8F05]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {isAm ? "ዋና መሪዎች" : "Key Leaders"}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-extrabold text-[#2C2A28] tracking-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {isAm ? "የተልዕኮ ለትውልድ ዋና መሪዎች" : "Mission for Nation Key Leaders"}
            </motion.h2>
          </div>

          {/* Leaders grid — full image cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {MAIN_LEADERS.map((leader, idx) => (
              <LeaderCard key={idx} leader={leader} isAm={isAm} index={idx} />
            ))}
          </div>
        </div>

        {/* ── Bible Colleges ────────────────────────────────────── */}
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-extrabold text-[#2C2A28] tracking-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {isAm ? "የመጽሐፍ ቅዱስ ኮሌጆች" : "Our Bible Colleges"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-4 text-lg text-[#5C5854]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Equipping and training leaders to serve nations with the Word of God.
            </motion.p>
          </div>

          {/* Wisdom Bible College */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#AE8F05]/20 hover:shadow-2xl hover:border-[#D4AF37]/40 transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#F7E7CE] rounded-xl text-[#AE8F05]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2C2A28]" style={{ fontFamily: "'Cinzel', serif" }}>
                    Wisdom Bible College
                  </h3>
                </div>
                <div className="prose text-[#5C5854] text-base leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <p>Wisdom Bible College began its first college program in Adama City in 2007. From 2007 to 2009, the college trained and graduated <strong>200 ministers</strong>.</p>
                  <p>In 2010, the college reorganized its educational structure and upgraded its academic system. From 2010 to 2015, it trained an additional <strong>100 ministers</strong>.</p>
                </div>
                <div className="flex items-center space-x-4 bg-[#F7E7CE]/30 p-4 rounded-xl border border-[#AE8F05]/20">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/droslno9i/image/upload/v1788719771/edf02d27-d6f1-403f-8be8-a44bba579d9e_gldgvd.jpg"
                    alt="Pastor Daniel Nigussie"
                    className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-white shadow-md"
                  />
                  <div>
                    <p className="font-bold text-[#2C2A28]" style={{ fontFamily: "'Cinzel', serif" }}>Pastor Daniel Nigussie</p>
                    <p className="text-sm text-[#5C5854]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Dean of Wisdom Bible College</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/droslno9i/image/upload/v1788719771/photo_5832592152800727173_y_v4hviw.jpg"
                    alt="Wisdom Bible College 1"
                    className="w-full h-56 object-cover object-top"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/droslno9i/image/upload/v1788720173/photo_5823683063483927700_w_sqotx6.jpg"
                    alt="Wisdom Bible College 2"
                    className="w-full h-56 object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Nekemte College */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#AE8F05]/20 hover:shadow-2xl hover:border-[#D4AF37]/40 transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-4 order-last lg:order-first">
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/droslno9i/image/upload/v1788720069/ca42cfa97f1b445b8803d7aac0ffa9bb_dyszza.jpg"
                    alt="Nekemte College Construction"
                    className="w-full h-56 object-cover object-top"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/droslno9i/image/upload/v1788719770/photo_5832592152800727195_y_fskc0n.jpg"
                    alt="Nekemte College Planning"
                    className="w-full h-56 object-cover object-top"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#F7E7CE] rounded-xl text-[#AE8F05]">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2C2A28]" style={{ fontFamily: "'Cinzel', serif" }}>
                    Nekemte Afan Oromo Bible College
                  </h3>
                </div>
                <div className="prose text-[#5C5854] text-base leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <p>The Nekemte Afan Oromo Bible College is preparing for its future mission, currently completing a massive <strong>5-story building</strong> that has reached the 4th floor of construction.</p>
                </div>
                <div className="flex items-center space-x-4 bg-[#F7E7CE]/30 p-4 rounded-xl border border-[#AE8F05]/20">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/droslno9i/image/upload/v1788719770/photo_5832592152800727193_y_a69ivl.jpg"
                    alt="Pastor Paulos Hailu"
                    className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-white shadow-md"
                  />
                  <div>
                    <p className="font-bold text-[#2C2A28]" style={{ fontFamily: "'Cinzel', serif" }}>Pastor Paulos Hailu</p>
                    <p className="text-sm text-[#5C5854]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Nekemte Network Leader</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}