import { useEffect, useRef } from 'react'
import { portfolio } from '../../data/portfolio'

export function PixelPortraitIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = portfolio.profileImage

    img.onload = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const pixelSize = 48
      const display = 320
      canvas.width = display
      canvas.height = display

      const off = document.createElement('canvas')
      off.width = pixelSize
      off.height = pixelSize
      const offCtx = off.getContext('2d')
      if (!offCtx) return

      offCtx.drawImage(img, 0, 0, pixelSize, pixelSize)

      ctx.imageSmoothingEnabled = false
      ctx.drawImage(off, 0, 0, pixelSize, pixelSize, 0, 0, display, display)

      const imageData = ctx.getImageData(0, 0, display, display)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.round(data[i] / 32) * 32
        data[i + 1] = Math.round(data[i + 1] / 32) * 32
        data[i + 2] = Math.round(data[i + 2] / 32) * 32
      }
      ctx.putImageData(imageData, 0, 0)
    }
  }, [])

  return (
    <div className="section-visual-inner section-visual-pixel">
      <canvas ref={canvasRef} className="pixel-portrait-canvas" />
      <div className="pixel-portrait-grid" aria-hidden="true" />
      <span className="section-visual-caption">8-bit you</span>
    </div>
  )
}

export function LaptopWorkerIllustration() {
  return (
    <div className="section-visual-inner">
      <svg viewBox="0 0 320 280" className="section-visual-svg" aria-hidden="true">
        <defs>
          <linearGradient id="screenGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#030014" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <ellipse cx="160" cy="248" rx="120" ry="18" fill="url(#deskGrad)" />
        <rect x="55" y="188" width="210" height="12" rx="4" fill="#6366f1" opacity="0.35" />
        <rect x="95" y="145" width="130" height="78" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
        <rect x="103" y="153" width="114" height="58" rx="3" fill="url(#screenGlow)" opacity="0.85" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="112" y={162 + i * 12} width={70 - i * 8} height="5" rx="2" fill="#030014" opacity="0.45" />
        ))}
        <path
          d="M88 223 L232 223 L248 238 L72 238 Z"
          fill="#312e81"
          stroke="#818cf8"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <circle cx="160" cy="78" r="28" fill="#fda4af" opacity="0.85" />
        <path
          d="M132 62 C128 42 152 34 168 40 C182 46 188 58 184 72 C178 68 168 66 160 68 C150 70 138 68 132 62 Z"
          fill="#c084fc"
          opacity="0.9"
        />
        <rect x="148" y="102" width="24" height="36" rx="8" fill="#818cf8" opacity="0.75" />
        <path d="M136 118 Q120 130 118 148 L128 150 Q130 134 142 124 Z" fill="#fda4af" opacity="0.8" />
        <path d="M184 118 Q200 128 204 142 L194 146 Q192 132 180 124 Z" fill="#fda4af" opacity="0.8" />
        <rect x="194" y="132" width="18" height="10" rx="3" fill="#22d3ee" opacity="0.7" />
        <circle cx="248" cy="176" r="10" fill="#f59e0b" opacity="0.55" />
        <path d="M248 166 L248 160 M243 161 L248 155 L253 161" stroke="#fcd34d" strokeWidth="2" opacity="0.6" />
      </svg>
      <span className="section-visual-caption">Building & shipping</span>
    </div>
  )
}

