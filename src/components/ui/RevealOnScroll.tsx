import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  variant?: 'default' | 'assemble' | 'cinematic'
}

const spring = { type: 'spring' as const, stiffness: 100, damping: 15, mass: 1 }

export default function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  variant = 'default',
}: RevealOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const offsets = {
    up: { y: 80, x: 0 },
    down: { y: -80, x: 0 },
    left: { x: 80, y: 0 },
    right: { x: -80, y: 0 },
  }

  const offset = offsets[direction]

  const variants = {
    default: {
      hidden: { opacity: 0, ...offset, filter: 'blur(8px)' },
      visible: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' },
    },
    assemble: {
      hidden: { opacity: 0, y: 60, scale: 0.92, rotateX: 8 },
      visible: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    },
    cinematic: {
      hidden: { opacity: 0, y: 100, scale: 0.85, filter: 'blur(12px)' },
      visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    },
  }

  const v = variants[variant]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={v}
      transition={{ ...spring, delay }}
      className={className}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  )
}
