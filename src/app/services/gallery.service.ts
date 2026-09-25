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
  "https://api.mfni.church";

/**
 * Fetches gallery images for a given region from the backend.
 * @param regionId Unique identifier of the region (used as ?region_id=)
 * @returns Array of images formatted for the UI
 */
export async function fetchGallery(regionId: string): Promise<GalleryImage[]> {
  const cacheKey = `gallery:${regionId}`;
  const cached = getCache<GalleryImage[]>(cacheKey);
  if (cached) {
    return cached;
  }

  const url = `${BASE_URL}/api/galleries?region_id=${encodeURIComponent(regionId)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to load gallery (${res.status}): ${res.statusText}`,
    );
  }

  const payload: GalleryApiResponse = await res.json();
  const data = payload.galleries.map((g) => ({
    id: g.id,
    url: g.image_url,
    caption: g.caption,
  }));

  setCache(cacheKey, data);
  return data;
}

/**
 * Fetches all gallery records and converts them into `Post` objects for the
 * gallery page. This lets the UI treat the photos just like posts so that we
 * can continue to use the existing filtering/pagination logic.
 */
export async function fetchGalleryPosts(): Promise<Post[]> {
  const cacheKey = "galleryPosts:v3";
  const cached = getCache<Post[]>(cacheKey);
  if (cached) {
    return cached;
  }

  let apiPosts: Post[] = [];

  try {
    const [galleryResponse, churchesResponse, regionsResponse] = await Promise.all([
      fetch(`${BASE_URL}/api/galleries/all`),
      fetch(`${BASE_URL}/api/churches`),
      fetch(`${BASE_URL}/api/regions`),
    ]);

    const ownershipByImage = new Map<
      string,
      { id: string; name: string; region_id?: string; region_name?: string }
    >();
    const churchById = new Map<
      string,
      { id: string; name: string; region_id?: string; region_name?: string }
    >();
    const regionById = new Map<string, string>();

    if (regionsResponse.ok) {
      const regionsPayload = await regionsResponse.json();
      const regions = Array.isArray(regionsPayload)
        ? regionsPayload
        : regionsPayload.regions || regionsPayload.data || [];

      regions.forEach((region: any) => {
        if (region?.id && region?.name) {
          regionById.set(String(region.id), String(region.name));
        }
      });
    }

    if (churchesResponse.ok) {
      const churchesPayload = await churchesResponse.json();
      const churches = Array.isArray(churchesPayload)
        ? churchesPayload
        : churchesPayload.churches || churchesPayload.data || [];

      churches.forEach((church: any) => {
        const churchId = church?.id ? String(church.id) : "";
        const churchName = String(church?.name || "Mission for Nation Church");
        const regionId = church?.region_id ? String(church.region_id) : "";
        const regionName =
          church?.region?.name ||
          church?.region_name ||
          (regionId && regionById.get(regionId)) ||
          "";

        if (churchId) {
          churchById.set(churchId, {
            id: churchId,
            name: churchName,
            region_id: regionId,
            region_name: regionName,
          });
        }

        if (regionId && regionName) {
          regionById.set(regionId, regionName);
        }

        (Array.isArray(church.gallery) ? church.gallery : []).forEach(
          (galleryImage: any) => {
            if (galleryImage?.url && churchId) {
              ownershipByImage.set(galleryImage.url, {
                id: churchId,
                name: churchName,
                region_id: regionId,
                region_name: regionName,
              });
            }
          },
        );
      });
    }

    if (galleryResponse.ok) {
      const payload: GalleryApiResponse = await galleryResponse.json();
      apiPosts = payload.galleries.map((g) => {
        const owner = ownershipByImage.get(g.image_url);
        const churchRecord =
          (g.church_id && churchById.get(String(g.church_id))) ||
          owner ||
          null;
        const churchId = churchRecord?.id ?? g.church_id ?? owner?.id ?? "";
        const churchName = churchRecord?.name || g.church_name || owner?.name || "";
        const regionId =
          (churchRecord?.region_id && String(churchRecord.region_id)) ||
          g.region_id ||
          owner?.region_id ||
          "";
        const regionName =
          (regionId && regionById.get(regionId)) ||
          churchRecord?.region_name ||
          g.region_name ||
          "";
        const title =
          g.title?.trim() ||
          g.caption?.trim() ||
          churchName ||
          regionName ||
          "Gallery";

        return {
          id: g.id,
          title,
          description: g.description ?? g.caption ?? "",
          type: (g.type as Post["type"]) || "gallery",
          media_url: g.image_url,
          show_on_homepage: Boolean((g as any).show_on_homepage),
          created_at: g.created_at,
          region: {
            id: regionId,
            name: regionName,
          },
          church: {
            id: churchId,
            name: churchName,
          },
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch gallery posts from API:", error);
    // If API fails, we throw to let the UI's ErrorState handle it elegantly
    throw error;
  }

  setCache(cacheKey, apiPosts);
  return apiPosts;
}

