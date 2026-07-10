import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export type AmbientMood = 'default' | 'aurora' | 'neural' | 'cosmic' | 'electric' | 'ember'
export type ScrollZone = 'hero' | 'projects' | 'about' | 'skills' | 'experience' | 'contact'

interface AmbientState {
  mood: AmbientMood
  scrollZone: ScrollZone
  surpriseActive: boolean
  triggerSurprise: () => void
  setScrollZone: (zone: ScrollZone) => void
  terminalOpen: boolean
  setTerminalOpen: (open: boolean) => void
}

const AmbientContext = createContext<AmbientState | null>(null)

const moods: AmbientMood[] = ['aurora', 'neural', 'cosmic', 'electric', 'ember']

export function AmbientProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<AmbientMood>('default')
  const [scrollZone, setScrollZone] = useState<ScrollZone>('hero')
  const [surpriseActive, setSurpriseActive] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  const triggerSurprise = useCallback(() => {
    const next = moods[Math.floor(Math.random() * moods.length)]
    setMood(next)
    setSurpriseActive(true)
    setTimeout(() => {
      setSurpriseActive(false)
      setMood('default')
    }, 4000)
  }, [])

  useEffect(() => {
    const interval = setInterval(triggerSurprise, 18000)
    return () => clearInterval(interval)
  }, [triggerSurprise])

  return (
    <AmbientContext.Provider
      value={{
        mood,
        scrollZone,
        surpriseActive,
        triggerSurprise,
        setScrollZone,
        terminalOpen,
        setTerminalOpen,
      }}
    >
      {children}
    </AmbientContext.Provider>
  )
}

export function useAmbient() {
  const ctx = useContext(AmbientContext)
  if (!ctx) throw new Error('useAmbient must be used within AmbientProvider')
  return ctx
}
