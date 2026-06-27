import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { ShaderMaterial } from 'three'
import { createAuroraMaterial } from './shaders/aurora'
import { useThemeColors } from '../../hooks/useThemeColors'

export function AuroraBackground() {
  const materialRef = useRef<ShaderMaterial>(null!)
  const colors = useThemeColors()
  const material = useMemo(() => createAuroraMaterial(), [])

  useFrame(({ clock }) => {
    const mat = materialRef.current ?? material
    mat.uniforms.uTime.value = clock.elapsedTime
    mat.uniforms.uColorA.value.copy(colors.mesh1)
    mat.uniforms.uColorB.value.copy(colors.mesh2)
    mat.uniforms.uColorC.value.copy(colors.mesh3)
    mat.uniforms.uColorD.value.copy(colors.mesh6)
    mat.uniforms.uColorE.value.copy(colors.mesh4)
    mat.uniforms.uColorF.value.copy(colors.mesh5)
  })

  return (
    <mesh position={[0, 0, -8]} scale={[35, 24, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <primitive ref={materialRef} object={material} attach="material" />
    </mesh>
  )
}
