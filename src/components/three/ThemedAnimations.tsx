import { useMemo, useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import * as THREE from 'three'
import { useThemeColors } from '../../hooks/useThemeColors'

interface FloaterProps {
  position: [number, number, number]
  scrollOffset?: number
  speed?: number
  children: ReactNode
}

function Floater({ position, scrollOffset = 0, speed = 1.5, children }: FloaterProps) {
  const ref = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!ref.current) return
    const max = document.documentElement.scrollHeight - window.innerHeight
    const p = max > 0 ? window.scrollY / max : 0
    ref.current.position.y = position[1] + Math.sin(p * Math.PI * 2 + scrollOffset) * 0.4 - p * 0.8
    ref.current.rotation.y = p * Math.PI * 0.15 + scrollOffset
  })

  return (
    <Float speed={speed} rotationIntensity={0.35} floatIntensity={1.2}>
      <group ref={ref} position={position}>
        {children}
      </group>
    </Float>
  )
}

function BookStack() {
  const groupRef = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.15
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = Math.sin(clock.elapsedTime * 0.6 + i) * 0.03
    })
  })

  const bookColors = [colors.accent1, colors.accent2, colors.accent4, colors.accent3]

  return (
    <group ref={groupRef} scale={1.1}>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[0, i * 0.11, i * 0.02]} rotation={[0, i * 0.18, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.09, 0.38]} />
            <meshStandardMaterial
              color={bookColors[i]}
              emissive={bookColors[i]}
              emissiveIntensity={0.25}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[0.52, 0.07, 0.02]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
          </mesh>
        </group>
      ))}
      {/* Open book on top */}
      <group position={[0.35, 0.52, 0.1]} rotation={[0.4, -0.5, 0.15]}>
        <mesh rotation={[0, 0, 0.25]}>
          <boxGeometry args={[0.28, 0.02, 0.22]} />
          <meshStandardMaterial color={colors.accent4} emissive={colors.accent4} emissiveIntensity={0.2} />
        </mesh>
        <mesh rotation={[0, 0, -0.25]} position={[0.02, 0, 0]}>
          <boxGeometry args={[0.28, 0.02, 0.22]} />
          <meshStandardMaterial color={colors.accent2} emissive={colors.accent2} emissiveIntensity={0.2} />
        </mesh>
      </group>
    </group>
  )
}

