import { useEffect, useRef } from 'react'

const NODE_COLOR   = 'rgba(214, 224, 238, 0.32)'
const EDGE_COLOR   = 'rgba(90, 106, 130, 1)'   // alpha manejada con globalAlpha

/**
 * Grafo de partículas en Canvas 2D.
 *
 * Props (todas opcionales):
 *   nodeCount   — cantidad de nodos  (default: 52)
 *   speed       — velocidad base      (default: 0.22, en px/frame)
 *   edgeRadius  — distancia máx. para trazar arista  (default: 165, en px lógicos)
 *   accentColor — color de los nodos calientes (~10%)  (default: índigo semitransparente)
 */
export default function NodeGraph({
  nodeCount   = 52,
  speed       = 0.22,
  edgeRadius  = 165,
  accentColor = 'rgba(91, 110, 245, 0.5)',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let W = 0, H = 0
    let nodes  = []
    let animId = null

    function initNodes() {
      nodes = Array.from({ length: nodeCount }, () => {
        const angle = Math.random() * Math.PI * 2
        const spd   = speed * (0.5 + Math.random() * 0.5)
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          r: 1.5 + Math.random() * 0.8,
          isAccent: Math.random() < 0.1,
        }
      })
    }

    function resize() {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
      initNodes()
    }

    function tick() {
      ctx.clearRect(0, 0, W, H)

      // Mover + rebotar en bordes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)) }
        if (n.y < 0 || n.y > H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)) }
      }

      // Aristas: opacidad proporcional a la cercanía
      ctx.lineWidth    = 0.6
      ctx.strokeStyle  = EDGE_COLOR
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < edgeRadius) {
            ctx.globalAlpha = (1 - dist / edgeRadius) * 0.22
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Nodos
      ctx.globalAlpha = 1
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.isAccent ? accentColor : NODE_COLOR
        ctx.fill()
      }

      animId = requestAnimationFrame(tick)
    }

    resize()
    tick()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [nodeCount, speed, edgeRadius, accentColor])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
