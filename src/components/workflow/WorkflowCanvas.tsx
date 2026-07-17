import { useMemo, useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { workflowTools, toolMap } from '../../data/workflow'
import WorkflowAmbient from './WorkflowAmbient'

interface WorkflowCanvasProps {
  selectedId: string | null
  highlightedIds: Set<string>
  activeConnections: { from: string; to: string }[]
  positions: Record<string, { x: number; y: number }>
  pulseOriginId: string | null
  onSelect: (id: string) => void
}

interface Point {
  x: number
  y: number
}

const SPRING = { type: 'spring' as const, stiffness: 120, damping: 22, mass: 0.9 }

function pointsEqual(a: Record<string, Point>, b: Record<string, Point>) {
  const aKeys = Object.keys(a)
  if (aKeys.length !== Object.keys(b).length) return false
  for (const key of aKeys) {
    const p = a[key]
    const q = b[key]
    if (!q || Math.abs(p.x - q.x) > 0.5 || Math.abs(p.y - q.y) > 0.5) return false
  }
  return true
}

function ConnectionLine({
  from,
  to,
  active,
  dimmed,
  animateFromOrigin,
  stagger,
}: {
  from: Point
  to: Point
  active: boolean
  dimmed: boolean
  animateFromOrigin: boolean
  stagger: number
}) {
  if (dimmed) {
    return (
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="rgba(255,255,255,0.03)"
        strokeWidth={1}
        strokeLinecap="round"
      />
    )
  }

  if (active) {
    return (
      <g>
        <motion.line
          x1={from.x}
          y1={from.y}
          x2={animateFromOrigin ? from.x : to.x}
          y2={animateFromOrigin ? from.y : to.y}
          stroke="url(#glow-gradient)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="6 4"
          initial={{ opacity: 0 }}
          animate={{
            x2: to.x,
            y2: to.y,
            opacity: [0.5, 0.95, 0.7],
          }}
          transition={{
            x2: { delay: stagger, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            y2: { delay: stagger, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.55))' }}
        />
        <motion.line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke="url(#glow-gradient-soft)"
          strokeWidth={6}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.08, 0.22, 0.08] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: stagger }}
        />
      </g>
    )
  }

  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="rgba(99,102,241,0.18)"
      strokeWidth={1}
      strokeLinecap="round"
      className="animate-linePulse"
    />
  )
}

