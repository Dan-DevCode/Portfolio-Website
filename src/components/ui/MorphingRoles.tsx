import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal } from '../../data/content'

const roles = personal.roles

export default function MorphingRoles() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-8 md:h-10 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          className="absolute inset-0 flex items-center justify-center md:justify-start text-accent-cyan font-medium text-lg md:text-xl tracking-wide"
          initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
