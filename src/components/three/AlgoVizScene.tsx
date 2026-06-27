import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import * as THREE from 'three'
import { useThemeColors } from '../../hooks/useThemeColors'

interface FloaterProps {
  position: [number, number, number]
  scrollOffset?: number
  speed?: number
  children: React.ReactNode
}

function Floater({ position, scrollOffset = 0, speed = 1.5, children }: FloaterProps) {
  const ref = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!ref.current) return
    const max = document.documentElement.scrollHeight - window.innerHeight
    const p = max > 0 ? window.scrollY / max : 0
    ref.current.position.y = position[1] + Math.sin(p * Math.PI * 2 + scrollOffset) * 0.35 - p * 0.6
    ref.current.rotation.y = p * Math.PI * 0.12 + scrollOffset * 0.5
  })

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={ref} position={position}>
        {children}
      </group>
    </Float>
  )
}

function SortingBars3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const barRefs = useRef<THREE.Mesh[]>([])
  const colors = useThemeColors()
  const count = 10
  const state = useRef({ i: 0, j: 0, frame: 0, values: Array.from({ length: count }, () => 0.2 + Math.random() * 0.8) })

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.15

    const s = state.current
    s.frame++
    if (s.frame % 5 === 0 && s.i < count) {
      if (s.j < count - s.i - 1) {
        if (s.values[s.j] > s.values[s.j + 1]) {
          ;[s.values[s.j], s.values[s.j + 1]] = [s.values[s.j + 1], s.values[s.j]]
        }
        s.j++
      } else {
        s.j = 0
        s.i++
      }
    } else if (s.i >= count && s.frame % 140 === 0) {
      s.values = Array.from({ length: count }, () => 0.2 + Math.random() * 0.8)
      s.i = 0
      s.j = 0
    }

    barRefs.current.forEach((bar, idx) => {
      if (!bar) return
      const h = s.values[idx] * 0.9 + 0.08
      bar.scale.y = h
      bar.position.y = h / 2 - 0.45
      const mat = bar.material as THREE.MeshStandardMaterial
      const active = idx === s.j || idx === s.j + 1
      const sorted = idx >= count - s.i
      mat.color.copy(sorted ? colors.mesh4 : active ? colors.mesh2 : colors.mesh3)
      mat.emissive.copy(sorted ? colors.mesh4 : active ? colors.mesh2 : colors.mesh3)
      mat.emissiveIntensity = active ? 0.55 : sorted ? 0.35 : 0.2
    })
  })

  return (
    <group ref={groupRef} scale={1.2}>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[1.35, 0.02]} />
        <meshBasicMaterial color="#030014" transparent opacity={0.7} />
      </mesh>
      {Array.from({ length: count }).map((_, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            if (el) barRefs.current[idx] = el
          }}
          position={[-0.55 + idx * 0.12, 0, 0]}
        >
          <boxGeometry args={[0.08, 1, 0.08]} />
          <meshStandardMaterial color={colors.mesh3} emissive={colors.mesh3} emissiveIntensity={0.2} metalness={0.4} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function GraphNetwork3D() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()
  const pulseRef = useRef<THREE.Mesh>(null!)

  const nodes = useMemo(
    () =>
      [
        [0, 0.35, 0],
        [-0.45, 0.1, 0.1],
        [0.45, 0.1, -0.05],
        [-0.35, -0.25, 0.08],
        [0.35, -0.25, 0.05],
        [0, -0.05, 0.12],
        [-0.15, 0.28, -0.1],
        [0.2, 0.22, 0.08],
      ] as [number, number, number][],
    []
  )

  const edges = useMemo(() => {
    const pairs: [number, number][] = [
      [0, 1], [0, 2], [0, 5], [0, 6], [0, 7],
      [1, 3], [1, 5], [1, 6],
      [2, 4], [2, 5], [2, 7],
      [3, 5], [4, 5], [6, 7],
    ]
    return pairs.map(([a, b]) => [
      new THREE.Vector3(...nodes[a]),
      new THREE.Vector3(...nodes[b]),
    ])
  }, [nodes])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.18
    if (pulseRef.current) {
      const edgeIdx = Math.floor(clock.elapsedTime * 0.5) % edges.length
      const [a, b] = edges[edgeIdx]
      const t = (Math.sin(clock.elapsedTime * 3) + 1) * 0.5
      pulseRef.current.position.lerpVectors(a, b, t)
    }
  })

  return (
    <group ref={ref}>
      {edges.map((seg, i) => (
        <Line key={i} points={seg} color={colors.mesh6} transparent opacity={0.4} />
      ))}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i === 0 ? 0.07 : 0.045, 10, 10]} />
          <meshStandardMaterial
            color={i === 0 ? colors.mesh2 : colors.mesh3}
            emissive={colors.mesh1}
            emissiveIntensity={0.45}
          />
        </mesh>
      ))}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color={colors.mesh5} transparent opacity={0.95} />
      </mesh>
    </group>
  )
}

