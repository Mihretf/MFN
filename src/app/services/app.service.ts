// services/api.ts

import { getCache, setCache } from "../utils/cache";

const API_BASE_URL = "http://localhost:4000";

type Role = "super" | "regional_admin" | "user";
type SortOrder = "newest" | "oldest";
type PostCategory = "special_program" | "mission" | "program_sunday";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: RequestMethod;
  body?: any;
  token?: string;
  isFormData?: boolean;
}

async function request<T = any>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, token, isFormData = false } = options;

  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type");
  const data =
    contentType && contentType.includes("application/json")
      ? await response.json()
      : await response.text();

  if (!response.ok) {
    throw new Error(
      typeof data === "object" && data?.message
        ? data.message
        : `Request failed with status ${response.status}`,
    );
  }

  return data as T;
}

/* =========================
   AUTH + INVITE FLOW
========================= */

export const authService = {
  login: (payload: { email: string; password: string }) =>
    request<{ token: string }>("/auth/login", {
      method: "POST",
      body: payload,
    }),

  validateInvite: (token: string) =>
    request(`/invite/validate?token=${encodeURIComponent(token)}`),

  acceptInvite: (payload: { token: string; email: string; password: string }) =>
    request<{ token: string }>("/auth/accept-invite", {
      method: "POST",
      body: payload,
    }),
};

export const inviteService = {
  sendInvite: (
    payload: {
      email: string;
      role: "regional_admin";
      region_id: string | number;
    },
    token: string,
  ) =>
    request("/invite/send", {
      method: "POST",
      body: payload,
      token,
    }),
};

/* =========================
   REGION + CHURCH
========================= */

export const regionService = {
  createRegion: (payload: { name: string }, token: string) =>
    request("/api/regions", {
      method: "POST",
      body: payload,
      token,
    }),

  getRegions: async (token?: string) => {
    const cacheKey = "regions";
    const cached = getCache<any>(cacheKey);
    if (cached) {
      return Promise.resolve(cached);
    }
    const res = await request("/api/regions", {
      method: "GET",
      token,
    });
    setCache(cacheKey, res);
    return res;
  },
};

export const churchService = {
  createChurch: (
    payload: {
      name: string;
      region_id: string | number;
      location_link?: string;
    },
    token: string,
  ) =>
    request("/api/churches", {
      method: "POST",
      body: payload,
      token,
    }),

  getChurches: async (
    params: { region_id?: string | number } = {},
    token: string,
  ) => {
    const keyParts = ["churches"];
    if (params.region_id) keyParts.push(String(params.region_id));
    const cacheKey = keyParts.join(":");
    const cached = getCache<any>(cacheKey);
    if (cached) return Promise.resolve(cached);

    const searchParams = new URLSearchParams();
    if (params.region_id) {
      searchParams.append("region_id", String(params.region_id));
    }

    const query = searchParams.toString();
    const res = await request(`/api/churches${query ? `?${query}` : ""}`, {
      method: "GET",
      token,
    });
    setCache(cacheKey, res);
    return res;
  },

  getChurch: (id: string) => request(`/api/churches/${id}`, { method: "GET" }),
};

/* =========================
   MEDIA UPLOAD
========================= */

export const uploadService = {
  uploadImage: async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("file", file);

    return request("/api/upload/image", {
      method: "POST",
      body: formData,
      token,
      isFormData: true,
    });
  },

  uploadVideo: async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("file", file);

    return request("/api/upload/video", {
      method: "POST",
      body: formData,
      token,
      isFormData: true,
    });
  },
};

/* =========================
   BLOGS
========================= */

export const blogService = {
  createBlog: (
    payload: {
      text: string;
      image_url: string;
      expires_in_days?: number;
    },
    token: string,
  ) =>
    request("/api/blogs", {
      method: "POST",
      body: payload,
      token,
    }),

  getBlogs: async (params?: {
    search?: string;
    sort?: SortOrder;
    include_expired?: boolean;
  }) => {
    const searchParams = new URLSearchParams();

    if (params?.search) searchParams.append("search", params.search);
    if (params?.sort) searchParams.append("sort", params.sort);
    if (params?.include_expired !== undefined) {
      searchParams.append("include_expired", String(params.include_expired));
    }

    const query = searchParams.toString();
    const cacheKey = `blogs:${query}`;
    const cached = getCache<any>(cacheKey);
    if (cached) return Promise.resolve(cached);

    const res = await request(`/api/blogs${query ? `?${query}` : ""}`);
    setCache(cacheKey, res);
    return res;
  },
};

/* =========================
   POSTS / REGIONAL SERVICES
========================= */

export const postService = {
  createPost: (
    payload: {
      region_id: string | number;
      content: string;
      category: PostCategory;
      title?: string;
      type?: string;
      image_url?: string;
      video_url?: string;
      location_link?: string;
      church_ids?: Array<string | number>;
      expires_in_days?: number;
    },
    token: string,
  ) =>
    request("/api/posts", {
      method: "POST",
      body: payload,
      token,
    }),

  getPosts: (
    params: {
      region_id?: string | number;
      search?: string;
      category?: PostCategory;
      sort?: SortOrder;
      include_expired?: boolean;
    },
    token: string,
  ) => {
    const searchParams = new URLSearchParams();

    if (params.region_id)
      searchParams.append("region_id", String(params.region_id));
    if (params.search) searchParams.append("search", params.search);
    if (params.category) searchParams.append("category", params.category);
    if (params.sort) searchParams.append("sort", params.sort);
    if (params.include_expired !== undefined) {
      searchParams.append("include_expired", String(params.include_expired));
    }

    const query = searchParams.toString();
    return request(`/api/posts${query ? `?${query}` : ""}`, {
      method: "GET",
      token,
    });
  },
};

/* =========================
   GALLERIES
========================= */

export const galleryService = {
  createGallery: (
    payload: {
      region_id: string | number;
      image_url: string;
      caption?: string;
      church_id?: string | number;
      location_link?: string;
      expires_in_days?: number;
    },
    token: string,
  ) =>
    request("/api/galleries", {
      method: "POST",
      body: payload,
      token,
    }),

  getGalleries: (
    params: {
      region_id?: string | number;
      search?: string;
      sort?: SortOrder;
      include_expired?: boolean;
    },
    token: string,
  ) => {
    const searchParams = new URLSearchParams();

    if (params.region_id)
      searchParams.append("region_id", String(params.region_id));
    if (params.search) searchParams.append("search", params.search);
    if (params.sort) searchParams.append("sort", params.sort);
    if (params.include_expired !== undefined) {
      searchParams.append("include_expired", String(params.include_expired));
    }

    const query = searchParams.toString();
    return request(`/api/galleries${query ? `?${query}` : ""}`, {
      method: "GET",
      token,
    });
  },
};
