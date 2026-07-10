import { motion } from 'framer-motion'
import type { Project } from '../../data/content'

const visualConfig: Record<string, { icon: string; pattern: string }> = {
  'catalog-generator': { icon: '☁', pattern: 'aws' },
  'sentiment-analysis': { icon: '◈', pattern: 'nlp' },
  simplewealth: { icon: '◆', pattern: 'finance' },
  urgeease: { icon: '◇', pattern: 'health' },
}

function FloatingElement({
  delay,
  x,
  y,
  children,
}: {
  delay: number
  x: string
  y: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export default function ProjectVisual({ project }: { project: Project }) {
  const config = visualConfig[project.id] || { icon: '◆', pattern: 'default' }

  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${project.color}25, transparent 60%),
                       radial-gradient(ellipse at 70% 80%, ${project.accent}20, transparent 50%),
                       linear-gradient(135deg, rgba(5,5,5,0.9), rgba(10,10,15,0.95))`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, ${project.color} 40px, ${project.color} 41px),
                            repeating-linear-gradient(90deg, transparent, transparent 40px, ${project.color} 40px, ${project.color} 41px)`,
        }}
      />

      <motion.div
        className="absolute inset-8 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[10px] font-mono text-white/30 ml-2">{project.id}.app</span>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <motion.span
              className="text-3xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{ color: project.color }}
            >
              {config.icon}
            </motion.span>
            <div>
              <div className="h-2 w-24 rounded-full bg-white/20" />
              <div className="h-1.5 w-16 rounded-full bg-white/10 mt-1.5" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {project.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="p-2 rounded-lg border border-white/5 bg-white/[0.02]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
              >
                <div className="text-sm font-bold text-white">{stat.value}</div>
                <div className="text-[8px] text-white/30 uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-1.5">
            {[0.9, 0.7, 0.5].map((w, i) => (
              <motion.div
                key={i}
                className="h-1.5 rounded-full bg-white/10"
                style={{ width: `${w * 100}%` }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <FloatingElement delay={0} x="5%" y="10%">
        <div
          className="px-2 py-1 rounded-md text-[9px] font-mono border border-white/10 bg-white/5"
          style={{ color: project.accent }}
        >
          {project.stack[0]}
        </div>
      </FloatingElement>

      <FloatingElement delay={1} x="75%" y="15%">
        <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-xs">
          AI
        </div>
      </FloatingElement>

      <FloatingElement delay={2} x="80%" y="70%">
        <div
          className="px-2 py-1 rounded-full text-[9px] font-mono"
          style={{ background: `${project.color}30`, color: project.color }}
        >
          live
        </div>
      </FloatingElement>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: `linear-gradient(to top, ${project.color}15, transparent)`,
        }}
      />
    </div>
  )
}
