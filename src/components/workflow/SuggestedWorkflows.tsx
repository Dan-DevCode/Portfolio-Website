import { motion } from 'framer-motion'
import { suggestedWorkflows, toolMap } from '../../data/workflow'
import { ArrowRight, Zap } from 'lucide-react'

interface SuggestedWorkflowsProps {
  activeWorkflowId: string | null
  onSelectWorkflow: (id: string | null) => void
}

export default function SuggestedWorkflows({
  activeWorkflowId,
  onSelectWorkflow,
}: SuggestedWorkflowsProps) {
  return (
    <div className="mt-16 md:mt-20">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-4 h-4 text-accent-cyan/60" />
        <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white/40">
          Suggested workflows
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {suggestedWorkflows.map((workflow, i) => {
          const isActive = activeWorkflowId === workflow.id

          return (
            <motion.button
              key={workflow.id}
              type="button"
              onClick={() => onSelectWorkflow(isActive ? null : workflow.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 26 }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
              className={`text-left p-5 rounded-2xl border transition-colors duration-500 ${
                isActive
                  ? 'border-white/15 bg-white/[0.04]'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]'
              }`}
              style={{
                boxShadow: isActive ? `0 0 40px ${workflow.color}22, inset 0 1px 0 rgba(255,255,255,0.04)` : 'none',
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h4 className="text-base font-semibold text-white mb-1">{workflow.name}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{workflow.tagline}</p>
                </div>
                <motion.div
                  animate={{ rotate: isActive ? 90 : 0, scale: isActive ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                >
                  <ArrowRight
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: isActive ? workflow.color : 'rgba(255,255,255,0.2)' }}
                  />
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {workflow.tools.map((toolId, ti) => {
                  const tool = toolMap[toolId]
                  if (!tool) return null
                  return (
                    <motion.span
                      key={toolId}
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                        scale: isActive ? 1 : 0.95,
                      }}
                      transition={{ delay: isActive ? ti * 0.04 : 0 }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono"
                      style={{
                        background: isActive ? `${tool.color}22` : 'rgba(255,255,255,0.04)',
                        color: isActive ? tool.color : 'rgba(255,255,255,0.35)',
                        boxShadow: isActive ? `0 0 12px ${tool.color}15` : 'none',
                      }}
                    >
                      {tool.shortLabel}
                      {ti < workflow.tools.length - 1 && (
                        <span className="text-white/15 ml-0.5">→</span>
                      )}
                    </motion.span>
                  )
                })}
              </div>

              {isActive && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-white/5 text-[10px] font-mono text-accent-cyan/55"
                >
                  Network reorganizing — see workflow breakdown in the panel →
                </motion.p>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
