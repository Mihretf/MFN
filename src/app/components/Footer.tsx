import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t, i18n } = useTranslation();
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://res.cloudinary.com/dj3wxiznw/image/upload/v1775806075/IMG_20250911_220600_711-removebg-preview_hesfjl.png"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.endsWith("/IMG_20250911_220600_711-removebg-preview.png")) {
                    target.src = "/IMG_20250911_220600_711-removebg-preview.png";
                  }
                }}
                alt="Mission For Nation Logo"
                className="w-10 h-10 object-contain drop-shadow-lg"
              />
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                {i18n.language === 'am' ? 'ተልዕኮ ለትውልድ' : 'MISSION FOR NATION'}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#f0d082] transition-colors font-medium">{t("nav.home")}</Link></li>
              <li><Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#f0d082] transition-colors font-medium">{t("nav.about")}</Link></li>
              <li><Link to="/services" className="text-gray-500 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#f0d082] transition-colors font-medium">{t("nav.services")}</Link></li>
              <li><Link to="/gallery" className="text-gray-500 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#f0d082] transition-colors font-medium">{t("nav.gallery")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">{t("services.contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 transition-colors">
                <Mail className="w-5 h-5 text-[#1a3c34] dark:text-[#d4af37] flex-shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=7spiritstv@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] transition-colors font-medium"
                >
                  7spiritstv@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">{t("footer.connect")}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 transition-colors">
                <Facebook className="w-5 h-5 text-[#1a3c34] dark:text-[#d4af37] flex-shrink-0" />
                <a
                  href="https://www.facebook.com/7spiritstv?mibextid=rS40aB7S9Ucbxw6v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] transition-colors font-medium"
                >
                  7 spirits tv 2
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 transition-colors">
                <Youtube className="w-5 h-5 text-[#1a3c34] dark:text-[#d4af37] flex-shrink-0" />
                <a
                  href="https://www.youtube.com/channel/UCFVGPq_UQ5ESFkmTQCSXeBQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] transition-colors font-medium"
                >
                  7spirits tv
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400 transition-colors">
          <p className="font-medium">{t("footer.copyright")}</p>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-[#d4af37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
