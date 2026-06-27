import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/** Root scroller used with Lenis smooth-scroll proxy */
export const SCROLLER = document.documentElement

function scrollTriggerDefaults(trigger: Element, start = 'top 85%') {
  return {
    trigger,
    scroller: SCROLLER,
    start,
    once: true,
  }
}

function isGradientText(el: HTMLElement) {
  return el.classList.contains('gradient-text')
}

/** Gradient clipped titles break when GSAP animates opacity/filter — transform only */
function revealTextEl(
  el: HTMLElement,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  timeline: gsap.core.Timeline,
  position?: string | number
) {
  if (isGradientText(el)) {
    const { opacity: _o1, filter: _f1, ...fromRest } = from
    const { opacity: _o2, filter: _f2, clearProps, ...toRest } = to
    timeline.fromTo(el, fromRest, { ...toRest, clearProps: 'transform' }, position)
    return
  }
  timeline.fromTo(el, from, to, position)
}

export function revealSectionHeader(header: HTMLElement | null) {
  if (!header) return

  const label = header.querySelector<HTMLElement>('.section-label')
  const title = header.querySelector<HTMLElement>('.section-title')
  const subtitle = header.querySelector<HTMLElement>('.section-subtitle')

  if (label) gsap.set(label, { opacity: 0 })
  if (subtitle) gsap.set(subtitle, { opacity: 0 })
  if (title) {
    if (isGradientText(title)) gsap.set(title, { y: 40, scale: 0.94 })
    else gsap.set(title, { opacity: 0 })
  }

  const tl = gsap.timeline({
    scrollTrigger: scrollTriggerDefaults(header, 'top 88%'),
  })

  if (label) {
    tl.fromTo(
      label,
      { opacity: 0, x: -32, filter: 'blur(10px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out', clearProps: 'filter' }
    )
  }

  if (title) {
    revealTextEl(
      title,
      isGradientText(title)
        ? { y: 40, scale: 0.94 }
        : { opacity: 0, y: 48, scale: 0.92, filter: 'blur(14px)' },
      isGradientText(title)
        ? { y: 0, scale: 1, duration: 0.9, ease: 'power4.out' }
        : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power4.out', clearProps: 'filter' },
      tl,
      label ? '-=0.3' : 0
    )
  }

  if (subtitle) {
    tl.fromTo(
      subtitle,
      { opacity: 0, y: 24, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out', clearProps: 'filter' },
      '-=0.45'
    )
  }
}

export function staggerReveal(container: HTMLElement | null, selector = '.stagger-item') {
  if (!container) return
  const items = container.querySelectorAll<HTMLElement>(selector)
  if (!items.length) return

  gsap.set(items, {
    opacity: 0,
    y: 64,
    scale: 0.9,
    rotateX: 6,
    filter: 'blur(12px)',
    transformPerspective: 900,
    transformOrigin: 'center top',
  })

  items.forEach((item) => {
    const lis = item.querySelectorAll<HTMLElement>('.content-list li')
    if (!lis.length) return
    gsap.set(lis, { opacity: 0, x: -14, filter: 'blur(4px)' })
  })

  gsap.to(items, {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    duration: 0.9,
    stagger: { each: 0.14, from: 'start' },
    ease: 'power3.out',
    clearProps: 'filter',
    scrollTrigger: scrollTriggerDefaults(container, 'top 78%'),
  })

  items.forEach((item, index) => {
    const lis = item.querySelectorAll<HTMLElement>('.content-list li')
    if (!lis.length) return

    gsap.to(lis, {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.4 + index * 0.14,
      clearProps: 'filter',
      scrollTrigger: scrollTriggerDefaults(container, 'top 78%'),
    })
  })
}

export function revealTagRows(container: HTMLElement | null) {
  if (!container) return
  const rows = container.querySelectorAll<HTMLElement>('.tag-row')
  rows.forEach((row) => {
    const tags = row.querySelectorAll<HTMLElement>('.tag-pill')
    if (!tags.length) return

    gsap.set(tags, { opacity: 0, scale: 0.5, y: 16, filter: 'blur(6px)' })
    gsap.to(tags, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.55,
      stagger: 0.07,
      ease: 'back.out(1.6)',
      clearProps: 'filter',
      scrollTrigger: scrollTriggerDefaults(row, 'top 82%'),
    })
  })
}

export function revealListItems(container: HTMLElement | null) {
  if (!container) return
  const lists = container.querySelectorAll<HTMLElement>('.content-list')
  lists.forEach((list) => {
    if (list.closest('.stagger-item')) return
    const items = list.querySelectorAll<HTMLElement>('li')
    if (!items.length) return

    gsap.set(items, { opacity: 0, x: -16, filter: 'blur(4px)' })
    gsap.to(items, {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      clearProps: 'filter',
      scrollTrigger: scrollTriggerDefaults(list, 'top 85%'),
    })
  })
}

export function forceRevealSection(section: HTMLElement) {
  section.classList.add('scroll-revealed')
  gsap.set(section.querySelectorAll<HTMLElement>('.section-header *, .stagger-item, .tag-pill, .content-list li'), {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'none',
    clearProps: 'transform,filter,opacity',
  })
}

export function forceRevealVisibleSections() {
  document.querySelectorAll<HTMLElement>('.scroll-magic-section').forEach((section) => {
    const rect = section.getBoundingClientRect()
    const visible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0
    if (visible) forceRevealSection(section)
  })
}

export function refreshScrollAnimations() {
  ScrollTrigger.refresh()
  forceRevealVisibleSections()
}

/** @deprecated use revealSectionHeader */
export function fadeInUp(element: HTMLElement | null, delay = 0) {
  if (!element) return
  gsap.fromTo(
    element,
    { opacity: 0, y: 40, filter: 'blur(8px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.7,
      delay,
      ease: 'power3.out',
      clearProps: 'filter',
      scrollTrigger: scrollTriggerDefaults(element),
    }
  )
}

/** @deprecated use staggerReveal */
export function staggerChildren(container: HTMLElement | null, selector = '.stagger-item') {
  staggerReveal(container, selector)
}
