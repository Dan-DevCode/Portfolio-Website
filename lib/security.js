const GITHUB_USERNAME_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export function validateGitHubUsername(username) {
  return GITHUB_USERNAME_RE.test(username) && username.length <= 39
}

export function parseGitHubContributions(data) {
  if (!data || typeof data !== 'object') return null

  const rawContributions = data.contributions
  if (!Array.isArray(rawContributions)) return null

  const contributions = []

  for (const item of rawContributions) {
    if (!item || typeof item !== 'object') continue

    const { date, count, level } = item

    if (typeof date !== 'string' || !DATE_RE.test(date)) continue
    if (typeof count !== 'number' || !Number.isFinite(count) || count < 0 || count > 500) continue
    if (typeof level !== 'number' || !Number.isInteger(level) || level < 0 || level > 4) continue

    contributions.push({ date, count: Math.floor(count), level })
  }

  if (contributions.length === 0) return null

  const total =
    typeof data.total === 'number' && Number.isFinite(data.total) && data.total >= 0
      ? Math.floor(data.total)
      : contributions.reduce((sum, d) => sum + d.count, 0)

  return { contributions: contributions.slice(0, 400), total }
}

export function getAllowedUpstreamUrl(configuredUrl) {
  try {
    const url = new URL(configuredUrl)
    const allowedHosts = ['github-contributions-api.jogruber.de']
    if (!allowedHosts.includes(url.hostname)) return null
    if (url.protocol !== 'https:') return null
    return url
  } catch {
    return null
  }
}

export const GENERIC_ERROR = 'Unable to process request.'
