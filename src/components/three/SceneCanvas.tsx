import { Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { useTheme } from '../../context/ThemeContext'
import { useMouseParallax } from '../../hooks/useMouseParallax'
import { AuroraBackground } from './AuroraBackground'
import { ParticleField } from './ParticleField'
import { ScrollScene } from './ScrollScene'

const HeroScene = lazy(() => import('./HeroScene').then((m) => ({ default: m.HeroScene })))
const ThemedAnimations = lazy(() => import('./ThemedAnimations').then((m) => ({ default: m.ThemedAnimations })))
const AlgoVizScene = lazy(() => import('./AlgoVizScene').then((m) => ({ default: m.AlgoVizScene })))

function SceneContent() {
  const { isMobile, reducedMotion } = useTheme()
  const mouse = useMouseParallax(0.3)

  return (
    <>
      <ScrollScene />
      <AuroraBackground />
      <ParticleField />
      {!reducedMotion && (
        <Suspense fallback={null}>
          {!isMobile && <HeroScene mouseX={mouse.x} mouseY={mouse.y} />}
          <ThemedAnimations lite={isMobile} />
          <AlgoVizScene lite={isMobile} />
        </Suspense>
      )}
    </>
  )
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#818cf8" wireframe />
    </mesh>
  )
}

export function SceneCanvas() {
  const { reducedMotion } = useTheme()

  if (reducedMotion) return null

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<Loader />}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