function CodeSnippetBoard() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const colors = useThemeColors()

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 320
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'rgba(3, 0, 20, 0.92)'
    ctx.fillRect(0, 0, 512, 320)

    ctx.fillStyle = 'rgba(255,255,255,0.12)'
    ctx.fillRect(0, 0, 512, 28)
    ;['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => {
      ctx.fillStyle = c
      ctx.beginPath()
      ctx.arc(16 + i * 18, 14, 5, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.font = '12px monospace'
    ctx.fillText('merge_sort.py', 70, 18)

    const lines: [string, string][] = [
      ['kw', 'def merge(left, right):'],
      ['txt', '    out = []'],
      ['txt', '    i = j = 0'],
      ['kw', '    while i < len(left) and j < len(right):'],
      ['txt', '        if left[i] <= right[j]:'],
      ['txt', '            out.append(left[i]); i += 1'],
      ['txt', '        else:'],
      ['txt', '            out.append(right[j]); j += 1'],
    ]
    const palette: Record<string, string> = {
      kw: '#c084fc',
      fn: '#67e8f9',
      txt: '#e2e8f0',
      cm: '#64748b',
    }

    lines.forEach(([type, text], li) => {
      ctx.fillStyle = '#475569'
      ctx.font = '11px monospace'
      ctx.fillText(String(li + 1).padStart(2, ' '), 12, 52 + li * 28)
      ctx.fillStyle = palette[type]
      ctx.font = '13px monospace'
      ctx.fillText(text, 36, 52 + li * 28)
    })

    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.12
  })

  return (
    <group scale={0.85}>
      <mesh ref={meshRef}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshBasicMaterial map={texture} transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.14, 0.74]} />
        <meshBasicMaterial color={colors.mesh1} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

function ComplexityChart() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.2) * 0.05
  })

  const curves = [
    { fn: (x: number) => x * x * 0.35, color: colors.mesh2 },
    { fn: (x: number) => x * 0.55 + 0.05, color: colors.mesh3 },
    { fn: (x: number) => Math.log(x * 9 + 1) * 0.25 + 0.05, color: colors.mesh4 },
  ]

  return (
    <group ref={ref} scale={1.1}>
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[1.2, 0.02, 0.02]} />
        <meshBasicMaterial color={colors.mesh6} transparent opacity={0.5} />
      </mesh>
      <mesh position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.7, 0.02, 0.02]} />
        <meshBasicMaterial color={colors.mesh6} transparent opacity={0.5} />
      </mesh>
      {curves.map((curve, ci) => {
        const pts = Array.from({ length: 24 }, (_, i) => {
          const x = i / 23
          return new THREE.Vector3(-0.5 + x, curve.fn(x) - 0.35, 0.02 + ci * 0.01)
        })
        return <Line key={ci} points={pts} color={curve.color} lineWidth={1.5} transparent opacity={0.75} />
      })}
    </group>
  )
}

const VIZ_LINE = 0.62
const VIZ_WIRE = 0.55
const VIZ_SOLID = 0.58
const VIZ_EMISSIVE = 0.42

