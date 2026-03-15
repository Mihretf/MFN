import { Mail, Phone } from "lucide-react";

export default function Leaders() {
  const leaders = [
    {
      id: 1,
      name: "Pastor Daniel Kebede",
      role: "Senior Pastor",
      image:
        "https://res.cloudinary.com/di5zfjqlt/image/upload/v1773561663/photo_2_2026-03-15_10-59-30_ddub3t.jpg",
      bio: "Leading our congregation with wisdom and compassion for over 15 years.",
      email: "pastor.daniel@church.org",
      phone: "+251-911-234567",
    },
    {
      id: 2,
      name: "Pastor Ruth Alemayehu",
      role: "Associate Pastor",
      image:
        "https://res.cloudinary.com/di5zfjqlt/image/upload/v1773561663/photo_1_2026-03-15_10-59-30_uhbgop.jpg",
      bio: "Passionate about worship, prayer, and empowering women in ministry.",
      email: "pastor.ruth@church.org",
      phone: "+251-911-345678",
    },
    {
      id: 3,
      name: "Elder Solomon Tesfaye",
      role: "Youth Pastor",
      image:
        "https://res.cloudinary.com/di5zfjqlt/image/upload/v1773561663/photo_3_2026-03-15_10-59-30_xbfqt4.jpg",
      bio: "Dedicated to guiding the next generation in their walk with Christ.",
      email: "solomon@church.org",
      phone: "+251-911-456789",
    },
    {
      id: 4,
      name: "Sister Marta Hailu",
      role: "Worship Leader",
      image:
        "https://res.cloudinary.com/di5zfjqlt/image/upload/v1773561663/photo_3_2026-03-15_10-59-30_xbfqt4.jpg",
      bio: "Creating an atmosphere of worship where hearts are transformed.",
      email: "marta@church.org",
      phone: "+251-911-567890",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Meet Our Leaders</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dedicated servants called to shepherd and guide our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl text-gray-900 mb-1">{leader.name}</h3>
                <p className="text-blue-600 text-sm mb-3 uppercase tracking-wide">
                  {leader.role}
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {leader.bio}
                </p>

                {/* Contact Info */}
                <div className="space-y-2">
                  <a
                    href={`mailto:${leader.email}`}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{leader.email}</span>
                  </a>
                  <a
                    href={`tel:${leader.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{leader.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
