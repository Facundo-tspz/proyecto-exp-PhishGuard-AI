import { useCallback, useEffect, useState } from 'react'

const CLAVE_MUTE = 'phishguard-sfx-mute'

const ARCHIVOS = {
  entrante: { url: '/audio/sfx/entrante.mp3', volumen: 0.35 },
  saliente: { url: '/audio/sfx/saliente.mp3', volumen: 0.3 },
  alerta: { url: '/audio/sfx/alerta.mp3', volumen: 0.45 },
  accion: { url: '/audio/sfx/accion.mp3', volumen: 0.3 },
}

let cacheAudios = null

function obtenerAudios() {
  if (!cacheAudios) {
    cacheAudios = {}
    Object.entries(ARCHIVOS).forEach(([tipo, { url, volumen }]) => {
      const audio = new Audio(url)
      audio.preload = 'auto'
      audio.volume = volumen
      cacheAudios[tipo] = audio
    })
  }
  return cacheAudios
}

function leerSilencio() {
  try {
    return localStorage.getItem(CLAVE_MUTE) === '1'
  } catch {
    return false
  }
}

function guardarSilencio(valor) {
  try {
    localStorage.setItem(CLAVE_MUTE, valor ? '1' : '0')
  } catch {
    return
  }
}

export default function useSfx() {
  const [silenciado, setSilenciado] = useState(leerSilencio)

  useEffect(() => {
    obtenerAudios()
  }, [])

  const reproducir = useCallback(
    (tipo) => {
      if (silenciado) return
      const audio = obtenerAudios()[tipo]
      if (!audio) return
      audio.currentTime = 0
      audio.play().catch(() => {})
    },
    [silenciado],
  )

  const alternarSilencio = useCallback(() => {
    setSilenciado((prev) => {
      const siguiente = !prev
      guardarSilencio(siguiente)
      return siguiente
    })
  }, [])

  return { reproducir, silenciado, alternarSilencio }
}
