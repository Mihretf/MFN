import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a3c34] text-[#f5f5f5] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-50">
            <div className="w-10 h-10 bg-[#d4af37] rounded-sm flex items-center justify-center">
              <span className="text-[#1a3c34] font-bold text-xl">M</span>
            </div>
            <span className="font-bold text-xl tracking-tight">
              MISSION FOR NATION
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/about"
              className="text-[#f5f5f5] hover:text-[#f0d082] transition-colors font-medium"
            >
              About Us
            </Link>

            <Link
              to="/services"
              className="text-[#f5f5f5] hover:text-[#f0d082] transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              to="/gallery"
              className="text-[#f5f5f5] hover:text-[#f0d082] transition-colors font-medium"
            >
              Gallery
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-[#f5f5f5] hover:text-[#d4af37]"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#1a3c34] border-t border-[#f5f5f5]/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#f5f5f5] text-lg font-medium"
              >
                About Us
              </Link>
              <Link
                to="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#f5f5f5] text-lg font-medium"
              >
                Services
              </Link>
              <Link
                to="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#f5f5f5] text-lg font-medium"
              >
                Gallery
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
