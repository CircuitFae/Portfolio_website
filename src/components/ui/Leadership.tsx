import { Users } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { portfolio } from '../../data/portfolio'

export function Leadership() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section id="leadership" ref={ref} className="section-padding scroll-margin">
      <header className="section-header">
        <span className="section-label">Leadership</span>
        <h2 className="section-title gradient-text">Positions of Responsibility</h2>
        <p className="section-subtitle">Roles on campus and in clubs</p>
      </header>

      <div className="card-grid card-grid-2">
        {portfolio.leadership.map((item) => (
          <article key={item.organization} className="content-card glass-card stagger-item flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-1)]/15 text-[var(--accent-1)]">
              <Users size={18} />
            </div>
            <div className="min-w-0 text-left">
              <h3 className="card-title">{item.role}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{item.organization}</p>
              <p className="mt-2 text-xs font-medium text-[var(--accent-2)]">{item.period}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
