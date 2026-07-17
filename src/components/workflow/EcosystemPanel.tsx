import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import type { WorkflowTool, SuggestedWorkflow } from '../../data/workflow'
import { projectWorkflowMap } from '../../data/workflow'
import { X, ArrowRight, GitBranch, Layers } from 'lucide-react'

interface EcosystemPanelProps {
  tool: WorkflowTool | null
  workflow: SuggestedWorkflow | null
  projectFocusId: string | null
  onClose: () => void
}

const panelTransition = { type: 'spring' as const, stiffness: 280, damping: 30 }

const toolSections = [
  { key: 'whyPersonal', label: 'Why I use it' },
  { key: 'whenChoose', label: 'When I choose it' },
  { key: 'problemsSolved', label: 'Problems it solves' },
  { key: 'workflowFit', label: 'How it fits my workflow' },
] as const

export default function EcosystemPanel({
  tool,
  workflow,
  projectFocusId,
  onClose,
}: EcosystemPanelProps) {
  const projectLink = projectFocusId ? projectWorkflowMap[projectFocusId] : null

  return (
    <div className="relative h-full min-h-[320px] lg:min-h-[480px]">
      <AnimatePresence mode="wait">
        {workflow ? (
          <motion.div
            key={`workflow-${workflow.id}`}
            initial={{ opacity: 0, x: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -16, filter: 'blur(8px)' }}
            transition={panelTransition}
            className="h-full rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-xl overflow-hidden"
            style={{ boxShadow: `0 0 48px ${workflow.color}18` }}
          >
            <div
              className="px-5 py-4 border-b border-white/5"
              style={{ background: `linear-gradient(135deg, ${workflow.color}14, transparent)` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="w-4 h-4" style={{ color: workflow.color }} />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/35">
                      Workflow
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white leading-tight">{workflow.name}</h3>
                  <p className="text-xs text-white/45 mt-1 leading-relaxed">{workflow.tagline}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {projectLink && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-3 px-3 py-2 rounded-lg border border-white/8 bg-white/[0.03]"
                >
                  <p className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan/60 mb-1">
                    Project workflow
                  </p>
                  <p className="text-xs text-white/50">
                    Tracing the build path for this project — watch the network animate from idea to
                    deployment.
                  </p>
                </motion.div>
              )}
            </div>

            <div className="p-5 space-y-5 max-h-[420px] overflow-y-auto">
              <Section title="What this workflow is for" delay={0}>
                <p className="text-sm text-white/60 leading-relaxed">{workflow.purpose}</p>
              </Section>

              <Section title="Why these tools together" delay={0.06}>
                <p className="text-sm text-white/60 leading-relaxed">{workflow.whyTogether}</p>
              </Section>

              <Section title="How data flows" delay={0.12}>
                <ol className="space-y-2">
                  {workflow.dataFlow.map((step, i) => (
                    <motion.li
                      key={step}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                      className="flex items-start gap-2.5 text-sm text-white/55"
                    >
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono mt-0.5"
                        style={{ background: `${workflow.color}20`, color: workflow.color }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </motion.li>
                  ))}
                </ol>
              </Section>

              {projectLink && (
                <Section title="Build journey" delay={0.18}>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {projectLink.journey.map((step, i) => (
                      <span key={step} className="flex items-center gap-1.5">
                        <span
                          className="px-2.5 py-1 text-[11px] rounded-full border border-white/10 text-white/55"
                          style={{ background: `${workflow.color}10` }}
                        >
                          {step}
                        </span>
                        {i < projectLink.journey.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-white/20" />
                        )}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              <Section title="When I use this" delay={0.22}>
                <p className="text-sm text-white/60 leading-relaxed">{workflow.whenUse}</p>
              </Section>

              <Section title="Example projects" delay={0.26}>
                <div className="flex flex-wrap gap-2">
                  {workflow.exampleProjects.map((proj) => (
                    <span
                      key={proj}
                      className="px-2.5 py-1 text-[11px] rounded-full border border-white/8 text-white/50"
                      style={{ background: `${workflow.color}08` }}
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </Section>

              <Section title="Engineering tradeoffs" delay={0.3}>
                <ul className="space-y-2">
                  {workflow.tradeoffs.map((t) => (
                    <li key={t} className="text-sm text-white/50 leading-relaxed flex gap-2">
                      <span className="text-white/20 mt-1">—</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Section>
            </div>
          </motion.div>
        ) : tool ? (
          <motion.div
            key={`tool-${tool.id}`}
            initial={{ opacity: 0, x: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -16, filter: 'blur(8px)' }}
            transition={panelTransition}
            className="h-full rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-xl overflow-hidden"
            style={{ boxShadow: `0 0 48px ${tool.color}18` }}
          >
            <div
              className="px-5 py-4 border-b border-white/5 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${tool.color}14, transparent)` }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono"
                  style={{ background: `${tool.color}28`, color: tool.color }}
                  animate={{ boxShadow: [`0 0 0px ${tool.color}00`, `0 0 20px ${tool.color}40`, `0 0 0px ${tool.color}00`] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {tool.shortLabel}
                </motion.span>
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

            <div className="p-5 space-y-4 max-h-[420px] overflow-y-auto">
              {toolSections.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, ...panelTransition }}
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1.5">
                    {item.label}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">{tool[item.key]}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, ...panelTransition }}
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">
                  Projects I used it in
                </div>
                <div className="flex flex-wrap gap-2">
                  {tool.projectExamples.map((proj) => (
                    <span
                      key={proj}
                      className="px-2.5 py-1 text-[11px] rounded-full border border-white/8 text-white/50"
                      style={{ background: `${tool.color}08` }}
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, ...panelTransition }}
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">
                  Where it shines
                </div>
                <div className="flex flex-wrap gap-2">
                  {tool.strengths.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 text-[11px] rounded-full border border-white/8 text-white/45"
                    >
                      {s}
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
            className="h-full min-h-[320px] lg:min-h-[480px] rounded-2xl border border-dashed border-white/8 flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-5"
              animate={{
                scale: [1, 1.04, 1],
                boxShadow: [
                  '0 0 0px rgba(99,102,241,0)',
                  '0 0 24px rgba(99,102,241,0.15)',
                  '0 0 0px rgba(99,102,241,0)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Layers className="w-5 h-5 text-white/25" />
            </motion.div>
            <p className="text-sm text-white/45 max-w-[220px] leading-relaxed">
              Select a tool or workflow to explore how I actually build software
            </p>
            <p className="text-[10px] font-mono text-white/25 mt-3 uppercase tracking-widest">
              Neural network view
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Section({
  title,
  children,
  delay,
}: {
  title: string
  children: ReactNode
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 28 }}
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">
        {title}
      </div>
      {children}
    </motion.div>
  )
}
