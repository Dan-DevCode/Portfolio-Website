import { useEffect, useState, useCallback } from 'react'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useKonamiCode(onActivate: () => void) {
  const [index, setIndex] = useState(0)

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === KONAMI[index]) {
        const next = index + 1
        if (next === KONAMI.length) {
          onActivate()
          setIndex(0)
        } else {
          setIndex(next)
        }
      } else {
        setIndex(0)
      }
    },
    [index, onActivate],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])
}