function BellCurve3D() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  const curve = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        const x = (i / 47) * 2.4 - 1.2
        const y = Math.exp(-x * x * 1.8) * 0.52 - 0.12
        return new THREE.Vector3(x * 0.48, y, 0)
      }),
    []
  )

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.22) * 0.12
  })

  return (
    <group ref={ref} scale={1.2}>
      <mesh position={[0, -0.12, -0.02]}>
        <planeGeometry args={[1.3, 0.75]} />
        <meshBasicMaterial color="#030014" transparent opacity={0.55} />
      </mesh>
      <Line
        points={[new THREE.Vector3(-0.62, -0.12, 0), new THREE.Vector3(0.62, -0.12, 0)]}
        color={colors.mesh6}
        transparent
        opacity={VIZ_WIRE}
      />
      <Line
        points={[new THREE.Vector3(-0.62, -0.12, 0), new THREE.Vector3(-0.62, 0.48, 0)]}
        color={colors.mesh6}
        transparent
        opacity={VIZ_WIRE}
      />
      <Line points={curve} color={colors.mesh2} lineWidth={2} transparent opacity={VIZ_LINE} />
      {[-0.5, 0, 0.5].map((x, i) => (
        <mesh key={i} position={[x * 0.48, -0.08, 0.01]}>
          <boxGeometry args={[0.015, 0.08, 0.015]} />
          <meshBasicMaterial color={colors.mesh5} transparent opacity={VIZ_SOLID} />
        </mesh>
      ))}
      <mesh position={[0, 0.42, 0.02]}>
        <planeGeometry args={[0.55, 0.12]} />
        <meshBasicMaterial color={colors.mesh1} transparent opacity={0.35} wireframe />
      </mesh>
    </group>
  )
}

function ScatterRegression3D() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  const scatter = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        x: -0.48 + (i % 4) * 0.28 + (Math.sin(i * 2.1) * 0.06),
        y: -0.22 + (i / 15) * 0.62 + (Math.cos(i * 1.7) * 0.08),
      })),
    []
  )

  const regression = useMemo(() => {
    const n = scatter.length
    const sx = scatter.reduce((s, p) => s + p.x, 0)
    const sy = scatter.reduce((s, p) => s + p.y, 0)
    const sxy = scatter.reduce((s, p) => s + p.x * p.y, 0)
    const sx2 = scatter.reduce((s, p) => s + p.x * p.x, 0)
    const slope = (n * sxy - sx * sy) / (n * sx2 - sx * sx)
    const intercept = (sy - slope * sx) / n
    return [
      new THREE.Vector3(-0.55, slope * -0.55 + intercept, 0.02),
      new THREE.Vector3(0.55, slope * 0.55 + intercept, 0.02),
    ]
  }, [scatter])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.18) * 0.04
  })

  return (
    <group ref={ref} scale={1.15}>
      <mesh position={[0, 0.1, -0.02]}>
        <planeGeometry args={[1.25, 0.85]} />
        <meshBasicMaterial color="#030014" transparent opacity={0.52} />
      </mesh>
      <Line points={regression} color={colors.mesh4} lineWidth={2} transparent opacity={VIZ_LINE} />
      {scatter.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, 0.01]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial
            color={colors.mesh3}
            emissive={colors.mesh3}
            emissiveIntensity={VIZ_EMISSIVE}
            transparent
            opacity={VIZ_SOLID}
          />
        </mesh>
      ))}
    </group>
  )
}

