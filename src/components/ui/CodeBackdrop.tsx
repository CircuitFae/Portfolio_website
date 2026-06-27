import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

const SNIPPETS = [
  {
    lang: 'Python',
    lines: [
      { parts: [{ t: 'def', c: 'kw' }, { t: ' dfs', c: 'fn' }, { t: '(graph, start):', c: 'txt' }] },
      { parts: [{ t: '    visited', c: 'var' }, { t: ' = ', c: 'txt' }, { t: 'set', c: 'fn' }, { t: '()', c: 'txt' }] },
      { parts: [{ t: '    stack', c: 'var' }, { t: ' = [start]', c: 'txt' }] },
      { parts: [{ t: '    ', c: 'txt' }, { t: 'while', c: 'kw' }, { t: ' stack:', c: 'txt' }] },
      { parts: [{ t: '        node', c: 'var' }, { t: ' = stack.pop()', c: 'txt' }] },
    ],
  },
  {
    lang: 'TypeScript',
    lines: [
      { parts: [{ t: 'async', c: 'kw' }, { t: ' ', c: 'txt' }, { t: 'function', c: 'kw' }, { t: '* ', c: 'txt' }, { t: 'stream', c: 'fn' }, { t: '() {', c: 'txt' }] },
      { parts: [{ t: '  ', c: 'txt' }, { t: 'for await', c: 'kw' }, { t: ' (', c: 'txt' }, { t: 'const', c: 'kw' }, { t: ' chunk ', c: 'txt' }, { t: 'of', c: 'kw' }, { t: ' llm)', c: 'txt' }] },
      { parts: [{ t: '    ', c: 'txt' }, { t: 'yield', c: 'kw' }, { t: ' chunk.token', c: 'prop' }] },
      { parts: [{ t: '}', c: 'txt' }] },
    ],
  },
  {
    lang: 'C++',
    lines: [
      { parts: [{ t: 'void', c: 'kw' }, { t: ' ', c: 'txt' }, { t: 'quicksort', c: 'fn' }, { t: '(', c: 'txt' }, { t: 'int', c: 'kw' }, { t: ' a[], lo, hi) {', c: 'txt' }] },
      { parts: [{ t: '  ', c: 'txt' }, { t: 'int', c: 'kw' }, { t: ' p = partition(a, lo, hi);', c: 'txt' }] },
      { parts: [{ t: '  quicksort(a, lo, p - ', c: 'txt' }, { t: '1', c: 'num' }, { t: ');', c: 'txt' }] },
      { parts: [{ t: '  quicksort(a, p + ', c: 'txt' }, { t: '1', c: 'num' }, { t: ', hi);', c: 'txt' }] },
      { parts: [{ t: '}', c: 'txt' }] },
    ],
  },
]

function CodePanel({ index, className }: { index: number; className: string }) {
  const snippet = SNIPPETS[index % SNIPPETS.length]

  return (
    <div className={`code-panel ${className}`}>
      <div className="code-panel-chrome">
        <span className="code-dot code-dot-r" />
        <span className="code-dot code-dot-y" />
        <span className="code-dot code-dot-g" />
        <span className="code-panel-lang">{snippet.lang}</span>
      </div>
      <pre className="code-panel-body">
        {snippet.lines.map((line, li) => (
          <div key={li} className="code-line">
            <span className="code-ln">{li + 1}</span>
            <span className="code-src">
              {line.parts.map((p, pi) => (
                <span key={pi} className={`code-${p.c}`}>
                  {p.t}
                </span>
              ))}
            </span>
          </div>
        ))}
      </pre>
    </div>
  )
}

