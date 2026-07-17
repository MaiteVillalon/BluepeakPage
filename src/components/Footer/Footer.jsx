import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <span className={styles.brand}>Bluepeak</span>
        <span className={styles.copy}>
          © {new Date().getFullYear()} — Software engineering a medida
        </span>
      </div>
    </footer>
  )
}
