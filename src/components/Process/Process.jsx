import { useEffect, useRef } from 'react'
import styles from './Process.module.css'

const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico técnico',
    body: 'Antes de proponer una solución, entendemos el contexto real: qué tiene el sistema, qué deuda acumuló y cuáles son las restricciones del negocio. Sin diagnóstico no hay propuesta seria.',
  },
  {
    n: '02',
    title: 'Diseño de solución',
    body: 'Definimos arquitectura, stack y plan de trabajo con criterios explícitos. Cada decisión técnica tiene una razón documentada — no "así lo hacemos siempre".',
  },
  {
    n: '03',
    title: 'Ejecución iterativa',
    body: 'Ciclos cortos con entregables reales. Revisión de código, cobertura de tests y comunicación directa con el equipo técnico del cliente — sin intermediarios que distorsionen la información.',
  },
  {
    n: '04',
    title: 'Transferencia y cierre',
    body: 'El conocimiento queda en tu equipo, no en nuestra cabeza. Documentación de decisiones, onboarding del equipo interno y seguimiento post-entrega.',
  },
]

export default function Process() {
  const stepsRef = useRef([])

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
      { threshold: 0.12 }
    )

    stepsRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="proceso" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Cómo trabajamos</h2>
          <p className={styles.lead}>
            No es un proceso genérico de agencia. Es la forma en que estructuramos el trabajo para que el riesgo sea visible desde el día uno.
          </p>
        </header>

        <ol className={styles.steps} role="list">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              ref={(el) => (stepsRef.current[i] = el)}
              className={styles.step}
              style={{ '--delay': `${i * 100}ms` }}
            >
              <span className={styles.stepNumber} aria-hidden="true">{step.n}</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
