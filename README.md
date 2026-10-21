# PhishGuard AI — Simulador de Estafas Virtuales & IA

Simulador web interactivo de doble pantalla (Atacante vs. Víctima) para educar sobre las estafas más comunes en WhatsApp y el impacto de la clonación de voz con IA. Proyecto desarrollado para la Expo de la Tecnicatura Superior en Desarrollo de Software del IES Tinogasta.

## Escenarios

1. **Robo de Cuenta por Código SMS (OTP)** — Ingeniería social con códigos de verificación.
2. **Falso Soporte Técnico / Turnos / ANSES** — Suplantación de entidades y enlaces maliciosos.
3. **Transferencia Falsa / Comprobante Trucho** — Manipulación de comprobantes de pago.
4. **Suplantación por IA / Clonación de Voz (Vishing)** — Notas de voz sintéticas pregeneradas.

## Stack

- **React 18** + **Vite** — interfaz y build ultrarrápido.
- **Tailwind CSS** + **DaisyUI** — sistema de componentes (chats, alertas, botones).
- **Framer Motion** — animaciones, tipeo en tiempo real y transiciones.
- **Datos en JSON** (`src/data/scenarios.json`) — sin backend ni base de datos.
- **100% offline** — la demo de voz usa audios precargados en `public/audio/` (sin APIs en runtime).

## Ejecución

```bash
npm install
npm run dev      # desarrollo (http://localhost:5173)
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
```

## Documentación

Toda la documentación del proyecto vive en [`docs/`](docs/):

| Doc | Contenido |
| :--- | :--- |
| [`PROGRESO.md`](docs/PROGRESO.md) | Bitácora de desarrollo: estado actual, hoja de ruta e historial |
| [`IDENTIDAD-MARCA.md`](docs/IDENTIDAD-MARCA.md) | Identidad visual, paleta y tokens de diseño |
| [`01-CONTEXTO.md`](docs/01-CONTEXTO.md) | Objetivo, público y alcance |
| [`02-REQUERIMIENTOS.md`](docs/02-REQUERIMIENTOS.md) | Requerimientos funcionales y no funcionales |
| [`03-TECNOLOGIAS.md`](docs/03-TECNOLOGIAS.md) | Stack y justificación tecnológica |
| [`04-ARQUITECTURA.md`](docs/04-ARQUITECTURA.md) | Estructura del proyecto |
| [`05-DATOS.md`](docs/05-DATOS.md) | Esquema del `scenarios.json` |
| [`06-DISENO-UI.md`](docs/06-DISENO-UI.md) | Diseño de la interfaz split-screen |
| [`07-CASOS-DE-USO.md`](docs/07-CASOS-DE-USO.md) | Historias de usuario y flujos |
| [`08-ESTRUCTURA-PASO-A-PASO.md`](docs/08-ESTRUCTURA-PASO-A-PASO.md) | Guión exacto de los 4 escenarios |
| [`09-PLAN-DE-PRUEBAS.md`](docs/09-PLAN-DE-PRUEBAS.md) | Matriz de pruebas y casos límite |
| [`10-DESPLIEGUE-Y-MANTENIMIENTO.md`](docs/10-DESPLIEGUE-Y-MANTENIMIENTO.md) | Instalación, build, despliegue y mantenimiento |
