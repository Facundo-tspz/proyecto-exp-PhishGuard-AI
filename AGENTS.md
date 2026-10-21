# Simulador de Estafas WhatsApp & IA: Instrucciones para la IA
Proyecto: PhishGuard AI — Simulador de Estafas Virtuales & IA
Stack Principal: React, Vite, Tailwind CSS, DaisyUI, Framer Motion.

## Índice de Documentación (`docs/`)
- `docs/PROGRESO.md`: **Bitácora de desarrollo** — estado actual, hoja de ruta e historial de sesiones.
- `docs/IDENTIDAD-MARCA.md`: Identidad visual, paleta de colores y componentes.
- `docs/01-CONTEXTO.md`: Objetivo del proyecto, escenario pedagógico y alcance.
- `docs/02-REQUERIMIENTOS.md`: Requerimientos funcionales (RF) y no funcionales (RNF).
- `docs/03-TECNOLOGIAS.md`: Justificación del stack tecnológico.
- `docs/04-ARQUITECTURA.md`: Estructura del proyecto y componentes React.
- `docs/05-DATOS.md`: Estructura JSON de los escenarios de estafa y chats.
- `docs/06-DISENO-UI.md`: Diseño de interfaz de doble pantalla (Víctima vs. Estafador).
- `docs/07-CASOS-DE-USO.md`: Historias de usuario y flujos de aceptación.
- `docs/08-ESTRUCTURA-PASO-A-PASO.md`: Guión exacto de los 4 escenarios de simulación.
- `docs/09-PLAN-DE-PRUEBAS.md`: Matriz de pruebas funcionales y casos límite.
- `docs/10-DESPLIEGUE-Y-MANTENIMIENTO.md`: Instalación, build, despliegue y mantenimiento.

## Lectura Obligatoria para la IA
Antes de generar código, consultá siempre:
1. `docs/PROGRESO.md` (para saber en qué paso se quedó el desarrollo)
2. `docs/IDENTIDAD-MARCA.md`
3. `docs/01-CONTEXTO.md`
4. `docs/04-ARQUITECTURA.md`

## Reglas Obligatorias de Desarrollo
- **Estilos y UI:** Usar Tailwind CSS junto con componentes semánticos de **DaisyUI** (especialmente componentes de chat, alertas, modales y botones).
- **Animaciones:** Utilizar **Framer Motion** para transiciones entre pantallas, simulación de mensajes de chat tipeándose en tiempo real y alertas de riesgo.
- **Marca:** Respetar la paleta de colores y tokens visuales definidos en `IDENTIDAD-MARCA.md` y el nombre canónico **PhishGuard AI**.
- **Voz / IA:** La demo de clonación de voz usa únicamente audios precargados en `/public/audio/` (generados previamente con ElevenLabs). No integrar APIs de voz en runtime ni requerir claves de API: la app debe funcionar 100% offline.
- **Datos:** Los escenarios se definen en `src/data/scenarios.json` con claves en inglés (ver `05-DATOS.md`). No hardcodear mensajes de chat dentro de componentes.
- **Sin Suposiciones:** Si un requerimiento o flujo de pantalla no está claro, consultar antes de escribir código.
- **Seguimiento de Progreso:** Al finalizar cada sesión de desarrollo, actualizar `docs/PROGRESO.md`: refrescar la sección "Estado Actual", marcar `[x]` la fase completada en la hoja de ruta y agregar una entrada nueva (fecha, resumen, decisiones, archivos tocados) al historial. El historial solo se agrega, nunca se borra.
