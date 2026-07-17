import { useMemo } from 'react'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import styles from './VideoHero.module.css'

const CELL = 52
function gridDims() {
  if (typeof window === 'undefined') return { rows: 12, cols: 24 }
  return {
    rows: Math.ceil(window.innerHeight / CELL) + 1,
    cols: Math.ceil(window.innerWidth  / CELL) + 1,
  }
}

export default function VideoHero() {
  const { rows, cols } = useMemo(gridDims, [])

  return (
    <section className={styles.hero} aria-label="Hero">
      {/* z-index 0 — grid ripple (isolate contiene sus z-index internos) */}
      <BackgroundRippleEffect rows={rows} cols={cols} cellSize={CELL} />

      {/* z-index 1 — gradiente oscuro que da contraste al texto bottom-left */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* z-index 2 — contenido de texto */}
      <div className={styles.content}>
        <p className={styles.eyebrow}>Consultora de software</p>
        <h1 className={styles.headline}>
          Sistemas que<br />sostienen el negocio.
        </h1>
        <p className={styles.subheadline}>
          Arquitectura sólida, equipos que se integran y código<br className={styles.br} />
          que no se convierte en deuda técnica a los seis meses.
        </p>
        <a href="#contacto" className={styles.cta}>
          Hablemos de tu proyecto
        </a>
      </div>
    </section>
  )
}
