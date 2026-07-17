import { motion, AnimatePresence } from 'framer-motion'
import type { WorkflowTool } from '../../data/workflow'
import { X } from 'lucide-react'

interface ToolDetailPanelProps {
  tool: WorkflowTool | null
  onClose: () => void
}

const detailItems = [
  { key: 'what', label: 'What I use it for' },
  { key: 'why', label: 'Why I use it' },
  { key: 'where', label: 'Where in my projects' },
] as const

export default function ToolDetailPanel({ tool, onClose }: ToolDetailPanelProps) {
  return (
    <div className="relative h-full min-h-[280px]">
      <AnimatePresence mode="wait">
        {tool ? (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="h-full rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-xl overflow-hidden"
            style={{ boxShadow: `0 0 40px ${tool.color}15` }}
          >
            <div
              className="px-5 py-4 border-b border-white/5 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${tool.color}12, transparent)` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono"
                  style={{ background: `${tool.color}25`, color: tool.color }}
                >
                  {tool.shortLabel}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                    {tool.category}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors lg:hidden"
                aria-label="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto">
              {detailItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1.5">
                    {item.label}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">{tool[item.key]}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">
                  Favorite use cases
                </div>
                <div className="flex flex-wrap gap-2">
                  {tool.favorites.map((fav) => (
                    <span
                      key={fav}
                      className="px-2.5 py-1 text-[11px] rounded-full border border-white/8 text-white/50"
                      style={{ background: `${tool.color}08` }}
                    >
                      {fav}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full min-h-[280px] rounded-2xl border border-dashed border-white/8 flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-white/20 text-lg">◎</span>
            </motion.div>
            <p className="text-sm text-white/40 max-w-[200px]">
              Select a tool in the ecosystem to explore how I use it
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
