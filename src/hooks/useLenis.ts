import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, SCROLLER } from '../utils/gsap'
import { useTheme } from '../context/ThemeContext'

export function useLenis() {
  const { reducedMotion } = useTheme()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.scrollerProxy(SCROLLER, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
      pinType: SCROLLER.style.transform ? 'transform' : 'fixed',
    })

    ScrollTrigger.addEventListener('refresh', () => lenis.resize())
    ScrollTrigger.refresh()
    window.dispatchEvent(new Event('lenis-ready'))

    return () => {
      lenis.destroy()
      gsap.ticker.remove(onTick)
      ScrollTrigger.scrollerProxy(SCROLLER, {})
    }
  }, [reducedMotion])
}
