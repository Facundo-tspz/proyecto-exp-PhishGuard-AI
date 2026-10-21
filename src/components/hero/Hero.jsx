import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Desplegables from './Desplegables.jsx'

const TITULO_LINEA_1 = 'Robo de Identidad'

export default function Hero({ onIniciar }) {
  const [texto, setTexto] = useState('')

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTexto(TITULO_LINEA_1.slice(0, i))
      if (i >= TITULO_LINEA_1.length) clearInterval(id)
    }, 70)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div className="glow glow-cian" aria-hidden="true" />
      <div className="glow glow-amarillo" aria-hidden="true" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="badge badge-outline border-cian-neon/60 font-cuerpo text-cian-neon"
        >
          Expo IES Tinogasta · Tecnicatura en Desarrollo de Software
        </motion.span>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-titulos text-4xl font-bold leading-tight text-texto-principal sm:text-6xl md:text-7xl"
        >
          <span className="glitch inline-block">
            {texto}
            <span className="caret" aria-hidden="true">
              |
            </span>
          </span>
          <span className="mt-3 block text-2xl text-amarillo-ciber sm:text-4xl md:text-5xl">
            Estafas Virtuales en WhatsApp
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl font-cuerpo text-lg text-texto-principal/80"
        >
          Un simulador interactivo para ver, desde adentro, cómo opera un
          estafador y cómo la Inteligencia Artificial puede clonar incluso tu
          voz. Mirá la estafa paso a paso — y aprendé a no caer.
        </motion.p>

        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          onClick={onIniciar}
          className="btn btn-outline border-cian-neon font-titulos text-base tracking-wide text-cian-neon transition-shadow duration-300 hover:bg-cian-neon hover:text-fondo hover:shadow-[0_0_30px_rgba(6,182,212,0.55)] sm:text-lg"
        >
          [ Iniciar Simulación ]
        </motion.button>
      </section>

      <section
        id="secciones-educativas"
        className="relative z-10 mx-auto max-w-4xl scroll-mt-8 px-6 pb-24"
      >
        <Desplegables />
      </section>
    </div>
  )
}
