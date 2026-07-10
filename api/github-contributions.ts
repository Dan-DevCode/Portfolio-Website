import type { VercelRequest, VercelResponse } from '@vercel/node'
import { checkRateLimit, getClientIp } from '../lib/rate-limit'
import {
  validateGitHubUsername,
  parseGitHubContributions,
  getAllowedUpstreamUrl,
  GENERIC_ERROR,
} from '../lib/security'

const SECURITY_HEADERS: Record<string, string> = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Resource-Policy': 'same-site',
}

function applySecurityHeaders(res: VercelResponse) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    res.setHeader(key, value)
  }
}

function applyRateLimitHeaders(res: VercelResponse, result: ReturnType<typeof checkRateLimit>) {
  res.setHeader('X-RateLimit-Limit', String(result.limit))
  res.setHeader('X-RateLimit-Remaining', String(result.remaining))
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(result.resetAt / 1000)))
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applySecurityHeaders(res)

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: GENERIC_ERROR })
  }

  const maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 30
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000

  const rateLimit = checkRateLimit(getClientIp(req.headers['x-forwarded-for']), maxRequests, windowMs)
  applyRateLimitHeaders(res, rateLimit)

  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)))
    return res.status(429).json({ error: GENERIC_ERROR })
  }

  const username = process.env.GITHUB_USERNAME?.trim()
  if (!username || !validateGitHubUsername(username)) {
    return res.status(503).json({ error: GENERIC_ERROR })
  }

  const upstreamBase =
    getAllowedUpstreamUrl(
      process.env.GITHUB_CONTRIBUTIONS_API_URL ||
        'https://github-contributions-api.jogruber.de/v4',
    ) ?? null

  if (!upstreamBase) {
    return res.status(503).json({ error: GENERIC_ERROR })
  }

  const upstreamUrl = new URL(`${upstreamBase.pathname.replace(/\/$/, '')}/${username}`)
  upstreamUrl.searchParams.set('y', 'last')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const upstream = await fetch(upstreamUrl.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json', 'User-Agent': 'ds-portfolio/1.0' },
      signal: controller.signal,
    })

    if (!upstream.ok) {
      return res.status(502).json({ error: GENERIC_ERROR })
    }

    const raw = await upstream.json()
    const parsed = parseGitHubContributions(raw)

    if (!parsed) {
      return res.status(502).json({ error: GENERIC_ERROR })
    }

    return res.status(200).json(parsed)
  } catch {
    return res.status(502).json({ error: GENERIC_ERROR })
  } finally {
    clearTimeout(timeout)
  }
}
