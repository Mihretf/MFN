import React, { useState } from "react";
import { Copy, Check, Tv, Heart, Landmark, Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const GivingSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankDetails = [
    {
      title: "7 Spirit TV Ministry & Media Outreach",
      bank: "Commercial Bank of Ethiopia (CBE)",
      accountNumber: "1000123456789",
      swift: "CBETETAA",
      accountName: "Mission for Nation Church - 7 Spirit TV",
      badge: "Featured Outreach",
      icon: Tv,
    },
    {
      title: "Church Building & Nazareth College Fund",
      bank: "Abyssinia Bank",
      accountNumber: "9876543210001",
      swift: "ABYSETAA",
      accountName: "Mission for Nation Building Fund",
      badge: "Education & Campus",
      icon: Landmark,
    },
  ];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`Copied ${fieldName} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="giving" className="relative py-20 bg-alabaster overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne-pearl/60 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] border border-[#AE8F05]/30 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-sacred-gold" />
            <span className="text-xs font-semibold tracking-wider text-sacred-gold uppercase">
              Spiritual Partnership & Giving
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-warm-slate tracking-tight">
            Support the Kingdom & <span className="gold-gradient-text">7 Spirit TV</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C5854] leading-relaxed">
            Your faithful tithes, offerings, and partnership help us broadcast God's message across nations through 7 Spirit TV, train pastors in Nazareth, and expand regional campuses.
          </p>
        </div>

        {/* Bank Details Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {bankDetails.map((acc, index) => {
            const Icon = acc.icon;
            return (
              <div
                key={index}
                className="ivory-glass-card rounded-3xl p-8 border border-[#AE8F05]/30 relative overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Metallic Gold Accent Band */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#AE8F05] to-[#7E6503]" />

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3.5 rounded-2xl bg-champagne-pearl/80 border border-[#AE8F05]/30 text-sacred-gold">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-sacred-gold px-2.5 py-0.5 rounded-full bg-[#FFFFF0] border border-[#AE8F05]/20">
                        {acc.badge}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-warm-slate mt-1">
                        {acc.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Account Details Box */}
                <div className="space-y-4 bg-alabaster/60 rounded-2xl p-5 border border-[#AE8F05]/15">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-[#5C5854] font-medium">Bank Name</span>
                    <span className="font-semibold text-warm-slate">{acc.bank}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-t border-[#AE8F05]/10">
                    <span className="text-sm text-[#5C5854] font-medium">Account Name</span>
                    <span className="font-semibold text-warm-slate text-right">{acc.accountName}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-[#AE8F05]/10 bg-[#FFFFF0] px-4 rounded-xl border">
                    <div>
                      <span className="text-xs text-[#5C5854] block">Account Number</span>
                      <span className="font-serif font-bold text-lg text-sacred-gold tracking-widest">
                        {acc.accountNumber}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(acc.accountNumber, `${acc.bank} Account`)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-champagne-pearl text-warm-slate text-xs font-semibold hover:bg-sacred-gold hover:text-white transition-colors"
                    >
                      {copiedField === `${acc.bank} Account` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs text-[#5C5854]">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-sacred-gold" />
                    <span>Verified Official Ministry Account</span>
                  </span>
                  <span>SWIFT: {acc.swift}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spiritual Note */}
        <div className="ivory-glass-card rounded-2xl p-6 text-center max-w-2xl mx-auto border border-[#AE8F05]/25">
          <Heart className="w-6 h-6 text-sacred-gold mx-auto mb-2" />
          <p className="font-serif italic text-warm-slate text-sm sm:text-base">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </p>
          <span className="text-xs font-semibold text-sacred-gold tracking-wider uppercase block mt-2">
            2 Corinthians 9:7
          </span>
        </div>
      </div>
    </section>
  );
};
