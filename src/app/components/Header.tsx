import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isHomePage = location.pathname === "/";
  // The header should be transparent if we are on the homepage and haven't scrolled past the hero + quote (~700px)
  const transparentMode = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      // 800px roughly covers the Hero and Quote sections 
      setIsScrolled(window.scrollY > 800);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // initialize
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true); // always solid on other pages
    }
  }, [isHomePage]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const headerStyles = transparentMode
    ? "bg-transparent text-white border-transparent shadow-none"
    : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg text-gray-900 dark:text-white shadow-sm border-b border-gray-200 dark:border-gray-800";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${headerStyles}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 z-50 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-10 h-10 bg-gradient-to-tr from-[#d4af37] to-[#f0d082] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all"
            >
              <span className="text-gray-900 font-extrabold text-xl">M</span>
            </motion.div>
            <span
              className={`font-extrabold text-xl tracking-tight bg-clip-text text-transparent group-hover:from-[#d4af37] group-hover:to-[#f0d082] transition-colors
              ${transparentMode ? "bg-gradient-to-r from-white to-gray-200" : "bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"}`}
            >
              MISSION FOR NATION
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/" transparentMode={transparentMode}>{t("nav.home")}</NavLink>
            <NavLink to="/about" transparentMode={transparentMode}>{t("nav.about")}</NavLink>
            <NavLink to="/services" transparentMode={transparentMode}>{t("nav.services")}</NavLink>
            <NavLink to="/gallery" transparentMode={transparentMode}>{t("nav.gallery")}</NavLink>
            <div className={`pl-4 ml-6 border-l ${transparentMode ? 'border-white/20' : 'border-gray-200 dark:border-gray-700'} transition-colors flex items-center gap-2`}>
              <button
                onClick={() => i18n.changeLanguage(i18n.language === 'am' ? 'en' : 'am')}
                className={`text-sm font-semibold px-2 py-1 rounded transition-colors ${transparentMode ? 'text-white hover:bg-white/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                {i18n.language === 'am' ? 'EN' : 'AM'}
              </button>
              <IconButton 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                sx={{ 
                  color: transparentMode ? 'white' : 'text.primary', 
                  '&:hover': { color: '#d4af37', transform: 'scale(1.1)' },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </IconButton>
            </div>
          </nav>

          {/* Mobile Menu Settings */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'am' ? 'en' : 'am')}
              className={`text-sm font-bold px-2 py-1 rounded transition-colors ${transparentMode ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}
            >
              {i18n.language === 'am' ? 'EN' : 'AM'}
            </button>
            <IconButton 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              sx={{ color: transparentMode ? 'white' : 'text.primary' }}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </IconButton>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className={`${transparentMode ? 'text-white' : 'text-gray-900 dark:text-white'} hover:text-[#d4af37] dark:hover:text-[#d4af37] transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]`}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              <MobileNavLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.home")}
              </MobileNavLink>
              <MobileNavLink
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.about")}
              </MobileNavLink>
              <MobileNavLink
                to="/services"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.services")}
              </MobileNavLink>
              <MobileNavLink
                to="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.gallery")}
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Cool Navigation Link Component
function NavLink({
  to,
  transparentMode,
  children,
}: Readonly<{ to: string; transparentMode?: boolean; children: React.ReactNode }>) {
  return (
    <Link to={to} className="relative group px-4 py-2 rounded-lg">
      <span className={`relative z-10 transition-colors font-semibold group-hover:text-[#1a3c34] dark:group-hover:text-[#d4af37] ${transparentMode ? 'text-white/90 hover:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
        {children}
      </span>
      {/* Animated active pill */}
      <motion.div
        className={`absolute inset-0 rounded-lg scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 ${transparentMode ? 'bg-white/10' : 'bg-gray-100 dark:bg-gray-800'}`}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {/* Underline accent */}
      <motion.div
        className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d082]"
        initial={{ width: 0 }}
        whileHover={{ width: "60%" }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({
  to,
  onClick,
  children,
}: Readonly<{
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}>) {
  return (
    <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.2 }}>
      <Link
        to={to}
        onClick={onClick}
        className="text-gray-700 dark:text-gray-200 text-lg font-semibold hover:text-[#d4af37] dark:hover:text-[#f0d082] transition-colors flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <motion.div
          className="w-1.5 h-6 bg-gradient-to-b from-[#d4af37] to-[#f0d082] rounded-full shadow-sm"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3 }}
        />
        <span>{children}</span>
      </Link>
    </motion.div>
  );
}
