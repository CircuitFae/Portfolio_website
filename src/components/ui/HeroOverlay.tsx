import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Download, Mail, Sparkles } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'
import { ProfilePhoto } from './ProfilePhoto'
import { portfolio } from '../../data/portfolio'

const iconMap: Record<string, typeof GitHubIcon> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
}

const roles = [
  'Full-Stack Developer',
  'AI / GenAI Enthusiast',
  'Software Engineer',
  'Problem Solver',
]

const stats = [
  { value: '8.85', label: 'CGPA (Major)' },
  { value: '8.75', label: 'CGPA (Minor)' },
]

const heroEase = [0.22, 1, 0.36, 1] as const

const heroReveal = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, duration: 0.85, ease: heroEase },
  }),
}

export function HeroOverlay() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 3000)
    return () => clearInterval(id)
  }, [])

  const [firstName, ...rest] = portfolio.name.split(' ')
  const lastName = rest.join(' ')

  return (
    <section id="hero" className="hero-section scroll-margin">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <div className="hero-inner">
        <div className="hero-content">
          <motion.div custom={0.1} initial="hidden" animate="visible" variants={heroReveal} className="hero-meta">
            <span className="status-badge">
              <span className="status-dot" />
              Available for opportunities
            </span>
            <span className="hero-handle">
              <Sparkles size={14} />
              {portfolio.handle}
            </span>
          </motion.div>

          <motion.h1 custom={0.22} initial="hidden" animate="visible" variants={heroReveal} className="hero-title">
            <span className="hero-title-first gradient-text">{firstName}</span>
            <span className="hero-title-last">{lastName}</span>
          </motion.h1>

          <motion.div custom={0.38} initial="hidden" animate="visible" variants={heroReveal} className="hero-role-wrap">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="hero-role"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.p custom={0.48} initial="hidden" animate="visible" variants={heroReveal} className="hero-tagline">
            {portfolio.tagline}
          </motion.p>

          <motion.div custom={0.58} initial="hidden" animate="visible" variants={heroReveal} className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-pill">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div custom={0.68} initial="hidden" animate="visible" variants={heroReveal} className="hero-actions">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href={portfolio.resumePath} download className="btn-outline">
              <Download size={16} />
              Download Resume
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
          </motion.div>

          <motion.div custom={0.78} initial="hidden" animate="visible" variants={heroReveal} className="hero-social">
            {portfolio.socials.map((social) => {
              const CustomIcon = iconMap[social.label]
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="hero-social-link"
                  aria-label={social.label}
                >
                  {CustomIcon ? <CustomIcon className="h-[18px] w-[18px]" /> : <Mail size={18} />}
                </motion.a>
              )
            })}
          </motion.div>
        </div>

        <div className="hero-visual">
          <ProfilePhoto />
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 1, duration: 0.7, y: { repeat: Infinity, duration: 2.5, delay: 1 } }}
        className="hero-scroll"
      >
        <span>Scroll</span>
        <ArrowDown size={18} />
      </motion.a>
    </section>
  )
}
