import { AnimatePresence, motion } from 'framer-motion'

const EMISOR = {
  estafador: {
    label: '🔔 El atacante',
    color: 'border-rojo-peligro/50 bg-rojo-peligro/10 text-rojo-peligro',
  },
  victima: {
    label: '📱 La víctima',
    color: 'border-cian-neon/50 bg-cian-neon/10 text-cian-neon',
  },
  sistema: {
    label: '⚠️ Sistema',
    color: 'border-error/50 bg-error/10 text-error',
  },
}

export default function TarjetaExplicativa({ paso, pasoIdx, total }) {
  if (!paso?.explanation) return null
  const meta = EMISOR[paso.sender] ?? EMISOR.sistema

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={paso.stepId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="rounded-[var(--radius-borde)] border border-amarillo-ciber/40 bg-base-200/70 p-4 shadow-[0_0_20px_rgba(245,158,11,0.08)]"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span
              className={`badge border font-cuerpo text-[10px] ${meta.color}`}
            >
              {meta.label}
            </span>
            <span className="font-cuerpo text-[11px] text-texto-principal/50">
              Técnica · Paso {pasoIdx + 1} / {total}
            </span>
          </div>
          <p className="font-cuerpo text-sm text-texto-principal">
            <span className="font-semibold text-amarillo-ciber">
              Vulnerabilidad:
            </span>{' '}
            {paso.explanation.vulnerability}
          </p>
          <p className="mt-2 font-cuerpo text-sm text-texto-principal/85">
            <span className="font-semibold text-cian-neon">🛡️ Consejo:</span>{' '}
            {paso.explanation.preventionTip}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
