import { motion } from 'framer-motion'

const SEGMENTOS = [
  {
    color: 'var(--color-rojo-peligro)',
    pct: 84.2,
    label: 'Acceso ilegítimo + fraude',
  },
  {
    color: 'var(--color-amarillo-ciber)',
    pct: 15.8,
    label: 'Solo acceso ilegítimo',
  },
]

const R = 54
const C = 2 * Math.PI * R

const fmtPct = (n) =>
  n.toLocaleString('es-AR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

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
    <figure className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg
          viewBox="0 0 140 140"
          className="h-40 w-40 -rotate-90"
          role="img"
          aria-label="Donut: 84,2% de los reportes de WhatsApp terminó en fraude y 15,8% fue solo acceso ilegítimo."
        >
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
              strokeLinecap="butt"
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
            84,2%
          </span>
          <span className="font-cuerpo text-[10px] text-texto-principal/60">
            con fraude
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
            {seg.label} · {fmtPct(seg.pct)}%
          </li>
        ))}
      </ul>

      <figcaption className="max-w-xs text-center font-cuerpo text-xs leading-relaxed text-texto-principal/65">
        5.509 reportes de WhatsApp (2024): 4.637 usurpaciones con fraude + 872
        accesos ilegítimos. Fuente:{' '}
        <a
          href="https://www.mpf.gob.ar/ufeci/files/2025/06/UFECI_informe_anual_2024-1.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cian-neon hover:underline"
        >
          UFECI 2024
        </a>
        .
      </figcaption>
    </figure>
  )
}
