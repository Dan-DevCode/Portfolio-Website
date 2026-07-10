import { motion } from 'framer-motion'
import { useAmbient } from '../../context/AmbientContext'
import { useMouseVelocity } from '../../hooks/useMouseVelocity'

const moodColors: Record<string, { primary: string; secondary: string; accent: string }> = {
  default: { primary: 'rgba(59,130,246,0.12)', secondary: 'rgba(168,85,247,0.1)', accent: 'rgba(34,211,238,0.08)' },
  aurora: { primary: 'rgba(34,211,238,0.2)', secondary: 'rgba(59,130,246,0.15)', accent: 'rgba(168,85,247,0.12)' },
  neural: { primary: 'rgba(99,102,241,0.18)', secondary: 'rgba(34,211,238,0.12)', accent: 'rgba(59,130,246,0.1)' },
  cosmic: { primary: 'rgba(168,85,247,0.2)', secondary: 'rgba(236,72,153,0.1)', accent: 'rgba(99,102,241,0.12)' },
  electric: { primary: 'rgba(59,130,246,0.25)', secondary: 'rgba(34,211,238,0.18)', accent: 'rgba(255,255,255,0.05)' },
  ember: { primary: 'rgba(249,115,22,0.15)', secondary: 'rgba(168,85,247,0.12)', accent: 'rgba(59,130,246,0.1)' },
}

const zoneTints: Record<string, string> = {
  hero: 'rgba(59,130,246,0.05)',
  projects: 'rgba(168,85,247,0.04)',
  about: 'rgba(34,211,238,0.03)',
  skills: 'rgba(99,102,241,0.04)',
  experience: 'rgba(59,130,246,0.03)',
  contact: 'rgba(34,211,238,0.05)',
}

export default function AuroraBackground() {
  const { mood, scrollZone, surpriseActive } = useAmbient()
  const velocity = useMouseVelocity()
  const colors = moodColors[mood] || moodColors.default

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-void" />

      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: zoneTints[scrollZone] || 'transparent' }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%]"
        animate={{
          rotate: [0, 360],
          opacity: surpriseActive ? [0.3, 0.6, 0.3] : 0.25,
        }}
        transition={{
          rotate: { duration: 120, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 2, repeat: surpriseActive ? Infinity : 0 },
        }}
        style={{
          background: `conic-gradient(from 0deg, transparent, ${colors.primary}, transparent, ${colors.secondary}, transparent, ${colors.accent}, transparent)`,
        }}
      />

      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
        animate={{
          x: [0, 100 + velocity * 50, -50, 0],
          y: [0, -80 - velocity * 30, 60, 0],
          scale: [1, 1.2 + velocity * 0.2, 0.9, 1],
          backgroundColor: colors.primary,
        }}
        transition={{
          x: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          backgroundColor: { duration: 2 },
        }}
      />

      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 60, -40, 0],
          backgroundColor: colors.secondary,
        }}
        transition={{
          x: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
          backgroundColor: { duration: 2 },
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[80px]"
        animate={{
          scale: surpriseActive ? [1, 2, 1] : [1, 1.3, 1],
          opacity: surpriseActive ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05],
          backgroundColor: colors.accent,
        }}
        transition={{
          scale: { duration: surpriseActive ? 2 : 15, repeat: Infinity },
          opacity: { duration: surpriseActive ? 2 : 15, repeat: Infinity },
          backgroundColor: { duration: 2 },
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px'],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {surpriseActive &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 2, 0] }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        ))}
    </div>
  )
}
