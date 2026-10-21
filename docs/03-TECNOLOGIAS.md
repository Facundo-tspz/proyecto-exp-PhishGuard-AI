# 03-Tecnologías: Con qué lo construimos

## Stack Tecnológico Elegido

| Categoría | Tecnología / Librería | Motivo de la Elección |
| :--- | :--- | :--- |
| **Librería UI** | **React 18+** | Permite construir una interfaz basada en componentes modulares y reutilizables (como los teléfonos simulados, globos de chat y botones de navegación). |
| **Empaquetador / Build Tool** | **Vite** | Proporciona un entorno de desarrollo ultra rápido con Hot Module Replacement (HMR) e iniciación instantánea, ideal para pruebas fluidas durante la expo. |
| **Framework de Estilos** | **Tailwind CSS** | Facilita el estilizado rápido mediante clases de utilidad para personalizar colores neón, bordes, tamaños y diseños de pantalla dividida (split-screen). |
| **Componentes UI** | **DaisyUI** | Aporta componentes de interfaz prediseñados y accesibles (en especial la estructura de chats `chat-start`/`chat-end`, alertas y modales) acelerando la maquetación del simulador. |
| **Animaciones y Transiciones** | **Framer Motion** | Otorga animación fluida a los mensajes que entran en tiempo real, efectos de tipeo, transiciones entre escenarios y entrada de tarjetas explicativas. |
| **Reproducción de Audio** | **Web Audio API / elemento `<audio>` HTML** | Reproducción nativa en el navegador de las notas de voz simuladas sin plugins externos, con soporte para onda animada y controles de play/pausa. |
| **Voz Sintética / IA** | **Audios pregenerados con ElevenLabs** | Los audios clonados se generan **antes de la expo** con ElevenLabs y se guardan en `/public/audio/`. La app los sirve como archivos estáticos: sin API en runtime, sin claves de API y 100% offline en el stand. |
| **Despliegue / Hosting** | **Vercel / Netlify** | Plataformas de publicación continua vinculadas al repositorio de GitHub para disponer de una URL pública HTTPS lista para la presentación en el stand. |

---

## Qué NO usar en este proyecto

Para mantener el proyecto enfocado, liviano y optimizado para la expo, se excluyen explícitamente:
- **Frameworks pesados de backend:** No se utiliza Node.js/Express ni bases de datos relacionales complejas; el flujo simulado se alimenta mediante archivos de configuración JSON.
- **Otros frameworks de CSS:** Se descarta Bootstrap, Material UI y CSS puro a mano para evitar duplicación de código y mantener consistencia con Tailwind.
- **Librerías de animación pesadas:** No se utilizan librerías de renderizado 3D masivo (Three.js/Canvas complejo) para no comprometer el rendimiento de la notebook/pantalla en el stand.

---

## Diagrama de Conexión y Flujo de Datos

```text
[ Navegador / Pantalla Stand ]
       │
       ├──> [ React + Vite ] ──> Carga de Interfaz (Tailwind + DaisyUI + Framer Motion)
       │
       ├──> [ JSON Local ] ──> Datos de Chats y Pasos del Simulador
       │
       └──> [ Web Audio API / Audio local ] ──> Reproducción de Notas de Voz (archivos pregenerados)