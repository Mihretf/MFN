import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Sparkles, GraduationCap, Building2, Users, Award, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { animateTextReveal, animateOnScrollTextMotion, animateImageReveal, animateCounter, initAnimations, killAllAnimations, prefersReducedMotion } from "../../lib/animations";

const MAIN_LEADERS = [
  {
    nameEn: "Pastor Dr. Tesfatsion Dawit",
    nameAm: "መጋቢ ዶ/ር ተስፋጽዮን ዳዊት",
    roleEn: "Council Member & Senior Pastor of Addis Ababa Jerusalem Local Church",
    roleAm: "የካውንስል አባል እና የአዲስ አበባ ኢየሩሳሌም አጥቢያ ዋና መጋቢ",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788754481/photo_5834843952614411947_y_zgqdco.jpg",
  },
  {
    nameEn: "Pastor Daniel Niguse",
    nameAm: "ፓስተር ዳንኤል ንጉሴ",
    roleEn: "Council Head, Dean of Bible College & Adama Network Leader",
    roleAm: "የካውንስል ኃላፊ፣ የባይብል ኮሌጅ ዲን እና የአዳማ ኔትወርክ መሪ",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788753339/photo_5832592152800727176_y_pceso7.jpg",
  },
  {
    nameEn: "Pastor Paulos Hailu",
    nameAm: "ፓስተር ጳውሎስ ኃይሉ",
    roleEn: "Council Head & Nekemte Network Leader",
    roleAm: "የካውንስል ኃላፊ እና የነቀምቴ ኔትወርክ መሪ",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788753339/photo_5832592152800727193_y_1_wmqcmx.jpg",
  },
  {
    nameEn: "Sister Aynalem Merse",
    nameAm: "ሲር አይናለም መርሴ",
    roleEn: "Council Member & Burayu Network Leader",
    roleAm: "የካውንስል አባልና የቡራዩ ኔትወርክ መሪ",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788753339/photo_2025-03-30_15-28-05_-_Aynalem_Mersie_1_s6lgji.jpg",
  },
  {
    nameEn: "Prophet Yared Samuel",
    nameAm: "ነብይ ያሬድ ሳሙኤል",
    roleEn: "Council Member & Head of the Healing School",
    roleAm: "የካውንስል አባልና የሂሊንግ ስኩል ኃላፊ",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788753339/Screenshot_20260906-203454_Facebook_ouead5.jpg",
  },
];

const NETWORKS_ORDERED = [
  { en: "Eyerusalem Center", am: "ኢየሩሳሌም ማዕከል" },
  { en: "Nazerate Center", am: "ናዝሬት ማዕከል" },
  { en: "Burayu", am: "ቡራዩ" },
  { en: "Nikemete", am: "ነቀምቴ" },
  { en: "Hawasa", am: "ሐዋሳ" },
];

