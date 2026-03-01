import { Users, Heart, Globe, BookOpen } from "lucide-react";

export default function Impact() {
  const stats = [
    {
      id: 1,
      icon: Users,
      value: "15,000+",
      label: "Church Members",
      color: "blue",
    },
    {
      id: 2,
      icon: Heart,
      value: "500+",
      label: "Families Served",
      color: "red",
    },
    {
      id: 3,
      icon: Globe,
      value: "25",
      label: "Countries Reached",
      color: "green",
    },
    {
      id: 4,
      icon: BookOpen,
      value: "1,200+",
      label: "Bible Studies",
      color: "purple",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Our Impact</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Together, we're making a difference in our community and around the
            world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${colorClasses[stat.color as keyof typeof colorClasses]}`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Additional Impact Description */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl text-gray-900 mb-4">
              Building a Community of Faith
            </h3>
            <p className="text-gray-700 leading-relaxed">
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