export default function WorkflowCanvas({
  selectedId,
  highlightedIds,
  activeConnections,
  positions,
  pulseOriginId,
  onSelect,
}: WorkflowCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Map<string, HTMLElement>>(new Map())
  const [centers, setCenters] = useState<Record<string, Point>>({})
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })

  const measureNodes = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const nextSize = { width: containerRect.width, height: containerRect.height }

    const next: Record<string, Point> = {}
    nodeRefs.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect()
      next[id] = {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      }
    })

    setSvgSize((prev) =>
      prev.width === nextSize.width && prev.height === nextSize.height ? prev : nextSize
    )
    setCenters((prev) => (pointsEqual(prev, next) ? prev : next))
  }, [])

  useLayoutEffect(() => {
    measureNodes()
    const t1 = requestAnimationFrame(measureNodes)
    const t2 = setTimeout(measureNodes, 450)
    const t3 = setTimeout(measureNodes, 900)
    return () => {
      cancelAnimationFrame(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [measureNodes, selectedId, positions])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => measureNodes())
    observer.observe(container)
    window.addEventListener('resize', measureNodes)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measureNodes)
    }
  }, [measureNodes])

  const connectionSet = useMemo(() => {
    const set = new Set<string>()
    activeConnections.forEach((c) => set.add(`${c.from}-${c.to}`))
    return set
  }, [activeConnections])

  const allConnections = useMemo(() => {
    const seen = new Set<string>()
    const lines: { from: string; to: string }[] = []
    for (const tool of workflowTools) {
      for (const connId of tool.connections) {
        const key = [tool.id, connId].sort().join('-')
        if (!seen.has(key) && toolMap[connId]) {
          seen.add(key)
          lines.push({ from: tool.id, to: connId })
        }
      }
    }
    return lines
  }, [])

  const isLineActive = (from: string, to: string) =>
    connectionSet.has(`${from}-${to}`) || connectionSet.has(`${to}-${from}`)

  const hasFocus = highlightedIds.size > 0
  const getCenter = (id: string): Point | null => centers[id] ?? null

  const activeLineStagger = useMemo(() => {
    const map = new Map<string, number>()
    activeConnections.forEach((c, i) => {
      map.set(`${c.from}-${c.to}`, i * 0.06)
      map.set(`${c.to}-${c.from}`, i * 0.06)
    })
    return map
  }, [activeConnections])

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[460px] md:min-h-[500px] lg:min-h-[520px]"
    >
      <WorkflowAmbient />

      {svgSize.width > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
          width={svgSize.width}
          height={svgSize.height}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="glow-gradient-soft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {allConnections.map(({ from, to }) => {
            const fromPoint = getCenter(from)
            const toPoint = getCenter(to)
            if (!fromPoint || !toPoint) return null

            const active =
              isLineActive(from, to) ||
              (selectedId !== null &&
                (from === selectedId || to === selectedId) &&
                (highlightedIds.has(from) || highlightedIds.has(to)))
            const dimmed =
              hasFocus && !active && !highlightedIds.has(from) && !highlightedIds.has(to)

            const stagger = activeLineStagger.get(`${from}-${to}`) ?? 0
            const animateFromOrigin =
              !!pulseOriginId && (from === pulseOriginId || to === pulseOriginId)

            return (
              <ConnectionLine
                key={`${from}-${to}`}
                from={fromPoint}
                to={toPoint}
                active={active}
                dimmed={dimmed}
                animateFromOrigin={animateFromOrigin}
                stagger={stagger}
              />
            )
          })}
        </svg>
      )}

      {workflowTools.map((tool, i) => {
        const pos = positions[tool.id] ?? { x: tool.x, y: tool.y }
        const isSelected = selectedId === tool.id
        const isHighlighted = highlightedIds.has(tool.id)
        const isDimmed = hasFocus && !isSelected && !isHighlighted

        return (
          <motion.button
            key={tool.id}
            ref={(el) => {
              if (el) nodeRefs.current.set(tool.id, el)
              else nodeRefs.current.delete(tool.id)
            }}
            type="button"
            onClick={() => onSelect(tool.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-xl z-[2]"
            initial={{ opacity: 0, scale: 0.6, left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              scale: isSelected ? 1.08 : isHighlighted ? 1.04 : 1,
              opacity: isDimmed ? 0.22 : 1,
              zIndex: isSelected ? 30 : isHighlighted ? 20 : 10,
            }}
            transition={{
              left: SPRING,
              top: SPRING,
              scale: { type: 'spring', stiffness: 400, damping: 26 },
              opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            }}
            whileHover={{
              scale: isSelected ? 1.08 : isDimmed ? 1 : 1.05,
              transition: { type: 'spring', stiffness: 500, damping: 28 },
            }}
            aria-label={`${tool.name} — click for details`}
            aria-pressed={isSelected}
          >
            <div
              className="animate-nodeDrift"
              style={{ animationDelay: `${i * 0.45}s`, animationDuration: `${7.5 + (i % 4)}s` }}
            >
              <div
                className="relative px-3 py-2 rounded-xl border backdrop-blur-md cursor-pointer min-w-[92px] sm:min-w-[100px] transition-shadow duration-500"
                style={{
                  borderColor: isSelected ? `${tool.color}70` : isHighlighted ? `${tool.color}40` : 'rgba(255,255,255,0.1)',
                  background: isSelected
                    ? `linear-gradient(135deg, ${tool.color}30, rgba(255,255,255,0.06))`
                    : isHighlighted
                      ? `linear-gradient(135deg, ${tool.color}18, rgba(255,255,255,0.04))`
                      : 'rgba(255,255,255,0.04)',
                  boxShadow: isSelected
                    ? `0 0 32px ${tool.color}50, 0 8px 28px rgba(0,0,0,0.4)`
                    : isHighlighted
                      ? `0 0 22px ${tool.color}35, 0 4px 16px rgba(0,0,0,0.25)`
                      : '0 2px 10px rgba(0,0,0,0.2)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono flex-shrink-0 transition-transform duration-300"
                    style={{
                      background: `${tool.color}35`,
                      color: tool.color,
                      transform: isSelected ? 'scale(1.08)' : undefined,
                    }}
                  >
                    {tool.shortLabel}
                  </span>
                  <span
                    className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                      isSelected ? 'text-white' : isHighlighted ? 'text-white/85' : 'text-white/65'
                    }`}
                  >
                    {tool.name}
                  </span>
                </div>

                {isSelected && (
                  <motion.div
                    className="absolute -inset-px rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ border: `1.5px solid ${tool.color}70`, boxShadow: `inset 0 0 12px ${tool.color}20` }}
                  />
                )}
              </div>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
