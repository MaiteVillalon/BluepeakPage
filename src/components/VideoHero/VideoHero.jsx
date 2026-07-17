import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import styles from './VideoHero.module.css'

export default function VideoHero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Grid ripple — position:absolute inset:0, sin z-index explícito */}
      <BackgroundRippleEffect cellSize={64} />

      {/* Contenido — z-index:10 asegura que quede por encima del grid */}
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
