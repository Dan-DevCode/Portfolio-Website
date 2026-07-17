import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../../data/content'
import { Home, Briefcase, UserRound, Network, Workflow, Clock, Mail } from 'lucide-react'

const iconMap = {
  home: Home,
  layers: Briefcase,
  user: UserRound,
  orbit: Network,
  workflow: Workflow,
  timeline: Clock,
  mail: Mail,
} as const

export default function FloatingDock() {
  const [activeSection, setActiveSection] = useState('hero')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [barHovered, setBarHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id)
          break
        }
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1
    const dist = Math.abs(index - hoveredIndex)
    if (dist === 0) return 1.35
    if (dist === 1) return 1.15
    if (dist === 2) return 1.06
    return 1
  }

  return (
    <div className="fixed bottom-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 200, damping: 22 }}
        onMouseEnter={() => setBarHovered(true)}
        onMouseLeave={() => {
          setBarHovered(false)
          setHoveredIndex(null)
        }}
        className="pointer-events-auto"
        aria-label="Site navigation"
      >
        <motion.div
          animate={{
            borderColor: barHovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
            boxShadow: barHovered
              ? '0 0 48px rgba(59,130,246,0.12), 0 0 80px rgba(99,102,241,0.08), 0 12px 40px rgba(0,0,0,0.5)'
              : '0 8px 32px rgba(0,0,0,0.4)',
            backgroundColor: barHovered ? 'rgba(12,12,18,0.92)' : 'rgba(5,5,5,0.75)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-2 rounded-2xl border backdrop-blur-2xl"
        >
          {navLinks.map((link, i) => {
            const id = link.href.replace('#', '')
            const Icon = iconMap[link.icon as keyof typeof iconMap] ?? Home
            const isActive = activeSection === id
            const isHovered = hoveredIndex === i

            return (
              <motion.a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(i)}
                animate={{
                  scale: getScale(i),
                  y: isHovered ? -6 : 0,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="relative flex flex-col items-center"
                aria-label={link.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div
                  className={`relative p-2.5 sm:p-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-white/12 text-white shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                      : 'text-white/30 hover:text-white/50'
                  }`}
                >
                  <Icon
                    className="w-[18px] h-[18px] sm:w-5 sm:h-5"
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="dock-active-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-cyan"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-[10px] text-white/80 whitespace-nowrap pointer-events-none"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            )
          })}
        </motion.div>
      </motion.nav>
    </div>
  )
}
