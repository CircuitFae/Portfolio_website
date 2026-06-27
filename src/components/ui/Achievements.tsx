import { Trophy } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { portfolio } from '../../data/portfolio'

export function Achievements() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section id="achievements" ref={ref} className="section-padding scroll-margin">
      <header className="section-header">
        <span className="section-label">Achievements</span>
        <h2 className="section-title gradient-text">Highlights & Milestones</h2>
        <p className="section-subtitle">Competitions, exams, and recognitions</p>
      </header>

      <div className="card-grid card-grid-3">
        {portfolio.achievements.map((ach) => (
          <article key={ach.title} className="content-card glass-card stagger-item text-left">
            <div className="mb-3 flex items-center gap-2">
              <Trophy size={16} className="text-[var(--accent-3)]" />
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-3)]">
                {ach.year}
              </span>
            </div>
            <h3 className="card-title mb-2">{ach.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">{ach.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
