import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Download, BookOpen } from "lucide-react";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const isAm = i18n.language === "am";
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const fullTextEn = "Mission for Nation International";
  const fullTextAm = "ተልዕኮ ለትውልድ ዓለም አቀፍ";
  const fullText = isAm ? fullTextAm : fullTextEn;

  // Typewriter effect
  useEffect(() => {
    setTypewriterText("");
    setTypewriterIndex(0);

    const interval = setInterval(() => {
      setTypewriterIndex((prev) => {
        if (prev >= fullText.length) {
          clearInterval(interval);
          setShowCursor(false);
          return prev;
        }
        setTypewriterText(fullText.slice(0, prev + 1));
        return prev + 1;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isAm, fullText]);

  // Blinking cursor
  useEffect(() => {
    if (typewriterIndex >= fullText.length) return;
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, [typewriterIndex, fullText.length]);

  return (
    <section className="relative overflow-hidden min-h-screen w-full">
      {/* Background Video - covers entire hero section */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://res.cloudinary.com/droslno9i/video/upload/v1788715993/%E1%8A%A5%E1%8A%95%E1%8A%B3%E1%8A%95_%E1%8B%B0%E1%88%B5_%E1%8A%A0%E1%88%88%E1%8A%95__%E1%8B%A8%E1%89%A4%E1%89%B0%E1%8A%AD%E1%88%AD%E1%88%B5%E1%89%B2%E1%8B%AB%E1%8A%95_%E1%88%9D%E1%88%A8%E1%89%83_1_e1meu0.mp4"
          type="video/mp4"
        />
      </video>

      {/* Minimal transparent overlay to keep real video colors fully visible */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Content Overlay */}
      <div className="w-full px-4 sm:px-6 lg:px-12 relative z-20 flex flex-col justify-center min-h-screen pt-20">
        <div className="max-w-5xl mx-auto space-y-7 text-center">

          {/* Typewriter Badge */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[#F7E7CE] text-xs font-semibold tracking-widest uppercase border border-white/20 shadow-lg">
            <span className="font-mono">
              {typewriterText}
              {showCursor && <span className="animate-pulse text-[#D4AF37]">|</span>}
            </span>
          </span>

          {/* Headline */}
          <h1
            className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08]"
            style={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              textShadow: "0 3px 20px rgba(0,0,0,0.75)",
              wordSpacing: "0.04em",
            }}
          >
            {isAm
              ? "እንኳን ወደ ተልዕኮ ለትውልድ ዓለም አቀፍ በደህና መጡ"
              : <>
                  Welcome to{" "}
                  <span className="text-[#D4AF37] font-extrabold">
                    Mission For Nation
                  </span>{" "}
                  International
                </>
            }
          </h1>

          {/* Subtitle / motto */}
          <p
            className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium"
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              textShadow: "0 2px 10px rgba(0,0,0,0.7)",
            }}
          >
            {t("hero.moto") ||
              "Building lives, reaching nations, and establishing God's kingdom across the globe."}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Link
              to="/services"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AE8F05] to-[#7E6503] text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              style={{ letterSpacing: "0.01em" }}
            >
              <span>{t("hero.joinUs") || "Join Our Services"}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="https://mfni.church/apk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-black/60 transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5 text-[#D4AF37]" />
              <span>Mobile App</span>
            </a>

            <a
              href="https://mfni.church/members/home"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-black/60 transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
              <span>Digital Library</span>
            </a>
          </div>

          {/* Description */}
          <p
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-normal"
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            Listen to sermons, discover powerful teachings, and get new sermons
            every week. Download audio, read books, and connect with the global
            Mission For Nation community.
          </p>
        </div>
      </div>
    </section>
  );
}