export function LeadershipLiteraryIllustration() {
  return (
    <div className="section-visual-inner section-visual-duo">
      <svg viewBox="0 0 340 280" className="section-visual-svg" aria-hidden="true">
        <defs>
          <linearGradient id="bookGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {/* Leadership — podium & mic */}
        <rect x="28" y="168" width="120" height="58" rx="4" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" opacity="0.75" />
        <rect x="38" y="152" width="100" height="18" rx="3" fill="#6366f1" opacity="0.55" />
        <rect x="78" y="118" width="20" height="38" rx="3" fill="#94a3b8" opacity="0.7" />
        <ellipse cx="88" cy="112" rx="14" ry="10" fill="#cbd5e1" opacity="0.8" />
        <path d="M48 90 L128 90 L118 118 L58 118 Z" fill="#c084fc" opacity="0.5" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={52 + i * 28} cy="78" r="8" fill="#67e8f9" opacity={0.45 + i * 0.1} />
        ))}
        <path d="M20 200 L40 188 M20 210 L44 204" stroke="#22d3ee" strokeWidth="2" opacity="0.45" />
        {/* Literary — book & quill */}
        <path d="M200 190 C200 160 240 148 268 168 C268 148 308 138 308 168 L308 220 C280 200 240 210 200 220 Z" fill="url(#bookGrad)" opacity="0.75" />
        <path d="M254 168 L254 218" stroke="#030014" strokeWidth="2" opacity="0.35" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="218" y1={178 + i * 10} x2="292" y2={178 + i * 10} stroke="#030014" strokeWidth="1.5" opacity="0.25" />
        ))}
        <path
          d="M290 148 L318 132 L312 158 L298 172 Z"
          fill="#f8fafc"
          opacity="0.55"
          stroke="#c084fc"
          strokeWidth="1"
        />
        <path d="M318 132 Q330 120 322 108" stroke="#fcd34d" strokeWidth="2" fill="none" opacity="0.65" />
        <text x="228" y="108" fill="#fda4af" fontSize="22" opacity="0.55" fontFamily="serif">
          अ
        </text>
        <path
          d="M178 118 Q195 100 215 108 Q205 125 188 128 Z"
          fill="none"
          stroke="#67e8f9"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <text x="182" y="122" fill="#67e8f9" fontSize="10" opacity="0.6" fontFamily="serif">
          &ldquo; ... &rdquo;
        </text>
      </svg>
      <span className="section-visual-caption">Lead · Debate · Literary arts</span>
    </div>
  )
}

export function ProjectsIllustration() {
  return (
    <div className="section-visual-inner">
      <svg viewBox="0 0 300 260" className="section-visual-svg" aria-hidden="true">
        <rect x="40" y="40" width="220" height="150" rx="10" fill="#1e1b4b" stroke="#22d3ee" strokeWidth="1.5" opacity="0.65" />
        <polyline points="60,160 100,110 140,130 180,80 240,100" fill="none" stroke="#10b981" strokeWidth="2.5" opacity="0.7" />
        {[60, 100, 140, 180, 240].map((x, i) => (
          <circle key={i} cx={x} cy={[160, 110, 130, 80, 100][i]} r="5" fill="#ec4899" opacity="0.75" />
        ))}
        <rect x="70" y="210" width="60" height="24" rx="4" fill="#6366f1" opacity="0.45" />
        <rect x="140" y="210" width="90" height="24" rx="4" fill="#7c3aed" opacity="0.45" />
      </svg>
      <span className="section-visual-caption">Projects & systems</span>
    </div>
  )
}

export function EducationIllustration() {
  return (
    <div className="section-visual-inner">
      <svg viewBox="0 0 300 260" className="section-visual-svg" aria-hidden="true">
        <polygon points="150,40 260,90 150,140 40,90" fill="#6366f1" opacity="0.45" stroke="#818cf8" strokeWidth="1.5" />
        <rect x="130" y="140" width="40" height="18" fill="#818cf8" opacity="0.5" />
        <rect x="50" y="170" width="45" height="60" rx="3" fill="#ec4899" opacity="0.4" />
        <rect x="105" y="178" width="45" height="52" rx="3" fill="#06b6d4" opacity="0.4" />
        <rect x="160" y="174" width="45" height="56" rx="3" fill="#10b981" opacity="0.4" />
        <rect x="215" y="180" width="45" height="50" rx="3" fill="#f59e0b" opacity="0.4" />
      </svg>
      <span className="section-visual-caption">Learning journey</span>
    </div>
  )
}

export function ContactIllustration() {
  return (
    <div className="section-visual-inner">
      <svg viewBox="0 0 280 240" className="section-visual-svg" aria-hidden="true">
        <rect x="50" y="70" width="180" height="110" rx="12" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" opacity="0.65" />
        <path d="M50 82 L140 145 L230 82" fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0.55" />
        <circle cx="200" cy="60" r="22" fill="#10b981" opacity="0.45" />
        <path d="M192 60 L198 66 L212 52" stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.7" />
      </svg>
      <span className="section-visual-caption">Say hello</span>
    </div>
  )
}

export function HeroIllustration() {
  return (
    <div className="section-visual-inner">
      <svg viewBox="0 0 280 280" className="section-visual-svg" aria-hidden="true">
        <circle cx="140" cy="140" r="90" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.35" strokeDasharray="8 6" />
        <circle cx="140" cy="140" r="60" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
        <circle cx="140" cy="140" r="24" fill="#c084fc" opacity="0.35" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2
          return (
            <circle
              key={i}
              cx={140 + Math.cos(a) * 90}
              cy={140 + Math.sin(a) * 90}
              r="6"
              fill="#ec4899"
              opacity="0.5"
            />
          )
        })}
      </svg>
    </div>
  )
}
