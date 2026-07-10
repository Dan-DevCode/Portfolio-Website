/**
 * Server-side rate limiting (best-effort per serverless instance).
 * For high-traffic production, replace with Redis/Upstash.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

const CLEANUP_INTERVAL = 60_000
let lastCleanup = Date.now()

function cleanup(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key)
  }
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
  limit: number
}

export function checkRateLimit(
  key: string,
  maxRequests = 30,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now()
  cleanup(now)

  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs
    store.set(key, { count: 1, resetAt })
    return { allowed: true, remaining: maxRequests - 1, resetAt, limit: maxRequests }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt, limit: maxRequests }
  }

  entry.count += 1
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
    limit: maxRequests,
  }
}

export function getClientIp(forwardedFor: string | string[] | undefined): string {
  if (!forwardedFor) return 'unknown'
  const raw = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor
  const ip = raw.split(',')[0]?.trim()
  return ip || 'unknown'
}
