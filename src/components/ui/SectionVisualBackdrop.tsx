import { AnimatePresence, motion } from 'framer-motion'
import type { ComponentType } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useActiveSection, type SectionId } from '../../hooks/useActiveSection'
import {
  ContactIllustration,
  EducationIllustration,
  HeroIllustration,
  LaptopWorkerIllustration,
  LeadershipLiteraryIllustration,
  PixelPortraitIllustration,
  ProjectsIllustration,
} from './SectionIllustrations'

const SECTION_VISUALS: Partial<Record<SectionId, ComponentType>> = {
  hero: HeroIllustration,
  about: PixelPortraitIllustration,
  experience: LaptopWorkerIllustration,
  projects: ProjectsIllustration,
  education: EducationIllustration,
  leadership: LeadershipLiteraryIllustration,
  contact: ContactIllustration,
}

export function SectionVisualBackdrop() {
  const activeSection = useActiveSection()
  const { reducedMotion } = useTheme()

  if (reducedMotion) return null

  const Visual = SECTION_VISUALS[activeSection]

  return (
    <div className="section-visual-backdrop" aria-hidden="true">
      <AnimatePresence mode="wait">
        {Visual && (
          <motion.div
            key={activeSection}
            className="section-visual-slot"
            initial={{ opacity: 0, scale: 0.94, x: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, x: -16, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Visual />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
