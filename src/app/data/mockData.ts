export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  image: string;
  description?: string;
}

export interface ServiceTime {
  day: string;
  time: string;
  type: string;
}

export interface Pastor {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  heroImage: string;
  serviceTimes: ServiceTime[];
  announcements: Announcement[];
  pastor: Pastor;
  events: Event[];
  ministries: Ministry[];
  gallery: GalleryImage[];
  mapUrl: string;
}

export const branches: Branch[] = [
  {
    id: "north",
    name: "North Campus",
    location: "Highland Park",
    address: "123 Highland Avenue, Highland Park, CA 90042",
    phone: "(555) 123-4567",
    email: "north@missionfornation.org",
    description: "A vibrant community in the heart of Highland Park, welcoming families and individuals to worship together and grow in faith.",
    heroImage: "https://images.unsplash.com/photo-1762967028624-d93c7b343701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaHVyY2glMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MjM2Mzk2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    serviceTimes: [
      { day: "Sunday", time: "9:00 AM", type: "Morning Worship" },
      { day: "Sunday", time: "11:00 AM", type: "Family Service" },
      { day: "Wednesday", time: "7:00 PM", type: "Bible Study" },
    ],
    announcements: [
      {
        id: "a1",
        title: "Easter Service - Special Schedule",
        date: "March 30, 2026",
        content: "Join us for our special Easter celebration with services at 8 AM, 10 AM, and 12 PM. No evening service on Easter Sunday.",
        priority: "high",
      },
      {
        id: "a2",
        title: "Youth Camp Registration Open",
        date: "March 15, 2026",
        content: "Summer youth camp registration is now open! Early bird pricing available until April 1st.",
        priority: "medium",
      },
      {
        id: "a3",
        title: "Community Food Drive",
        date: "March 10, 2026",
        content: "We're collecting non-perishable food items for local families in need. Drop-off boxes available in the lobby.",
        priority: "medium",
      },
    ],
    pastor: {
      name: "Rev. Michael Anderson",
      role: "Senior Pastor",
      image: "https://images.unsplash.com/photo-1605518589548-27b44b941b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBwYXN0b3IlMjBwcmVhY2hpbmd8ZW58MXx8fHwxNzcyMzYzOTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Pastor Michael has been serving the North Campus community for over 15 years. He is passionate about building authentic relationships and helping people discover their purpose in Christ.",
    },
    events: [
      {
        id: "e1",
        title: "Sunday Worship",
        date: "Every Sunday",
        time: "9:00 AM & 11:00 AM",
        image: "https://images.unsplash.com/photo-1742809888840-1f7891a09479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwY29uY2VydCUyMGRhcmslMjBtb29keSUyMGdvbGQlMjBsaWdodGluZ3xlbnwxfHx8fDE3NzA5MDQ0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Join us for uplifting worship and biblical teaching.",
      },
      {
        id: "e2",
        title: "Youth Night",
        date: "Every Friday",
        time: "6:30 PM",
        image: "https://images.unsplash.com/photo-1726679402113-beb32b857a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB5b3V0aCUyMGdyb3VwJTIwYWN0aXZpdGllc3xlbnwxfHx8fDE3NzIzNjM5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "High school students gather for games, worship, and fellowship.",
      },
      {
        id: "e3",
        title: "Bible Study",
        date: "Every Wednesday",
        time: "7:00 PM",
        image: "https://images.unsplash.com/photo-1760992003923-ed5d455c1164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzZXJ2aWNlJTIwdm9sdW50ZWVycyUyMGhlbHBpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzcwOTA0NDEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Dive deeper into God's Word in a welcoming small group setting.",
      },
    ],
    ministries: [
      {
        id: "m1",
        name: "Children's Ministry",
        description: "Age-appropriate programs for infants through 5th grade with engaging lessons and caring teachers.",
        icon: "Baby",
      },
      {
        id: "m2",
        name: "Youth Ministry",
        description: "Empowering middle and high school students to grow in faith through dynamic worship and mentorship.",
        icon: "Users",
      },
      {
        id: "m3",
        name: "Worship Team",
        description: "Musicians and vocalists leading our congregation in authentic, Spirit-led worship.",
        icon: "Music",
      },
      {
        id: "m4",
        name: "Community Outreach",
        description: "Serving our local community through food drives, mentoring programs, and compassionate care.",
        icon: "Heart",
      },
    ],
    gallery: [
      {
        id: "g1",
        url: "https://images.unsplash.com/photo-1762013728402-69cff78f29fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY2h1cmNoJTIwY29tbXVuaXR5JTIwd29yc2hpcHxlbnwxfHx8fDE3NzIzNjE3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Sunday Worship Service",
      },
      {
        id: "g2",
        url: "https://images.unsplash.com/photo-1768569391908-5c92c83744f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMHdvcnNoaXAlMjBzcGFjZXxlbnwxfHx8fDE3NzIzNjM5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Our Worship Space",
      },
      {
        id: "g3",
        url: "https://images.unsplash.com/photo-1717201611955-f7e723802d15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb21tdW5pdHklMjBzZXJ2aWNlJTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NzIzNjM5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Community Service Day",
      },
      {
        id: "g4",
        url: "https://images.unsplash.com/photo-1726679402113-beb32b857a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB5b3V0aCUyMGdyb3VwJTIwYWN0aXZpdGllc3xlbnwxfHx8fDE3NzIzNjM5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Youth Group Activities",
      },
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.8574764436946!2d-118.1967!3d34.1139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA2JzUwLjAiTiAxMTjCsDExJzQ4LjEiVw!5e0!3m2!1sen!2sus!4v1234567890",
  },
  {
    id: "south",
    name: "South Branch",
    location: "River Valley",
    address: "456 River Road, River Valley, CA 90043",
    phone: "(555) 234-5678",
    email: "south@missionfornation.org",
    description: "A warm and welcoming church community in River Valley, committed to sharing God's love through service and fellowship.",
    heroImage: "https://images.unsplash.com/photo-1763688506433-033fc84f6559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaHVyY2glMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwbWluaW1hbCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzA5MDQ0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    serviceTimes: [
      { day: "Sunday", time: "10:00 AM", type: "Main Service" },
      { day: "Sunday", time: "6:00 PM", type: "Evening Service" },
      { day: "Thursday", time: "7:30 PM", type: "Prayer Meeting" },
    ],
    announcements: [
      {
        id: "a4",
        title: "New Members Class",
        date: "March 20, 2026",
        content: "Interested in becoming a member? Join us for our next membership class starting April 5th.",
        priority: "high",
      },
      {
        id: "a5",
        title: "Women's Conference",
        date: "March 12, 2026",
        content: "Save the date for our annual Women's Conference on April 15-16. Registration opens soon!",
        priority: "medium",
      },
    ],
    pastor: {
      name: "Pastor Sarah Johnson",
      role: "Lead Pastor",
      image: "https://images.unsplash.com/photo-1605518589548-27b44b941b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBwYXN0b3IlMjBwcmVhY2hpbmd8ZW58MXx8fHwxNzcyMzYzOTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Pastor Sarah brings over 10 years of ministry experience and has a heart for community outreach and discipleship. She loves teaching God's Word with clarity and passion.",
    },
    events: [
      {
        id: "e4",
        title: "Morning Prayer",
        date: "Every Sunday",
        time: "6:00 AM",
        image: "https://images.unsplash.com/photo-1763688506433-033fc84f6559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaHVyY2glMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwbWluaW1hbCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzA5MDQ0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Start your day with prayer and meditation.",
      },
      {
        id: "e5",
        title: "Community Lunch",
        date: "Last Saturday",
        time: "12:00 PM",
        image: "https://images.unsplash.com/photo-1717201611955-f7e723802d15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb21tdW5pdHklMjBzZXJ2aWNlJTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NzIzNjM5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Free lunch for the community, all are welcome.",
      },
    ],
    ministries: [
      {
        id: "m5",
        name: "Prayer Ministry",
        description: "Committed intercessors available to pray with and for our congregation and community.",
        icon: "Heart",
      },
      {
        id: "m6",
        name: "Small Groups",
        description: "Life-giving community groups meeting throughout the week for study, prayer, and fellowship.",
        icon: "Users",
      },
      {
        id: "m7",
        name: "Hospitality Team",
        description: "Creating a welcoming environment for first-time guests and regular attendees alike.",
        icon: "Coffee",
      },
    ],
    gallery: [
      {
        id: "g5",
        url: "https://images.unsplash.com/photo-1762013728402-69cff78f29fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY2h1cmNoJTIwY29tbXVuaXR5JTIwd29yc2hpcHxlbnwxfHx8fDE3NzIzNjE3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Worship Together",
      },
      {
        id: "g6",
        url: "https://images.unsplash.com/photo-1717201611955-f7e723802d15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb21tdW5pdHklMjBzZXJ2aWNlJTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NzIzNjM5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Serving Our Community",
      },
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.1234!2d-118.2345!3d34.0987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA1JzU1LjMiTiAxMTjCsDE0JzA0LjIiVw!5e0!3m2!1sen!2sus!4v1234567891",
  },
  {
    id: "east",
    name: "East Side",
    location: "Downtown",
    address: "789 Main Street, Downtown, CA 90012",
    phone: "(555) 345-6789",
    email: "east@missionfornation.org",
    description: "Located in the heart of downtown, we're a diverse congregation passionate about worship, discipleship, and urban ministry.",
    heroImage: "https://images.unsplash.com/photo-1768569391908-5c92c83744f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMHdvcnNoaXAlMjBzcGFjZXxlbnwxfHx8fDE3NzIzNjM5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    serviceTimes: [
      { day: "Sunday", time: "8:30 AM", type: "Traditional Service" },
      { day: "Sunday", time: "10:30 AM", type: "Contemporary Service" },
      { day: "Tuesday", time: "6:00 PM", type: "Young Adults" },
    ],
    announcements: [
      {
        id: "a6",
        title: "Baptism Sunday Coming Up",
        date: "March 25, 2026",
        content: "If you're interested in being baptized on April 10th, please contact the church office by March 31st.",
        priority: "high",
      },
      {
        id: "a7",
        title: "Volunteer Orientation",
        date: "March 8, 2026",
        content: "Want to serve? Join us for volunteer orientation on March 22nd at 1 PM.",
        priority: "low",
      },
    ],
    pastor: {
      name: "Rev. David Chen",
      role: "Senior Pastor",
      image: "https://images.unsplash.com/photo-1605518589548-27b44b941b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBwYXN0b3IlMjBwcmVhY2hpbmd8ZW58MXx8fHwxNzcyMzYzOTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Pastor David is dedicated to equipping believers for ministry and reaching the downtown community with the Gospel. He has been in ministry for 20 years.",
    },
    events: [
      {
        id: "e6",
        title: "Choir Practice",
        date: "Every Thursday",
        time: "5:00 PM",
        image: "https://images.unsplash.com/photo-1742809888840-1f7891a09479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwY29uY2VydCUyMGRhcmslMjBtb29keSUyMGdvbGQlMjBsaWdodGluZ3xlbnwxfHx8fDE3NzA5MDQ0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Join our choir for weekly practice and special performances.",
      },
      {
        id: "e7",
        title: "Men's Breakfast",
        date: "First Saturday",
        time: "8:00 AM",
        image: "https://images.unsplash.com/photo-1555069855-e580a9adbf43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZ3JvdXAlMjBvZiUyMHBlb3BsZSUyMHRlYW0lMjBtZWV0aW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NzA5MDQ0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Men gather for fellowship, food, and encouragement.",
      },
    ],
    ministries: [
      {
        id: "m8",
        name: "Urban Outreach",
        description: "Partnering with local organizations to serve the homeless and vulnerable populations.",
        icon: "Building",
      },
      {
        id: "m9",
        name: "Creative Arts",
        description: "Using dance, drama, and visual arts to glorify God and engage our community.",
        icon: "Palette",
      },
      {
        id: "m10",
        name: "Missions",
        description: "Supporting global missions and organizing short-term mission trips.",
        icon: "Globe",
      },
    ],
    gallery: [
      {
        id: "g7",
        url: "https://images.unsplash.com/photo-1768569391908-5c92c83744f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMHdvcnNoaXAlMjBzcGFjZXxlbnwxfHx8fDE3NzIzNjM5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Sanctuary Interior",
      },
      {
        id: "g8",
        url: "https://images.unsplash.com/photo-1762013728402-69cff78f29fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY2h1cmNoJTIwY29tbXVuaXR5JTIwd29yc2hpcHxlbnwxfHx8fDE3NzIzNjE3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Community Worship",
      },
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.5678!2d-118.2500!3d34.0521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzA3LjYiTiAxMTjCsDE1JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567892",
  },
];