import NodeGraph from '../NodeGraph/NodeGraph.jsx'
import styles from './VideoHero.module.css'

export default function VideoHero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Animación generativa de fondo */}
      <NodeGraph />

      {/* Overlay que integra la animación con el fondo oscuro */}
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
