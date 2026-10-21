# 07-Casos de Uso: Historias de Usuario y Flujos

## 1. Módulo de Presentación & Concientización (Hero)

### US01: Exploración Inicial de Contenido Preventivo
- **Como:** Visitante de la Expo.
- **Quiero:** Visualizar estadísticas, riesgos y explicaciones breves en la pantalla inicial antes de interactuar con el simulador.
- **Para:** Comprender el contexto general y la escala del problema del ciberdelito por ingeniería social en Argentina.
- **Criterios de Aceptación:**
  1. El sitio debe cargar la sección Hero con el título principal y la estética futurista en menos de 2 segundos.
  2. Los bloques desplegables ("¿Qué tan común es?", "Estadísticas", "Estafas comunes") deben abrirse y cerrarse con animaciones suaves al hacer clic.
  3. Debe incluir un botón CTA claro de `[ Iniciar Simulación ]` que desplace suavemente la pantalla hacia el menú de escenarios.

---

## 2. Módulo de Simulación Interactiva (Split-Screen)

### US02: Selección y Ejecución de Escenarios de Estafa
- **Como:** Visitante o Presentador del stand.
- **Quiero:** Seleccionar uno de los 4 escenarios de estafa y controlar el avance paso a paso mediante botones interactivos.
- **Para:** Observar cómo opera la mente del estafador en paralelo a la perspectiva de la víctima.
- **Criterios de Aceptación:**
  1. Al seleccionar un escenario, la pantalla debe estructurarse en modo split-screen (Atacante a la izquierda, Víctima a la derecha).
  2. Al presionar `[Paso Siguiente]`, debe activarse un indicador animado de *"Escribiendo..."* antes de renderizar el mensaje en la pantalla del receptor.
  3. Cada paso debe actualizar la tarjeta pedagógica con la explicación técnica de la vulnerabilidad y el consejo de prevención.

### US03: Simulación de Clonación de Voz con IA (Vishing)
- **Como:** Visitante del stand.
- **Quiero:** Reproducir un fragmento de audio sintético clonado dentro del Escenario 4.
- **Para:** Experimentar en primera persona la facilidad con la que la IA puede suplantar la identidad de un familiar o conocido.
- **Criterios de Aceptación:**
  1. El simulador debe reproducir audios de voz clonada precargados en `/public/audio/` (generados previamente con ElevenLabs), sin grabación de micrófono ni llamadas a APIs en runtime.
  2. El reproductor de voz dentro del chat debe mostrar la onda de audio animada y el botón de reproducción/pausa.
  3. El sistema debe emitir una advertencia explicativa sobre los parámetros de seguridad al finalizar la reproducción del audio.

### US04: Notificación de Compromiso de Cuenta
- **Como:** Usuario que está viendo la simulación.
- **Quiero:** Ver una señal visual de alerta crítica cuando la estafa se concreta con éxito en la simulación.
- **Para:** Tomar dimensión del momento exacto en que la víctima pierde el acceso o sufre el perjuicio económico.
- **Criterios de Aceptación:**
  1. Al llegar al paso final de la estafa, el marco del teléfono de la víctima debe cambiar a un estilo de alerta con resplandor rojo (`#F43F5E`).
  2. Debe mostrarse una pancarta de alerta con el texto *"¡Cuenta Comprometida!"* y el resumen del error cometido.
  3. Se debe habilitar un botón de `[ Reiniciar Escenario ]` o `[ Volver al Menú ]`.