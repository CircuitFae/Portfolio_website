import { useEffect, useRef } from 'react'
import {
  gsap,
  refreshScrollAnimations,
  revealListItems,
  revealSectionHeader,
  revealTagRows,
  staggerReveal,
} from '../utils/gsap'
import { useTheme } from '../context/ThemeContext'

export function useScrollAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const { reducedMotion } = useTheme()

  useEffect(() => {
    const section = ref.current
    if (!section) return

    if (reducedMotion) {
      section.classList.add('scroll-revealed')
      return
    }

    section.classList.add('scroll-magic-section')

    const ctx = gsap.context(() => {
      revealSectionHeader(section.querySelector<HTMLElement>('.section-header'))
      staggerReveal(section)
      revealTagRows(section)
      revealListItems(section)
    }, section)

    const onReady = () => refreshScrollAnimations()
    const onThemeChange = () => refreshScrollAnimations()

    window.addEventListener('lenis-ready', onReady)
    window.addEventListener('theme-changed', onThemeChange)
    requestAnimationFrame(onReady)

    return () => {
      window.removeEventListener('lenis-ready', onReady)
      window.removeEventListener('theme-changed', onThemeChange)
      ctx.revert()
      section.classList.remove('scroll-magic-section', 'scroll-revealed')
    }
  }, [reducedMotion])

  return ref
}
