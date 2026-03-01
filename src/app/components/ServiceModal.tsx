import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Branch } from '../data/mockData';
import { EventCard } from './EventCard';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  branch: Branch | null;
}

export function ServiceModal({ isOpen, onClose, branch }: ServiceModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!branch) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop Layer */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-[#1a3c34]/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            key="modal-card"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[101] w-full md:w-3/4 max-w-5xl bg-[#f5f5f5] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3c34] flex items-center gap-2">
                  <MapPin className="text-[#d4af37]" />
                  {branch.name}
                </h2>
                <p className="text-gray-500 mt-1">{branch.location}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-[#1a3c34]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#1a3c34]">Upcoming Events</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => scroll('left')}
                    className="p-2 rounded-full border border-gray-300 hover:bg-[#d4af37] hover:text-white hover:border-[#d4af37] transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scroll('right')}
                    className="p-2 rounded-full border border-gray-300 hover:bg-[#d4af37] hover:text-white hover:border-[#d4af37] transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {branch.events.length > 0 ? (
                  branch.events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="w-full text-center py-12 text-gray-500">
                    No upcoming events scheduled at this time.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
