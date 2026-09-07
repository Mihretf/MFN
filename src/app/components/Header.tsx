import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Header uses a consistent light-theme palette throughout — no dark: class variants
// to avoid theme mismatch. Transparent when at top, solid ivory-white when scrolled.

export function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const headerStyles = "bg-[#FFFFF0] border-b border-[#AE8F05]/30 shadow-md py-3.5";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${headerStyles}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 z-50 group">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#AE8F05] to-[#F7E7CE] shadow-sm">
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
                  className="font-serif font-extrabold text-lg sm:text-xl tracking-tight text-[#2C2A28] group-hover:text-[#AE8F05] transition-colors"
                >
                  {i18n.language === "am" ? "ተልዕኮ ለትውልድ" : "MISSION FOR NATION"}
                </span>
              </div>
              <span
                className="text-[10px] tracking-widest uppercase font-semibold text-[#5C5854]"
              >
                Church &amp; Ministry
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" isActive={location.pathname === "/"}>
              {t("nav.home")}
            </NavLink>
            <NavLink to="/about" isActive={location.pathname === "/about"}>
              {t("nav.about")}
            </NavLink>
            <NavLink to="/services" isActive={location.pathname === "/services"}>
              {t("nav.services")}
            </NavLink>
            <NavLink to="/gallery" isActive={location.pathname === "/gallery"}>
              {t("nav.gallery")}
            </NavLink>

            <div className="pl-4 ml-4 border-l border-[#AE8F05]/30 flex items-center gap-3">
              <button
                onClick={() =>
                  i18n.changeLanguage(i18n.language === "am" ? "en" : "am")
                }
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#F7E7CE] text-[#2C2A28] hover:bg-[#AE8F05] hover:text-white transition-all shadow-sm"
              >
                {i18n.language === "am" ? "EN" : "አማ"}
              </button>
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() =>
                i18n.changeLanguage(i18n.language === "am" ? "en" : "am")
              }
              className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F7E7CE] text-[#2C2A28]"
            >
              {i18n.language === "am" ? "EN" : "አማ"}
            </button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-[#2C2A28] hover:bg-[#F7E7CE]/60 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
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
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#FFFFF0] border-t border-[#AE8F05]/20 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                {t("nav.home")}
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                {t("nav.about")}
              </MobileNavLink>
              <MobileNavLink to="/services" onClick={() => setIsMobileMenuOpen(false)}>
                {t("nav.services")}
              </MobileNavLink>
              <MobileNavLink to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>
                {t("nav.gallery")}
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  to,
  isActive,
  children,
}: {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} className="relative group px-4 py-2 rounded-xl transition-all">
      <span
        className={`relative z-10 font-bold text-sm transition-colors ${
          isActive ? "text-[#AE8F05]" : "text-[#2C2A28] hover:text-[#AE8F05]"
        }`}
      >
        {children}
      </span>
      {isActive && (
        <motion.div
          layoutId="activePill"
          className="absolute inset-0 rounded-xl border border-[#AE8F05]/30 bg-[#F7E7CE]/70"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
}

function MobileNavLink({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-[#2C2A28] text-lg font-semibold hover:text-[#AE8F05] transition-colors flex items-center space-x-3 p-2 rounded-lg"
    >
      <div className="w-1.5 h-6 bg-[#AE8F05] rounded-full" />
      <span>{children}</span>
    </Link>
  );
}
