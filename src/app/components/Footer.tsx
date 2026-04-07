import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#d4af37] to-[#f0d082] rounded flex items-center justify-center shadow-sm">
                <span className="text-gray-900 font-extrabold text-base">M</span>
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                MFN
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">
              Serving our community with faith, hope, and love. Join us in our mission to make a difference across the nation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#f0d082] transition-colors font-medium">Home</Link></li>
              <li><Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#f0d082] transition-colors font-medium">About Us</Link></li>
              <li><Link to="/services" className="text-gray-500 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#f0d082] transition-colors font-medium">Services</Link></li>
              <li><Link to="/give" className="text-gray-500 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#f0d082] transition-colors font-medium">Give</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 dark:text-gray-400 transition-colors">
                <MapPin className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <span className="font-medium">123 Faith Avenue,<br />City Center, ST 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 transition-colors">
                <Phone className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <span className="font-medium">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 transition-colors">
                <Mail className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <span className="font-medium">contact@missionfornation.org</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#d4af37] hover:text-white dark:hover:bg-[#d4af37] dark:hover:text-gray-900 transition-all shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#d4af37] hover:text-white dark:hover:bg-[#d4af37] dark:hover:text-gray-900 transition-all shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#d4af37] hover:text-white dark:hover:bg-[#d4af37] dark:hover:text-gray-900 transition-all shadow-sm">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400 transition-colors">
          <p className="font-medium">&copy; {new Date().getFullYear()} Mission For Nation. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-[#d4af37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
