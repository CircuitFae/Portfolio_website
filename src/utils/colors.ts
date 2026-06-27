export type ThemeMode = 'dark' | 'light'

export interface Palette {
  bgPrimary: string
  bgSecondary: string
  /** Background-only mesh / aurora colors — never used for UI text */
  bgMesh1: string
  bgMesh2: string
  bgMesh3: string
  bgMesh4: string
  bgMesh5: string
  bgMesh6: string
  accent1: string
  accent2: string
  accent3: string
  accent4: string
  textPrimary: string
  textMuted: string
  glassBg: string
  glow: string
}

export const palettes: Record<ThemeMode, Palette> = {
  dark: {
    bgPrimary: '#030014',
    bgSecondary: '#0a0520',
    bgMesh1: '#7c3aed',
    bgMesh2: '#ec4899',
    bgMesh3: '#06b6d4',
    bgMesh4: '#10b981',
    bgMesh5: '#f59e0b',
    bgMesh6: '#6366f1',
    accent1: '#818cf8',
    accent2: '#c084fc',
    accent3: '#fb7185',
    accent4: '#22d3ee',
    textPrimary: '#ffffff',
    textMuted: '#dae4f2',
    glassBg: 'rgba(6, 3, 24, 0.88)',
    glow: 'rgba(192, 132, 252, 0.45)',
  },
  light: {
    bgPrimary: '#fff7ed',
    bgSecondary: '#ffedd5',
    bgMesh1: '#fb923c',
    bgMesh2: '#fbbf24',
    bgMesh3: '#f97316',
    bgMesh4: '#fdba74',
    bgMesh5: '#ea580c',
    bgMesh6: '#f59e0b',
    accent1: '#c2410c',
    accent2: '#b45309',
    accent3: '#9a3412',
    accent4: '#0f766e',
    textPrimary: '#1c1410',
    textMuted: '#44352a',
    glassBg: 'rgba(255, 251, 245, 0.92)',
    glow: 'rgba(251, 146, 60, 0.32)',
  },
}

export const cssVarMap: Record<keyof Palette, string> = {
  bgPrimary: '--bg-primary',
  bgSecondary: '--bg-secondary',
  bgMesh1: '--bg-mesh-1',
  bgMesh2: '--bg-mesh-2',
  bgMesh3: '--bg-mesh-3',
  bgMesh4: '--bg-mesh-4',
  bgMesh5: '--bg-mesh-5',
  bgMesh6: '--bg-mesh-6',
  accent1: '--accent-1',
  accent2: '--accent-2',
  accent3: '--accent-3',
  accent4: '--accent-4',
  textPrimary: '--text-primary',
  textMuted: '--text-muted',
  glassBg: '--glass-bg',
  glow: '--glow',
}

export function applyPaletteToDOM(palette: Palette) {
  const root = document.documentElement
  for (const [key, cssVar] of Object.entries(cssVarMap)) {
    root.style.setProperty(cssVar, palette[key as keyof Palette])
  }
}

export function lerpHex(a: string, b: string, t: number): string {
  const parse = (hex: string) => {
    const h = hex.replace('#', '')
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ]
  }
  const [r1, g1, b1] = parse(a)
  const [r2, g2, b2] = parse(b)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const bl = Math.round(b1 + (b2 - b1) * t)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`
}

export function blendPalettes(from: Palette, to: Palette, t: number): Palette {
  const result = {} as Palette
  for (const key of Object.keys(from) as (keyof Palette)[]) {
    if (key === 'glassBg' || key === 'glow') {
      result[key] = t < 0.5 ? from[key] : to[key]
    } else if (key === 'textPrimary' || key === 'textMuted') {
      result[key] = t >= 0.5 ? to[key] : from[key]
    } else {
      result[key] = lerpHex(from[key], to[key], t)
    }
  }
  return result
}
