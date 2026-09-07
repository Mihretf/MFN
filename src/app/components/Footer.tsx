import React from "react";
import { Facebook, Youtube, Mail, Tv, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-alabaster border-t border-[#AE8F05]/20 pt-16 pb-8 text-warm-slate relative overflow-hidden">
      {/* Volumetric Bottom Ambient Lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-t from-champagne-pearl/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & 30th Anniversary */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-1 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#AE8F05]">
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
              <span className="font-serif font-extrabold text-lg text-warm-slate">
                {i18n.language === 'am' ? '??? ?? ????' : 'MISSION FOR NATION'}
              </span>
            </div>
            <p className="text-[#5C5854] text-sm leading-relaxed">
              {t("footer.description") || "30 Years of divine vision, establishing churches, training pastors, and reaching millions through 7 Spirit TV broadcast."}
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FFFFF0] border border-[#AE8F05]/30 rounded-full text-xs font-semibold text-sacred-gold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>30th Anniversary Golden Jubilee (1996 - 2026)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold mb-6 uppercase tracking-wider text-sm text-warm-slate">
              {t("footer.quickLinks") || "Quick Links"}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-[#5C5854] hover:text-sacred-gold font-medium transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#5C5854] hover:text-sacred-gold font-medium transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#5C5854] hover:text-sacred-gold font-medium transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-[#5C5854] hover:text-sacred-gold font-medium transition-colors">
                  {t("nav.gallery")}
                </Link>
              </li>
              <li>
                <a href="#giving" className="text-sacred-gold font-semibold hover:underline flex items-center space-x-1">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Give to 7 Spirit TV</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold mb-6 uppercase tracking-wider text-sm text-warm-slate">
              {t("services.contact") || "Contact & Support"}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-[#5C5854]">
                <Mail className="w-5 h-5 text-sacred-gold flex-shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=7spiritstv@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sacred-gold transition-colors font-medium"
                >
                  7spiritstv@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-[#5C5854]">
                <Tv className="w-5 h-5 text-sacred-gold flex-shrink-0" />
                <span className="font-medium">7 Spirit TV Broadcast Center</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif font-bold mb-6 uppercase tracking-wider text-sm text-warm-slate">
              {t("footer.connect") || "Connect With Us"}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-[#5C5854]">
                <Facebook className="w-5 h-5 text-sacred-gold flex-shrink-0" />
                <a
                  href="https://www.facebook.com/7spiritstv?mibextid=rS40aB7S9Ucbxw6v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sacred-gold transition-colors font-medium"
                >
                  7 Spirits TV Official
                </a>
              </li>
              <li className="flex items-center gap-3 text-[#5C5854]">
                <Youtube className="w-5 h-5 text-sacred-gold flex-shrink-0" />
                <a
                  href="https://www.youtube.com/channel/UCFVGPq_UQ5ESFkmTQCSXeBQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sacred-gold transition-colors font-medium"
                >
                  7spirits TV Channel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#AE8F05]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#5C5854]">
          <p className="font-medium">
            © 1996 - 2026 Mission For Nation Church. All rights reserved. 30th Anniversary Edition.
          </p>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-sacred-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sacred-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
