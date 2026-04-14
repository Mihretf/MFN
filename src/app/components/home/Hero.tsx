import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/photo_1_2026-03-15_09-31-24.jpg"
          alt="Mission For Nation Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c34]/90 dark:from-gray-900/90 to-black/60 dark:to-black/80 mix-blend-multiply transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a3c34]/80 dark:via-gray-900/80 to-[#1a3c34] dark:to-gray-900 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl text-white mb-6 animate-fade-in">
          {t("hero.welcome")}
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto animate-fade-in delay-100 drop-shadow-md">
          {t("hero.moto")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/services"
            className="px-8 py-4 bg-[#d4af37] text-gray-900 hover:text-white dark:hover:text-gray-900 font-bold rounded-lg hover:bg-[#f0d082] transition-colors shadow-lg"
          >
            {t("hero.joinUs")}
          </Link>

          <a
            href="https://www.youtube.com/@7spirits_tv"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold border border-white/30 rounded-lg hover:bg-white/20 transition-colors"
          >
            {t("hero.watchLive")}
          </a>
        </div>
      </div>

    </section>
  );
}
