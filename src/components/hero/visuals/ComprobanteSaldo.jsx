import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

export default function ComprobanteSaldo() {
  const saldo = useMotionValue(165000)
  const textoSaldo = useTransform(saldo, (v) =>
    `$${Math.round(v).toLocaleString('es-AR')}`,
  )
  const colorSaldo = useTransform(saldo, [165000, 1000], [
    'var(--color-texto-principal)',
    'var(--color-rojo-peligro)',
  ])

  useEffect(() => {
    const controles = animate(saldo, 0, {
      duration: 2.2,
      delay: 0.8,
      ease: 'easeInOut',
    })
    return () => controles.stop()
  }, [saldo])

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <div className="w-48 rounded-[var(--radius-borde)] border border-success/50 bg-success/10 p-3 text-center">
        <span className="badge badge-success mb-2 text-base-100">Acreditado ✓</span>
        <p className="font-cuerpo text-[10px] text-texto-principal/60">
          Comprobante de transferencia
        </p>
        <p className="font-titulos text-xl font-bold text-success">$150.000</p>
      </div>

      <motion.span
        aria-hidden="true"
        className="text-3xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.9, 1.1, 0.9], opacity: 1 }}
        transition={{ delay: 2.8, duration: 1.2, repeat: Infinity }}
      >
        💸
      </motion.span>

      <div className="w-48 rounded-[var(--radius-borde)] border border-base-300 bg-base-200 p-3 text-center">
        <p className="font-cuerpo text-[10px] text-texto-principal/60">
          Tu saldo real
        </p>
        <motion.p className="font-titulos text-xl font-bold">
          <motion.span style={{ color: colorSaldo }}>
            {textoSaldo}
          </motion.span>
        </motion.p>
        <p className="mt-1 font-cuerpo text-[10px] text-rojo-peligro/90">
          La víctima transfirió plata real por un comprobante falso
        </p>
      </div>
    </div>
  )
}
