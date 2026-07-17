import { useMemo, useCallback } from 'react'
import RevealOnScroll from '../components/ui/RevealOnScroll'
import WorkflowCanvas from '../components/workflow/WorkflowCanvas'
import EcosystemPanel from '../components/workflow/EcosystemPanel'
import SuggestedWorkflows from '../components/workflow/SuggestedWorkflows'
import { useWorkflow } from '../context/WorkflowContext'
import {
  toolMap,
  workflowMap,
  getConnectionsForTool,
  getWorkflowConnections,
  getDisplayPositions,
} from '../data/workflow'

export default function HowIBuild() {
  const {
    selectedToolId,
    activeWorkflowId,
    projectFocusId,
    focusToolIds,
    selectTool,
    selectWorkflow,
    clearFocus,
  } = useWorkflow()

  const selectedTool = selectedToolId ? toolMap[selectedToolId] ?? null : null
  const activeWorkflow = activeWorkflowId ? workflowMap[activeWorkflowId] ?? null : null

  const highlightedIds = useMemo(() => {
    const set = new Set<string>()

    if (focusToolIds.length > 0) {
      focusToolIds.forEach((id) => set.add(id))
      return set
    }

    if (activeWorkflowId) {
      const workflow = workflowMap[activeWorkflowId]
      workflow?.tools.forEach((id) => set.add(id))
      return set
    }

    if (selectedToolId) {
      set.add(selectedToolId)
      const tool = toolMap[selectedToolId]
      tool?.connections.forEach((id) => set.add(id))
    }

    return set
  }, [selectedToolId, activeWorkflowId, focusToolIds])

  const activeConnections = useMemo(() => {
    if (focusToolIds.length > 0) {
      return getWorkflowConnections(focusToolIds)
    }
    if (activeWorkflowId) {
      const workflow = workflowMap[activeWorkflowId]
      if (workflow) return getWorkflowConnections(workflow.tools)
    }
    if (selectedToolId) return getConnectionsForTool(selectedToolId)
    return []
  }, [selectedToolId, activeWorkflowId, focusToolIds])

  const positions = useMemo(
    () => getDisplayPositions(activeWorkflowId, focusToolIds.length > 0 ? focusToolIds : undefined),
    [activeWorkflowId, focusToolIds]
  )

  const pulseOriginId = selectedToolId ?? (focusToolIds[0] ?? null)

  const handleSelectTool = useCallback(
    (id: string) => {
      selectTool(selectedToolId === id ? null : id)
    },
    [selectTool, selectedToolId]
  )

  const handleSelectWorkflow = useCallback(
    (id: string | null) => {
      selectWorkflow(id)
    },
    [selectWorkflow]
  )

  const handleClosePanel = useCallback(() => {
    clearFocus()
  }, [clearFocus])

  return (
    <section id="workflow" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll variant="cinematic">
          <div className="mb-12 md:mb-16">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent-cyan/50 mb-6 block">
              04 — How I Build
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              The engineering
              <br />
              <span className="bg-gradient-to-r from-accent via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                ecosystem
              </span>
            </h2>
            <p className="text-white/35 mt-6 max-w-xl text-base md:text-lg">
              Not a tech stack list — a living map of how I design, build, and ship software. Click
              any node or workflow to trace the neural network.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} variant="assemble">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            <div className="lg:col-span-3 relative rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm p-6 sm:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-purple/5 pointer-events-none" />
              <WorkflowCanvas
                selectedId={selectedToolId}
                highlightedIds={highlightedIds}
                activeConnections={activeConnections}
                positions={positions}
                pulseOriginId={pulseOriginId}
                onSelect={handleSelectTool}
              />
              <p className="text-[10px] font-mono text-white/25 text-center mt-3 sm:hidden relative z-10">
                Tap a node to explore
              </p>
            </div>

            <div className="lg:col-span-2">
              <EcosystemPanel
                tool={selectedTool}
                workflow={activeWorkflow && !selectedTool ? activeWorkflow : null}
                projectFocusId={projectFocusId}
                onClose={handleClosePanel}
              />
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.25}>
          <SuggestedWorkflows
            activeWorkflowId={activeWorkflowId}
            onSelectWorkflow={handleSelectWorkflow}
          />
        </RevealOnScroll>
      </div>
    </section>
  )
}
