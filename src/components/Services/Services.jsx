import { useEffect, useRef } from 'react'
import styles from './Services.module.css'

const SERVICES = [
  {
    title: 'Desarrollo a medida',
    body: 'Construimos software que resuelve el problema real, no el que encaja en una plantilla SaaS. Desde APIs hasta productos completos, con stack elegido según los requerimientos, no por moda.',
  },
  {
    title: 'Arquitectura de sistemas',
    body: 'Diseñamos la estructura antes de escribir código. Revisamos arquitecturas existentes, identificamos puntos de quiebre y proponemos cambios concretos con impacto medible.',
  },
  {
    title: 'Staff augmentation',
    body: 'Sumamos ingenieros que se integran a tu equipo sin overhead de proceso. Perfiles senior que pueden liderar, revisar código y tomar decisiones técnicas desde el primer sprint.',
  },
  {
    title: 'Modernización de sistemas',
    body: 'Migramos sistemas legacy sin tirar todo desde cero. Estrategia incremental, cobertura de tests antes de tocar producción, y cero ventanas de corte que pongan en riesgo el negocio.',
  },
]

export default function Services() {
  const itemsRef = useRef([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    itemsRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="servicios" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>En qué podemos ayudarte</h2>
          <p className={styles.lead}>
            Trabajamos con equipos de tecnología y founders que necesitan más que capacidad de ejecución — necesitan criterio.
          </p>
        </header>

        <ul className={styles.grid} role="list">
          {SERVICES.map((service, i) => (
            <li
              key={service.title}
              ref={(el) => (itemsRef.current[i] = el)}
              className={styles.card}
              style={{ '--delay': `${i * 80}ms` }}
            >
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardBody}>{service.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
