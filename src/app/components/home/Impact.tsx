import { Users, Heart, Globe, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Impact() {
  const { t } = useTranslation();
  
  const stats = [
    {
      id: 1,
      icon: Users,
      value: "200k+",
      label: t("impact.churchMembers"),
      color: "blue",
    },
    {
      id: 2,
      icon: Heart,
      value: "20k",
      label: t("impact.familiesServed"),
      color: "red",
    },
    {
      id: 3,
      icon: Globe,
      value: "5",
      label: t("impact.countriesReached"),
      color: "green",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    red: "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400",
    green: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
    purple: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400",
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors">
            {t("impact.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            Together, we're making a difference in our community and around the
            world
          </p>
        </div>

        {stats.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 italic">Impact metrics will be available soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white dark:bg-gray-800/80 rounded-3xl p-8 text-center border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm ${colorClasses[stat.color as keyof typeof colorClasses]}`}
                  >
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium tracking-wide uppercase text-sm mt-3">{stat.label}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Additional Impact Description */}
        <div className="mt-16 bg-[#1a3c34]/5 dark:bg-[#d4af37]/10 border border-[#1a3c34]/10 dark:border-[#d4af37]/20 rounded-2xl p-8 md:p-12 transition-colors">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-[#1a3c34] dark:text-[#f0d082] mb-4 transition-colors">
              Building a Community of Faith
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium transition-colors">
              For over 50 years, our church has been a beacon of hope and love
              in the community. Through our various ministries, outreach
              programs, and missions, we continue to spread the Gospel and serve
              those in need. Every day, we witness lives transformed by the
              power of God's love.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
