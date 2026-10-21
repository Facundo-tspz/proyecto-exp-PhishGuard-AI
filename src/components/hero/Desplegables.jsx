import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import PhoneNotificaciones from './visuals/PhoneNotificaciones.jsx'
import DonutEstadisticas from './visuals/DonutEstadisticas.jsx'
import Mascara3D from './visuals/Mascara3D.jsx'
import ComprobanteSaldo from './visuals/ComprobanteSaldo.jsx'
import EqualizadorIA from './visuals/EqualizadorIA.jsx'

const ESTADISTICAS = [
  {
    hasta: 89,
    sufijo: '%',
    texto: 'de los ciberataques exitosos comienzan con ingeniería social.',
    fuente: 'TODO: citar fuente',
  },
  {
    hasta: 6,
    sufijo: ' de 10',
    texto: 'estafas digitales ocurren en apps de mensajería como WhatsApp.',
    fuente: 'TODO: citar fuente',
  },
  {
    hasta: 3,
    sufijo: ' seg',
    texto: 'de audio publicado en redes alcanzan para clonar una voz con IA.',
    fuente: 'TODO: citar fuente',
  },
]

const ESCENARIOS = [
  {
    id: 'otp',
    icono: '📱',
    nombre: 'Código SMS (OTP)',
    tagline: 'Tu código de verificación es la llave de tu cuenta. Nunca lo compartas.',
    descripcion:
      'El atacante se hace pasar por un contacto, un banco o un servicio y te pide el código de 6 dígitos que llegó a tu celular por SMS, con una excusa urgente. Con ese código, vincula tu WhatsApp a otro dispositivo y vos quedás sin cuenta: él pasa a ser tú.',
    prevencion:
      'Nunca compartas códigos de verificación por SMS ni por llamada. Activá la Verificación en Dos Pasos (PIN) en WhatsApp.',
    Anim: () => <PhoneNotificaciones variante="otp" />,
  },
  {
    id: 'soporte',
    icono: '🎭',
    nombre: 'Falso Soporte / ANSES',
    tagline: 'Suplantan entidades para que instales apps o compartas tu pantalla.',
    descripcion:
      'Llega un mensaje formal que aparenta ser del banco, ANSES o un soporte técnico. Te piden instalar una "app de verificación" (que en realidad es software de control remoto como AnyDesk o TeamViewer) o que accedés a un enlace trucho. Detrás de la máscara siempre hay alguien que no es quien dice ser.',
    prevencion:
      'Las entidades oficiales NUNCA te piden claves, instalaciones ni compartir la pantalla. Colgá y contactá por el canal oficial.',
    Anim: Mascara3D,
  },
  {
    id: 'transferencia',
    icono: '💸',
    nombre: 'Transferencia trucha',
    tagline: 'Comprobantes falsos y urgencia emocional para sacarte plata real.',
    descripcion:
      'Te llega un comprobante editado de una "transferencia por error" por un monto alto y el remitente suplica por la devolución de la diferencia. El comprobante es trucho: el dinero nunca entró a tu cuenta, pero la plata que vos transferís de vuelta sí sale de tu bolsillo.',
    prevencion:
      'Antes de devolver cualquier dinero, revisá el saldo real en tu home banking. Un comprobante no es un crédito.',
    Anim: ComprobanteSaldo,
  },
  {
    id: 'voz-ia',
    icono: '🗣️',
    nombre: 'Clonación de voz IA',
    tagline: 'Una nota de voz "de tu hijo/a" puede no ser de tu hijo/a.',
    descripcion:
      'Con apenas unos segundos de audio publicados en redes (un story, un video), la Inteligencia Artificial clona el timbre y la forma de hablar de cualquier persona. El estafador envía una nota de voz urgente pidiendo una transferencia "porque no puedo entrar al home banking".',
    prevencion:
      'Ante un pedido urgente por audio, cortá y llamá por teléfono o acordá una palabra secreta en familia.',
    Anim: EqualizadorIA,
  },
]

const muelle = { type: 'spring', stiffness: 260, damping: 30 }

const entrada = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

