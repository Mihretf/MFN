import React from "react";
import { motion } from "motion/react";
import { Target, Eye, Users, Heart, ArrowRight } from "lucide-react";
import Leaders from "../components/home/Leader";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

export function AboutUs() {
  const journeyItems = [
    {
      year: "2010",
      title: "The Beginning",
      desc: "MFN started in a small living room with just 12 people committed to prayer and service.",
    },
    {
      year: "2015",
      title: "First Campus",
      desc: "We opened our first physical location in the heart of the city, expanding our outreach programs.",
    },
    {
      year: "2020",
      title: "Digital Expansion",
      desc: "Launched online services and global community groups to stay connected during challenging times.",
    },
    {
      year: "2025",
      title: "Nationwide Impact",
      desc: "Now operating in 5 major cities with over 10,000 active members serving weekly.",
    },
  ];

  const stats = [
    { number: "15+", label: "Years Served" },
    { number: "5", label: "Campuses" },
    { number: "10k+", label: "Community Members" },
    { number: "50k+", label: "Lives Impacted" },
  ];
  return (
    <div className="pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/photo_2_2026-03-15_09-31-24.jpg"
            alt="Mission For Nation Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c34]/90 to-[#1a3c34]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a3c34]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Building Faith.{" "}
            <span className="text-[#d4af37]">Empowering Lives.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Mission For Nation is dedicated to transforming communities through
            spiritual growth, service, and unwavering hope.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="px-8 py-4 bg-[#d4af37] text-[#1a3c34] font-bold rounded-full hover:bg-[#f0d082] transition-colors shadow-lg flex items-center gap-2 mx-auto"
          >
            Join Our Mission <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 lg:gap-24"
          >
            {/* Mission */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="w-16 h-16 bg-[#1a3c34]/5 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-[#1a3c34]" />
              </div>
              <h2 className="text-3xl font-bold text-[#1a3c34] dark:text-gray-100 transition-colors">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors">
                To reach the lost, disciple the found, and serve the hurting. We
                exist to be a beacon of light in every city we plant our roots,
                providing spiritual guidance and practical support to those in
                need.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-2xl flex items-center justify-center">
                <Eye className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h2 className="text-3xl font-bold text-[#1a3c34] dark:text-gray-100 transition-colors">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors">
                A nation united in purpose and faith, where every individual has
                the opportunity to experience the transformative power of
                community and divine love. We see a future where no one walks
                alone.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story (Timeline) */}
      <section className="py-24 bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3c34] dark:text-white mb-4 transition-colors">
              Our Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
              From humble beginnings to a nationwide movement.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#d4af37]/30 hidden md:block" />

            <div className="space-y-12 md:space-y-24">
              {journeyItems.length === 0 ? (
                <div className="text-center py-12 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <p className="text-gray-500 dark:text-gray-400 italic">Timeline history will be available soon.</p>
                </div>
              ) : (
                journeyItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className={`flex flex-col md:flex-row items-center justify-between gap-8 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="w-full md:w-5/12 text-center md:text-right">
                      <div
                        className={`p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300 relative group ${index % 2 !== 0 ? "md:text-left" : ""}`}
                      >
                        {/* Decorative glow behind card */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-transparent rounded-2xl transition-colors duration-500 pointer-events-none" />
                        
                        <span className="text-[#d4af37] font-extrabold text-2xl block mb-3 drop-shadow-sm">
                          {item.year}
                        </span>
                        <h3 className="text-2xl font-bold text-[#1a3c34] dark:text-gray-100 mb-3 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">{item.desc}</p>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 rounded-full bg-[#d4af37] blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
                      <div className="w-10 h-10 rounded-full bg-[#1a3c34] dark:bg-[#d4af37] border-4 border-white dark:border-gray-900 shadow-xl z-10 flex items-center justify-center relative hidden md:flex">
                        <div className="w-2 h-2 rounded-full bg-[#d4af37] dark:bg-[#1a3c34]" />
                      </div>
                    </div>

                    <div className="w-full md:w-5/12 hidden md:block" />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#1a3c34] dark:bg-[#0c1f1a] transition-colors duration-300 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.length === 0 ? (
               <div className="col-span-2 md:col-span-4 text-center py-6">
                 <p className="text-gray-400 italic">Statistics will be updated.</p>
               </div>
            ) : (
              stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="relative">
                <div className="absolute top-4 -left-4 w-full h-full bg-[#f0d082] rounded-2xl z-0" />
                <img
                  src="https://res.cloudinary.com/di5zfjqlt/image/upload/v1773571945/photo_2026-03-15_13-51-33_rus4x4.jpg"
                  alt="Founder"
                  className="relative z-10 rounded-2xl shadow-xl w-full aspect-[4/5] object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 space-y-6"
            >
              <h4 className="text-[#d4af37] font-semibold uppercase tracking-wider">
                Our Founder
              </h4>
              <h2 className="text-4xl font-bold text-[#1a3c34] dark:text-gray-100 transition-colors">
                Rev. Dr. John Doe
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors italic">
                "Our mission isn't just about building churches; it's about
                building people. When I started Mission For Nation, I dreamt of
                a place where everyone—regardless of their background—could find
                a home, a purpose, and a family."
              </p>
              <div className="pt-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png"
                  alt="Signature"
                  className="h-12 opacity-60 dark:invert transition-all"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Leaders />

      {/* CTA */}
      <section className="py-24 bg-[#1a3c34] relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to make a difference?
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Join our community today and be part of something bigger than
            yourself.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-[#d4af37] text-[#1a3c34] font-bold rounded-full hover:bg-[#f0d082] transition-colors shadow-lg">
              Visit a Campus
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#1a3c34] transition-colors">
              Watch Online
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
