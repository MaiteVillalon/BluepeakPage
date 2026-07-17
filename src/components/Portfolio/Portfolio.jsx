import { ThreeDMarquee } from '@/components/ui/3d-marquee'
import styles from './Portfolio.module.css'

/*
 * Reemplazá estas URLs con capturas reales de tus proyectos.
 * Proporción recomendada: 970×700 px (landscape).
 */
const IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=970&h=700&fit=crop&q=80",
  "https://images.unsplash.com/photo-1602525962574-3246f39f8d58?w=970&h=700&fit=crop&q=80",
]

export default function Portfolio() {
  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Nuestro trabajo</h2>
          <p className={styles.lead}>
            Proyectos reales, equipos que se integraron sin fricción, sistemas que siguen corriendo.
          </p>
        </header>
      </div>

      {/* Marquee corre full-width dentro del section, sin el max-width del container */}
      <div className={styles.marqueeWrap}>
        <ThreeDMarquee images={IMAGES} />
      </div>
    </section>
  )
}
