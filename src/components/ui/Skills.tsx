import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { portfolio } from '../../data/portfolio'

export function Skills() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section id="skills" ref={ref} className="section-padding scroll-margin">
      <header className="section-header">
        <span className="section-label">Expertise</span>
        <h2 className="section-title gradient-text">Skills & Tools</h2>
        <p className="section-subtitle">Technologies and areas I work with</p>
      </header>

      <div className="card-grid card-grid-3">
        {portfolio.skills.map((cat) => (
          <div key={cat.category} className="stagger-item content-card glass-card">
            <h3 className="card-title mb-4 text-[var(--accent-2)]">{cat.category}</h3>
            <div className="tag-row">
              {cat.items.map((item) => (
                <span key={item} className="tag-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
