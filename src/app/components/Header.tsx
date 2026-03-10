import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a3c34]/80 backdrop-blur-md text-[#f5f5f5] shadow-lg border-b border-[#f5f5f5]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-50 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f0d082] rounded-sm flex items-center justify-center shadow-md"
            >
              <span className="text-[#1a3c34] font-bold text-xl">M</span>
            </motion.div>
            <span className="font-bold text-xl tracking-tight group-hover:text-[#f0d082] transition-colors">
              MISSION FOR NATION
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMobileMenu}
            className="md:hidden text-[#f5f5f5] hover:text-[#d4af37] transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#1a3c34]/95 backdrop-blur-md border-t border-[#f5f5f5]/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              <MobileNavLink
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </MobileNavLink>
              <MobileNavLink
                to="/services"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </MobileNavLink>
              <MobileNavLink
                to="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
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
  children,
}: Readonly<{ to: string; children: React.ReactNode }>) {
  return (
    <Link to={to} className="relative group px-4 py-2">
      <span className="relative z-10 text-[#f5f5f5] group-hover:text-[#d4af37] transition-colors font-medium">
        {children}
      </span>
      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#f0d082]"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* Hover background */}
      <motion.div
        className="absolute inset-0 bg-[#f5f5f5]/10 rounded-md -z-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
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
        className="text-[#f5f5f5] text-lg font-medium hover:text-[#d4af37] transition-colors flex items-center space-x-2"
      >
        <motion.div
          className="w-1 h-6 bg-gradient-to-b from-[#d4af37] to-[#f0d082] rounded-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3 }}
        />
        <span>{children}</span>
      </Link>
    </motion.div>
  );
}
