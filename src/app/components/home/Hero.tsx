import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1763688506433-033fc84f6559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaHVyY2glMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwbWluaW1hbCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzA5MDQ0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mission For Nation Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c34]/90 to-[#1a3c34]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a3c34]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl text-white mb-6 animate-fade-in">
          Welcome to Our Church
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          A community of faith, hope, and love. Join us as we worship together
          and grow in Christ.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/services"
            className="px-8 py-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all"
          >
            Join Us This Sunday
          </Link>

          <Link
            to="/live"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border rounded-lg"
          >
            Watch Live
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
