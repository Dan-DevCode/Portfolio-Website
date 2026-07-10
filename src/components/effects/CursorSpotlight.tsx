import { motion } from 'framer-motion'
import { useMousePosition } from '../../hooks/useMousePosition'

export default function CursorSpotlight() {
  const { x, y } = useMousePosition()

  return (
    <motion.div
      className="fixed inset-0 -z-[5] pointer-events-none"
      animate={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(59,130,246,0.06), transparent 40%)`,
      }}
      transition={{ type: 'tween', ease: 'linear', duration: 0.15 }}
      aria-hidden="true"
    />
  )
}
