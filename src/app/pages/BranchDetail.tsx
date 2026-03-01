import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  AlertCircle,
  ChevronRight,
  Navigation,
  Baby,
  Users,
  Music,
  Heart,
  Coffee,
  Building,
  Palette,
  Globe,
} from 'lucide-react';
import { branches } from '../data/mockData';
import { EventCard } from '../components/EventCard';

// Icon mapping for ministries
const iconMap: { [key: string]: any } = {
  Baby,
  Users,
  Music,
  Heart,
  Coffee,
  Building,
  Palette,
  Globe,
};

export function BranchDetail() {
  const { branchId } = useParams<{ branchId: string }>();
  const branch = branches.find((b) => b.id === branchId);

  if (!branch) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#1a3c34] mb-4">Branch Not Found</h2>
          <Link to="/services" className="text-[#d4af37] hover:underline">
            ← Back to All Locations
          </Link>
        </div>
      </div>
    );
  }

  const priorityColors = {
    high: 'border-l-red-500 bg-red-50',
    medium: 'border-l-[#d4af37] bg-yellow-50',
    low: 'border-l-blue-500 bg-blue-50',
  };

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#f5f5f5]">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-[#d4af37] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to="/services" className="hover:text-[#d4af37] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-[#1a3c34] font-semibold">{branch.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={branch.heroImage}
          alt={branch.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c34]/90 to-[#1a3c34]/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {branch.name}
              </h1>
              <div className="flex items-center text-white/90 text-xl mb-6">
                <MapPin className="w-5 h-5 mr-2 text-[#d4af37]" />
                <span>{branch.location}</span>
              </div>
              <p className="text-white/90 text-lg max-w-2xl">{branch.description}</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Service Times Section */}
            <motion.section
              id="service-times"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-[#d4af37] mr-3" />
                <h2 className="text-3xl font-bold text-[#1a3c34]">Service Times</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {branch.serviceTimes.map((service, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#d4af37] transition-colors"
                  >
                    <p className="font-semibold text-[#1a3c34] mb-1">{service.type}</p>
                    <p className="text-gray-600">
                      {service.day} at {service.time}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Announcements Section */}
            <motion.section
              id="announcements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <div className="flex items-center mb-6">
                <AlertCircle className="w-6 h-6 text-[#d4af37] mr-3" />
                <h2 className="text-3xl font-bold text-[#1a3c34]">Announcements</h2>
              </div>
              <div className="space-y-4">
                {branch.announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`border-l-4 p-4 rounded-r-lg ${priorityColors[announcement.priority]}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-[#1a3c34]">{announcement.title}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {announcement.date}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Pastor Section */}
            <motion.section
              id="leadership"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-3xl font-bold text-[#1a3c34] mb-6">Leadership</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={branch.pastor.image}
                    alt={branch.pastor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1a3c34] mb-1">
                    {branch.pastor.name}
                  </h3>
                  <p className="text-[#d4af37] font-semibold mb-4">{branch.pastor.role}</p>
                  <p className="text-gray-700 leading-relaxed">{branch.pastor.bio}</p>
                </div>
              </div>
            </motion.section>

            {/* Events Section */}
            <motion.section
              id="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <div className="flex items-center mb-6">
                <Calendar className="w-6 h-6 text-[#d4af37] mr-3" />
                <h2 className="text-3xl font-bold text-[#1a3c34]">Regular Events</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {branch.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </motion.section>

            {/* Ministries Section */}
            <motion.section
              id="ministries"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-3xl font-bold text-[#1a3c34] mb-6">Get Involved</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {branch.ministries.map((ministry) => {
                  const IconComponent = iconMap[ministry.icon] || Users;
                  return (
                    <div
                      key={ministry.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-[#d4af37] hover:shadow-md transition-all"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-[#d4af37]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1a3c34] mb-2">
                            {ministry.name}
                          </h3>
                          <p className="text-gray-600 text-sm">{ministry.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Location Section */}
            <motion.section
              id="location"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-[#d4af37] mr-3" />
                <h2 className="text-3xl font-bold text-[#1a3c34]">Location & Contact</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#1a3c34] mb-2">Address</h3>
                    <p className="text-gray-700">{branch.address}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3c34] mb-2">Phone</h3>
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-[#d4af37] hover:underline"
                    >
                      {branch.phone}
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3c34] mb-2">Email</h3>
                    <a
                      href={`mailto:${branch.email}`}
                      className="text-[#d4af37] hover:underline"
                    >
                      {branch.email}
                    </a>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[#d4af37] text-white font-semibold rounded-lg hover:bg-[#b8941f] transition-colors"
                  >
                    <Navigation className="w-5 h-5 mr-2" />
                    Get Directions
                  </a>
                </div>
                <div className="h-64 rounded-lg overflow-hidden">
                  <iframe
                    src={branch.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${branch.name}`}
                  />
                </div>
              </div>
            </motion.section>

            {/* Gallery Section */}
            <motion.section
              id="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-3xl font-bold text-[#1a3c34] mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {branch.gallery.map((image) => (
                  <div
                    key={image.id}
                    className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                      <p className="text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="font-bold text-[#1a3c34] mb-4 text-lg">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{branch.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                    <a href={`tel:${branch.phone}`} className="text-[#d4af37] hover:underline">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                    <a href={`mailto:${branch.email}`} className="text-[#d4af37] hover:underline">
                      {branch.email}
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Jump Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="font-bold text-[#1a3c34] mb-4 text-lg">Quick Navigation</h3>
                <nav className="space-y-2 text-sm">
                  {[
                    { id: 'service-times', label: 'Service Times' },
                    { id: 'announcements', label: 'Announcements' },
                    { id: 'leadership', label: 'Leadership' },
                    { id: 'events', label: 'Events' },
                    { id: 'ministries', label: 'Ministries' },
                    { id: 'location', label: 'Location' },
                    { id: 'gallery', label: 'Gallery' },
                  ].map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      className="block text-gray-700 hover:text-[#d4af37] hover:translate-x-1 transition-all py-1"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </motion.div>

              {/* Visit Us CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-[#1a3c34] to-[#0f2620] rounded-xl shadow-md p-6 text-white"
              >
                <h3 className="font-bold mb-2 text-xl">Plan Your Visit</h3>
                <p className="text-white/80 text-sm mb-4">
                  We'd love to have you join us! Everyone is welcome.
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-6 py-3 bg-[#d4af37] text-white font-semibold rounded-lg hover:bg-[#b8941f] transition-colors"
                >
                  Get Directions
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
