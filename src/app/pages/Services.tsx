import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ArrowRight, Search } from 'lucide-react';
import { branches } from '../data/mockData';

export function Services() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a3c34] mb-4">Our Church Locations</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find a branch near you and become part of our growing community. Each location offers unique programs while sharing our common mission.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
            />
          </div>
        </div>

        {/* Branch Listings */}
        <div className="space-y-6">
          {filteredBranches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/services/${branch.id}`}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                      <img
                        src={branch.heroImage}
                        alt={branch.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c34]/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="md:w-3/5 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-3xl font-bold text-[#1a3c34] mb-2 group-hover:text-[#d4af37] transition-colors">
                            {branch.name}
                          </h2>
                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 mr-2 text-[#d4af37]" />
                            <span>{branch.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-6 line-clamp-2">
                        {branch.description}
                      </p>

                      {/* Quick Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-start space-x-2">
                          <Clock className="w-4 h-4 text-[#d4af37] mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-[#1a3c34]">Service Times</p>
                            <p className="text-xs text-gray-600">
                              {branch.serviceTimes[0]?.day} {branch.serviceTimes[0]?.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Phone className="w-4 h-4 text-[#d4af37] mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-[#1a3c34]">Contact</p>
                            <p className="text-xs text-gray-600">{branch.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Mail className="w-4 h-4 text-[#d4af37] mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-[#1a3c34]">Pastor</p>
                            <p className="text-xs text-gray-600">{branch.pastor.name}</p>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="flex items-center text-[#d4af37] font-semibold group-hover:gap-2 transition-all">
                        Learn More & Visit
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No branches found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}