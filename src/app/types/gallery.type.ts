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
export type PostType = "event" | "announcement" | "news" | "sermon";

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
