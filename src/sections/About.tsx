import { motion } from 'framer-motion'
import { interests } from '../data/content'
import RevealOnScroll from '../components/ui/RevealOnScroll'
import GitHubHeatmap from '../components/layout/GitHubHeatmap'

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll variant="cinematic">
          <div className="mb-20">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent-cyan/50 mb-6 block">
              The Engineer
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Building systems
              <br />
              <span className="text-white/30">that think and scale</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-4">
            {[
              { label: 'Domain', value: 'Cloud AI · NLP · Full-Stack', delay: 0 },
              { label: 'Approach', value: 'Production-grade from day one', delay: 0.1 },
              { label: 'Focus', value: 'Systems that ship and scale', delay: 0.2 },
            ].map((item) => (
              <RevealOnScroll key={item.label} delay={item.delay} variant="assemble">
                <motion.div
                  className="p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm h-full group relative overflow-hidden"
                  whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.12)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 mb-4 relative">
                    {item.label}
                  </div>
                  <p className="text-base md:text-lg text-white/60 leading-relaxed relative group-hover:text-white/80 transition-colors">
                    {item.value}
                  </p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="lg:col-span-2">
            <RevealOnScroll delay={0.3} variant="assemble">
              <GitHubHeatmap />
            </RevealOnScroll>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {interests.map((interest, i) => (
            <RevealOnScroll key={interest.title} delay={i * 0.12} variant="assemble">
              <motion.div
                className="relative p-8 rounded-2xl border border-white/5 overflow-hidden group h-full"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08), transparent 60%)',
                  }}
                />
                <motion.span
                  className="text-3xl mb-5 block text-accent-cyan"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  {interest.icon}
                </motion.span>
                <h3 className="text-lg font-semibold text-white mb-2">{interest.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{interest.description}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
