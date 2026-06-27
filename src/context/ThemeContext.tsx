import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { gsap, refreshScrollAnimations } from '../utils/gsap'
import {
  applyPaletteToDOM,
  blendPalettes,
  palettes,
  type Palette,
  type ThemeMode,
} from '../utils/colors'

interface ThemeContextValue {
  mode: ThemeMode
  blendT: number
  scrollHue: number
  palette: Palette
  toggleTheme: () => void
  setScrollHue: (value: number) => void
  reducedMotion: boolean
  isMobile: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark')
  const [scrollHue, setScrollHue] = useState(0)
  const [blendT, setBlendT] = useState(0)
  const targetMode = useRef<ThemeMode>('dark')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqMobile = window.matchMedia('(max-width: 768px)')
    setReducedMotion(mqMotion.matches)
    setIsMobile(mqMobile.matches)

    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    const onMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mqMotion.addEventListener('change', onMotion)
    mqMobile.addEventListener('change', onMobile)
    return () => {
      mqMotion.removeEventListener('change', onMotion)
      mqMobile.removeEventListener('change', onMobile)
    }
  }, [])

  useEffect(() => {
    applyPaletteToDOM(palettes.dark)
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  const palette = useMemo(() => {
    const from = palettes.dark
    const to = palettes.light
    return blendPalettes(from, to, blendT)
  }, [blendT])

  useEffect(() => {
    applyPaletteToDOM(palette)
    const isLight = blendT >= 0.5
    document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark')
    document.documentElement.style.setProperty(
      '--text-shadow',
      isLight ? 'none' : '0 1px 4px rgba(0, 0, 0, 0.72), 0 2px 14px rgba(0, 0, 0, 0.38)'
    )
    document.documentElement.style.setProperty(
      '--glass-border',
      isLight ? 'rgba(92, 58, 18, 0.14)' : 'rgba(255, 255, 255, 0.16)'
    )
  }, [palette, blendT])

  const toggleTheme = useCallback(() => {
    const next: ThemeMode = targetMode.current === 'dark' ? 'light' : 'dark'
    targetMode.current = next

    gsap.to(
      { t: blendT },
      {
        t: next === 'light' ? 1 : 0,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate() {
          setBlendT(this.targets()[0].t)
        },
        onComplete() {
          setMode(next)
          window.dispatchEvent(new Event('theme-changed'))
          refreshScrollAnimations()
        },
      }
    )
  }, [blendT])

  const value = useMemo(
    () => ({
      mode,
      blendT,
      scrollHue,
      palette,
      toggleTheme,
      setScrollHue,
      reducedMotion,
      isMobile,
    }),
    [mode, blendT, scrollHue, palette, toggleTheme, reducedMotion, isMobile]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
