import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Download, BookOpen } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateTextReveal, animateOnScrollTextMotion, animateRotating3D, initAnimations, killAllAnimations, prefersReducedMotion } from "../../lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t, i18n } = useTranslation();
  const isAm = i18n.language === "am";
  const heroRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mottoRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    initAnimations();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      animateTextReveal("[data-hero-badge]", { type: "chars", stagger: 0.02, duration: 0.8, y: 20 });
      animateOnScrollTextMotion("[data-hero-title]", { type: "chars", stagger: 0.015, y: 40, rotateX: 20, blur: 8, scrub: 1, start: "top 90%", end: "top 10%" });
      animateTextReveal("[data-hero-motto]", { type: "words", stagger: 0.03, duration: 0.9, y: 30 });
      animateTextReveal("[data-hero-desc]", { type: "lines", stagger: 0.05, duration: 0.8, y: 25 });

      // Rotating 3D animation on video container (Codrops variation 1 - subtle rotateY)
      if (videoContainerRef.current) {
        gsap.set(videoContainerRef.current, { perspective: 1000, transformStyle: "preserve-3d" });
        gsap.to(videoContainerRef.current, {
          rotateY: 15,
          rotateX: 5,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => {
      ctx.revert();
      killAllAnimations();
    };
  }, []);

  return (
    <section ref={heroRef} className="bg-alabaster pt-32 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Text Content - Overlay on Video */}
        <div className="max-w-4xl mx-auto space-y-6 relative z-20">
          <span 
            ref={badgeRef}
            data-hero-badge
            className="inline-block px-4 py-1.5 rounded-full bg-[#F7E7CE] text-sacred-gold text-xs font-extrabold tracking-wider uppercase border border-[#AE8F05]/30"
          >
            {isAm ? "ተልዕኮ ለትውልድ ዓለም አቀፍ" : "Mission for Nation International"}
          </span>

          <h1 
            ref={titleRef}
            data-hero-title
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-warm-slate tracking-tight leading-[1.15]"
          >
            {t("hero.welcome") || (isAm ? "እንኳን ወደ ተልዕኮ ለትውልድ ዓለም አቀፍ በደህና መጡ" : "Welcome to Mission For Nation International")}
          </h1>

          <p 
            ref={mottoRef}
            data-hero-motto
            className="text-lg sm:text-xl text-[#3A3834] max-w-2xl mx-auto font-sans leading-relaxed font-medium"
          >
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
              <BookOpen className="w-5 h-5 text-sacred-gold" />
              <span>Digital Library</span>
            </a>
          </div>

          <p 
            ref={descRef}
            data-hero-desc
            className="text-base sm:text-lg text-[#3A3834] max-w-2xl mx-auto font-bold leading-relaxed"
          >
            This is a mobile app and website where you can listen to sermons, discover powerful teachings, and get new sermons every week. Download sermons with the audio player, read books and buy online.
          </p>
        </div>

        {/* Video Behind Text - with 3D rotation on scroll */}
        <div 
          ref={videoContainerRef}
          className="absolute inset-0 -z-10 max-w-5xl mx-auto mt-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-full min-h-[60vh] max-h-[70vh] object-cover"
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
}
