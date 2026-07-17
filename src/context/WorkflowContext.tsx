import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { projectWorkflowMap } from '../data/workflow'

interface WorkflowState {
  selectedToolId: string | null
  activeWorkflowId: string | null
  projectFocusId: string | null
  focusToolIds: string[]
  selectTool: (id: string | null) => void
  selectWorkflow: (id: string | null) => void
  openProjectWorkflow: (projectId: string) => void
  clearFocus: () => void
}

const WorkflowContext = createContext<WorkflowState | null>(null)

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null)
  const [activeWorkflowId, setActiveWorkflowId] = useState<string | null>(null)
  const [projectFocusId, setProjectFocusId] = useState<string | null>(null)
  const [focusToolIds, setFocusToolIds] = useState<string[]>([])
  const [pendingScroll, setPendingScroll] = useState(false)

  const clearFocus = useCallback(() => {
    setSelectedToolId(null)
    setActiveWorkflowId(null)
    setProjectFocusId(null)
    setFocusToolIds([])
  }, [])

  const selectTool = useCallback((id: string | null) => {
    setActiveWorkflowId(null)
    setProjectFocusId(null)
    setFocusToolIds([])
    setSelectedToolId(id)
  }, [])

  const selectWorkflow = useCallback((id: string | null) => {
    setSelectedToolId(null)
    setProjectFocusId(null)
    setFocusToolIds([])
    setActiveWorkflowId(id)
  }, [])

  const openProjectWorkflow = useCallback((projectId: string) => {
    const link = projectWorkflowMap[projectId]
    if (!link) return

    setSelectedToolId(null)
    setProjectFocusId(projectId)
    setActiveWorkflowId(link.workflowId)
    setFocusToolIds(link.tools)
    setPendingScroll(true)
  }, [])

  useEffect(() => {
    if (!pendingScroll) return

    const timer = setTimeout(() => {
      const el = document.getElementById('workflow')
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setPendingScroll(false)
    }, 80)

    return () => clearTimeout(timer)
  }, [pendingScroll])

  return (
    <WorkflowContext.Provider
      value={{
        selectedToolId,
        activeWorkflowId,
        projectFocusId,
        focusToolIds,
        selectTool,
        selectWorkflow,
        openProjectWorkflow,
        clearFocus,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  )
}

export function useWorkflow() {
  const ctx = useContext(WorkflowContext)
  if (!ctx) throw new Error('useWorkflow must be used within WorkflowProvider')
  return ctx
}