function StatsHistogram3D() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()
  const bins = useMemo(() => [0.35, 0.55, 0.82, 0.65, 0.48, 0.72, 0.42, 0.58], [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.1
  })

  return (
    <group ref={ref} scale={1.1}>
      <mesh position={[0, -0.28, -0.02]}>
        <boxGeometry args={[1.15, 0.02, 0.08]} />
        <meshBasicMaterial color={colors.mesh6} transparent opacity={VIZ_WIRE} />
      </mesh>
      {bins.map((h, i) => (
        <mesh key={i} position={[-0.42 + i * 0.12, -0.28 + h * 0.35, 0]}>
          <boxGeometry args={[0.08, h * 0.7, 0.08]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? colors.mesh1 : colors.mesh5}
            emissive={i % 2 === 0 ? colors.mesh1 : colors.mesh5}
            emissiveIntensity={VIZ_EMISSIVE}
            transparent
            opacity={VIZ_SOLID}
            metalness={0.35}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

function MathFormulaBoard() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const colors = useThemeColors()

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 320
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'rgba(3, 0, 20, 0.88)'
    ctx.fillRect(0, 0, 512, 320)

    ctx.fillStyle = 'rgba(255,255,255,0.12)'
    ctx.fillRect(0, 0, 512, 28)
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.font = '12px monospace'
    ctx.fillText('statistics · mathematics', 16, 18)

    const lines = [
      { text: 'μ = (Σ xᵢ) / n', color: '#c084fc', size: 22, y: 58 },
      { text: 'σ² = Σ(xᵢ − μ)² / n', color: '#67e8f9', size: 18, y: 98 },
      { text: 'P(x) = (1/σ√2π) e^(−(x−μ)²/2σ²)', color: '#fda4af', size: 15, y: 138 },
      { text: '∫₀^∞ e^(−x²) dx = √π / 2', color: '#86efac', size: 17, y: 178 },
      { text: 'r = Σ(x−x̄)(y−ȳ) / √Σ(x−x̄)²Σ(y−ȳ)²', color: '#fcd34d', size: 13, y: 218 },
      { text: 'lim   (1 + 1/n)ⁿ = e', color: '#a5b4fc', size: 16, y: 258 },
    ]

    lines.forEach(({ text, color, size, y }) => {
      ctx.fillStyle = color
      ctx.font = `${size}px "Times New Roman", serif`
      ctx.fillText(text, 24, y)
    })

    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.28) * 0.1
  })

  return (
    <group scale={0.9}>
      <mesh ref={meshRef}>
        <planeGeometry args={[1.15, 0.72]} />
        <meshBasicMaterial map={texture} transparent opacity={0.72} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.19, 0.76]} />
        <meshBasicMaterial color={colors.mesh2} wireframe transparent opacity={0.48} />
      </mesh>
    </group>
  )
}

function SineWaveGrid3D() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  const wave = useMemo(
    () =>
      Array.from({ length: 64 }, (_, i) => {
        const x = (i / 63) * 1.3 - 0.65
        const y = Math.sin(x * 9) * 0.18 + Math.cos(x * 4) * 0.06
        return new THREE.Vector3(x, y, 0.02)
      }),
    []
  )

  const gridLines = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 0; i <= 6; i++) {
      const y = -0.28 + i * 0.11
      lines.push([new THREE.Vector3(-0.65, y, 0), new THREE.Vector3(0.65, y, 0)])
    }
    for (let i = 0; i <= 10; i++) {
      const x = -0.65 + i * 0.13
      lines.push([new THREE.Vector3(x, -0.28, 0), new THREE.Vector3(x, 0.38, 0)])
    }
    return lines
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.08 - 0.12
    ref.current.rotation.y = clock.elapsedTime * 0.12
  })

  return (
    <group ref={ref} scale={1.05}>
      {gridLines.map((seg, i) => (
        <Line key={i} points={seg} color={colors.mesh6} transparent opacity={0.28} />
      ))}
      <Line points={wave} color={colors.mesh3} lineWidth={2} transparent opacity={VIZ_LINE} />
      <Line
        points={wave.map((p) => new THREE.Vector3(p.x, -0.28, p.z))}
        color={colors.mesh6}
        transparent
        opacity={0.35}
      />
    </group>
  )
}

