import { GraduationCap } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { portfolio } from '../../data/portfolio'

export function Education() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section id="education" ref={ref} className="section-padding scroll-margin">
      <header className="section-header">
        <span className="section-label">Education</span>
        <h2 className="section-title gradient-text">Academic Background</h2>
        <p className="section-subtitle">Schools and degrees</p>
      </header>

      <div className="timeline">
        {portfolio.education.map((edu) => (
          <article key={edu.institution} className="content-card glass-card stagger-item flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-2)]/15 text-[var(--accent-2)]">
              <GraduationCap size={22} />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <h3 className="card-title">{edu.institution}</h3>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-[var(--text-muted)]">{edu.degree}</p>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                <span className="font-medium text-[var(--accent-1)]">{edu.period}</span>
                <span className="text-[var(--text-muted)]">{edu.detail}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
