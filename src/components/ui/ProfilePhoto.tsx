import { motion } from 'framer-motion'
import { portfolio } from '../../data/portfolio'

export function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className="profile-frame"
    >
      <div className="profile-photo-shell">
        <div className="profile-frame-ring" aria-hidden="true" />
        <div className="profile-frame-inner">
          <img
            src={portfolio.profileImage}
            alt={portfolio.name}
            className="profile-photo"
            loading="eager"
          />
        </div>
      </div>
    </motion.div>
  )
}
