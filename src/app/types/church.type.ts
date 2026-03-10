// types/church.type.ts
// Response from /api/churches/:id

export interface ServicesTime {
  day: string;
  time: string;
  type: string;
}

export interface AnnouncementAPI {
  id: string;
  date: string;
  title: string;
  content: string;
  priority: string;
}

export interface PastorAPI {
  bio: string;
  name: string;
  role: string;
  image: string;
}

export interface EventAPI {
  id: string;
  date: string;
  time: string;
  image: string;
  title: string;
  description: string;
}

export interface MinistryAPI {
  id: string;
  icon: string;
  name: string;
  description: string;
}

export interface GalleryAPI {
  id: string;
  url: string;
  caption: string | null;
}

export interface ChurchResponse {
  church: {
    id: string;
    region_id: string;
    name: string;
    location_link: string;
    created_at: string;
    external_id: string;
    location: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    hero_image: string;
    service_times: ServicesTime[];
    announcements: AnnouncementAPI[];
    pastor: PastorAPI;
    events: EventAPI[];
    ministries: MinistryAPI[];
    gallery: GalleryAPI[];
    map_url: string;
    updated_at: string;
  };
}

export interface ChurchListResponse {
  churches: Array<{
    id: string;
    region_id: string;
    name: string;
    location_link: string;
    created_at: string;
    external_id: string;
    location: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    hero_image: string;
    service_times: ServicesTime[];
    announcements: AnnouncementAPI[];
    pastor: PastorAPI;
    events: EventAPI[];
    ministries: MinistryAPI[];
    gallery: GalleryAPI[];
    map_url: string;
    updated_at: string;
  }>;
}