export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const isAm = i18n.language === "am";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    initAnimations();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      animateTextReveal("[data-about-badge]", { type: "chars", stagger: 0.02, duration: 0.8, y: 20 });
      animateOnScrollTextMotion("[data-about-title]", { type: "chars", stagger: 0.015, y: 40, rotateX: 20, blur: 8, scrub: 1, start: "top 90%", end: "top 10%" });
      animateTextReveal("[data-about-paragraph]", { type: "lines", stagger: 0.04, duration: 0.8, y: 25 });
      animateImageReveal("[data-about-image]", { scale: 1.08, y: 40, duration: 1, stagger: 0.1 });
      animateCounter("[data-years-counter]", 30, { duration: 2, ease: "power1.out", start: "top 85%", suffix: "+" });
    }, sectionRef);

    return () => {
      ctx.revert();
      killAllAnimations();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-alabaster">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Foundation & Apostle's Journey */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <div 
              data-about-badge
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] border border-[#AE8F05]/30 shadow-sm mb-4"
            >
              <Sparkles className="w-4 h-4 text-sacred-gold" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sacred-gold">
                {isAm ? "አጭር ታሪክ" : "A Brief History"}
              </span>
            </div>
            <h2 
              data-about-title
              className="font-serif text-3xl sm:text-4xl font-extrabold text-warm-slate tracking-tight"
            >
              {isAm ? "የተልዕኮ ለትውልድ ቤተክርስቲያን ታሪክ" : "A Brief History of Mission for Nation Church"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-[#5C5854] text-lg leading-relaxed font-medium">
              <p data-about-paragraph>
                Before <strong>Mission for Nation Church</strong> was formally established as an institution, its foundation was laid 32 years ago in the Bus Station area of Addis Ababa by a 19-year-old young man who had received the vision—today known as <strong>Apostle Dr. Zelalem Getachew</strong>, who at the time was a national table-tennis player. The first expression of the vision was <strong>“MISSION FOR NATION,”</strong> which at the time was given the closely corresponding Amharic meaning <strong>“ተልዕኮ ለትውልድ” (Mission for Nation/Generation).</strong>
              </p>
              <p data-about-paragraph>
                Apostle Dr. Zelalem Getachew is currently a husband to one wife and a father of three children. He has one brother and three sisters who are also engaged in ministry. At present, he is an executive member of the <strong>Ethiopian Evangelical Churches Believers Council (ECGBC)</strong> and the current President of the <strong>Ethiopian Visionary Churches Fellowship (EVCF)</strong>.
              </p>
              <p data-about-paragraph>
                Mission for Nation Church officially began <span data-years-counter className="font-bold text-sacred-gold">30</span> years ago by teaching a group of no more than six young people in the kitchen of the Apostle's parents. After going through extremely challenging early years, the church obtained legal registration, license, and recognition in <strong>1995 E.C.</strong>, becoming the <strong>912th organization registered by the Ministry of Justice of FDRE</strong>.
              </p>
              <p data-about-paragraph>
                It is recorded that, during its early history, Mission for Nation Church held its first services in a rented basement for <strong>70 Ethiopian Birr</strong>, and received its first recorded offering from its members amounting to <strong>2 Birr and 35 cents</strong>. Today, the church oversees <strong>over 130 branches</strong> globally, including in Ethiopia, UAE, Saudi Arabia, Bahrain, North America, and Europe.
              </p>
            </div>
            
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl p-3 border border-[#AE8F05]/30 shadow-xl bg-white">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] relative" data-about-image>
                  <ImageWithFallback
                    src="https://res.cloudinary.com/droslno9i/image/upload/v1788691829/9b6cf1d4-9c00-42d8-8709-c52067bd319d_auqtmk.jpg"
                    alt="Apostle Dr. Zelalem Getachew at age 19"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-sm font-semibold">
                    Apostle Dr. Zelalem Getachew starting the vision at age 19
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3" data-about-image>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md">
                  <ImageWithFallback src="https://res.cloudinary.com/droslno9i/image/upload/v1788694065/FB_IMG_1788680250348_fjuyj6.jpg" alt="Graduation 1" className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md">
                  <ImageWithFallback src="https://res.cloudinary.com/droslno9i/image/upload/v1788694065/FB_IMG_1788680484395_fq0qp2.jpg" alt="Graduation 2" className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md">
                  <ImageWithFallback src="https://res.cloudinary.com/droslno9i/image/upload/v1788694065/FB_IMG_1788680275136_hm9znx.jpg" alt="Graduation 3" className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Leaders Below Apostle */}
        <div className="space-y-12 pt-12 border-t border-[#AE8F05]/20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] border border-[#AE8F05]/30 shadow-sm mb-4" data-about-badge>
              <Users className="w-4 h-4 text-sacred-gold" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sacred-gold">
                {isAm ? "ዋና መሪዎች" : "Key Leaders"}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-warm-slate tracking-tight" data-about-title>
              {isAm ? "የተልዕኮ ለትውልድ ዋና መሪዎች" : "Mission for Nation Key Leaders"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" data-about-image>
            {MAIN_LEADERS.map((leader, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-6 border border-[#AE8F05]/20 shadow-lg hover:shadow-xl hover:border-[#D4AF37] transition-all duration-500 text-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-3 border-[#D4AF37] shadow-lg">
                  <ImageWithFallback
                    src={leader.photoUrl}
                    alt={leader.nameEn}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-lg font-bold text-warm-slate">
                  {isAm ? leader.nameAm : leader.nameEn}
                </h3>
                <p className="text-sm text-[#5C5854] mt-1 font-medium leading-snug">
                  {isAm ? leader.roleAm : leader.roleEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Network Centers - Ordered */}
        <div className="space-y-12 pt-12 border-t border-[#AE8F05]/20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] border border-[#AE8F05]/30 shadow-sm mb-4" data-about-badge>
              <MapPin className="w-4 h-4 text-sacred-gold" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sacred-gold">
                {isAm ? "የኔትወርክ ማዕከላት" : "Network Centers"}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-warm-slate tracking-tight" data-about-title>
              {isAm ? "ተልዕኮ ለትውልድ የኔትወርክ ማዕከላት" : "Mission for Nation Network Centers"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" data-about-image>
            {NETWORKS_ORDERED.map((network, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-[#AE8F05]/20 shadow-lg hover:shadow-xl hover:border-[#D4AF37] transition-all duration-500 text-center group">
                <Award className="w-10 h-10 text-sacred-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-lg font-bold text-warm-slate">
                  {isAm ? network.am : network.en}
                </h3>
                <p className="text-sm text-[#5C5854] mt-1">
                  {isAm ? "የኔትወርክ ማዕከል" : "Network Center"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bible Colleges */}
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-warm-slate tracking-tight" data-about-title>
              {isAm ? "የመጽሐፍ ቅዱስ ኮሌጆች" : "Our Bible Colleges"}
            </h2>
            <p className="mt-4 text-lg text-[#5C5854]" data-about-paragraph>
              Equipping and training leaders to serve nations with the Word of God.
            </p>
          </div>

          {/* Wisdom Bible College */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#AE8F05]/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3" data-about-badge>
                  <div className="p-3 bg-[#F7E7CE] rounded-xl text-sacred-gold">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-warm-slate">Wisdom Bible College</h3>
                </div>
                <div className="prose text-[#5C5854] text-base leading-relaxed">
                  <p data-about-paragraph>Wisdom Bible College began its first college program in Adama City in 2007. From 2007 to 2009, the college trained and graduated <strong>200 ministers</strong>.</p>
                  <p data-about-paragraph>In 2010, the college reorganized its educational structure and upgraded its academic system to a college-level program. With a strong focus on maintaining educational quality, it continued accepting and training students. From 2010 to 2015, the college trained and graduated an additional <strong>100 ministers</strong>.</p>
                  <p data-about-paragraph>From 2016 to 2018, the college provided various short-term courses. In 2019, Wisdom Bible College began reorganizing itself once again and developing a stronger educational system. The college is currently preparing to provide accessible, continuous, and quality education to a wider community.</p>
                  
                  <h4 className="font-bold text-warm-slate mt-6 mb-2">College Address</h4>
                  <p className="bg-alabaster p-4 rounded-xl text-sm border border-gray-100" data-about-paragraph>
                    <strong>Adama City</strong>, at the <strong>Mission to Generation Church building</strong>, near the entrance to Selassie Church, next to Jemal Warehouse.
                  </p>
                  
                  <div className="mt-6 flex items-center space-x-4 bg-[#F7E7CE]/30 p-4 rounded-xl border border-[#AE8F05]/20" data-about-image>
                    <ImageWithFallback src="https://res.cloudinary.com/droslno9i/image/upload/v1788719771/edf02d27-d6f1-403f-8be8-a44bba579d9e_gldgvd.jpg" alt="Pastor Daniel Nigussie" className="w-16 h-16 rounded-full object-cover object-top border-2 border-white shadow-md" />
                    <div>
                      <p className="font-bold text-warm-slate">Pastor Daniel Nigussie</p>
                      <p className="text-sm text-[#5C5854]">Dean of Wisdom Bible College</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4" data-about-image>
                <ImageWithFallback src="https://res.cloudinary.com/droslno9i/image/upload/v1788719771/photo_5832592152800727173_y_v4hviw.jpg" alt="Wisdom Bible College 1" className="w-full h-64 object-cover object-top rounded-2xl shadow-lg hover:scale-105 transition-transform" />
                <ImageWithFallback src="https://res.cloudinary.com/droslno9i/image/upload/v1788720173/photo_5823683063483927700_w_sqotx6.jpg" alt="Wisdom Bible College 2" className="w-full h-64 object-cover object-top rounded-2xl shadow-lg hover:scale-105 transition-transform" />
              </div>
            </div>
          </div>

          {/* Nekemte Afan Oromo Bible College */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#AE8F05]/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-4 order-last lg:order-first" data-about-image>
                <ImageWithFallback src="https://res.cloudinary.com/droslno9i/image/upload/v1788720069/ca42cfa97f1b445b8803d7aac0ffa9bb_dyszza.jpg" alt="Nekemte College Construction" className="w-full h-64 object-cover object-top rounded-2xl shadow-lg hover:scale-105 transition-transform" />
                <ImageWithFallback src="https://res.cloudinary.com/droslno9i/image/upload/v1788719770/photo_5832592152800727195_y_fskc0n.jpg" alt="Nekemte College Planning" className="w-full h-64 object-cover object-top rounded-2xl shadow-lg hover:scale-105 transition-transform" />
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3" data-about-badge>
                  <div className="p-3 bg-[#F7E7CE] rounded-xl text-sacred-gold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-warm-slate">Nekemte Afan Oromo Bible College</h3>
                </div>
                <div className="prose text-[#5C5854] text-base leading-relaxed">
                  <p data-about-paragraph>The Nekemte Afan Oromo Bible College is well underway and preparing for its future mission. It is currently in the process of completing a massive <strong>5-story building</strong>, which has now reached the 4th floor of construction.</p>
                  <p data-about-paragraph>While the college has not officially begun operations yet, anticipation is high. It is believed that by the end of 2019, the building will be fully inaugurated and the college will officially open its doors to students.</p>
                  
                  <div className="mt-8 flex items-center space-x-4 bg-[#F7E7CE]/30 p-4 rounded-xl border border-[#AE8F05]/20" data-about-image>
                    <ImageWithFallback src="https://res.cloudinary.com/droslno9i/image/upload/v1788719770/photo_5832592152800727193_y_a69ivl.jpg" alt="Pastor Paulos Hailu" className="w-16 h-16 rounded-full object-cover object-top border-2 border-white shadow-md" />
                    <div>
                      <p className="font-bold text-warm-slate">Pastor Paulos Hailu</p>
                      <p className="text-sm text-[#5C5854]">Senior Pastor of Nekemte MFN church & Leader of Nekemte Network</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}