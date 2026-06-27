import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

export interface ThemeColorSet {
  bg: THREE.Color
  mesh1: THREE.Color
  mesh2: THREE.Color
  mesh3: THREE.Color
  mesh4: THREE.Color
  mesh5: THREE.Color
  mesh6: THREE.Color
  accent1: THREE.Color
  accent2: THREE.Color
  accent3: THREE.Color
  accent4: THREE.Color
  text: THREE.Color
}

export function useThemeColors(): ThemeColorSet {
  const { palette } = useTheme()
  const colors = useRef({
    bg: new THREE.Color(palette.bgPrimary),
    mesh1: new THREE.Color(palette.bgMesh1),
    mesh2: new THREE.Color(palette.bgMesh2),
    mesh3: new THREE.Color(palette.bgMesh3),
    mesh4: new THREE.Color(palette.bgMesh4),
    mesh5: new THREE.Color(palette.bgMesh5),
    mesh6: new THREE.Color(palette.bgMesh6),
    accent1: new THREE.Color(palette.accent1),
    accent2: new THREE.Color(palette.accent2),
    accent3: new THREE.Color(palette.accent3),
    accent4: new THREE.Color(palette.accent4),
    text: new THREE.Color(palette.textPrimary),
  })

  useFrame((_, delta) => {
    const lerp = Math.min(1, delta * 4)
    colors.current.bg.lerp(new THREE.Color(palette.bgPrimary), lerp)
    colors.current.mesh1.lerp(new THREE.Color(palette.bgMesh1), lerp)
    colors.current.mesh2.lerp(new THREE.Color(palette.bgMesh2), lerp)
    colors.current.mesh3.lerp(new THREE.Color(palette.bgMesh3), lerp)
    colors.current.mesh4.lerp(new THREE.Color(palette.bgMesh4), lerp)
    colors.current.mesh5.lerp(new THREE.Color(palette.bgMesh5), lerp)
    colors.current.mesh6.lerp(new THREE.Color(palette.bgMesh6), lerp)
    colors.current.accent1.lerp(new THREE.Color(palette.accent1), lerp)
    colors.current.accent2.lerp(new THREE.Color(palette.accent2), lerp)
    colors.current.accent3.lerp(new THREE.Color(palette.accent3), lerp)
    colors.current.accent4.lerp(new THREE.Color(palette.accent4), lerp)
    colors.current.text.lerp(new THREE.Color(palette.textPrimary), lerp)
  })

  return colors.current
}