function CodingTerminal() {
  const screenRef = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  useFrame(({ clock }) => {
    if (!screenRef.current) return
    screenRef.current.children.forEach((line, i) => {
      line.position.x = Math.sin(clock.elapsedTime * 1.2 + i * 0.8) * 0.04
    })
  })

  return (
    <group scale={1.15}>
      {/* Monitor frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.75, 0.5, 0.06]} />
        <meshStandardMaterial color={colors.accent1} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[0.65, 0.4]} />
        <meshBasicMaterial color="#030014" transparent opacity={0.85} />
      </mesh>
      {/* Animated code lines */}
      <group ref={screenRef} position={[0, 0, 0.05]}>
        {[0.12, 0.04, -0.04, -0.12].map((y, i) => (
          <mesh key={i} position={[-0.08 + i * 0.02, y, 0]}>
            <boxGeometry args={[0.35 - i * 0.06, 0.025, 0.01]} />
            <meshBasicMaterial color={i % 2 === 0 ? colors.accent4 : colors.accent2} transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
      {/* Brackets { } */}
      <mesh position={[-0.42, 0, 0.08]}>
        <torusGeometry args={[0.12, 0.015, 8, 16, Math.PI]} />
        <meshBasicMaterial color={colors.accent4} wireframe />
      </mesh>
      <mesh position={[0.42, 0, 0.08]} rotation={[0, Math.PI, 0]}>
        <torusGeometry args={[0.12, 0.015, 8, 16, Math.PI]} />
        <meshBasicMaterial color={colors.accent4} wireframe />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.32, 0]}>
        <boxGeometry args={[0.15, 0.08, 0.08]} />
        <meshBasicMaterial color={colors.accent2} wireframe transparent opacity={0.4} />
      </mesh>
      {/* Floating binary particles */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 1.2) * 0.55,
            Math.sin(i * 0.9) * 0.45 + 0.2,
            0.15 + i * 0.02,
          ]}
        >
          <boxGeometry args={[0.04, 0.04, 0.04]} />
          <meshBasicMaterial color={colors.accent3} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

function BridgeTruss() {
  const bridgeRef = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  const segments = useMemo(() => {
    const w = 1.4
    const h = 0.35
    const n = 4
    const segs: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 0; i < n; i++) {
      const x1 = -w / 2 + (w / n) * i
      const x2 = -w / 2 + (w / n) * (i + 1)
      segs.push([new THREE.Vector3(x1, 0, 0), new THREE.Vector3(x2, 0, 0)])
      segs.push([new THREE.Vector3(x1, 0, 0), new THREE.Vector3(x2, h, 0)])
      segs.push([new THREE.Vector3(x1, h, 0), new THREE.Vector3(x2, 0, 0)])
    }
    segs.push([new THREE.Vector3(-w / 2, 0, 0), new THREE.Vector3(-w / 2, h, 0)])
    segs.push([new THREE.Vector3(w / 2, 0, 0), new THREE.Vector3(w / 2, h, 0)])
    segs.push([new THREE.Vector3(-w / 2, h, 0), new THREE.Vector3(w / 2, h, 0)])
    return segs
  }, [])

  useFrame(({ clock }) => {
    if (!bridgeRef.current) return
    bridgeRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.25) * 0.02
  })

  return (
    <group ref={bridgeRef} scale={1.4} rotation={[0.15, 0.4, 0]}>
      {/* Deck */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[1.5, 0.04, 0.25]} />
        <meshStandardMaterial
          color={colors.accent4}
          emissive={colors.accent4}
          emissiveIntensity={0.15}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Truss wireframe */}
      {segments.map((seg, i) => (
        <Line key={i} points={seg} color={colors.accent1} transparent opacity={0.75} />
      ))}
      {/* Pillars */}
      {[-0.5, 0, 0.5].map((x) => (
        <mesh key={x} position={[x, -0.2, 0]}>
          <cylinderGeometry args={[0.025, 0.035, 0.35, 8]} />
          <meshBasicMaterial color={colors.accent2} wireframe transparent opacity={0.5} />
        </mesh>
      ))}
      {/* Cable arc hint */}
      <Line
        points={[
          new THREE.Vector3(-0.75, 0.35, 0),
          new THREE.Vector3(0, 0.55, 0),
          new THREE.Vector3(0.75, 0.35, 0),
        ]}
        color={colors.accent3}
        transparent
        opacity={0.5}
      />
    </group>
  )
}

function NeuralNetwork() {
  const netRef = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  const nodes = useMemo(
    () =>
      [
        [0, 0, 0],
        [-0.35, 0.25, 0.1],
        [0.35, 0.25, -0.05],
        [-0.3, -0.25, 0.05],
        [0.3, -0.25, 0.08],
        [0, 0.4, 0],
      ] as [number, number, number][],
    []
  )

  const edges = useMemo(() => {
    const segs: [THREE.Vector3, THREE.Vector3][] = []
    const center = nodes[0]
    for (let i = 1; i < nodes.length; i++) {
      segs.push([
        new THREE.Vector3(...center),
        new THREE.Vector3(...nodes[i]),
      ])
    }
    segs.push([new THREE.Vector3(...nodes[1]), new THREE.Vector3(...nodes[2])])
    segs.push([new THREE.Vector3(...nodes[3]), new THREE.Vector3(...nodes[4])])
    return segs
  }, [nodes])

  useFrame(({ clock }) => {
    if (!netRef.current) return
    netRef.current.rotation.y = clock.elapsedTime * 0.2
  })

  return (
    <group ref={netRef}>
      {edges.map((seg, i) => (
        <Line key={i} points={seg} color={colors.accent2} transparent opacity={0.45} />
      ))}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i === 0 ? 0.08 : 0.05, 12, 12]} />
          <meshStandardMaterial
            color={i === 0 ? colors.accent3 : colors.accent1}
            emissive={colors.accent2}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

