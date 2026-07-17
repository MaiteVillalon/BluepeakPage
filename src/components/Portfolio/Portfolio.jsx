import { FocusCards } from '@/components/ui/focus-cards'
import { PORTFOLIO_CARDS } from '@/data/portfolio'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  // FocusCards espera { title, src } — añadimos tag para el subtítulo
  const cards = PORTFOLIO_CARDS.map(({ title, src }) => ({ title, src }))

  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Nuestro trabajo</h2>
          <p className={styles.lead}>
            Proyectos reales, equipos que se integraron sin fricción, sistemas que siguen corriendo.
          </p>
        </header>

        <FocusCards cards={cards} />
      </div>
    </section>
  )
}
