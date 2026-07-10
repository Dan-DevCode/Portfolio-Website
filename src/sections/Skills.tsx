import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '../data/content'
import RevealOnScroll from '../components/ui/RevealOnScroll'

const categoryColors: Record<string, string> = {
  language: '#3b82f6',
  framework: '#a855f7',
  ml: '#22d3ee',
  cloud: '#ff9900',
  tool: '#6366f1',
}

export default function Skills() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="skills" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-accent-cyan/60 mb-4 block">
              03 — Skills
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Technology{' '}
              <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                constellation
              </span>
            </h2>
            <p className="text-white/40 mt-4 max-w-lg mx-auto">
              Hover to explore proficiency levels
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="relative aspect-square max-w-2xl mx-auto">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              {skills.map((skill, i) =>
                skills.slice(i + 1).map((other) => {
                  const dist = Math.sqrt(
                    Math.pow(skill.x - other.x, 2) + Math.pow(skill.y - other.y, 2),
                  )
                  if (dist > 35) return null
                  return (
                    <motion.line
                      key={`${skill.name}-${other.name}`}
                      x1={skill.x}
                      y1={skill.y}
                      x2={other.x}
                      y2={other.y}
                      stroke="rgba(99,102,241,0.15)"
                      strokeWidth="0.15"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                    />
                  )
                }),
              )}
            </svg>

            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <span className="text-xs font-mono text-white/40">CORE</span>
            </motion.div>

            {skills.map((skill, i) => {
              const color = categoryColors[skill.category]
              const isHovered = hovered === skill.name

              return (
                <motion.div
                  key={skill.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                  onHoverStart={() => setHovered(skill.name)}
                  onHoverEnd={() => setHovered(null)}
                  animate={
                    isHovered
                      ? { scale: 1.3, zIndex: 10 }
                      : { scale: 1, zIndex: 1 }
                  }
                >
                  <motion.div
                    className="relative"
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div
                      className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                      style={{
                        background: color,
                        boxShadow: isHovered
                          ? `0 0 20px ${color}, 0 0 40px ${color}40`
                          : `0 0 10px ${color}60`,
                      }}
                    />

                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: isHovered ? 1 : 0.7, y: 0 }}
                    >
                      <span className="text-xs md:text-sm font-medium text-white/80">
                        {skill.name}
                      </span>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-center"
                          style={{ background: `${color}20`, color }}
                        >
                          {skill.proficiency}%
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </RevealOnScroll>

        <div className="flex justify-center gap-6 mt-12 flex-wrap">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-xs text-white/40 capitalize">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
