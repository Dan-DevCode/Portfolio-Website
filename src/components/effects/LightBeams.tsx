import { motion } from 'framer-motion'

export default function LightBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-[150%] w-px origin-top"
          style={{
            left: `${15 + i * 18}%`,
            background: `linear-gradient(to bottom, transparent, rgba(59,130,246,${0.03 + i * 0.01}), transparent)`,
            transform: `rotate(${-15 + i * 8}deg)`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}

      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,5,0.8), transparent)',
        }}
      />
    </div>
  )
}
