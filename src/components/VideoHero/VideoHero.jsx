import PrismGrid from '@/components/ui/prism-grid'
import Typewriter from '@/components/ui/typewriter'
import styles from './VideoHero.module.css'

const GRID_COLORS = {
  paletteCount: 5,
  color1: '#5B6EF5',
  color2: '#8494F9',
  color3: '#D6E0EE',
  color4: '#EEF2F8',
  color5: '#2C3545',
}

const HEADLINE_WORDS = [
  'Saas',
  'Apps',
  'Soluciones Web',
,
]

export default function VideoHero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* z-index 0 — grid prisma interactiva */}
      <div className={styles.gridLayer} aria-hidden="true">
        <PrismGrid
          backgroundColor="transparent"
          boxSize={56}
          borderWidth={1}
          borderColor="rgba(90, 106, 130, 0.35)"
          colors={GRID_COLORS}
        />
      </div>

      {/* z-index 1 — gradiente oscuro que da contraste al texto bottom-left */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* z-index 2 — contenido de texto */}
      <div className={styles.content}>
        <p className={styles.eyebrow}>Consultora de software</p>
        <h1 className={styles.headline}>
          Encuentra<br />
          <Typewriter
            texts={HEADLINE_WORDS}
            typedColor="var(--color-accent-light)"
            cursorColor="var(--color-accent-light)"
          />
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
