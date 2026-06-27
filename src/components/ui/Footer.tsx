import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Heart } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'
import { portfolio } from '../../data/portfolio'

export function Footer() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <footer ref={ref} className="border-t border-[var(--glass-border)] py-8">
      <div className="site-shell stagger-item flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="flex flex-wrap items-center justify-center gap-1 text-sm text-[var(--text-muted)] sm:justify-start">
          © {new Date().getFullYear()} {portfolio.name}. Built with
          <Heart size={14} className="text-[var(--accent-3)]" />
          React + Three.js
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/CircuitFae" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent-1)]">
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a href="https://linkedin.com/in/anushka-thakur" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent-1)]">
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
