import { cache } from 'hono/cache'

export const cacheMiddleware = cache({ cacheName: 'geo-ip-cache', cacheControl: 'max-age=300' });
