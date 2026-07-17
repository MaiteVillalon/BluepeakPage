import { useEffect, useState } from 'react'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Servicios',       href: '#servicios' },
  { label: 'Cómo trabajamos', href: '#proceso' },
  { label: 'Contacto',        href: '#contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <a href="#" className={styles.logo} aria-label="Bluepeak — volver al inicio">
        Bluepeak
      </a>

      <nav aria-label="Navegación principal">
        <ul className={styles.navList} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={styles.navLink}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
