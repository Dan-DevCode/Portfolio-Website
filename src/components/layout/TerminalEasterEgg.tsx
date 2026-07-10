import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKonamiCode } from '../../hooks/useKonamiCode'
import { useAmbient } from '../../context/AmbientContext'
import { projects } from '../../data/content'
import { sanitizeTerminalCommand } from '../../lib/security'
import { X } from 'lucide-react'

const MAX_HISTORY = 100

const commands: Record<string, string> = {
  help: 'Available: help, about, skills, projects, contact, clear, whoami, exit',
  about: 'AI engineer building cloud AI workflows, NLP pipelines, and full-stack production systems.',
  skills: 'Python, AWS, React, Flask, Next.js, LangChain, FAISS, scikit-learn, MongoDB, NLP.',
  projects: projects.map((p) => p.title).join(' · '),
  contact: 'danielsamarin.ai@gmail.com | github.com/dsamarin-ai',
  whoami: 'Daniel Samarin — AI Engineer, Builder, Problem Solver.',
  clear: '__CLEAR__',
  exit: '__EXIT__',
}

export default function TerminalEasterEgg() {
  const { terminalOpen, setTerminalOpen } = useAmbient()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([
    'DS-OS v3.0 — Secure Terminal',
    'Type "help" for available commands.',
    '',
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useKonamiCode(() => setTerminalOpen(true))

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault()
        setTerminalOpen(!terminalOpen)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [terminalOpen, setTerminalOpen])

  useEffect(() => {
    if (terminalOpen) inputRef.current?.focus()
  }, [terminalOpen])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [history])

  const appendHistory = (lines: string[]) => {
    setHistory((prev) => [...prev, ...lines].slice(-MAX_HISTORY))
  }

  const handleCommand = (rawCmd: string) => {
    const sanitized = sanitizeTerminalCommand(rawCmd)

    if (!sanitized) {
      appendHistory(['> [invalid input]', 'Invalid command format.', ''])
      return
    }

    const trimmed = sanitized.toLowerCase()
    const response = commands[trimmed]

    if (trimmed === 'clear') {
      setHistory([])
      return
    }
    if (trimmed === 'exit') {
      setTerminalOpen(false)
      return
    }

    appendHistory([
      `> ${sanitized}`,
      response || 'Unknown command. Type "help" for options.',
      '',
    ])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    handleCommand(input)
    setInput('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[\x00-\x1f\x7f]/g, '').slice(0, 64)
    setInput(value)
  }

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[500px] z-[90]"
        >
          <div className="rounded-xl border border-accent-cyan/20 bg-void/95 backdrop-blur-xl shadow-2xl shadow-accent/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="text-xs font-mono text-white/40 ml-2">ds-terminal</span>
              </div>
              <button
                onClick={() => setTerminalOpen(false)}
                className="text-white/30 hover:text-white/60 transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="h-64 overflow-y-auto p-4 font-mono text-xs space-y-1"
              role="log"
              aria-live="polite"
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith('>')
                      ? 'text-accent-cyan'
                      : line.startsWith('DS-OS')
                        ? 'text-accent-purple'
                        : 'text-white/50'
                  }
                >
                  {line}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center border-t border-white/5 px-4 py-2">
              <span className="text-accent-cyan font-mono text-xs mr-2">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                className="flex-1 bg-transparent text-white/80 font-mono text-xs outline-none"
                placeholder="type a command..."
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                maxLength={64}
                aria-label="Terminal command input"
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
