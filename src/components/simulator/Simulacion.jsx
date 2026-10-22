import { useEffect, useRef } from 'react'
import SlimBar from './SlimBar.jsx'
import SplitScreen from './SplitScreen.jsx'
import TarjetaExplicativa from './TarjetaExplicativa.jsx'
import ControlesFlujo from './ControlesFlujo.jsx'
import useSimulacion from '../../hooks/useSimulacion.js'
import useSfx from '../../hooks/useSfx.js'

export default function Simulacion({ escenario, onSalir }) {
  const sim = useSimulacion(escenario.steps)
  const { reproducir, silenciado, alternarSilencio } = useSfx()
  const ultimoSonado = useRef(null)
  const { pasoIdx, esperando } = sim

  useEffect(() => {
    if (esperando) return
    if (pasoIdx === 0) return
    if (ultimoSonado.current !== null && pasoIdx <= ultimoSonado.current) {
      ultimoSonado.current = pasoIdx
      return
    }
    ultimoSonado.current = pasoIdx
    const paso = escenario.steps[pasoIdx]
    if (!paso) return
    if (paso.content === 'alerta') reproducir('alerta')
    else if (paso.content === 'accion') reproducir('accion')
    else reproducir(paso.sender === 'victima' ? 'saliente' : 'entrante')
  }, [pasoIdx, esperando, escenario.steps, reproducir])

  return (
    <div className="flex min-h-screen flex-col bg-fondo">
      <SlimBar
        titulo={escenario.title}
        onSalir={onSalir}
        silenciado={silenciado}
        onAlternarSonido={alternarSilencio}
      />
      <SplitScreen sim={sim} onResponder={sim.siguiente} />
      {!sim.esperando && (
        <TarjetaExplicativa
          paso={sim.pasoActual}
          pasoIdx={sim.pasoIdx}
          total={sim.total}
        />
      )}
      <ControlesFlujo sim={sim} />
    </div>
  )
}
