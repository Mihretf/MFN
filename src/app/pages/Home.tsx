// import React from 'react';
// import { motion } from 'motion/react';
// import { ArrowRight, Play, Calendar } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export function Home() {
//   return (
//     <div className="pt-20">
//       {/* Hero */}
//       <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#1a3c34]">
//         <div className="absolute inset-0 z-0 opacity-40">
//            <img
//             src="https://images.unsplash.com/photo-1742809888840-1f7891a09479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwY29uY2VydCUyMGRhcmslMjBtb29keSUyMGdvbGQlMjBsaWdodGluZ3xlbnwxfHx8fDE3NzA5MDQ0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
//             alt="Worship"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c34] via-transparent to-transparent" />

//         <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-[#d4af37] font-semibold tracking-widest uppercase mb-4 text-sm md:text-base">Welcome Home</h2>
//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
//               Faith that Moves.<br />Love that Serves.
//             </h1>
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Link to="/about" className="px-8 py-4 bg-[#d4af37] text-[#1a3c34] font-bold rounded-full hover:bg-[#f0d082] transition-colors shadow-lg flex items-center gap-2">
//                 New Here? Start Here <ArrowRight className="w-5 h-5" />
//               </Link>
//               <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-colors flex items-center gap-2">
//                 <Play className="w-5 h-5 fill-current" /> Watch Latest Service
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Quick Info */}
//       <section className="py-20 bg-white relative -mt-20 z-20 mx-4 md:mx-12 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between px-8 md:px-16 gap-8">
//         <div className="flex-1 text-center md:text-left">
//           <h3 className="text-2xl font-bold text-[#1a3c34] mb-2">Join us this Weekend</h3>
//           <p className="text-gray-600">Experience powerful worship and a life-changing message.</p>
//         </div>
//         <div className="h-12 w-[1px] bg-gray-200 hidden md:block" />
//         <div className="flex-1 flex items-center justify-center gap-4">
//           <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37]">
//             <Calendar className="w-6 h-6" />
//           </div>
//           <div className="text-left">
//             <div className="font-bold text-[#1a3c34]">Sundays</div>
//             <div className="text-gray-600">9:00 AM & 11:00 AM</div>
//           </div>
//         </div>
//         <div className="h-12 w-[1px] bg-gray-200 hidden md:block" />
//         <div className="flex-1 text-center md:text-right">
//            <Link to="/about" className="text-[#d4af37] font-bold hover:underline">Find a Location near you</Link>
//         </div>
//       </section>

//       <section className="h-40 bg-white" /> {/* Spacer */}
//     </div>
//   );
// }

import Hero from "../components/home/Hero";
import BibleVerse from "../components/home/BibleVerse";
import LiveStream from "../components/home/LiveStream";
import Impact from "../components/home/Impact";
import Leaders from "../components/home/Leader";
import GalleryHighlight from "../components/home/GalleryHighlight";

export default function App() {
  return (
    <>
      <Hero />
      <BibleVerse />
      <LiveStream />
      <Impact />
      <Leaders />
      <GalleryHighlight />
    </>
  );
}
