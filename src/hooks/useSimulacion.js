import { useCallback, useEffect, useState } from 'react'

const DURACION_ESCRIBIENDO = 900

export default function useSimulacion(steps) {
  const [pasoIdx, setPasoIdx] = useState(0)
  const [esperando, setEsperando] = useState(false)
  const total = steps.length
  const terminado = pasoIdx >= total - 1

  useEffect(() => {
    if (!esperando) return undefined
    const timer = setTimeout(
      () => setEsperando(false),
      DURACION_ESCRIBIENDO,
    )
    return () => clearTimeout(timer)
  }, [esperando])

  const siguiente = useCallback(() => {
    if (pasoIdx >= total - 1) return
    const proximo = steps[pasoIdx + 1]
    setPasoIdx(pasoIdx + 1)
    if (proximo.content === 'accion' || proximo.content === 'alerta') {
      setEsperando(false)
    } else {
      setEsperando(true)
    }
  }, [pasoIdx, total, steps])

  const anterior = useCallback(() => {
    setEsperando(false)
    setPasoIdx((i) => Math.max(0, i - 1))
  }, [])

  const reiniciar = useCallback(() => {
    setEsperando(false)
    setPasoIdx(0)
  }, [])

  const pasoActual = steps[pasoIdx]
  const visibles = esperando
    ? steps.slice(0, pasoIdx)
    : steps.slice(0, pasoIdx + 1)

  return {
    pasoIdx,
    total,
    pasoActual,
    visibles,
    esperando,
    terminado,
    siguiente,
    anterior,
    reiniciar,
  }
}
