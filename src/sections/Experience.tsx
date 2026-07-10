import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { milestones } from '../data/content'
import RevealOnScroll from '../components/ui/RevealOnScroll'

const typeColors = {
  education: '#3b82f6',
  experience: '#a855f7',
  achievement: '#22d3ee',
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%'])

  return (
    <section id="experience" className="relative py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-3xl mx-auto" ref={containerRef}>
        <RevealOnScroll>
          <div className="mb-20">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-accent-cyan/60 mb-4 block">
              04 — Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              The timeline
            </h2>
          </div>
        </RevealOnScroll>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/10">
            <motion.div
              className="w-full bg-gradient-to-b from-accent via-accent-purple to-accent-cyan origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <RevealOnScroll key={`${milestone.year}-${milestone.title}`} delay={i * 0.1}>
                <div className="relative flex gap-8 md:gap-12 pl-16 md:pl-20">
                  <motion.div
                    className="absolute left-4 md:left-6 top-2 w-4 h-4 rounded-full border-2"
                    style={{
                      borderColor: typeColors[milestone.type],
                      background: `${typeColors[milestone.type]}30`,
                    }}
                    whileInView={{
                      boxShadow: `0 0 20px ${typeColors[milestone.type]}60`,
                    }}
                  />

                  <div className="flex-1 group">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-sm font-mono font-bold"
                        style={{ color: typeColors[milestone.type] }}
                      >
                        {milestone.year}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-white/30 px-2 py-0.5 rounded-full border border-white/10">
                        {milestone.type}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed">{milestone.subtitle}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
