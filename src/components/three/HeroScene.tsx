import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useThemeColors } from '../../hooks/useThemeColors'

interface HeroSceneProps {
  mouseX: number
  mouseY: number
}

export function HeroScene({ mouseX, mouseY }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const ring1Ref = useRef<THREE.Mesh>(null!)
  const ring2Ref = useRef<THREE.Mesh>(null!)
  const ring3Ref = useRef<THREE.Mesh>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)
  const colors = useThemeColors()

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return
    const targetRotX = mouseY * 0.6
    const targetRotY = mouseX * 0.6
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY + clock.elapsedTime * 0.12,
      delta * 2
    )

    const pulse = (Math.sin(clock.elapsedTime * 0.9) + 1) * 0.5
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.4
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.25
    if (ring3Ref.current) ring3Ref.current.rotation.y -= delta * 0.35
    groupRef.current.scale.setScalar(1 + pulse * 0.08)

    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.15 + pulse * 0.2
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={groupRef} position={[-0.5, 0.2, 0]}>
        {/* Inner glow core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshBasicMaterial color={colors.accent2} transparent opacity={0.25} />
        </mesh>

        {/* Primary distorted mesh */}
        <mesh>
          <icosahedronGeometry args={[1.3, 5]} />
          <MeshDistortMaterial
            color={colors.accent1}
            emissive={colors.accent2}
            emissiveIntensity={0.65}
            distort={0.55}
            speed={3}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>

        {/* Wireframe torus knot */}
        <mesh scale={0.65} rotation={[0.5, 0.3, 0]}>
          <torusKnotGeometry args={[0.55, 0.12, 128, 24]} />
          <meshBasicMaterial color={colors.accent4} wireframe transparent opacity={0.55} />
        </mesh>

        {/* Orbiting rings */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.1, 0.025, 16, 120]} />
          <meshBasicMaterial color={colors.accent1} wireframe transparent opacity={0.5} />
        </mesh>

        <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <torusGeometry args={[2.6, 0.018, 16, 120]} />
          <meshBasicMaterial color={colors.accent2} wireframe transparent opacity={0.4} />
        </mesh>

        <mesh ref={ring3Ref} rotation={[Math.PI / 5, Math.PI / 3, 0]}>
          <torusGeometry args={[3.1, 0.012, 16, 120]} />
          <meshBasicMaterial color={colors.accent3} wireframe transparent opacity={0.3} />
        </mesh>

        {/* Accent point lights */}
        <pointLight position={[0, 0, 1]} intensity={1.5} color={colors.accent2} distance={5} />
        <pointLight position={[1, -1, 0]} intensity={0.8} color={colors.accent4} distance={4} />
      </group>
    </Float>
  )
}
