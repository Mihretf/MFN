import { GalleryImage, GalleryApiResponse, Post } from "../types/gallery.type";
import { getCache, setCache } from "../utils/cache";

// declare environment interface so TypeScript knows about VITE_API_BASE_URL
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const BASE_URL =
  ((import.meta as any).env?.VITE_API_BASE_URL as string) ||
  "http://localhost:4000/api";

/**
 * Fetches gallery images for a given region from the backend.
 * @param regionId Unique identifier of the region (used as ?region_id=)
 * @returns Array of images formatted for the UI
 */
export async function fetchGallery(regionId: string): Promise<GalleryImage[]> {
  const url = `${BASE_URL}/galleries?region_id=${encodeURIComponent(regionId)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to load gallery (${res.status}): ${res.statusText}`,
    );
  }

  const payload: GalleryApiResponse = await res.json();
  return payload.galleries.map((g) => ({
    id: g.id,
    url: g.image_url,
    caption: g.caption,
  }));
}

/**
 * Fetches all gallery records and converts them into `Post` objects for the
 * gallery page. This lets the UI treat the photos just like posts so that we
 * can continue to use the existing filtering/pagination logic.
 */
export async function fetchGalleryPosts(): Promise<Post[]> {
  const cacheKey = "galleryPosts";
  const cached = getCache<Post[]>(cacheKey);
  if (cached) {
    return cached;
  }

  const url = `${BASE_URL}/galleries/all`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to load gallery posts (${res.status}): ${res.statusText}`,
    );
  }

  const payload: GalleryApiResponse = await res.json();
  const posts: Post[] = payload.galleries.map((g) => ({
    id: g.id,
    title: g.title ?? "",
    description: g.description ?? "",
    type: "gallery",
    media_url: g.image_url,
    show_on_homepage: false,
    created_at: g.created_at,
    region: {
      id: g.region_id,
      name: g.region_name || "",
    },
    church: {
      id: g.church_id ?? "",
      name: g.church_name ?? "",
    },
  }));
  setCache(cacheKey, posts);
  return posts;
}
