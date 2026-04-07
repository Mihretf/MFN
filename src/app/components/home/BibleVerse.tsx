import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BibleVerse() {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a3c34]/10 dark:bg-[#d4af37]/20 rounded-full mb-6 transition-colors shadow-sm">
          <BookOpen className="w-8 h-8 text-[#1a3c34] dark:text-[#d4af37] transition-colors" />
        </div>
        <blockquote className="text-2xl md:text-3xl text-gray-900 dark:text-white mb-6 italic leading-relaxed font-medium transition-colors">
          {t("bible.quote")}
        </blockquote>
        <cite className="text-lg text-[#d4af37] font-semibold tracking-wide uppercase transition-colors">{t("bible.citation")}</cite>
      </div>
    </section>
  );
}
