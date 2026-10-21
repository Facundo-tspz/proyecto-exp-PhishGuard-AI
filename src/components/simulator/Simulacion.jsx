import SlimBar from './SlimBar.jsx'
import SplitScreen from './SplitScreen.jsx'
import TarjetaExplicativa from './TarjetaExplicativa.jsx'
import ControlesFlujo from './ControlesFlujo.jsx'
import useSimulacion from '../../hooks/useSimulacion.js'

export default function Simulacion({ escenario, onSalir }) {
  const sim = useSimulacion(escenario.steps)

  return (
    <div className="flex min-h-screen flex-col bg-fondo">
      <SlimBar titulo={escenario.title} onSalir={onSalir} />
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
