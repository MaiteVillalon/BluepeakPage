import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import styles from './VideoHero.module.css'

export default function VideoHero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* z-index 0 — grid ripple cubre todo el hero vía ResizeObserver */}
      <BackgroundRippleEffect cellSize={64} />

      {/* z-index 1 — toque oscuro solo detrás del bloque de texto */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* z-index 2 — contenido */}
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