function ContarA({ hasta, sufijo }) {
  const valor = useMotionValue(0)
  const [n, setN] = useState(0)

  useEffect(() => {
    const controles = animate(valor, hasta, {
      duration: 1.3,
      ease: 'easeOut',
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controles.stop()
  }, [hasta, valor])

  return (
    <span>
      {n.toLocaleString('es-AR')}
      {sufijo}
    </span>
  )
}

function Collapse({ id, titulo, abierta, onToggle, children, delay }) {
  return (
    <motion.div {...entrada(delay)} className="w-full">
      <details
        open={abierta}
        onToggle={(e) => {
          const abierto = e.currentTarget.open
          onToggle(id, abierto)
        }}
        className="collapse collapse-arrow border border-base-300 bg-base-200/50"
      >
        <summary className="collapse-title cursor-pointer list-none font-titulos text-lg font-semibold text-amarillo-ciber sm:text-xl">
          {titulo}
        </summary>
        <div className="collapse-content">{children}</div>
      </details>
    </motion.div>
  )
}

function EscenariosTipos() {
  const [expandido, setExpandido] = useState(null)
  const activo = ESCENARIOS.find((e) => e.id === expandido)
  const restantes = ESCENARIOS.filter((e) => e.id !== expandido)

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="font-cuerpo text-sm text-texto-principal/70">
          {expandido
            ? 'Tocá una miniatura para cambiar de estafa.'
            : 'Tocá cada tarjeta para ver cómo funciona el engaño.'}
        </p>
        {expandido && (
          <button
            type="button"
            onClick={() => setExpandido(null)}
            className="btn btn-ghost btn-sm font-cuerpo text-cian-neon"
          >
            ✕ Volver
          </button>
        )}
      </div>

      {expandido === null ? (
        <motion.div
          layout
          transition={muelle}
          className="grid gap-3 sm:grid-cols-2"
        >
          {ESCENARIOS.map((escenario) => (
            <motion.button
              key={escenario.id}
              layoutId={`esc-${escenario.id}`}
              transition={muelle}
              type="button"
              onClick={() => setExpandido(escenario.id)}
              className="rounded-[var(--radius-borde)] border border-base-300 bg-base-300/40 p-4 text-left transition-all duration-300 hover:border-cian-neon/70 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            >
              <div className="mb-1 text-2xl" aria-hidden="true">
                {escenario.icono}
              </div>
              <h3 className="font-titulos text-base font-semibold text-texto-principal">
                {escenario.nombre}
              </h3>
              <p className="mt-1 font-cuerpo text-sm text-texto-principal/70">
                {escenario.tagline}
              </p>
              <span className="mt-2 inline-block font-cuerpo text-xs text-cian-neon">
                ▸ Ver detalle
              </span>
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <motion.div
          layout
          transition={muelle}
          className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <motion.div
            key={expandido}
            layoutId={`esc-${activo.id}`}
            transition={muelle}
            className="flex flex-col rounded-[var(--radius-borde)] border border-cian-neon/60 bg-base-300/60 p-5 shadow-[0_0_24px_rgba(6,182,212,0.18)] sm:min-h-[30rem] sm:flex-1"
          >
            <motion.div
              key={activo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="flex flex-1 flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">
                  {activo.icono}
                </span>
                <h3 className="font-titulos text-xl font-bold text-amarillo-ciber">
                  {activo.nombre}
                </h3>
              </div>

              <div className="flex flex-1 items-center justify-center py-2">
                <activo.Anim />
              </div>

              <p className="font-cuerpo text-sm leading-relaxed text-texto-principal/85">
                {activo.descripcion}
              </p>

              <div className="rounded-[var(--radius-borde)] border border-cian-neon/40 bg-cian-neon/10 p-3">
                <p className="font-titulos text-xs font-semibold text-cian-neon">
                  💡 CÓMO PROTEGERTE
                </p>
                <p className="mt-1 font-cuerpo text-sm text-texto-principal/85">
                  {activo.prevencion}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:w-52 sm:flex-col sm:gap-2">
            {restantes.map((mini) => (
              <motion.button
                key={mini.id}
                layoutId={`esc-${mini.id}`}
                transition={muelle}
                type="button"
                onClick={() => setExpandido(mini.id)}
                className="flex items-center gap-2 rounded-[var(--radius-borde)] border border-base-300 bg-base-300/40 px-3 py-3 text-left transition-colors duration-300 hover:border-cian-neon/70 sm:w-full sm:gap-3 sm:px-4"
              >
                <span className="text-xl" aria-hidden="true">
                  {mini.icono}
                </span>
                <span className="font-titulos text-xs leading-tight font-semibold text-texto-principal sm:text-sm">
                  {mini.nombre}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {activo && (
        <p className="sr-only" aria-live="polite">
          Escenario expandido: {activo.nombre}
        </p>
      )}
    </div>
  )
}

export default function Desplegables() {
  const [abierta, setAbierta] = useState(1)

  const toggle = (id, abierto) => {
    setAbierta((prev) => (abierto ? id : prev === id ? null : prev))
  }

  return (
    <div className="flex flex-col gap-4">
      <Collapse
        id={1}
        delay={0}
        abierta={abierta === 1}
        onToggle={toggle}
        titulo="¿Qué tan común es?"
      >
        <p className="mb-6 font-cuerpo text-base leading-relaxed text-texto-principal/85">
          Las estafas en WhatsApp no son un problema lejano: cada día miles de
          personas reciben mensajes de &ldquo;familiares&rdquo;,
          &ldquo;bancos&rdquo; o &ldquo;soporte técnico&rdquo; que no son quien
          dicen ser. La ingeniería social no explota fallas del celular:
          explota la confianza, la urgencia y el miedo. Mirá lo que llega a un
          celular cualquiera en un solo día:
        </p>
        {abierta === 1 && <PhoneNotificaciones variante="comun" />}
      </Collapse>

      <Collapse
        id={2}
        delay={0.1}
        abierta={abierta === 2}
        onToggle={toggle}
        titulo="Estadísticas Clave"
      >
        <div className="alert alert-warning mb-6 border-amarillo-ciber/40 bg-amarillo-ciber/10 py-2 font-cuerpo text-sm text-amarillo-ciber">
          Cifras de ejemplo — reemplazar con fuentes verificables antes de la
          expo.
        </div>
        <ul className="mb-8 grid gap-6 text-center sm:grid-cols-3">
          {ESTADISTICAS.map((stat) => (
            <li key={stat.texto} className="flex flex-col items-center gap-2">
              <span className="font-titulos text-3xl font-bold text-cian-neon sm:text-4xl">
                {abierta === 2 && <ContarA hasta={stat.hasta} sufijo={stat.sufijo} />}
              </span>
              <span className="max-w-[16rem] font-cuerpo text-sm text-texto-principal/85">
                {stat.texto}
              </span>
              <span className="badge badge-outline badge-warning badge-sm">
                {stat.fuente}
              </span>
            </li>
          ))}
        </ul>
        {abierta === 2 && <DonutEstadisticas />}
      </Collapse>

      <Collapse
        id={3}
        delay={0.2}
        abierta={abierta === 3}
        onToggle={toggle}
        titulo="Tipos de Estafas"
      >
        <EscenariosTipos />
      </Collapse>
    </div>
  )
}
