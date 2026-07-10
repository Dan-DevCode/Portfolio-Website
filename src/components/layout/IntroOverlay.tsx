import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootLines = [
  '> Initializing neural interface...',
  '> Loading portfolio modules...',
  '> Calibrating ambient systems...',
  '> Establishing secure connection...',
  '> Welcome, visitor.',
]

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true)
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setVisible(false), 600)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-void flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-mono text-sm md:text-base space-y-2 px-8">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-accent-cyan/80"
              >
                {line}
                {i === lines.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-accent-cyan/60 ml-1 align-middle"
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
