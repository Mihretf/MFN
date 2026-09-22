import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Clock, Heart, CreditCard, Copy, Check, Sparkles, Building2, Calendar } from "lucide-react";

export function ServiceTimesAndGiving() {
  const { i18n } = useTranslation();
  const isAm = i18n.language === "am";

  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const copyToClipboard = (acc: string, bankName: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedBank(bankName);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const serviceSchedule = [
    {
      dayEn: "Tuesday",
      dayAm: "ማክሰኞ",
      timeEn: "10:30 - 1:30",
      timeAm: "ከቀኑ 10:30 - 1:30 (በኢትዮጵያ ሰዓት)",
      detailEn: "Deliverance & Prayer Service",
      detailAm: "የነጻነትና የጸሎት መርሃ-ግብር",
    },
    {
      dayEn: "Wednesday",
      dayAm: "ረቡዕ",
      timeEn: "8:30 - 1:30",
      timeAm: "ከቀኑ 8:30 - 1:30 (በኢትዮጵያ ሰዓት)",
      detailEn: "Mid-week Bible Teaching & Worship",
      detailAm: "የመጽሐፍ ቅዱስ ትምህርትና የአምልኮ መርሃ-ግብር",
    },
    {
      dayEn: "Sunday",
      dayAm: "እሁድ",
      timeEn: "2:00 - 7:30",
      timeAm: "ጠዋት ከ 2:00 - 7:30 (በኢትዮጵያ ሰዓት)",
      detailEn: "Grand Sunday Worship & Sermon",
      detailAm: "የእሁድ ታላቁ የምስጋናና የአምልኮ መርሃ-ግብር",
    },
  ];

  const bankAccounts = [
    {
      nameEn: "Commercial Bank of Ethiopia (CBE)",
      nameAm: "የኢትዮጵያ ንግድ ባንክ (CBE)",
      accountNumber: "1000450749738",
      color: "from-[#8B263E] to-[#4A121A]",
      badge: "CBE Main Account",
    },
    {
      nameEn: "Berhan Bank",
      nameAm: "ብርሃን ባንክ",
      accountNumber: "2600050004252",
      color: "from-[#AE8F05] to-[#7E6503]",
      badge: "Berhan Bank",
    },
  ];

  return (
    <section id="giving" className="py-20 w-full relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FDFBF7 0%, #FAF8F5 50%, #F5F0E6 100%)" }}>
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2C2A28] tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
            {isAm ? "የአምልኮ ጊዜያት እና አገልግሎቱን ለመደገፍ" : "Worship Schedule & Support the Ministry"}
          </h2>
          <p className="text-base sm:text-lg text-[#5C5854] font-medium leading-relaxed">
            {isAm
              ? "በአካል ተገኝተው ከእኛ ጋር ያመልኩ ወይም በገንዘብና በጸሎት አገልግሎቱን ይደግፉ፡፡"
              : "Join us in live worship or partner with our global ministry through your tithes and offerings."}
          </p>
        </div>

        {/* 2 Main Cards Grid: Service Times + Giving */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card A: Service Times (Ethiopian Local Time) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-[#AE8F05]/30 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#AE8F05]/20">
                <div className="p-3 rounded-2xl bg-[#FFFFF0] text-[#AE8F05] border border-[#AE8F05]/30">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2C2A28]" style={{ fontFamily: "'Cinzel', serif" }}>
                    {isAm ? "የአምልኮ ፕሮግራሞች ሰዓት" : "Service Times"}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#AE8F05]">
                    {isAm ? "በኢትዮጵያ ሰዓት አቆጣጠር (Ethiopian Local Time)" : "Ethiopian Local Time"}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {serviceSchedule.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#AE8F05]/20 hover:border-[#D4AF37] transition-all flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-[#AE8F05]" />
                        <span className="font-extrabold text-lg text-[#2C2A28]" style={{ fontFamily: "'Cinzel', serif" }}>
                          {isAm ? s.dayAm : s.dayEn}
                        </span>
                      </div>
                      <p className="text-xs text-[#5C5854] font-medium">
                        {isAm ? s.detailAm : s.detailEn}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-4 py-2 rounded-xl bg-[#D4AF37]/15 text-[#8E7304] font-extrabold text-base border border-[#D4AF37]/30 shadow-sm">
                        {isAm ? s.timeAm : s.timeEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#AE8F05]/20 text-center">
              <p className="text-xs text-[#5C5854] font-semibold">
                {isAm ? "📍 ቦታ፡ አዲስ አበባ ኢየሩሳሌም አጥቢያ (ዋና ቤተክርስቲያን)" : "📍 Location: Addis Ababa Jerusalem Main Church"}
              </p>
            </div>
          </motion.div>

          {/* Card B: Support the Ministry / Giving */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-[#AE8F05]/30 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#AE8F05]/20">
                <div className="p-3 rounded-2xl bg-[#FFFFF0] text-[#AE8F05] border border-[#AE8F05]/30">
                  <Heart className="w-6 h-6 fill-current text-[#AE8F05]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2C2A28]" style={{ fontFamily: "'Cinzel', serif" }}>
                    {isAm ? "አገልግሎቱን ለመደገፍ (Support)" : "Support the Ministry"}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#AE8F05]">
                    {isAm ? "አስራት፣ መባ እና ድጋፍ" : "Tithes, Offerings & Partnership"}
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                {bankAccounts.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-gradient-to-br from-[#FAF8F5] to-[#FFFFF0] border-2 border-[#D4AF37]/40 shadow-md hover:shadow-lg transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-5 h-5 text-[#AE8F05]" />
                        <h4 className="font-bold text-lg text-[#2C2A28]">
                          {isAm ? b.nameAm : b.nameEn}
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#8E7304] border border-[#D4AF37]/30">
                        {b.badge}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 bg-white/80 p-3.5 rounded-xl border border-[#AE8F05]/20">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-[#5C5854] block">
                          Account Number
                        </span>
                        <span className="font-mono font-extrabold text-xl text-[#2C2A28] tracking-wider">
                          {b.accountNumber}
                        </span>
                      </div>

                      <button
                        onClick={() => copyToClipboard(b.accountNumber, b.nameEn)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AE8F05] text-white font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center space-x-2"
                      >
                        {copiedBank === b.nameEn ? (
                          <>
                            <Check className="w-4 h-4 text-white" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-white" />
                            <span>{isAm ? "ኮፒ አድርግ" : "Copy Acc"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#AE8F05]/20 text-center">
              <p className="text-xs text-[#5C5854] font-semibold">
                {isAm
                  ? "ለ 7 Spirit TV እና ለወንጌል ስርጭት ድጋፍ ያድርጉ"
                  : "Thank you for supporting 7 Spirit TV and global gospel reach."}
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
