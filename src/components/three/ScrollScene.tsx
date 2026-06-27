import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'
import { useThemeColors } from '../../hooks/useThemeColors'

export function ScrollScene() {
  const { camera, scene } = useThree()
  const { scrollHue, reducedMotion } = useTheme()
  const colors = useThemeColors()
  const fogRef = useRef<THREE.Fog>(null)

  useFrame(({ clock }) => {
    scene.background = colors.bg

    if (scene.fog && scene.fog instanceof THREE.Fog) {
      scene.fog.color.copy(colors.bg)
    }

    if (reducedMotion) return

    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0

    const targetZ = 5 + progress * 5
    const orbit = progress * Math.PI * 0.15
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(orbit) * 1.2, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, progress * 2 + Math.sin(clock.elapsedTime * 0.2) * 0.1, 0.04)
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <fog ref={fogRef} attach="fog" args={[colors.bg, 4, 28]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 4, 4]} intensity={1.1} color={colors.mesh1} />
      <pointLight position={[-5, -2, 3]} intensity={0.75} color={colors.mesh2} />
      <pointLight position={[0, -4, 2]} intensity={0.55} color={colors.mesh3} />
      <pointLight position={[-3, 5, 1]} intensity={0.45} color={colors.mesh4} />
      <pointLight position={[4, -3, 2]} intensity={0.4} color={colors.mesh5} />
      <spotLight
        position={[0, 10, 5]}
        angle={0.35}
        penumbra={1}
        intensity={1 + scrollHue * 0.5}
        color={colors.accent2}
      />
    </>
  )
}
