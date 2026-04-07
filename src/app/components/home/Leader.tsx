import { Mail, Phone } from "lucide-react";

export default function Leaders() {
  const leaders = [
    {
      id: 1,
      name: "Pastor Daniel Kebede",
      role: "Senior Pastor",
      image: "https://images.unsplash.com/photo-1620565404581-e0aea3f826ef?ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Leading our congregation with wisdom and compassion for over 15 years.",
      email: "pastor.daniel@church.org",
      phone: "+251-911-234567",
    },
    {
      id: 2,
      name: "Pastor Ruth Alemayehu",
      role: "Associate Pastor",
      image: "https://images.unsplash.com/photo-1623096939009-cb651b7700f9?ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Passionate about worship, prayer, and empowering women in ministry.",
      email: "pastor.ruth@church.org",
      phone: "+251-911-345678",
    },
    {
      id: 3,
      name: "Elder Solomon Tesfaye",
      role: "Youth Pastor",
      image: "https://images.unsplash.com/photo-1770240366512-9d75e9ca7ab8?ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Dedicated to guiding the next generation in their walk with Christ.",
      email: "solomon@church.org",
      phone: "+251-911-456789",
    },
    {
      id: 4,
      name: "Sister Marta Hailu",
      role: "Worship Leader",
      image: "https://images.unsplash.com/photo-1617544518238-492c0c419a6d?ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Creating an atmosphere of worship where hearts are transformed.",
      email: "marta@church.org",
      phone: "+251-911-567890",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors">Meet Our Leaders</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            Dedicated servants called to shepherd and guide our community
          </p>
        </div>

        {leaders.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 italic">Leadership profiles will be available soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-800"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Floating Role Badge over image */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-3 py-1 bg-[#d4af37] text-[#1a3c34] text-xs font-bold uppercase tracking-wider rounded-full shadow-lg backdrop-blur-md">
                      {leader.role}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">{leader.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed transition-colors">
                    {leader.bio}
                  </p>

                  <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-6 transition-colors" />

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <a
                      href={`mailto:${leader.email}`}
                      className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#d4af37] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{leader.email}</span>
                    </a>
                    <a
                      href={`tel:${leader.phone}`}
                      className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#d4af37] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{leader.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
