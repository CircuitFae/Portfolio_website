import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import type { Group } from 'three'
import { useThemeColors } from '../../hooks/useThemeColors'

export function ParticleField() {
  const groupRef = useRef<Group>(null!)
  const colors = useThemeColors()

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.015
      groupRef.current.rotation.x += delta * 0.005
    }
  })

  return (
    <group ref={groupRef}>
      <Stars radius={90} depth={70} count={5000} factor={4} saturation={0.35} fade speed={0.8} />
      <Sparkles count={180} scale={[18, 18, 18]} size={3} speed={0.4} color={colors.mesh1} />
      <Sparkles count={120} scale={[14, 14, 14]} size={4} speed={0.35} color={colors.mesh2} />
      <Sparkles count={90} scale={[12, 12, 12]} size={3.5} speed={0.3} color={colors.mesh3} />
      <Sparkles count={70} scale={[10, 10, 10]} size={5} speed={0.2} color={colors.mesh4} />
      <Sparkles count={50} scale={[8, 8, 8]} size={4} speed={0.25} color={colors.mesh5} />
    </group>
  )
}
