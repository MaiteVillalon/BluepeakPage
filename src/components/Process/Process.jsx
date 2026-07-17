import { Terminal } from '@/components/ui/terminal'
import styles from './Process.module.css'

// Comandos acortados para que entren cómodos en el ancho del terminal
const COMMANDS = [
  'git clone git@bluepeak.io:proyecto.git',
  'npm ci --prefer-offline',
  'npm run typecheck && npm run lint',
  'npm run test -- --coverage',
  'docker compose up --build -d',
  'npx infra deploy --env=staging',
]

const OUTPUTS = {
  0: ["✓ Cloning 'proyecto' (287 commits)"],
  1: ['✓ 203 packages installed', '✓ No vulnerabilities found'],
  2: ['✓ Type check: 0 errors', '✓ Lint: 0 warnings'],
  3: [
    'PASS  tests/api/auth.test.ts',
    'PASS  tests/api/billing.test.ts',
    'PASS  tests/services/payments.test.ts',
    '✓ 61 tests passed | Coverage: 93.7%',
  ],
  4: [
    'Building services...',
    '✓ api      (12.3s)',
    '✓ worker   (8.1s)',
    '✓ Stack healthy on :8080',
  ],
  5: [
    'Deploying to staging...',
    '✓ Rolling update: 3/3 pods',
    '✓ Health check passed',
    '✓ Done — https://staging.bluepeak.io',
  ],
}

export default function Process() {
  return (
    <section id="proceso" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>Cómo trabajamos</h2>
          <p className={styles.lead}>
            No es un proceso genérico de agencia. Cada proyecto arranca con un diagnóstico técnico real, avanza con ciclos cortos y entregables verificables, y cierra con el conocimiento dentro de tu equipo — no en nuestra cabeza.
          </p>
        </header>

        {/* Terminal centrado — misma proporción que la demo oficial */}
        <div className={styles.terminalWrap}>
          <p className={styles.caption}>Pipeline real de un proyecto tipo</p>
          <Terminal
            commands={COMMANDS}
            outputs={OUTPUTS}
            username="bluepeak"
            typingSpeed={40}
            delayBetweenCommands={680}
            enableSound={true}
          />
        </div>

        {/* Tres principios debajo — simples, sin competir con el terminal */}
        <ul className={styles.pillars}>
          <li>
            <strong>Diagnóstico primero</strong>
            <p>Entendemos la deuda, el equipo y las restricciones antes de proponer nada.</p>
          </li>
          <li>
            <strong>Tests antes de producción</strong>
            <p>Cobertura mínima pactada antes de tocar cualquier código crítico.</p>
          </li>
          <li>
            <strong>Decisiones documentadas</strong>
            <p>Cada decisión de arquitectura queda registrada con su razonamiento.</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
