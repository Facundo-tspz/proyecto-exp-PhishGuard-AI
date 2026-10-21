# 04-Arquitectura: Cómo se organiza el código

## Árbol de Carpetas del Proyecto

PhishGuard-AI/
├── public/
│   ├── audio/              # Notas de voz clonadas pregeneradas con ElevenLabs y audios de respaldo
│   └── img/                # Avatares, logos y capturas para la interfaz
├── src/
│   ├── assets/             # Recursos estáticos y estilos globales
│   │   └── globals.css     # Tokens de la paleta (@theme Tailwind v4 + :root), plugin DaisyUI y estilos base
│   ├── components/
│   │   ├── common/         # Componentes reutilizables (Navbar, Footer, Botones)
│   │   ├── hero/           # Sección de presentación inicial, estadísticas y desplegables
│   │   └── simulator/      # Componentes del simulador (SplitScreen, ChatWindow, TarjetaExplicativa)
│   ├── data/
│   │   └── scenarios.json  # Estructuras de datos con los pasos, mensajes y flujos de los 4 escenarios
│   ├── hooks/              # Custom hooks (gestión de audio, control de pasos, temporizadores)
│   ├── App.jsx             # Componente raíz que enlaza el Hero con el Simulador
│   └── main.jsx            # Punto de entrada de React
├── package.json            # Dependencias del proyecto (React, Framer Motion, etc.)
└── README.md               # Documentación general del repositorio

> **Nota (Tailwind v4):** La configuración de Tailwind CSS y DaisyUI es **CSS-first**: se hace en `src/assets/globals.css` mediante `@import "tailwindcss"`, `@plugin "daisyui"` y el bloque `@theme` con los tokens de marca. No existe `tailwind.config.js` (el plugin `@tailwindcss/vite` está declarado en `vite.config.js`).

---

## Función de cada módulo principal

- **`src/components/hero/`**: Contiene la interfaz de presentación inicial para la expo, estructurada con tipografía futurista y animaciones de bienvenida.
- **`src/components/simulator/`**: El núcleo interactivo de doble pantalla (*Split-Screen*), encargado de renderizar simultáneamente los chats de la víctima y el atacante, los efectos de tipeo y las alertas de riesgo.
- **`src/data/scenarios.json`**: Archivo centralizado que almacena los textos, los remitentes, las respuestas y las explicaciones pedagógicas de cada uno de los 4 escenarios de estafa.
- **`src/hooks/`**: Lógica reutilizable para el manejo de estados temporales, reproducción de audios y control secuencial de los pasos de la simulación.
- **`src/assets/globals.css`**: Archivo donde se centralizan las variables de color corporativas (fondo negro carbón, amarillo ciber, cian neón) para asegurar consistencia visual en toda la app.