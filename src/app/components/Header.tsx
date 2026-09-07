import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../providers/ThemeProvider";
import IconButton from "@mui/material/IconButton";
import { gsap } from "gsap";
import { animateLogoEntrance, animateLogoHover, initAnimations, killAllAnimations, prefersReducedMotion } from "../lib/animations";

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    initAnimations();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      animateLogoEntrance("[data-logo-icon]", "[data-logo-text]");
      animateLogoHover("[data-logo-icon]");
    }, logoRef.current?.parentElement);

    return () => {
      ctx.revert();
      killAllAnimations();
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const headerStyles = isScrolled
    ? "bg-[#FFFFF0]/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-[#AE8F05]/20 shadow-md py-3"
    : "bg-transparent py-5";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${headerStyles}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 z-50 group" ref={logoRef}>
            <div
              data-logo-icon
              className="relative p-1 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#AE8F05] to-[#F7E7CE] shadow-sm"
            >
              <img
                src="https://res.cloudinary.com/dj3wxiznw/image/upload/v1775806075/IMG_20250911_220600_711-removebg-preview_hesfjl.png"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.endsWith("/IMG_20250911_220600_711-removebg-preview.png")) {
                    target.src = "/IMG_20250911_220600_711-removebg-preview.png";
                  }
                }}
                alt="Mission For Nation Logo"
                className="w-9 h-9 object-contain bg-white rounded-full p-0.5"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span 
                  ref={logoTextRef}
                  data-logo-text
                  className="font-serif font-extrabold text-lg sm:text-xl tracking-tight text-warm-slate dark:text-gray-100 group-hover:text-sacred-gold transition-colors"
                >
                  {i18n.language === 'am' ? 'ተልዕኮ ለትውልድ' : 'MISSION FOR NATION'}
                </span>
              </div>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#5C5854] dark:text-gray-400">
                Church & Ministry
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" isActive={location.pathname === "/"}>{t("nav.home")}</NavLink>
            <NavLink to="/about" isActive={location.pathname === "/about"}>{t("nav.about")}</NavLink>
            <NavLink to="/services" isActive={location.pathname === "/services"}>{t("nav.services")}</NavLink>
            <NavLink to="/gallery" isActive={location.pathname === "/gallery"}>{t("nav.gallery")}</NavLink>

            <div className="pl-4 ml-4 border-l border-[#AE8F05]/20 flex items-center gap-3">
              <button
                onClick={() => i18n.changeLanguage(i18n.language === 'am' ? 'en' : 'am')}
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#F7E7CE] dark:bg-gray-800 text-warm-slate dark:text-white hover:bg-[#AE8F05] hover:text-white transition-all shadow-sm"
              >
                {i18n.language === 'am' ? 'EN' : 'አማርኛ'}
              </button>

              
            </div>
          </nav>

          {/* Mobile Settings */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'am' ? 'en' : 'am')}
              className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F7E7CE] dark:bg-gray-800 text-warm-slate dark:text-white"
            >
              {i18n.language === 'am' ? 'EN' : 'አማ'}
            </button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className="text-warm-slate dark:text-white hover:text-sacred-gold p-2 rounded-full"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#FFFFF0] dark:bg-gray-900 border-t border-[#AE8F05]/20 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>{t("nav.home")}</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>{t("nav.about")}</MobileNavLink>
              <MobileNavLink to="/services" onClick={() => setIsMobileMenuOpen(false)}>{t("nav.services")}</MobileNavLink>
              <MobileNavLink to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>{t("nav.gallery")}</MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ to, isActive, children }: { to: string; isActive: boolean; children: React.ReactNode }) {
  return (
    <Link to={to} className="relative group px-4 py-2 rounded-xl transition-all">
      <span className={`relative z-10 font-medium text-sm transition-colors ${isActive ? 'text-sacred-gold font-bold' : 'text-warm-slate dark:text-gray-200 hover:text-sacred-gold'}`}>
        {children}
      </span>
      {isActive && (
        <motion.div
          layoutId="activePill"
          className="absolute inset-0 bg-[#F7E7CE]/70 dark:bg-gray-800/70 rounded-xl border border-[#AE8F05]/20"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
}

function MobileNavLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-warm-slate dark:text-gray-100 text-lg font-semibold hover:text-sacred-gold transition-colors flex items-center space-x-3 p-2 rounded-lg"
    >
      <div className="w-1.5 h-6 bg-sacred-gold rounded-full" />
      <span>{children}</span>
    </Link>
  );
}
