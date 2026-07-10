import { useEffect } from 'react'
import { AmbientProvider } from './context/AmbientContext'
import { useLenis } from './hooks/useLenis'
import { useScrollZone } from './hooks/useScrollZone'
import AuroraBackground from './components/effects/AuroraBackground'
import ParticleCanvas from './components/effects/ParticleCanvas'
import CursorSpotlight from './components/effects/CursorSpotlight'
import NoiseTexture from './components/effects/NoiseTexture'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/layout/ScrollProgress'
import IntroOverlay from './components/layout/IntroOverlay'
import TerminalEasterEgg from './components/layout/TerminalEasterEgg'
import FloatingDock from './components/layout/FloatingDock'
import DynamicIsland from './components/layout/DynamicIsland'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Contact from './sections/Contact'

function AppShell() {
  useLenis()
  useScrollZone()

  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.title = 'Daniel Samarin — AI Engineer'
  }, [])

  return (
    <>
      <IntroOverlay />
      <AuroraBackground />
      <ParticleCanvas />
      <CursorSpotlight />
      <NoiseTexture />
      <ScrollProgress />
      <DynamicIsland />
      <Navigation />
      <FloatingDock />
      <TerminalEasterEgg />

      <main className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AmbientProvider>
      <AppShell />
    </AmbientProvider>
  )
}
