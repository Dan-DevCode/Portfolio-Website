import { useEffect } from 'react'
import { useAmbient, type ScrollZone } from '../context/AmbientContext'

const zones: { id: ScrollZone; el: string }[] = [
  { id: 'hero', el: '#hero' },
  { id: 'projects', el: '#projects' },
  { id: 'about', el: '#about' },
  { id: 'skills', el: '#skills' },
  { id: 'experience', el: '#experience' },
  { id: 'contact', el: '#contact' },
]

export function useScrollZone() {
  const { setScrollZone } = useAmbient()

  useEffect(() => {
    const handleScroll = () => {
      for (const zone of [...zones].reverse()) {
        const el = document.querySelector(zone.el)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          setScrollZone(zone.id)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrollZone])
}