function GraduationScroll() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.1 - 0.3
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.35) * 0.08
  })

  return (
    <group ref={ref}>
      <mesh rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 16]} />
        <meshStandardMaterial color={colors.accent2} emissive={colors.accent2} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.28, 0]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.45, 0.02, 0.3]} />
        <meshBasicMaterial color="#f8fafc" transparent opacity={0.5} wireframe />
      </mesh>
    </group>
  )
}

function GearPair() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.children[0].rotation.z += delta * 0.6
    ref.current.children[1].rotation.z -= delta * 0.45
  })

  return (
    <group ref={ref}>
      {[0, 1].map((i) => (
        <mesh key={i} position={[i * 0.22 - 0.11, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.12 + i * 0.04, 0.025, 6, 16]} />
          <meshBasicMaterial color={i === 0 ? colors.accent4 : colors.accent1} wireframe transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  )
}

function RubiksCube() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()
  const faceColors = [colors.accent1, colors.accent2, colors.accent3, colors.accent4, '#f8fafc', colors.accent1]

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.elapsedTime * 0.35
    ref.current.rotation.y = clock.elapsedTime * 0.5
  })

  return (
    <group ref={ref} scale={0.9}>
      {[-1, 0, 1].map((x) =>
        [-1, 0, 1].map((y) =>
          [-1, 0, 1].map((z) => (
            <mesh key={`${x}${y}${z}`} position={[x * 0.21, y * 0.21, z * 0.21]}>
              <boxGeometry args={[0.18, 0.18, 0.18]} />
              <meshStandardMaterial
                color={faceColors[(x + y + z + 3) % faceColors.length]}
                emissive={faceColors[(x + y + z + 3) % faceColors.length]}
                emissiveIntensity={0.15}
                roughness={0.4}
                metalness={0.5}
              />
            </mesh>
          ))
        )
      )}
    </group>
  )
}

function AtomModel() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()
  const electronRefs = useRef<THREE.Mesh[]>([])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.15
    electronRefs.current.forEach((e, i) => {
      if (!e) return
      const t = clock.elapsedTime * (0.8 + i * 0.2) + i * 2
      const r = 0.35 + i * 0.05
      e.position.set(Math.cos(t) * r, Math.sin(t * 1.3) * r * 0.4, Math.sin(t) * r)
    })
  })

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={colors.accent3} emissive={colors.accent3} emissiveIntensity={0.6} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[i * 1.1, i * 0.7, 0]}>
          <torusGeometry args={[0.35, 0.008, 8, 48]} />
          <meshBasicMaterial color={colors.accent4} transparent opacity={0.45} wireframe />
        </mesh>
      ))}
      {[0, 1, 2].map((i) => (
        <mesh
          key={`e${i}`}
          ref={(el) => {
            if (el) electronRefs.current[i] = el
          }}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={colors.accent2} />
        </mesh>
      ))}
    </group>
  )
}

function D20Dice() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.elapsedTime * 0.25
    ref.current.rotation.z = clock.elapsedTime * 0.18
  })

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color={colors.accent1}
          emissive={colors.accent2}
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh scale={0.92}>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshBasicMaterial color={colors.accent4} transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

function DnaHelix() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  const pairs = useMemo(() => {
    const pts: { a: [number, number, number]; b: [number, number, number] }[] = []
    for (let i = 0; i < 10; i++) {
      const t = i * 0.35
      const angle = i * 0.7
      pts.push({
        a: [Math.cos(angle) * 0.2, t - 1.5, Math.sin(angle) * 0.2],
        b: [Math.cos(angle + Math.PI) * 0.2, t - 1.5, Math.sin(angle + Math.PI) * 0.2],
      })
    }
    return pts
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.3
  })

  return (
    <group ref={ref} scale={0.85}>
      {pairs.map((p, i) => (
        <group key={i}>
          <mesh position={p.a}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color={colors.accent4} emissive={colors.accent4} emissiveIntensity={0.35} />
          </mesh>
          <mesh position={p.b}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color={colors.accent3} emissive={colors.accent3} emissiveIntensity={0.35} />
          </mesh>
          <Line
            points={[new THREE.Vector3(...p.a), new THREE.Vector3(...p.b)]}
            color={colors.accent2}
            transparent
            opacity={0.4}
          />
        </group>
      ))}
    </group>
  )
}

