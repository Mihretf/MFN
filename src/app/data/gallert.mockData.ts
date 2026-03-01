import { Post } from "../types/gallery.type";

export const mockPosts: Post[] = [
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
      "Pastor Daniel delivers an inspiring sermon on building unshakeable faith in difficult times. Discover how to trust God when circumstances seem impossible.",
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
    id: "550e8400-e29b-41d4-a716-446655440004",
    title: "New Building Dedication",
    description:
      "We are excited to announce the dedication of our new worship center! Join us as we celebrate this milestone and commit this space to God's glory.",
    type: "announcement",
    media_url:
      "https://images.unsplash.com/photo-1638866413606-e070e7defe21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBhbm5vdW5jZW1lbnQlMjBidWxsZXRpbnxlbnwxfHx8fDE3NzIzNjc4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: false,
    created_at: "2026-02-26T14:00:00Z",
    region: {
      id: "550e8400-e29b-41d4-a716-446655440013",
      name: "Amhara Region",
    },
    church: {
      id: "550e8400-e29b-41d4-a716-446655440023",
      name: "Mekane Yesus Church",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    title: "Community Outreach Success",
    description:
      "Thank you to everyone who participated in our community outreach program! Together we served over 500 families and shared the love of Christ.",
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
    id: "550e8400-e29b-41d4-a716-446655440006",
    title: "Sunday School Teachers Training",
    description:
      "Calling all Sunday school teachers! Join us for a comprehensive training session on effective teaching methods and curriculum planning.",
    type: "event",
    media_url:
      "https://images.unsplash.com/photo-1770240366512-9d75e9ca7ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB5b3V0aCUyMGdyb3VwfGVufDF8fHx8MTc3MjM2NzgzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: false,
    created_at: "2026-02-24T19:00:00Z",
    region: {
      id: "550e8400-e29b-41d4-a716-446655440013",
      name: "Amhara Region",
    },
    church: {
      id: "550e8400-e29b-41d4-a716-446655440023",
      name: "Mekane Yesus Church",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    title: "Walking in the Spirit",
    description:
      "Pastor Ruth shares a powerful message about living a Spirit-filled life and experiencing the fruit of the Spirit in our daily walk with God.",
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
    id: "550e8400-e29b-41d4-a716-446655440008",
    title: "New Worship Team Members",
    description:
      "We are blessed to welcome talented musicians to our worship team! Come hear them lead us in worship this Sunday.",
    type: "news",
    media_url:
      "https://images.unsplash.com/photo-1617544518238-492c0c419a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBtdXNpYyUyMGNob2lyfGVufDF8fHx8MTc3MjM2NzgzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: false,
    created_at: "2026-02-22T13:00:00Z",
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
    id: "550e8400-e29b-41d4-a716-446655440009",
    title: "Small Group Registration",
    description:
      "Small groups are the heart of our church community! Sign up now for spring semester groups. Options available for all ages and interests.",
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
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    title: "Marriage Enrichment Seminar",
    description:
      "Invest in your marriage! Join us for a transformative day with practical workshops, biblical teaching, and time to reconnect with your spouse.",
    type: "event",
    media_url:
      "https://images.unsplash.com/photo-1770097005000-edcd87ec41b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBldmVudCUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MjM2NzgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: false,
    created_at: "2026-02-20T08:00:00Z",
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
    id: "550e8400-e29b-41d4-a716-446655440011",
    title: "Living with Purpose",
    description:
      "Discover your God-given purpose and learn practical steps to live out your calling with passion and intentionality in every area of life.",
    type: "sermon",
    media_url:
      "https://images.unsplash.com/photo-1620565404581-e0aea3f826ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBzZXJtb24lMjBiaWJsZXxlbnwxfHx8fDE3NzIzNjc4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: true,
    created_at: "2026-02-19T10:00:00Z",
    region: {
      id: "550e8400-e29b-41d4-a716-446655440013",
      name: "Amhara Region",
    },
    church: {
      id: "550e8400-e29b-41d4-a716-446655440023",
      name: "Mekane Yesus Church",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    title: "Mission Trip Report",
    description:
      "Our team has returned from serving in rural communities! Read about the amazing ways God worked through our mission trip and lives that were transformed.",
    type: "news",
    media_url:
      "https://images.unsplash.com/photo-1762013728402-69cff78f29fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb21tdW5pdHklMjBzZXJ2aWNlfGVufDF8fHx8MTc3MjM2NzgzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    show_on_homepage: false,
    created_at: "2026-02-18T12:00:00Z",
    region: {
      id: "550e8400-e29b-41d4-a716-446655440011",
      name: "Addis Ababa Region",
    },
    church: {
      id: "550e8400-e29b-41d4-a716-446655440021",
      name: "Holy Trinity Church",
    },
  },
];
