const GITHUB_USERNAME_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/

export function validateGitHubUsername(username: string): boolean {
  return GITHUB_USERNAME_RE.test(username) && username.length <= 39
}

export function sanitizeTerminalInput(input: string, maxLength = 64): string {
  return input
    .replace(/[\x00-\x1f\x7f]/g, '')
    .replace(/[<>'"&\\]/g, '')
    .trim()
    .slice(0, maxLength)
}

export function isAllowedTerminalCommand(command: string): boolean {
  return /^[a-z0-9][a-z0-9\s_-]{0,62}$/i.test(command)
}

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface GitHubContributionsResponse {
  contributions: ContributionDay[]
  total: number
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export function parseGitHubContributions(data: unknown): GitHubContributionsResponse | null {
  if (!data || typeof data !== 'object') return null

  const record = data as Record<string, unknown>
  const rawContributions = record.contributions

  if (!Array.isArray(rawContributions)) return null

  const contributions: ContributionDay[] = []

  for (const item of rawContributions) {
    if (!item || typeof item !== 'object') continue
    const day = item as Record<string, unknown>

    const date = day.date
    const count = day.count
    const level = day.level

    if (typeof date !== 'string' || !DATE_RE.test(date)) continue
    if (typeof count !== 'number' || !Number.isFinite(count) || count < 0 || count > 500) continue
    if (typeof level !== 'number' || !Number.isInteger(level) || level < 0 || level > 4) continue

    contributions.push({ date, count: Math.floor(count), level })
  }

  if (contributions.length === 0) return null

  const total =
    typeof record.total === 'number' && Number.isFinite(record.total) && record.total >= 0
      ? Math.floor(record.total)
      : contributions.reduce((sum, d) => sum + d.count, 0)

  return { contributions: contributions.slice(0, 400), total }
}

export function getAllowedUpstreamUrl(configuredUrl: string): URL | null {
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
