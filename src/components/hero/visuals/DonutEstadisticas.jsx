import { motion } from 'framer-motion'

const SEGMENTOS = [
  { color: 'var(--color-cian-neon)', pct: 45, label: 'Ingeniería social' },
  { color: 'var(--color-amarillo-ciber)', pct: 35, label: 'Phishing / enlaces' },
  { color: 'var(--color-rojo-peligro)', pct: 20, label: 'Vishing / voz IA' },
]

const R = 54
const C = 2 * Math.PI * R

const SEGMENTOS_CON_OFFSET = SEGMENTOS.map((seg, i) => {
  const pctAntes = SEGMENTOS.slice(0, i).reduce((s, x) => s + x.pct, 0)
  return {
    ...seg,
    largo: (seg.pct / 100) * C,
    inicioDeg: (pctAntes / 100) * 360,
  }
})

export default function DonutEstadisticas() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg viewBox="0 0 140 140" className="h-40 w-40 -rotate-90">
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            className="stroke-base-300"
            strokeWidth="14"
          />
          {SEGMENTOS_CON_OFFSET.map((seg) => (
            <motion.circle
              key={seg.label}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${seg.largo} ${C}`}
              transform={`rotate(${seg.inicioDeg} 70 70)`}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.25 }}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-titulos text-lg font-bold text-texto-principal">
            100%
          </span>
          <span className="font-cuerpo text-[10px] text-texto-principal/60">
            cibercrimen
          </span>
        </div>
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        {SEGMENTOS.map((seg) => (
          <li
            key={seg.label}
            className="flex items-center gap-1.5 font-cuerpo text-xs text-texto-principal/80"
          >
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: seg.color }}
            />
            {seg.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