function Microchip() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  const traces = useMemo(() => {
    const segs: [THREE.Vector3, THREE.Vector3][] = [
      [new THREE.Vector3(-0.15, 0.01, -0.1), new THREE.Vector3(0.1, 0.01, -0.05)],
      [new THREE.Vector3(0.1, 0.01, -0.05), new THREE.Vector3(0.15, 0.01, 0.08)],
      [new THREE.Vector3(-0.12, 0.01, 0.08), new THREE.Vector3(0.05, 0.01, 0.12)],
      [new THREE.Vector3(-0.05, 0.01, -0.12), new THREE.Vector3(-0.05, 0.01, 0.12)],
    ]
    return segs
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.3
  })

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.45, 0.06, 0.45]} />
        <meshStandardMaterial color={colors.accent1} emissive={colors.accent1} emissiveIntensity={0.2} metalness={0.8} roughness={0.2} />
      </mesh>
      {traces.map((seg, i) => (
        <Line key={i} points={seg} color={colors.accent4} transparent opacity={0.8} />
      ))}
      {[-0.22, 0.22].flatMap((x) =>
        [-0.15, 0, 0.15].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0, z]}>
            <boxGeometry args={[0.04, 0.02, 0.02]} />
            <meshBasicMaterial color={colors.accent2} />
          </mesh>
        ))
      )}
    </group>
  )
}

function RetroRocket() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()
  const flameRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.12
    if (flameRef.current) {
      flameRef.current.scale.y = 0.8 + Math.sin(clock.elapsedTime * 8) * 0.25
    }
  })

  return (
    <group ref={ref} rotation={[0, 0, 0.3]}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.45, 12]} />
        <meshStandardMaterial color={colors.accent1} emissive={colors.accent1} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <coneGeometry args={[0.14, 0.22, 12]} />
        <meshStandardMaterial color={colors.accent2} emissive={colors.accent2} emissiveIntensity={0.25} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.cos(i * 2.1) * 0.14, -0.05, Math.sin(i * 2.1) * 0.14]} rotation={[0.4, i * 2.1, 0]}>
          <boxGeometry args={[0.08, 0.12, 0.02]} />
          <meshBasicMaterial color={colors.accent4} wireframe />
        </mesh>
      ))}
      <mesh ref={flameRef} position={[0, -0.35, 0]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshBasicMaterial color={colors.accent3} transparent opacity={0.75} />
      </mesh>
    </group>
  )
}

function BinaryRain() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()
  const bits = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        x: (i % 4) * 0.12 - 0.18,
        y: Math.floor(i / 4) * 0.15 - 0.2,
        bit: i % 2,
        speed: 0.3 + (i % 3) * 0.15,
        phase: i * 0.9,
      })),
    []
  )

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.children.forEach((child, i) => {
      const b = bits[i]
      if (!b) return
      child.position.y = b.y + ((clock.elapsedTime * b.speed + b.phase) % 1.2) - 0.6
      child.visible = (clock.elapsedTime + b.phase) % 1.5 > 0.2
    })
  })

  return (
    <group ref={ref}>
      {bits.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, 0]}>
          <boxGeometry args={[0.06, 0.06, 0.02]} />
          <meshBasicMaterial color={b.bit ? colors.accent4 : colors.accent2} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  )
}