function PiSigmaSymbols3D() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.15
  })

  return (
    <group ref={ref} scale={1.1}>
      {/* Sigma Σ — stylized with boxes/lines */}
      <group position={[-0.35, 0, 0]}>
        <Line
          points={[new THREE.Vector3(-0.2, 0.35, 0), new THREE.Vector3(0.2, 0.35, 0)]}
          color={colors.mesh2}
          lineWidth={2}
          transparent
          opacity={VIZ_LINE}
        />
        <Line
          points={[new THREE.Vector3(-0.2, 0.35, 0), new THREE.Vector3(-0.05, -0.35, 0)]}
          color={colors.mesh2}
          lineWidth={2}
          transparent
          opacity={VIZ_LINE}
        />
        <Line
          points={[new THREE.Vector3(0.2, 0.35, 0), new THREE.Vector3(0.05, -0.35, 0)]}
          color={colors.mesh2}
          lineWidth={2}
          transparent
          opacity={VIZ_LINE}
        />
        <Line
          points={[new THREE.Vector3(-0.2, -0.35, 0), new THREE.Vector3(0.2, -0.35, 0)]}
          color={colors.mesh2}
          lineWidth={2}
          transparent
          opacity={VIZ_LINE}
        />
      </group>
      {/* Pi π */}
      <group position={[0.35, 0, 0]}>
        <Line
          points={[new THREE.Vector3(-0.18, 0.32, 0), new THREE.Vector3(0.18, 0.32, 0)]}
          color={colors.mesh4}
          lineWidth={2}
          transparent
          opacity={VIZ_LINE}
        />
        <Line
          points={[new THREE.Vector3(-0.12, 0.32, 0), new THREE.Vector3(-0.12, -0.32, 0)]}
          color={colors.mesh4}
          lineWidth={2}
          transparent
          opacity={VIZ_LINE}
        />
        <Line
          points={[new THREE.Vector3(0.12, 0.32, 0), new THREE.Vector3(0.12, -0.32, 0)]}
          color={colors.mesh4}
          lineWidth={2}
          transparent
          opacity={VIZ_LINE}
        />
      </group>
      <mesh position={[0, 0, -0.05]}>
        <torusGeometry args={[0.55, 0.012, 8, 48]} />
        <meshBasicMaterial color={colors.mesh1} transparent opacity={0.38} wireframe />
      </mesh>
    </group>
  )
}

const ALGO_ITEMS = [
  { id: 'sort3d', position: [-7, 2, -4.5] as [number, number, number], offset: 0.5, speed: 1.3, Component: SortingBars3D },
  { id: 'graph3d', position: [7.5, -1, -4] as [number, number, number], offset: 2.1, speed: 1.5, Component: GraphNetwork3D },
  { id: 'code3d', position: [-2, -4, -3.5] as [number, number, number], offset: 3.4, speed: 1.2, Component: CodeSnippetBoard },
  { id: 'complexity', position: [4.5, 4, -5] as [number, number, number], offset: 4.6, speed: 1.4, Component: ComplexityChart },
  { id: 'bell', position: [-8, -1.5, -3.8] as [number, number, number], offset: 1.1, speed: 1.25, Component: BellCurve3D },
  { id: 'scatter', position: [8.2, 2.8, -4.2] as [number, number, number], offset: 2.8, speed: 1.35, Component: ScatterRegression3D },
  { id: 'histogram', position: [-3.5, 4.2, -4.8] as [number, number, number], offset: 4.1, speed: 1.2, Component: StatsHistogram3D },
  { id: 'mathboard', position: [2.8, -3.2, -3.6] as [number, number, number], offset: 5.2, speed: 1.15, Component: MathFormulaBoard },
  { id: 'sinewave', position: [6.2, -3.8, -4] as [number, number, number], offset: 5.9, speed: 1.3, Component: SineWaveGrid3D },
  { id: 'pisigma', position: [-6.2, 3.2, -4.5] as [number, number, number], offset: 6.4, speed: 1.4, Component: PiSigmaSymbols3D },
]

const LITE_ALGO = ['sort3d', 'graph3d', 'bell', 'scatter', 'histogram']

interface AlgoVizSceneProps {
  lite?: boolean
}

export function AlgoVizScene({ lite = false }: AlgoVizSceneProps) {
  const items = lite ? ALGO_ITEMS.filter((t) => LITE_ALGO.includes(t.id)) : ALGO_ITEMS

  return (
    <>
      {items.map(({ id, position, offset, speed, Component }) => (
        <Floater key={id} position={position} scrollOffset={offset} speed={speed}>
          <Component />
        </Floater>
      ))}
    </>
  )
}

export default AlgoVizScene
