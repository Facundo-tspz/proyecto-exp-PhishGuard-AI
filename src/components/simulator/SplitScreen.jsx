import { motion } from 'framer-motion'
import ChatWindow from './ChatWindow.jsx'

function Telefono({ etiqueta, colorBadge, contacto, estado, overlay, pie, children }) {
  return (
    <div className="flex flex-col">
      <span
        className={`badge mb-2 w-fit border-none font-titulos text-xs font-semibold ${colorBadge}`}
      >
        {etiqueta}
      </span>
      <div className="flex-1 rounded-[24px] border-2 border-[#111B21]/70 bg-[#0B141A] p-2 shadow-[0_0_40px_rgba(0,0,0,0.45)]">
        <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-[#1F2C34]" />
        <div className="mb-1 flex items-center gap-2 rounded-t-lg border-b border-[#E9EDEF] bg-white px-2 pb-2 pt-1">
          <div className="avatar placeholder">
            <div className="flex w-8 items-center justify-center rounded-full bg-[#DFE5E7] leading-none text-[#54656F]">
              <span className="text-sm" aria-hidden="true">
                👤
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate font-cuerpo text-xs font-semibold text-[#111B21]">
              {contacto}
            </p>
            <p className="font-cuerpo text-[10px] text-[#667781]">{estado}</p>
          </div>
        </div>
        <div className="relative flex h-[24rem] flex-col md:h-[28rem]">
          {children}
          {overlay}
        </div>
        {pie}
      </div>
    </div>
  )
}

function OverlayPasos({ pasos, variante }) {
  const esAccion = variante === 'accion'

  return (
    <div className="pointer-events-none absolute inset-x-2 bottom-2 flex flex-col gap-2">
      {pasos.map((paso) => (
        <motion.div
          key={paso.stepId}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            esAccion
              ? { type: 'spring', damping: 22, stiffness: 260 }
              : { duration: 0.35 }
          }
          className={`rounded-2xl p-3 ${
            esAccion
              ? 'border border-[#00A884]/40 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]'
              : 'border border-red-300 bg-[#FFF1F1] shadow-[0_0_24px_rgba(244,63,94,0.3)]'
          }`}
        >
          <div className="mb-1 flex items-center justify-between gap-2">
            <span
              className={`font-cuerpo text-[10px] font-semibold uppercase tracking-wide ${
                esAccion ? 'text-[#00A884]' : 'text-[#B91C1C]'
              }`}
            >
              {esAccion ? '⚙️ Acción del atacante' : '⚠️ ¡ALERTA DE SEGURIDAD!'}
            </span>
            <span className="font-cuerpo text-[10px] text-[#667781]">
              {paso.time}
            </span>
          </div>
          <p
            className={`font-cuerpo text-xs ${esAccion ? 'text-[#111B21]' : 'font-semibold text-[#B91C1C]'}`}
          >
            {paso.message}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

function ComposerVictima({ onResponder, deshabilitado }) {
  return (
    <div className="flex items-center gap-2 border-t border-[#E9EDEF] bg-[#F0F2F5] p-2">
      <div className="min-w-0 flex-1 rounded-full bg-white px-3 py-2 font-cuerpo text-xs text-[#667781]">
        Escribe un mensaje…
      </div>
      <button
        type="button"
        onClick={onResponder}
        disabled={deshabilitado}
        className="btn btn-sm border-[#00A884]/60 bg-transparent font-cuerpo text-xs text-[#00A884] hover:bg-[#00A884]/10 disabled:border-[#E9EDEF] disabled:text-[#667781]/40"
      >
        Responder
      </button>
      <button
        type="button"
        onClick={onResponder}
        disabled={deshabilitado}
        aria-label="Enviar: avanzar la simulación un paso"
        className="btn btn-circle btn-sm border-none bg-[#00A884] text-white hover:bg-[#06CF9C] disabled:bg-[#E9EDEF] disabled:text-[#667781]/40"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  )
}

function PieAtacante() {
  return (
    <div className="border-t border-[#E9EDEF] bg-[#F0F2F5] px-3 py-2 text-center font-cuerpo text-[10px] text-[#667781]">
      Dispositivo del atacante — observación pasiva
    </div>
  )
}

export default function SplitScreen({ sim, onResponder, silenciado }) {
  const { visibles, esperando, pasoActual, terminado } = sim

  const acciones = visibles.filter(
    (p) => p.content === 'accion' && p.targetScreen === 'atacante',
  )
  const alertas = visibles.filter(
    (p) =>
      p.content === 'alerta' &&
      (p.targetScreen === 'victima' || p.targetScreen === 'ambas'),
  )

  return (
    <div className="mx-auto grid w-full max-w-6xl flex-1 gap-5 px-4 py-5 md:grid-cols-2 md:gap-8 md:px-6">
      <Telefono
        etiqueta="🔔 Atacante"
        colorBadge="bg-rojo-peligro/15 text-rojo-peligro"
        contacto="Estafador (nombre falso)"
        estado="en línea"
        overlay={<OverlayPasos pasos={acciones} variante="accion" />}
        pie={<PieAtacante />}
      >
        <ChatWindow
          lado="atacante"
          visibles={visibles}
          esperando={esperando}
          pasoActual={pasoActual}
          silenciado={silenciado}
        />
      </Telefono>

      <Telefono
        etiqueta="📱 Víctima"
        colorBadge="bg-cian-neon/15 text-cian-neon"
        contacto="Tu teléfono"
        estado="en línea"
        overlay={<OverlayPasos pasos={alertas} variante="alerta" />}
        pie={
          <ComposerVictima
            onResponder={onResponder}
            deshabilitado={terminado}
          />
        }
      >
        <ChatWindow
          lado="victima"
          visibles={visibles}
          esperando={esperando}
          pasoActual={pasoActual}
          silenciado={silenciado}
        />
      </Telefono>
    </div>
  )
}
