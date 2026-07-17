import HeroCarousel from '../HeroCarousel/HeroCarousel.jsx'
import { PORTFOLIO_CARDS } from '@/data/portfolio.js'
import styles from './VideoHero.module.css'

export default function VideoHero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Crossfade borroso de las mismas imágenes del portfolio */}
      <HeroCarousel images={PORTFOLIO_CARDS} />

      {/* Overlay que integra el carousel con el fondo y protege el texto */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Contenido anclado en esquina inferior izquierda */}
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
