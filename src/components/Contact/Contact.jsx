import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>¿Tenés un problema técnico concreto?</h2>
          <p className={styles.body}>
            Describilo. Sin formularios interminables: mandanos un mail con contexto y te respondemos en 48 horas con nuestra lectura inicial, sin compromiso.
          </p>
          <p className={styles.body}>
            Si preferís una llamada, incluí dos horarios posibles y coordinamos.
          </p>
          <a
            href="mailto:hola@bluepeak.io"
            className={styles.email}
            aria-label="Enviar email a hola@bluepeak.io"
          >
            hola@bluepeak.io
          </a>
        </div>

        <div className={styles.right} aria-hidden="true">
          {/* Elemento visual: bloque de código decorativo */}
          <pre className={styles.codeBlock}><code>{`// Lo que buscamos antes de arrancar

const contexto = {
  problema:   "el real, no el que se puede pedir",
  restricciones: ["tiempo", "equipo", "deuda"],
  objetivo:   "resultado de negocio medible",
}

const propuesta = diagnose(contexto)
// → sin diagnóstico, no hay propuesta seria`}</code></pre>
        </div>
      </div>
    </section>
  )
}
