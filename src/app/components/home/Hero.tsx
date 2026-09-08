import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useInView, Variants } from "framer-motion";
import { ArrowRight, BookOpen, Download, Star, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Character-split animation helpers ──────────────────────────────
const splitChars = (text: string) =>
  text.split("").map((ch, i) => ({ ch, i }));

const charVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.025, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const wordVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025 } },
};

// ── Floating badge component ────────────────────────────────────────
function FloatingBadge({
  icon,
  stat,
  label,
  delay,
  className,
}: {
  icon: React.ReactNode;
  stat: string;
  label: string;
  delay: number;
  className: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-30 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: delay * 0.5 }}
        className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3 min-w-[160px]"
      >
        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-white font-bold text-lg leading-none font-serif">{stat}</p>
          <p className="text-white/75 text-xs mt-0.5 font-sans leading-tight">{label}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Hero ───────────────────────────────────────────────────────
export default function Hero() {
  const { t, i18n } = useTranslation();
  const isAm = i18n.language === "am";
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // GSAP parallax on video
  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(videoRef.current, { y: "30%", ease: "none" }, 0);
    tl.to(overlayRef.current, { opacity: 0.7, ease: "none" }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const title1 = "Welcome to";
  const title2 = isAm ? "ተልዕኮ ለትውልድ ዓለም አቀፍ" : "Mission For Nation";
  const title3 = isAm ? "" : "International";

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden min-h-screen w-full flex items-center"
    >
      {/* ── Background Video (parallax target) ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-[115%] object-cover z-0 will-change-transform"
        style={{ top: "-7.5%" }}
      >
        <source
          src="https://res.cloudinary.com/droslno9i/video/upload/v1788715993/%E1%8A%A5%E1%8A%95%E1%8A%B3%E1%8A%95_%E1%8B%B0%E1%88%B5_%E1%8A%A0%E1%88%88%E1%8A%95__%E1%8B%A8%E1%89%A4%E1%89%B0%E1%8A%AD%E1%88%AD%E1%88%B5%E1%89%B2%E1%8B%AB%E1%8A%95_%E1%88%9D%E1%88%A8%E1%89%83_1_e1meu0.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── Gradient overlay ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(250,248,245,0.45) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* bottom fade for smooth section transition */}
      <div className="absolute bottom-0 inset-x-0 h-40 z-10 pointer-events-none bg-gradient-to-t from-[#FAF8F5] to-transparent" />

      {/* ── Floating Stat Badges ── */}
      <FloatingBadge
        icon={<Star className="w-5 h-5" />}
        stat="30+ Years"
        label="of Grace & Ministry"
        delay={1.4}
        className="top-[28%] left-6 lg:left-12 hidden md:flex"
      />
      <FloatingBadge
        icon={<Globe className="w-5 h-5" />}
        stat="130+ Branches"
        label="Global Reach"
        delay={1.6}
        className="top-[28%] right-6 lg:right-12 hidden md:flex"
      />
      <FloatingBadge
        icon={<Star className="w-5 h-5" />}
        stat="350+ Ministers"
        label="Full-time Servants"
        delay={1.8}
        className="bottom-[18%] left-1/2 -translate-x-1/2 hidden lg:flex"
      />

      {/* ── Content ── */}
      <div
        ref={ref}
        className="w-full px-4 sm:px-6 lg:px-12 relative z-20 flex flex-col justify-center min-h-screen pt-24 pb-32"
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">

          {/* Badge / pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/25 text-white/90 text-sm font-semibold tracking-widest uppercase shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Mission for Nation International</span>
          </motion.div>

          {/* Main headline with character reveal */}
          <div>
            <motion.div
              variants={wordVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="overflow-hidden"
            >
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.06] tracking-tight"
                style={{ fontFamily: "'Cinzel', serif", fontWeight: 800, textShadow: "0 4px 24px rgba(0,0,0,0.6)" }}
              >
                {/* Line 1 */}
                <span className="block mb-1">
                  {splitChars(title1).map(({ ch, i }) => (
                    <motion.span key={i} custom={i} variants={charVariants} className="inline-block">
                      {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                  ))}
                </span>
                {/* Line 2 — Gold */}
                <span className="block text-[#D4AF37]">
                  {splitChars(title2).map(({ ch, i }) => (
                    <motion.span key={i} custom={i + title1.length} variants={charVariants} className="inline-block">
                      {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                  ))}
                </span>
                {/* Line 3 */}
                {title3 && (
                  <span className="block">
                    {splitChars(title3).map(({ ch, i }) => (
                      <motion.span key={i} custom={i + title1.length + title2.length} variants={charVariants} className="inline-block">
                        {ch === " " ? "\u00A0" : ch}
                      </motion.span>
                    ))}
                  </span>
                )}
              </h1>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
            className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
          >
            {t("hero.moto") || "Building lives, reaching nations, and establishing God's kingdom across the globe."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-4 justify-center pt-2"
          >
            {/* Gold shimmer button */}
            <Link
              to="/services"
              className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #AE8F05 50%, #7E6503 100%)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {/* Shimmer effect */}
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
                }}
              />
              <span className="relative">Explore Services</span>
              <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            {/* Digital Library button */}
            <a
              href="https://mfni.church/members/home"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 rounded-2xl bg-black/35 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-black/55 transition-all duration-300 shadow-md flex items-center gap-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <BookOpen className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-200" />
              <span>Digital Library</span>
            </a>

            {/* Mobile App button */}
            <a
              href="https://mfni.church/apk"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 rounded-2xl bg-black/35 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-black/55 transition-all duration-300 shadow-md flex items-center gap-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <Download className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-200" />
              <span>Mobile App</span>
            </a>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-col items-center gap-2 pt-4"
          >
            <p className="text-white/50 text-xs uppercase tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Scroll to Explore</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}