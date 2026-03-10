// simple in-memory cache with optional TTL
// keys are strings, values can be anything

interface CacheEntry {
  expires: number;
  value: any;
}

const store = new Map<string, CacheEntry>();

/**
 * Store an item in cache.
 * @param key cache key
 * @param value value to store
 * @param ttl milliseconds to live (default 5 minutes)
 */
export function setCache(key: string, value: any, ttl: number = 1000 * 60 * 5) {
  const expires = Date.now() + ttl;
  store.set(key, { expires, value });
}

/**
 * Retrieve an item. Returns null if missing or expired.
 */
export function getCache<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    store.delete(key);
    return null;
  }
  return entry.value as T;
}

/**
 * Clear a particular key or all cache if no key provided.
 */
export function clearCache(key?: string) {
  if (key) store.delete(key);
  else store.clear();
}
