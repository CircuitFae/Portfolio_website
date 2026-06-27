import { useEffect, useState } from 'react'

export function useMouseParallax(strength = 0.3) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength
      const y = (e.clientY / window.innerHeight - 0.5) * strength
      setOffset({ x, y })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [strength])

  return offset
}