function SortingCanvas({ className }: { className: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    const w = 220
    const h = 140
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    const count = 14
    let bars = Array.from({ length: count }, () => 0.15 + Math.random() * 0.85)
    let i = 0
    let j = 0
    let frame = 0
    let raf = 0

    const colors = {
      bar: getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-3').trim() || '#06b6d4',
      active: getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-2').trim() || '#ec4899',
      sorted: getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-4').trim() || '#10b981',
      bg: 'rgba(3, 0, 20, 0.55)',
    }

    const draw = () => {
      ctx.fillStyle = colors.bg
      ctx.fillRect(0, 0, w, h)

      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(255,255,255,0.45)'
      ctx.fillText('bubble sort', 8, 14)

      const pad = 10
      const barW = (w - pad * 2) / count - 2
      const maxH = h - 28

      bars.forEach((v, idx) => {
        const x = pad + idx * (barW + 2)
        const barH = v * maxH
        const y = h - 8 - barH
        const isActive = idx === j || idx === j + 1
        const isSorted = idx >= count - i
        ctx.fillStyle = isSorted ? colors.sorted : isActive ? colors.active : colors.bar
        ctx.globalAlpha = isActive ? 1 : 0.72
        ctx.fillRect(x, y, barW, barH)
      })
      ctx.globalAlpha = 1
    }

    const step = () => {
      frame++
      if (frame % 4 !== 0) return

      if (i < count) {
        if (j < count - i - 1) {
          if (bars[j] > bars[j + 1]) {
            ;[bars[j], bars[j + 1]] = [bars[j + 1], bars[j]]
          }
          j++
        } else {
          j = 0
          i++
        }
      } else if (frame % 120 === 0) {
        bars = Array.from({ length: count }, () => 0.15 + Math.random() * 0.85)
        i = 0
        j = 0
      }
    }

    const loop = () => {
      step()
      draw()
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={`viz-panel sort-viz ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  )
}

function GraphCanvas({ className }: { className: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    const w = 200
    const h = 200
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    const nodes = [
      { x: 100, y: 30, id: 0 },
      { x: 40, y: 80, id: 1 },
      { x: 160, y: 80, id: 2 },
      { x: 70, y: 140, id: 3 },
      { x: 130, y: 140, id: 4 },
      { x: 100, y: 100, id: 5 },
    ]
    const edges: [number, number][] = [
      [0, 1], [0, 2], [0, 5], [1, 3], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5],
    ]

    let t = 0
    let raf = 0
    let activeEdge = 0

    const mainLoop = () => {
      t += 0.016
      activeEdge = Math.floor(t * 0.6) % edges.length

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(3, 0, 20, 0.55)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(255,255,255,0.45)'
      ctx.fillText('graph traversal', 8, 14)

      const accent = getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-1').trim() || '#7c3aed'
      const edgeColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-6').trim() || '#6366f1'
      const nodeColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-3').trim() || '#06b6d4'

      edges.forEach(([a, b], ei) => {
        const n1 = nodes[a]
        const n2 = nodes[b]
        const isActive = ei === activeEdge
        ctx.strokeStyle = isActive ? accent : edgeColor
        ctx.globalAlpha = isActive ? 0.95 : 0.38
        ctx.lineWidth = isActive ? 2 : 1
        ctx.beginPath()
        ctx.moveTo(n1.x, n1.y)
        ctx.lineTo(n2.x, n2.y)
        ctx.stroke()

        if (isActive) {
          const prog = (Math.sin(t * 4) + 1) * 0.5
          ctx.fillStyle = accent
          ctx.globalAlpha = 1
          ctx.beginPath()
          ctx.arc(n1.x + (n2.x - n1.x) * prog, n1.y + (n2.y - n1.y) * prog, 3.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      nodes.forEach((n, ni) => {
        const pulse = (Math.sin(t * 1.5 + ni) + 1) * 0.5
        ctx.globalAlpha = 0.85 + pulse * 0.15
        ctx.fillStyle = nodeColor
        ctx.beginPath()
        ctx.arc(n.x, n.y, 6 + pulse, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(255,255,255,0.75)'
        ctx.font = '9px "JetBrains Mono", monospace'
        ctx.textAlign = 'center'
        ctx.fillText(String(n.id), n.x, n.y + 3)
        ctx.textAlign = 'left'
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(mainLoop)
    }
    mainLoop()

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={`viz-panel graph-viz ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  )
}

function TreeCanvas({ className }: { className: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    const w = 180
    const h = 160
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    const tree = {
      x: 90,
      y: 24,
      v: 8,
      l: { x: 50, y: 62, v: 3, l: { x: 30, y: 110, v: 1 }, r: { x: 70, y: 110, v: 5 } },
      r: { x: 130, y: 62, v: 12, l: { x: 110, y: 110, v: 10 }, r: { x: 150, y: 110, v: 15 } },
    }

    type TNode = { x: number; y: number; v: number; l?: TNode; r?: TNode }
    const order: TNode[] = []
    const walk = (n: TNode) => {
      order.push(n)
      if (n.l) walk(n.l)
      if (n.r) walk(n.r)
    }
    walk(tree)

    let t = 0
    let raf = 0

    const drawEdge = (a: TNode, b: TNode, highlight: boolean) => {
      ctx.strokeStyle = highlight
        ? getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-5').trim() || '#f59e0b'
        : getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-6').trim() || '#6366f1'
      ctx.globalAlpha = highlight ? 0.9 : 0.35
      ctx.lineWidth = highlight ? 2 : 1
      ctx.beginPath()
      ctx.moveTo(a.x, a.y + 8)
      ctx.lineTo(b.x, b.y - 8)
      ctx.stroke()
    }

    const drawNode = (n: TNode, active: boolean) => {
      ctx.globalAlpha = active ? 1 : 0.75
      ctx.fillStyle = active
        ? getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-2').trim() || '#ec4899'
        : getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-4').trim() || '#10b981'
      ctx.beginPath()
      ctx.arc(n.x, n.y, active ? 11 : 9, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText(String(n.v), n.x, n.y + 4)
      ctx.textAlign = 'left'
    }

    const traverse = (n: TNode, activeIdx: number, idx: { i: number }) => {
      const isActive = idx.i === activeIdx
      drawNode(n, isActive)
      if (n.l) {
        drawEdge(n, n.l, isActive)
        traverse(n.l, activeIdx, idx)
      }
      if (n.r) {
        drawEdge(n, n.r, isActive)
        traverse(n.r, activeIdx, idx)
      }
      idx.i++
    }

    const loop = () => {
      t += 0.016
      const activeIdx = Math.floor(t * 0.5) % order.length

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(3, 0, 20, 0.55)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(255,255,255,0.45)'
      ctx.fillText('BST inorder', 8, 14)

      traverse(tree, activeIdx, { i: 0 })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={`viz-panel tree-viz ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  )
}

function StatsDistributionCanvas({ className }: { className: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    const w = 210
    const h = 150
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    let t = 0
    let raf = 0

    const loop = () => {
      t += 0.016
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(3, 0, 20, 0.55)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(255,255,255,0.45)'
      ctx.fillText('normal distribution', 8, 14)

      const curveColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-2').trim() || '#ec4899'
      const axisColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-mesh-6').trim() || '#6366f1'

      ctx.strokeStyle = axisColor
      ctx.globalAlpha = 0.45
      ctx.beginPath()
      ctx.moveTo(20, 125)
      ctx.lineTo(190, 125)
      ctx.moveTo(105, 125)
      ctx.lineTo(105, 30)
      ctx.stroke()

      ctx.strokeStyle = curveColor
      ctx.globalAlpha = 0.72
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 0; i <= 100; i++) {
        const x = 20 + (i / 100) * 170
        const nx = (i / 100 - 0.5) * 6
        const y = 125 - Math.exp(-nx * nx) * 85
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.lineWidth = 1

      ctx.fillStyle = 'rgba(255,255,255,0.55)'
      ctx.font = '11px "Times New Roman", serif'
      ctx.fillText('μ  σ', 168, 18)
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={`viz-panel stats-viz ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  )
}

function MathPanel({ className }: { className: string }) {
  return (
    <div className={`code-panel math-panel ${className}`}>
      <div className="code-panel-chrome">
        <span className="code-dot code-dot-r" />
        <span className="code-dot code-dot-y" />
        <span className="code-dot code-dot-g" />
        <span className="code-panel-lang">Mathematics</span>
      </div>
      <pre className="code-panel-body math-panel-body">
        <div className="math-line">μ = (Σ xᵢ) / n</div>
        <div className="math-line">σ² = Σ(xᵢ − μ)² / n</div>
        <div className="math-line">∫ e^(−x²) dx = √π</div>
        <div className="math-line">lim (1 + 1/n)ⁿ = e</div>
      </pre>
    </div>
  )
}

export function CodeBackdrop() {
  const { isMobile, reducedMotion } = useTheme()

  if (reducedMotion) return null

  return (
    <div className={`code-backdrop${isMobile ? ' code-backdrop-lite' : ''}`} aria-hidden="true">
      <CodePanel index={0} className="code-panel-a" />
      {!isMobile && <CodePanel index={1} className="code-panel-b" />}
      <CodePanel index={2} className="code-panel-c" />
      <SortingCanvas className="" />
      {!isMobile && <GraphCanvas className="" />}
      <TreeCanvas className="" />
      <StatsDistributionCanvas className="" />
      {!isMobile && <MathPanel className="math-panel-a" />}
    </div>
  )
}
