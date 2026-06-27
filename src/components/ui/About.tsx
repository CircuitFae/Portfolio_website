import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { portfolio } from '../../data/portfolio'

export function About() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section id="about" ref={ref} className="section-padding scroll-margin">
      <header className="section-header">
        <span className="section-label">About</span>
        <h2 className="section-title gradient-text">Who I Am</h2>
        <p className="section-subtitle">Background and interests</p>
      </header>

      <div className="content-card glass-card stagger-item">
        <p className="content-body">{portfolio.bio}</p>
        <div className="content-divider" />
        <div className="tag-row">
          {['NIT Warangal', 'Civil + CS', 'Full-Stack', 'AI/ML', 'GenAI'].map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
