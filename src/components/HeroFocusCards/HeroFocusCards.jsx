import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './HeroFocusCards.module.css'

const AUTO_INTERVAL_MS = 4500
const PARALLAX_FACTOR  = 0.055
const ENTRANCE_STEP_MS = 90

export default function HeroFocusCards({ cards }) {
  const gridRef = useRef(null)

  const prefersReduced = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const [hovered,    setHovered]    = useState(null)
  const [autoFocus,  setAutoFocus]  = useState(0)
  const [autoActive, setAutoActive] = useState(true)
  const [entered,    setEntered]    = useState(false)

  // Entrada escalonada: esperar un frame para que React haya pintado el DOM
  useEffect(() => {
    if (prefersReduced) { setEntered(true); return }
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [prefersReduced])

  // Auto-focus rotativo — se pausa al interactuar, no aplica en touch/mobile
  useEffect(() => {
    if (!autoActive || prefersReduced) return
    if (window.matchMedia('(hover: none)').matches) return   // touch device

    const id = setInterval(
      () => setAutoFocus(f => (f + 1) % cards.length),
      AUTO_INTERVAL_MS
    )
    return () => clearInterval(id)
  }, [autoActive, cards.length, prefersReduced])

  // Parallax: el grid se mueve a velocidad ligeramente menor que el scroll
  useEffect(() => {
    if (prefersReduced) return
    const el = gridRef.current
    if (!el) return
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * PARALLAX_FACTOR}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [prefersReduced])

  const activeFocus = hovered !== null ? hovered : (autoActive ? autoFocus : null)

  const handleEnter = useCallback(i => {
    setAutoActive(false)   // pausa el auto-loop
    setHovered(i)
  }, [])

  const handleLeave = useCallback(() => {
    setHovered(null)
    // autoActive permanece en false — el loop queda pausado tras la primera interacción
  }, [])

  const handleClick = useCallback(() => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div ref={gridRef} className={styles.grid} role="presentation">
      {cards.map((card, i) => {
        const isActive     = activeFocus === i
        const isSuppressed = activeFocus !== null && !isActive

        return (
          <div
            key={card.title}
            className={`${styles.card} ${entered ? styles.entered : ''}`}
            style={{ '--entrance-delay': `${i * ENTRANCE_STEP_MS}ms` }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
            onClick={handleClick}
            aria-hidden="true"
          >
            <img
              src={card.src}
              alt=""
              className={styles.image}
              loading={i < 3 ? 'eager' : 'lazy'}
              draggable="false"
            />

            {/* Overlay de contraste base — permanente */}
            <div className={styles.baseOverlay} />

            {/* Overlay de supresión para las no-activas */}
            <div
              className={styles.suppressOverlay}
              style={{ opacity: isSuppressed ? 1 : 0 }}
            />

            {/* Indicador de clickeable — aparece al enfocar */}
            <div className={`${styles.hint} ${isActive ? styles.hintVisible : ''}`}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path
                  d="M6.5 2v9M2 7l4.5 4L11 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Ver trabajo</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
