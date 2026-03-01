import { Radio, Calendar, Clock } from "lucide-react";

export default function LiveStream() {
  const upcomingServices = [
    {
      id: 1,
      title: "Sunday Morning Worship",
      day: "Sunday",
      time: "9:00 AM",
      description: "Join us for our main worship service",
    },
    {
      id: 2,
      title: "Mid-Week Prayer",
      day: "Wednesday",
      time: "7:00 PM",
      description: "Evening prayer and Bible study",
    },
    {
      id: 3,
      title: "Youth Service",
      day: "Friday",
      time: "6:00 PM",
      description: "Dynamic worship for young adults",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Radio className="w-6 h-6 text-red-500" />
            <span className="text-sm uppercase tracking-wide text-red-500">
              Live Now
            </span>
          </div>
          <h2 className="text-4xl text-gray-900 mb-4">Watch Our Live Stream</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Can't make it to church? Join us online and worship with our global
            community
          </p>
        </div>

        {/* Video Player Placeholder */}
        <div className="mb-12">
          <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1617544518238-492c0c419a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBtdXNpYyUyMGNob2lyfGVufDF8fHx8MTc3MjM2NzgzMXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Live Stream"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all transform hover:scale-110 shadow-lg">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-blue-600 border-b-8 border-b-transparent ml-1"></div>
              </button>
            </div>
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white rounded-full text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>
          </div>
        </div>

        {/* Upcoming Services */}
        <div>
          <h3 className="text-2xl text-gray-900 mb-6 text-center">
            Upcoming Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingServices.map((service) => (
              <div
                key={service.id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm uppercase tracking-wide">
                    {service.day}
                  </span>
                </div>
                <h4 className="text-xl text-gray-900 mb-2">{service.title}</h4>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{service.time}</span>
                </div>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
