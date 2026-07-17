import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAmbient } from '../../context/AmbientContext'
import { personal } from '../../data/content'

const zoneLabels: Record<string, string> = {
  hero: 'Home',
  projects: 'Work',
  about: 'About',
  skills: 'Skills',
  workflow: 'Build',
  experience: 'Journey',
  contact: 'Contact',
}

export default function DynamicIsland() {
  const { scrollZone } = useAmbient()
  const [time, setTime] = useState(new Date())
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setExpanded(true)
    const timer = setTimeout(() => setExpanded(false), 2500)
    return () => clearTimeout(timer)
  }, [scrollZone])

  const formatTime = () =>
    time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

  return (
    <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 200, damping: 22 }}
        className="pointer-events-auto"
      >
        <motion.div
          layout
          animate={{
            width: expanded ? 260 : 168,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          className="rounded-full border border-white/10 bg-void/90 backdrop-blur-2xl shadow-lg overflow-hidden mx-auto"
        >
          <div className="flex items-center justify-between h-9 sm:h-10 px-4 gap-3 min-w-0">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <AnimatePresence mode="wait">
                {expanded ? (
                  <motion.span
                    key="section"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="text-[11px] sm:text-xs text-white/60 truncate"
                  >
                    {personal.company} · {zoneLabels[scrollZone]}
                  </motion.span>
                ) : (
                  <motion.span
                    key="time-collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] sm:text-xs font-mono text-white/45"
                  >
                    {formatTime()}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <span className="text-[10px] font-mono text-white/30 flex-shrink-0">
              {formatTime()}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
