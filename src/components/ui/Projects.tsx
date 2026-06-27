import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { portfolio } from '../../data/portfolio'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section id="projects" ref={ref} className="section-padding scroll-margin">
      <header className="section-header">
        <span className="section-label">Portfolio</span>
        <h2 className="section-title gradient-text">Featured Projects</h2>
        <p className="section-subtitle">Selected work across full-stack, systems, and AI</p>
      </header>

      <div className="card-grid">
        {portfolio.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
