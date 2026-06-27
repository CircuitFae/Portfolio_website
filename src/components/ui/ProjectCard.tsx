import { useRef, type MouseEvent } from 'react'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './SocialIcons'
import type { Project } from '../../data/portfolio'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current || window.matchMedia('(hover: none)').matches) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'none'
  }

  return (
    <article
      ref={cardRef}
      className="stagger-item content-card glass-card h-full transition-transform duration-200"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tag-row mb-4">
        {project.tech.map((t) => (
          <span key={t} className="tag-pill">
            {t}
          </span>
        ))}
      </div>

      <h3 className="card-title mb-3 text-xl">{project.title}</h3>

      <ul className="content-list mb-5">
        {project.description.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-1)] transition-colors hover:text-[var(--accent-2)]"
      >
        <GitHubIcon className="h-4 w-4" />
        View on GitHub
        <ExternalLink size={14} />
      </a>
    </article>
  )
}
