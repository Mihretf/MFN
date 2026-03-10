// region.interface.ts
export interface Region {
  id: string;
  name: string;
}

// church.interface.ts
export interface Church {
  id: string;
  name: string;
}

// post.interface.ts
export type PostType = "event" | "announcement" | "news" | "sermon" | "gallery";

export interface Post {
  id: string;
  title: string;
  description: string;
  type: PostType;
  media_url: string;
  show_on_homepage: boolean;
  region: Region;
  church: Church;
  created_at: string; // ISO string
  // for events, the backend may include an optional deadline date (ISO string)
  deadline?: string | null;
}

// pagination.interface.ts
export interface PaginationMeta {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}

export interface PostsResponse {
  success: boolean;
  message: string;
  data: {
    results: Post[];
  };
  errors: null | string[];
  warnings: null | string[];
  meta: {
    pagination: PaginationMeta;
  };
}

// -----------------------------------------------------------------------------
// Gallery types
// -----------------------------------------------------------------------------

/**
 * Internal shape used by the UI components.
 */
export interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
}

/**
 * Response returned by the galleries endpoint.
 */
export interface GalleryApiResponse {
  galleries: Array<{
    id: string;
    author_id: string;
    region_id: string;
    region_name?: string;
    church_id: string | null;
    church_name: string | null;
    title?: string | null;
    type?: string | null;
    description?: string | null;
    caption: string | null;
    image_url: string;
    location_link: string | null;
    expires_at: string | null;
    created_at: string;
  }>;
}
