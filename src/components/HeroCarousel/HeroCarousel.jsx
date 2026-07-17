import { useEffect, useState } from 'react'
import styles from './HeroCarousel.module.css'

const INTERVAL_MS = 6000
const TRANSITION_MS = 1800

/**
 * Crossfade lento entre imágenes — fondo del hero.
 * Las mismas fotos que en la sección Portfolio, fuertemente atenuadas.
 * prefers-reduced-motion: muestra sólo la primera imagen, sin animación.
 */
export default function HeroCarousel({ images }) {
  const [current, setCurrent]   = useState(0)
  const [animate, setAnimate]   = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || images.length < 2) return

    setAnimate(true)
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % images.length)
    }, INTERVAL_MS)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className={styles.carousel} aria-hidden="true">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={styles.slide}
          style={{
            opacity: animate ? (i === current ? 1 : 0) : (i === 0 ? 1 : 0),
            transition: animate ? `opacity ${TRANSITION_MS}ms ease-in-out` : 'none',
          }}
        >
          <img
            src={img.src}
            alt=""
            className={styles.image}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  )
}
