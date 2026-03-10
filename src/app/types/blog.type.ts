// defines types for blog posts returned by the backend

export interface BlogPost {
  id: string;
  text: string;
  image_url: string | null;
  video_url: string | null;
  created_at: string;
  expires_at: string | null;
}

export interface BlogsApiResponse {
  blogs: BlogPost[];
}
