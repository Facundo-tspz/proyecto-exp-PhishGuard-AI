import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const VERDE = '#00A884'
const GRIS = '#8696A0'
const META = '#667781'

const ALTURAS = [
  4, 7, 10, 6, 12, 8, 5, 11, 7, 14, 9, 6, 12, 8, 4, 10, 7, 13, 6, 9, 5, 11,
  8, 6,
]

let audioActivo = null

function formatear(segundos) {
  if (!Number.isFinite(segundos) || segundos < 0) return '0:00'
  const total = Math.floor(segundos)
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}

function moverAudio(audio, segundos) {
  audio.currentTime = segundos
}

export default function ReproductorAudio({ src, silenciado = false }) {
  const audioRef = useRef(null)
  const [reproduciendo, setReproduciendo] = useState(false)
  const [actual, setActual] = useState(0)
  const [duracion, setDuracion] = useState(0)
  const [error, setError] = useState(!src)

  useEffect(() => {
    const audio = audioRef.current
    return () => {
      if (!audio) return
      audio.pause()
      if (audioActivo === audio) audioActivo = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (silenciado && audio && !audio.paused) audio.pause()
  }, [silenciado])

  const alternar = () => {
    const audio = audioRef.current
    if (!audio || !src || silenciado) return
    if (error) {
      setError(false)
      if (audioActivo && audioActivo !== audio) audioActivo.pause()
      audioActivo = audio
      const url = new URL(src, window.location.href)
      url.searchParams.set('r', String(Date.now()))
      audio.src = url.href
      audio.load()
      audio.play().catch(() => setError(true))
      return
    }
    if (audio.paused) {
      if (audioActivo && audioActivo !== audio) audioActivo.pause()
      audioActivo = audio
      audio.play().catch(() => setReproduciendo(false))
    } else {
      audio.pause()
    }
  }

  const buscar = (evento) => {
    const audio = audioRef.current
    if (!audio || !duracion) return
    const rect = evento.currentTarget.getBoundingClientRect()
    const ratio = Math.min(
      1,
      Math.max(0, (evento.clientX - rect.left) / rect.width),
    )
    moverAudio(audio, ratio * duracion)
    setActual(ratio * duracion)
  }

  const progreso = duracion ? Math.min(100, (actual / duracion) * 100) : 0
  const habilitado = Boolean(src) && !silenciado

  return (
    <div className="flex min-w-[12.5rem] items-center gap-2">
      <button
        type="button"
        onClick={alternar}
        disabled={!habilitado}
        aria-label={
          error
            ? 'Reintentar nota de voz'
            : reproduciendo
              ? 'Pausar nota de voz'
              : 'Reproducir nota de voz'
        }
        title={
          silenciado
            ? 'Sonido silenciado'
            : error
              ? 'Reintentar audio'
              : undefined
        }
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] text-white transition-opacity disabled:opacity-40"
        style={{ backgroundColor: VERDE }}
      >
        <span aria-hidden="true">{reproduciendo ? '❚❚' : '▶'}</span>
      </button>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex h-4 items-end gap-0.5" aria-hidden="true">
          {ALTURAS.map((altura, i) => {
            const activo = (i / ALTURAS.length) * 100 <= progreso
            return (
              <motion.span
                key={i}
                className="w-0.5 rounded-full"
                style={{
                  height: `${altura}px`,
                  backgroundColor: activo ? VERDE : GRIS,
                  transformOrigin: 'bottom',
                }}
                animate={
                  reproduciendo ? { scaleY: [0.35, 1, 0.5] } : { scaleY: 1 }
                }
                transition={
                  reproduciendo
                    ? {
                        duration: 0.9,
                        repeat: Infinity,
                        delay: i * 0.03,
                        ease: 'easeInOut',
                      }
                    : { duration: 0.2 }
                }
              />
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={buscar}
            disabled={!habilitado || !duracion}
            aria-label="Buscar en la nota de voz"
            className="relative h-1 flex-1 cursor-pointer rounded-full bg-black/10 disabled:cursor-default"
          >
            <span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${progreso}%`, backgroundColor: VERDE }}
            />
          </button>
          {error ? (
            <button
              type="button"
              onClick={alternar}
              className="shrink-0 font-cuerpo text-[9px] underline"
              style={{ color: META }}
            >
              Reintentar
            </button>
          ) : (
            <span
              className="shrink-0 font-cuerpo text-[9px] tabular-nums"
              style={{ color: META }}
            >
              {`${formatear(actual)} / ${duracion ? formatear(duracion) : '--:--'}`}
            </span>
          )}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src || undefined}
        preload="metadata"
        onLoadedMetadata={(evento) => {
          const total = evento.currentTarget.duration
          setDuracion(Number.isFinite(total) ? total : 0)
          setError(false)
        }}
        onTimeUpdate={(evento) => setActual(evento.currentTarget.currentTime)}
        onPlay={() => setReproduciendo(true)}
        onPause={() => setReproduciendo(false)}
        onEnded={() => {
          setReproduciendo(false)
          setActual(0)
          if (audioRef.current) moverAudio(audioRef.current, 0)
          if (audioActivo === audioRef.current) audioActivo = null
        }}
        onError={() => {
          setError(true)
          setReproduciendo(false)
        }}
        className="hidden"
      />
    </div>
  )
}
