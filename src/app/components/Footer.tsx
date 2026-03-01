import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#1a3c34] text-[#f5f5f5] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#d4af37] rounded-sm flex items-center justify-center">
                <span className="text-[#1a3c34] font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-lg tracking-tight">MFN</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Serving our community with faith, hope, and love. Join us in our mission to make a difference across the nation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#d4af37] font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-[#f0d082] transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#f0d082] transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-[#f0d082] transition-colors">Services</Link></li>
              <li><Link to="/give" className="text-gray-400 hover:text-[#f0d082] transition-colors">Give</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#d4af37] font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <span>123 Faith Avenue,<br />City Center, ST 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <span>contact@missionfornation.org</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#d4af37] font-semibold mb-6 uppercase tracking-wider text-sm">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#d4af37] hover:text-[#1a3c34] transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#d4af37] hover:text-[#1a3c34] transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#d4af37] hover:text-[#1a3c34] transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Mission For Nation. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#f5f5f5] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#f5f5f5] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
