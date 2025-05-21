import { LRUCache } from 'lru-cache'
import { RateLimiter } from 'limiter'

// Create a cache with configurable size and duration
export const apiCache = new LRUCache<string, any>({
  max: parseInt(process.env.VITE_CACHE_MAX_ITEMS || '100'),
  ttl: parseInt(process.env.VITE_CACHE_DURATION_MINUTES || '10') * 60 * 1000,
})

// Create a rate limiter
export const apiRateLimiter = new RateLimiter({
  tokensPerInterval: parseInt(process.env.VITE_API_REQUEST_LIMIT || '100'),
  interval: parseInt(process.env.VITE_API_REQUEST_WINDOW_MINUTES || '60') * 60 * 1000,
})
