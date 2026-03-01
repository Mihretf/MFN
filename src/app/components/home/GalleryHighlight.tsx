import { Calendar, MapPin, Church, ArrowRight } from "lucide-react";
import { Post } from "../../types/gallery.type";

// Mock posts data filtered for homepage (show_on_homepage: true)
const homepagePosts: Post[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Youth Conference 2026",
    description:
      "Annual gathering of youth from across all regions. Join us for three days of worship, teaching, workshops, and fellowship as we seek God together.",
    type: "event",
    media_url:
      "https://images.unsplash.com/photo-1760367120345-2b96c53de838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MjI5MjAzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: true,
    created_at: "2026-03-01T08:00:00Z",
    region: {
      id: "550e8400-e29b-41d4-a716-446655440011",
      name: "Addis Ababa Region",
    },
    church: {
      id: "550e8400-e29b-41d4-a716-446655440021",
      name: "Holy Trinity Church",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "Easter Celebration Service",
    description:
      "Celebrate the resurrection of Jesus Christ with us this Easter Sunday. Special music, powerful message, and family activities throughout the day.",
    type: "event",
    media_url:
      "https://images.unsplash.com/photo-1770097005000-edcd87ec41b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBldmVudCUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MjM2NzgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: true,
    created_at: "2026-02-28T10:30:00Z",
    region: {
      id: "550e8400-e29b-41d4-a716-446655440012",
      name: "Oromia Region",
    },
    church: {
      id: "550e8400-e29b-41d4-a716-446655440022",
      name: "Beza International Church",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "The Power of Faith",
    description:
      "Pastor Daniel delivers an inspiring sermon on building unshakeable faith in difficult times.",
    type: "sermon",
    media_url:
      "https://images.unsplash.com/photo-1620565404581-e0aea3f826ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBzZXJtb24lMjBiaWJsZXxlbnwxfHx8fDE3NzIzNjc4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: true,
    created_at: "2026-02-27T09:00:00Z",
    region: {
      id: "550e8400-e29b-41d4-a716-446655440011",
      name: "Addis Ababa Region",
    },
    church: {
      id: "550e8400-e29b-41d4-a716-446655440021",
      name: "Holy Trinity Church",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    title: "Community Outreach Success",
    description:
      "Thank you to everyone who participated in our community outreach program! Together we served over 500 families.",
    type: "news",
    media_url:
      "https://images.unsplash.com/photo-1762013728402-69cff78f29fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb21tdW5pdHklMjBzZXJ2aWNlfGVufDF8fHx8MTc3MjM2NzgzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: true,
    created_at: "2026-02-25T16:30:00Z",
    region: {
      id: "550e8400-e29b-41d4-a716-446655440012",
      name: "Oromia Region",
    },
    church: {
      id: "550e8400-e29b-41d4-a716-446655440022",
      name: "Beza International Church",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    title: "Walking in the Spirit",
    description:
      "Pastor Ruth shares a powerful message about living a Spirit-filled life and experiencing the fruit of the Spirit.",
    type: "sermon",
    media_url:
      "https://images.unsplash.com/photo-1623096939009-cb651b7700f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBwcmF5ZXIlMjBtZWV0aW5nfGVufDF8fHx8MTc3MjM2NzgzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: true,
    created_at: "2026-02-23T11:00:00Z",
    region: {
      id: "550e8400-e29b-41d4-a716-446655440014",
      name: "Tigray Region",
    },
    church: {
      id: "550e8400-e29b-41d4-a716-446655440024",
      name: "Full Gospel Church",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    title: "Small Group Registration",
    description:
      "Small groups are the heart of our church community! Sign up now for spring semester groups.",
    type: "announcement",
    media_url:
      "https://images.unsplash.com/photo-1760367120345-2b96c53de838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MjI5MjAzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: true,
    created_at: "2026-02-21T15:00:00Z",
    region: {
      id: "550e8400-e29b-41d4-a716-446655440012",
      name: "Oromia Region",
    },
    church: {
      id: "550e8400-e29b-41d4-a716-446655440022",
      name: "Beza International Church",
    },
  },
];

const postTypeBadgeColors = {
  event: "bg-blue-100 text-blue-700 border-blue-200",
  news: "bg-green-100 text-green-700 border-green-200",
  sermon: "bg-purple-100 text-purple-700 border-purple-200",
  announcement: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function GalleryHighlight() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const displayPosts = homepagePosts.slice(0, 6);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Latest Updates</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay connected with what's happening in our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={post.media_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Post Type Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide border ${postTypeBadgeColors[post.type]}`}
                  >
                    {post.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.description}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{post.region.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Church className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{post.church.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>

                <button className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1 group/btn">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
}
