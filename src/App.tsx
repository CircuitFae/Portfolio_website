import { useEffect } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { useLenis } from './hooks/useLenis'
import { ScrollTrigger } from './utils/gsap'
import { SceneCanvas } from './components/three/SceneCanvas'
import { Navbar } from './components/ui/Navbar'
import { HeroOverlay } from './components/ui/HeroOverlay'
import { About } from './components/ui/About'
import { Experience } from './components/ui/Experience'
import { Projects } from './components/ui/Projects'
import { Skills } from './components/ui/Skills'
import { Education } from './components/ui/Education'
import { Leadership } from './components/ui/Leadership'
import { Achievements } from './components/ui/Achievements'
import { Contact } from './components/ui/Contact'
import { Footer } from './components/ui/Footer'
import { MeshBackground } from './components/ui/MeshBackground'
import { CodeBackdrop } from './components/ui/CodeBackdrop'
import { SectionVisualBackdrop } from './components/ui/SectionVisualBackdrop'

function ScrollHueTracker() {
  const { setScrollHue } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollHue(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [setScrollHue])

  return null
}

function PortfolioContent() {
  useLenis()

  useEffect(() => {
    ScrollTrigger.refresh()
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <>
      <ScrollHueTracker />
      <MeshBackground />
      <CodeBackdrop />
      <SectionVisualBackdrop />
      <SceneCanvas />
      <Navbar />
      <main className="site-main relative z-10">
        <HeroOverlay />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Leadership />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}

export default App
