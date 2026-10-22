import { motion } from 'framer-motion'

export default function TourGuiado({ activo, onToggle }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      onClick={onToggle}
      aria-pressed={activo}
      className={`btn fixed bottom-6 right-4 z-50 border font-titulos text-xs tracking-wide shadow-[0_0_24px_rgba(6,182,212,0.35)] sm:btn-md sm:text-sm ${
        activo
          ? 'border-amarillo-ciber/70 bg-amarillo-ciber/10 text-amarillo-ciber hover:bg-amarillo-ciber/20'
          : 'border-cian-neon/70 bg-fondo/90 text-cian-neon hover:bg-cian-neon/10'
      }`}
    >
      {activo ? '⏹ Detener demo' : '▶ Demo guiada'}
    </motion.button>
  )
}
