import HeroFocusCards from '../HeroFocusCards/HeroFocusCards.jsx'
import { PORTFOLIO_CARDS } from '@/data/portfolio.js'
import styles from './VideoHero.module.css'

export default function VideoHero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* z-index 0 — grid de cards con Ken Burns + auto-focus + parallax */}
      <HeroFocusCards cards={PORTFOLIO_CARDS} />

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
