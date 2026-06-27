import { useEffect, useState } from 'react'

export const SECTION_IDS = [
  'hero',
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'leadership',
  'achievements',
  'contact',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    )

    if (sections.length === 0) return

    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio)
        })

        let bestId = 'hero'
        let bestRatio = 0

        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (bestRatio > 0.08) {
          setActiveSection(bestId as SectionId)
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return activeSection
}
