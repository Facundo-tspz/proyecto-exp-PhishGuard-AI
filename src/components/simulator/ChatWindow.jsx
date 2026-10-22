import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ComprobanteChat from './ComprobanteChat.jsx'
import ReproductorAudio from '../common/ReproductorAudio.jsx'

const FONDO_CHAT = '#EFEAE2'
const TEXTO = '#111B21'
const META = '#667781'
const CHECKS = '#53BDEB'

const esPropio = (paso, lado) =>
  (lado === 'atacante' && paso.sender === 'estafador') ||
  (lado === 'victima' && paso.sender === 'victima')

const visibleEn = (p) =>
  p.content === 'texto' || p.content === 'audio' || p.content === 'imagen'

function IndicadorEscribiendo({ propio }) {
  return (
    <div className={`chat ${propio ? 'chat-end' : 'chat-start'}`}>
      <div
        className={`chat-bubble flex gap-1 border border-black/5 py-2 ${propio ? 'bg-[#D9FDD3]' : 'bg-white'}`}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#667781]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

function Burbuja({ paso, propio, silenciado }) {
  const { content, message, time } = paso
  const fondo = propio ? 'bg-[#D9FDD3]' : 'bg-white'

  const meta = (
    <div className="chat-header font-cuerpo text-[10px]" style={{ color: META }}>
      {time}
      {propio && (
        <span className="ml-1" style={{ color: CHECKS }} aria-label="entregado">
          ✓✓
        </span>
      )}
    </div>
  )

  if (content === 'imagen') {
    return (
      <motion.div
        initial={{ opacity: 0, x: propio ? 12 : -12, y: 6 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`chat ${propio ? 'chat-end' : 'chat-start'}`}
      >
        {meta}
        <div className={`chat-bubble border border-black/5 p-1.5 ${fondo}`}>
          <ComprobanteChat datos={paso.image} />
        </div>
        <div
          className="chat-footer mt-0.5 font-cuerpo text-[10px] italic"
          style={{ color: META }}
        >
          {message}
        </div>
      </motion.div>
    )
  }

  if (content === 'audio') {
    return (
      <motion.div
        initial={{ opacity: 0, x: propio ? 12 : -12, y: 6 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`chat ${propio ? 'chat-end' : 'chat-start'}`}
      >
        {meta}
        <div
          className={`chat-bubble flex items-center border border-black/5 p-2 ${fondo}`}
          style={{ color: TEXTO }}
        >
          <ReproductorAudio src={paso.audioUrl} silenciado={silenciado} />
        </div>
        <div className="chat-footer mt-1 w-full max-w-[16rem] text-left">
          <div
            className="font-cuerpo text-[9px] font-semibold uppercase tracking-wide"
            style={{ color: META }}
          >
            Transcripción
          </div>
          <p
            className="mt-0.5 font-cuerpo text-[11px] leading-snug"
            style={{ color: '#3B4A54' }}
          >
            {message}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: propio ? 12 : -12, y: 6 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`chat ${propio ? 'chat-end' : 'chat-start'}`}
    >
      {meta}
      <div
        className={`chat-bubble border border-black/5 font-cuerpo text-sm ${fondo}`}
        style={{ color: TEXTO }}
      >
        {message}
      </div>
    </motion.div>
  )
}

export default function ChatWindow({
  visibles,
  esperando,
  pasoActual,
  lado,
  silenciado,
}) {
  const contRef = useRef(null)

  useEffect(() => {
    if (contRef.current) {
      contRef.current.scrollTop = contRef.current.scrollHeight
    }
  }, [visibles.length, esperando])

  const mensajes = visibles.filter((p) => visibleEn(p))
  const muestraEscribiendo =
    esperando &&
    pasoActual &&
    pasoActual.sender !== 'sistema' &&
    pasoActual.content !== 'accion' &&
    pasoActual.content !== 'alerta'

  return (
    <div
      ref={contRef}
      className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-3"
      style={{ backgroundColor: FONDO_CHAT }}
    >
      {mensajes.map((paso) => (
        <Burbuja
          key={paso.stepId}
          paso={paso}
          propio={esPropio(paso, lado)}
          silenciado={silenciado}
        />
      ))}
      {muestraEscribiendo && (
        <IndicadorEscribiendo propio={esPropio(pasoActual, lado)} />
      )}
    </div>
  )
}
