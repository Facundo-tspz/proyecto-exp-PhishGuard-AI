import { useState } from 'react'
import Hero from './components/hero/Hero.jsx'
import MenuEscenarios from './components/simulator/MenuEscenarios.jsx'
import Simulacion from './components/simulator/Simulacion.jsx'
import datos from './data/scenarios.json'

const ESCENARIOS = datos.scenarios

function App() {
  const [vista, setVista] = useState('inicio')
  const [escenarioId, setEscenarioId] = useState(null)

  const escenario =
    vista === 'simulacion'
      ? ESCENARIOS.find((e) => e.id === escenarioId)
      : undefined

  const verMenu = vista === 'menu' || (vista === 'simulacion' && !escenario)

  if (verMenu) {
    return (
      <MenuEscenarios
        escenarios={ESCENARIOS}
        onElegir={(id) => {
          setEscenarioId(id)
          setVista('simulacion')
        }}
        onSalir={() => setVista('inicio')}
      />
    )
  }

  if (escenario) {
    return (
      <Simulacion escenario={escenario} onSalir={() => setVista('menu')} />
    )
  }

  return <Hero onIniciar={() => setVista('menu')} />
}

export default App
