import { Briefcase } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { portfolio } from '../../data/portfolio'

export function Experience() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section id="experience" ref={ref} className="section-padding scroll-margin">
      <header className="section-header">
        <span className="section-label">Experience</span>
        <h2 className="section-title gradient-text">Work History</h2>
        <p className="section-subtitle">Where I have worked and what I have built</p>
      </header>

      <div className="timeline">
        {portfolio.experience.map((exp) => (
          <article key={exp.company} className="timeline-item content-card glass-card stagger-item">
            <div className="timeline-icon">
              <Briefcase size={14} />
            </div>
            <div className="timeline-header">
              <div>
                <h3 className="card-title">{exp.role}</h3>
                <p className="card-subtitle">{exp.company}</p>
              </div>
              <div className="timeline-meta">
                <span>{exp.period}</span>
                <span>{exp.location}</span>
              </div>
            </div>
            <ul className="content-list">
              {exp.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
