import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface ContributionsPayload {
  contributions: ContributionDay[]
  total: number
}

const levelColors = [
  'rgba(255,255,255,0.04)',
  'rgba(59,130,246,0.2)',
  'rgba(59,130,246,0.4)',
  'rgba(59,130,246,0.65)',
  'rgba(34,211,238,0.9)',
]

function isValidPayload(data: unknown): data is ContributionsPayload {
  if (!data || typeof data !== 'object') return false
  const record = data as Record<string, unknown>
  if (!Array.isArray(record.contributions)) return false
  if (typeof record.total !== 'number') return false
  return record.contributions.every(
    (d) =>
      d &&
      typeof d === 'object' &&
      typeof (d as ContributionDay).date === 'string' &&
      typeof (d as ContributionDay).count === 'number' &&
      typeof (d as ContributionDay).level === 'number',
  )
}

export default function GitHubHeatmap() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/github-contributions', {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      credentials: 'same-origin',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data: unknown) => {
        if (!isValidPayload(data)) throw new Error('Invalid response')
        setContributions(data.contributions)
        setTotal(data.total)
      })
      .catch(() => {
        /* Generic failure — no error details exposed to UI */
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const weeks: ContributionDay[][] = []
  if (contributions.length > 0) {
    for (let i = 0; i < contributions.length; i += 7) {
      weeks.push(contributions.slice(i, i + 7))
    }
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-white/40" />
          <span className="text-sm font-medium text-white/70">GitHub Activity</span>
        </div>
        {!loading && total > 0 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-mono text-accent-cyan"
          >
            {total.toLocaleString()} contributions
          </motion.span>
        )}
      </div>

      {loading ? (
        <div className="flex gap-1" aria-busy="true" aria-label="Loading contribution data">
          {Array.from({ length: 26 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, j) => (
                <div
                  key={j}
                  className="w-2.5 h-2.5 rounded-sm bg-white/5 animate-pulse"
                  style={{ animationDelay: `${(i + j) * 30}ms` }}
                />
              ))}
            </div>
          ))}
        </div>
      ) : contributions.length > 0 ? (
        <div className="flex gap-[3px] overflow-x-auto pb-2">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (wi * 7 + di) * 0.003,
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                  whileHover={{ scale: 1.4, zIndex: 10 }}
                  className="w-2.5 h-2.5 rounded-sm cursor-pointer"
                  style={{ background: levelColors[day.level] || levelColors[0] }}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-white/30">Contribution data unavailable</p>
      )}
    </div>
  )
}
