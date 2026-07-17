import { Terminal } from '@/components/ui/terminal'
import styles from './Process.module.css'

const COMMANDS = [
  'git clone git@bluepeak.io:cliente/plataforma.git',
  'cd plataforma && npm ci --prefer-offline',
  'npm run typecheck && npm run lint',
  'npm run test -- --coverage --watchAll=false',
  'docker compose -f docker-compose.staging.yml up --build -d',
  'npx infra deploy --env=staging --confirm',
]

const OUTPUTS = {
  0: ["✓ Cloning 'plataforma' (287 commits)"],
  1: ['✓ 203 packages installed', '✓ No vulnerabilities found'],
  2: ['✓ Type check: 0 errors', '✓ Lint: 0 warnings'],
  3: [
    'PASS  tests/api/auth.test.ts',
    'PASS  tests/api/billing.test.ts',
    'PASS  tests/services/notifications.test.ts',
    '✓ 61 tests passed | Coverage: 93.7%',
  ],
  4: [
    'Building services...',
    '✓ api        (12.3s)',
    '✓ worker     (8.1s)',
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
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>Cómo trabajamos</h2>
          <p className={styles.lead}>
            No es un proceso genérico de agencia. Cada proyecto arranca con un diagnóstico técnico real, avanza con ciclos cortos y entregables verificables, y cierra con el conocimiento dentro de tu equipo — no en nuestra cabeza.
          </p>
          <ul className={styles.pillars}>
            <li>
              <span className={styles.pillarMark} />
              <div>
                <strong>Diagnóstico primero</strong>
                <p>Antes de proponer, entendemos la deuda, el equipo y las restricciones reales del negocio.</p>
              </div>
            </li>
            <li>
              <span className={styles.pillarMark} />
              <div>
                <strong>Tests antes de cambiar producción</strong>
                <p>Cobertura mínima pactada antes de tocar cualquier código crítico.</p>
              </div>
            </li>
            <li>
              <span className={styles.pillarMark} />
              <div>
                <strong>Decisiones documentadas</strong>
                <p>Cada decisión de arquitectura queda registrada con su razonamiento.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          <p className={styles.terminalCaption}>
            Pipeline real de un proyecto tipo
          </p>
          <Terminal
            commands={COMMANDS}
            outputs={OUTPUTS}
            username="bluepeak"
            typingSpeed={38}
            delayBetweenCommands={650}
            enableSound={false}
            className={styles.terminal}
          />
        </div>
      </div>
    </section>
  )
}