function CoffeeMug() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()
  const steamRefs = useRef<THREE.Mesh[]>([])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.2
    steamRefs.current.forEach((s, i) => {
      if (!s) return
      s.position.y = 0.35 + ((clock.elapsedTime * 0.4 + i * 0.3) % 0.4)
      const mat = s.material as THREE.MeshBasicMaterial
      mat.opacity = Math.max(0, 0.5 - ((clock.elapsedTime * 0.4 + i * 0.3) % 0.4) * 1.2)
    })
  })

  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[0.18, 0.16, 0.3, 16]} />
        <meshStandardMaterial color={colors.accent1} emissive={colors.accent1} emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.1, 0.025, 8, 16, Math.PI]} />
        <meshStandardMaterial color={colors.accent2} wireframe />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) steamRefs.current[i] = el
          }}
          position={[-0.06 + i * 0.06, 0.35, 0]}
        >
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color="#f8fafc" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function ChessRook() {
  const ref = useRef<THREE.Group>(null!)
  const colors = useThemeColors()

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.2
  })

  return (
    <group ref={ref}>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.08, 12]} />
        <meshStandardMaterial color={colors.accent1} emissive={colors.accent1} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.25, 12]} />
        <meshStandardMaterial color={colors.accent2} emissive={colors.accent2} emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.08, 12]} />
        <meshStandardMaterial color={colors.accent4} wireframe />
      </mesh>
    </group>
  )
}

const THEMED_ITEMS = [
  { id: 'books', position: [-5.5, 0.5, -3] as [number, number, number], offset: 0, speed: 1.4, Component: BookStack },
  { id: 'code', position: [5.5, 1.5, -2.5] as [number, number, number], offset: 1.2, speed: 1.8, Component: CodingTerminal },
  { id: 'bridge', position: [-4.5, -3, -4.5] as [number, number, number], offset: 2.4, speed: 1.2, Component: BridgeTruss },
  { id: 'ai', position: [4, -2, -3] as [number, number, number], offset: 3.6, speed: 2, Component: NeuralNetwork },
  { id: 'scroll', position: [-6, 3.5, -5] as [number, number, number], offset: 4.8, speed: 1.5, Component: GraduationScroll },
  { id: 'gears', position: [6.5, -3.5, -4] as [number, number, number], offset: 6, speed: 1.6, Component: GearPair },
  { id: 'rubiks', position: [3, 3.5, -4] as [number, number, number], offset: 1.8, speed: 1.7, Component: RubiksCube },
  { id: 'atom', position: [-3.5, 2.5, -2] as [number, number, number], offset: 2.8, speed: 1.3, Component: AtomModel },
  { id: 'd20', position: [6, 0.5, -3.5] as [number, number, number], offset: 3.2, speed: 1.9, Component: D20Dice },
  { id: 'dna', position: [-5.5, -1.5, -2.5] as [number, number, number], offset: 4.2, speed: 1.4, Component: DnaHelix },
  { id: 'chip', position: [2.5, -3.8, -3] as [number, number, number], offset: 5.1, speed: 1.5, Component: Microchip },
  { id: 'rocket', position: [-2, -4.5, -4] as [number, number, number], offset: 5.8, speed: 1.6, Component: RetroRocket },
  { id: 'binary', position: [5.8, 3, -5] as [number, number, number], offset: 6.5, speed: 2.1, Component: BinaryRain },
  { id: 'coffee', position: [-6.5, -2.5, -3.5] as [number, number, number], offset: 7.2, speed: 1.3, Component: CoffeeMug },
  { id: 'chess', position: [0.5, 4.5, -5] as [number, number, number], offset: 7.8, speed: 1.4, Component: ChessRook },
]

const LITE_ITEMS = ['books', 'code', 'bridge', 'ai', 'rubiks', 'atom', 'd20', 'coffee']

interface ThemedAnimationsProps {
  lite?: boolean
}

export function ThemedAnimations({ lite = false }: ThemedAnimationsProps) {
  const items = lite ? THEMED_ITEMS.filter((t) => LITE_ITEMS.includes(t.id)) : THEMED_ITEMS

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

export default ThemedAnimations
