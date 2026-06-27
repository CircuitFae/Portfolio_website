import { Download, Mail, MapPin, Phone } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { portfolio } from '../../data/portfolio'

export function Contact() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section id="contact" ref={ref} className="section-padding scroll-margin">
      <header className="section-header">
        <span className="section-label">Contact</span>
        <h2 className="section-title gradient-text">Get In Touch</h2>
        <p className="section-subtitle">Open to internships, collaborations, and new opportunities</p>
      </header>

      <div className="content-card glass-card stagger-item mx-auto w-full max-w-2xl">
        <p className="content-body mb-6">
          Feel free to reach out if you would like to connect, collaborate, or discuss an opportunity.
        </p>

        <div className="contact-details">
          <a href={`mailto:${portfolio.email}`} className="contact-item">
            <Mail size={18} />
            <span>{portfolio.email}</span>
          </a>
          <a href={`tel:${portfolio.phone}`} className="contact-item">
            <Phone size={18} />
            <span>{portfolio.phone}</span>
          </a>
          <span className="contact-item">
            <MapPin size={18} />
            <span>NIT Warangal, India</span>
          </span>
        </div>

        <div className="content-divider" />

        <div className="hero-actions">
          <a href={`mailto:${portfolio.email}`} className="btn-primary">
            <Mail size={16} />
            Send Email
          </a>
          <a href={portfolio.resumePath} download className="btn-outline">
            <Download size={16} />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}
