// ─── URL del stream HLS — reemplazá por el tuyo ──────────────────
const HLS_SRC = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
// ─────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import styles from './VideoHero.module.css'

export default function VideoHero() {
  const videoRef = useRef(null)
  const hlsRef   = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let cancelled = false

    const init = async () => {
      // Reproducción nativa HLS (Safari)
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = HLS_SRC
        video.play().catch(() => {})
        return
      }

      // Fallback: hls.js (carga diferida — no bloquea el bundle inicial)
      const { default: Hls } = await import('hls.js')
      if (cancelled || !Hls.isSupported()) return

      const hls = new Hls({ maxBufferLength: 30 })
      hlsRef.current = hls
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!cancelled) video.play().catch(() => {})
      })
    }

    init()

    return () => {
      cancelled = true
      hlsRef.current?.destroy()
      hlsRef.current = null
    }
  }, [])

  return (
    <section className={styles.hero} aria-label="Hero">
      <video
        ref={videoRef}
        className={styles.video}
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

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
