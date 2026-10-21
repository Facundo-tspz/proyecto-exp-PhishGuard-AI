# PROGRESO — Bitácora de Desarrollo (PhishGuard AI)

> **Uso:** Este documento es la fuente de verdad del estado del desarrollo. Cualquier IA (esta u otra) debe leerlo **al inicio** de cada sesión y **actualizarlo al finalizar**. Regla: el historial solo se agrega, nunca se borra.

---

## 🟢 Estado Actual

- **Fase:** Tanda 2 en curso — MVP publicado en GitHub (Netlify en proceso por el usuario)
- **Último paso realizado:** Primer push a `https://github.com/Facundo-tspz/proyecto-exp-PhishGuard-AI.git` (rama `main`, 47 archivos). Incluye favicon propio (`public/favicon.png`, reemplaza el SVG de Vite). Despliegue en Netlify a cargo del usuario (Import from Git → build `npm run build` → publish `dist`).
- **Fecha:** 2026-10-21
- **Próximo paso sugerido:** Fase 5 — cargar los 3 escenarios restantes (Transferencias Mulas, Falso Empleo/Task, Clonación de Voz) en `scenarios.json`; después Fase 7 (reproductor de audio real).
- **Archivos tocados:** `index.html` (favicon.png), `public/favicon.png` (renombrado desde `favicon-png.png`; eliminado `favicon.svg` de Vite).

---

## 🗺️ Hoja de Ruta

- [x] **Fase 1:** Scaffold del proyecto (Vite + React + Tailwind + DaisyUI + Framer Motion) — verificar con `npm run dev`.
- [x] **Fase 2:** Tokens de marca en `src/assets/globals.css` (colores, tipografías Orbitron/Inter según `IDENTIDAD-MARCA.md`) y config de Tailwind/DaisyUI.
- [x] **Fase 3:** Hero + Navbar + secciones desplegables (RF01–RF04). *(Sin navbar — decisión de diseño; ver doc 06 y slim bar en Tanda 2.)*
- [x] **Fase 4:** Estructura del simulador: SplitScreen (Atacante/Víctima) + controles de pasos `[< Anterior] [Pausa] [Siguiente >]` (RF05–RF07).
- [ ] **Fase 5:** `src/data/scenarios.json` completo con los 4 escenarios del guión (doc `08-ESTRUCTURA-PASO-A-PASO.md`, claves en inglés según doc `05`).
- [x] **Fase 6:** Tarjeta explicativa pedagógica (RF08) + alerta "¡Cuenta Comprometida!" con resplandor rojo (RF09). *(RF08 implementada como overlay animado tras cada paso; RF09 como `alert-error` con glow en ambos teléfonos — evaluar overlay dedicado pulido si hace falta.)*
- [ ] **Fase 7:** Módulo de audio voz IA: reproductor con onda animada para audios precargados (RF10).
- [ ] **Fase 8:** Assets: audios clonados con ElevenLabs en `public/audio/`, imagen del comprobante trucho, avatares en `public/img/`.
- [ ] **Fase 9:** Ejecución manual del plan de pruebas (doc `09`, TC01–TC05 + casos límite) en la notebook del stand.
- [ ] **Fase 10:** Despliegue Vercel/Netlify + checklist pre-expo (doc `10`).

---

## 📜 Historial de Sesiones

### 2026-10-21 — Push inicial a GitHub + favicon propio
- **Resumen:** Primer push del MVP al repo `Facundo-tspz/proyecto-exp-PhishGuard-AI` (rama `main`): 47 archivos, todo el avance de Tandas 0–2. Identidad git local: Facundo Paez. Favicon: `public/favicon-png.png` renombrado a `public/favicon.png`, `index.html` apunta a `type="image/png"`, eliminado el `favicon.svg` de Vite. Despliegue Netlify a cargo del usuario (config sugerida: build `npm run build`, publish `dist`, sin env vars).
- **Verificaciones:** `npm run build` OK; `/favicon.png` responde HTTP 200 en dev.
- **Archivos tocados:** `index.html`, `public/favicon.png`, `public/favicon.svg` (eliminado), `docs/PROGRESO.md`.

### 2026-10-21 — Iteración simulador 3: alerta como overlay y acción persistente
- **Resumen:** Ajuste final de la tanda. (1) La alerta "¡ALERTA DE SEGURIDAD!" ya no es un bloque dentro del chat: es un **overlay rojo emergente** (borde/brillo rojo, fondo `#FFF1F1`, texto `#B91C1C`) que sube desde abajo **solo en el teléfono de la víctima** y **persiste** al avanzar — cumple RF09 con resplandor rojo. El prefijo "⚠️ ¡ALERTA DE SEGURIDAD!" se movió del mensaje al título del overlay. (2) El bottom-sheet "⚙️ Acción del atacante" ahora **se mantiene** después de pulsar Responder y se **acumula** si hubiera más acciones (contenedor `OverlayPasos` con variante acción/alerta, `pointer-events-none`, apilado con `flex-col gap-2`). (3) `ChatWindow` ahora solo renderiza burbujas `texto`/`audio` — acciones y alertas viven exclusivamente en overlays.
- **Verificaciones:** `npm run lint` OK, `npm run build` OK.
- **Archivos tocados:** `src/data/scenarios.json`, `src/components/simulator/ChatWindow.jsx` (filtro solo texto/audio), `src/components/simulator/SplitScreen.jsx` (`OverlayPasos` reemplaza a `OverlayAccion`; acciones en atacante + alertas en víctima), `docs/06-DISENO-UI.md` (B.1, B.2, tipos de paso).

### 2026-10-21 — Iteración simulador 2: modo claro WhatsApp + acciones y alertas diferenciales
- **Resumen:** Tres correcciones pedidas por el usuario. (1) **Encabezados corregidos:** cada teléfono identifica a su dueño — "Estafador (nombre falso)" a la izquierda y "Tu teléfono" a la derecha (antes cada uno mostraba el nombre/número del otro); avatar placeholder centrado con flex. (2) **Paso "ingresar el código" deja de ser mensaje:** nuevo `content: "accion"` en `scenarios.json`; `ChatWindow` lo omite en ambos teléfonos y el dispositivo del atacante lo muestra como **bottom-sheet** animado (spring, sube desde abajo) mientras ese paso esté activo; el hook no muestra "escribiendo…" en acciones ni alertas. (3) **Alerta de cuenta comprometida solo en el teléfono víctima** (`targetScreen: victima`). (4) **Paleta WhatsApp modo claro** (pedido por el usuario por mayor identificabilidad): chat `#EFEAE2`, header `#FFFFFF`, entrante `#FFFFFF`, saliente `#D9FDD3`, texto `#111B21`, meta `#667781`, checks `#53BDEB`, composer `#F0F2F5`, enviar `#00A884` con ícono blanco; bezel del teléfono se mantiene oscuro.
- **Decisiones:** encabezados = identidad del dueño del dispositivo (no el contacto de chat); "Tu teléfono" para la víctima (confirmado por el usuario); tipos de paso extendidos: `texto`/`audio` (ambos teléfonos), `accion` (bottom-sheet atacante), `alerta` (solo víctima).
- **Verificaciones:** `npm run lint` OK (0 warnings tras remover 2 constantes sin uso), `npm run build` OK, dev server HTTP 200.
- **Archivos tocados:** `src/data/scenarios.json`, `src/hooks/useSimulacion.js`, `src/components/simulator/ChatWindow.jsx` (paleta clara + filtros por tipo/targetScreen), `src/components/simulator/SplitScreen.jsx` (headers, avatar, OverlayAccion, chrome claro), `docs/06-DISENO-UI.md` (B.1–B.2, C, componentes).

### 2026-10-21 — Iteración simulador: semántica WhatsApp + composer "Responder" (RF08 adelantado)
- **Resumen:** Feedback del usuario sobre el simulador, tres correcciones de fondo. (1) **Perspectiva WhatsApp:** antes los mensajes se alineaban por emisor (estafador siempre izquierda); ahora cada teléfono muestra la conversación completa con la lógica de WhatsApp — lo que ese dispositivo envía va a la derecha en verde y lo que recibe a la izquierda en gris, con doble check azul en salientes. (2) **Paleta WhatsApp** autorizada por el usuario para esta vista: chat `#0B141A`, header `#1F2C34`, entrante `#202C33`, saliente `#005C4B`, texto `#E9EDEF`, meta `#8696A0`, checks `#53BDEB`, botón enviar `#00A884` (los acentos cian/amarillo quedan fuera de los teléfonos). (3) **Composer "Responder":** se elimina el auto-play y la botonera; la base del teléfono víctima tiene input ficticio + botón "Responder" + flecha circular verde que avanza un paso por clic (modo pausado manual); controles discretos `‹ Anterior` / `↺ Reiniciar` debajo. (4) **TarjetaExplicativa** (RF08, adelantado de Fase 6): overlay animado bajo los teléfonos con badge del emisor, vulnerabilidad y consejo; se reemplaza con `AnimatePresence` en cada paso y se oculta mientras el "escribiendo…" está activo. El pie del teléfono atacante muestra "observación pasiva".
- **Decisiones:** semántica de alineación por dispositivo (no por "quién es el malo"); avance 100% manual; tarjeta explicativa en cada paso (confirmado por el usuario); controles retroceso conservados de forma discreta para la expo.
- **Verificaciones:** `npm run lint` OK (0 warnings tras remover 2 constantes sin uso), `npm run build` OK, dev server HTTP 200.
- **Archivos tocados:** `src/hooks/useSimulacion.js` (sin auto-play/pausa), `src/components/simulator/ChatWindow.jsx` (reescrito: esPropio + paleta WhatsApp), `src/components/simulator/SplitScreen.jsx` (chrome WhatsApp + ComposerVictima + PieAtacante), `src/components/simulator/TarjetaExplicativa.jsx` (nuevo), `src/components/simulator/ControlesFlujo.jsx` (discreto), `src/components/simulator/Simulacion.jsx` (composición), `docs/06-DISENO-UI.md` (secciones B.3–B.4, paleta C, componentes, animaciones).

### 2026-10-21 — Fase 4: infraestructura del simulador (SplitScreen + controles + menú)
- **Resumen:** Primera pieza funcional de la Tanda 2. Flujo completo: Hero → CTA `[Iniciar Simulación]` → menú de escenarios (RF05) → simulación → "✕ Volver al menú". Componentes nuevos: `SlimBar` (marca PhishGuard AI, sticky, solo en simulador — decisión de Tanda 1), `MenuEscenarios` (tarjetas con categoría + dificultad coloreada), `SplitScreen` (dos teléfonos estilo marco redondo, labels 🔔 Atacante / 📱 Víctima), `ChatWindow` (burbujas DaisyUI chat: atacante a la izquierda gris, víctima a la derecha con glow cian; alerta del sistema como `alert-error`; nota de voz placeholder con onda estática para audioUrl; indicador "escribiendo…" animado), `ControlesFlujo` (‹ Anterior · ⏸ Pausar/▶ Reproducir · Siguiente › + badge "Paso N / M" + ↺ Reiniciar al finalizar), `Simulacion` (composición) y hook `useSimulacion`.
- **Comportamiento del hook:** auto-play (3.2 s por paso, 4.5 s en alertas), pausa reanuda el avance, typing de 900 ms antes de cada mensaje nuevo (no en alertas de sistema ni al retroceder), `anterior` muestra el estado exacto sin animación (TC03), `reiniciar` vuelve al paso 1. Mensajes de `targetScreen: ambas` aparecen en ambos teléfonos.
- **Datos:** `scenarios.json` con el Escenario 1 (OTP) completo: 5 pasos guiados (doc 08), claves en inglés (sender/targetScreen/content/message/time + explanation con vulnerability y preventionTip — RF08 listo para Fase 6).
- **Decisiones:** CTA del Hero cambia de vista a menú (en vez de scroll — RF05/US01 CA3). Datos 100% data-driven: el menú lista lo que haya en el JSON, así los escenarios 2–4 se agregan solo editando el JSON (Fase 5). Auto-play activo por defecto (demo de expo), pausable.
- **Verificaciones:** `npm run lint` OK (0 warnings tras reestructurar `useSimulacion` para no llamar setState sincrónico en el cuerpo del effect), `npm run build` OK, dev server HTTP 200.
- **Archivos tocados:** `src/App.jsx` (máquina de vistas inicio/menú/simulacion), `src/components/hero/Hero.jsx` (prop `onIniciar`), `src/data/scenarios.json` (nuevo), `src/hooks/useSimulacion.js` (nuevo), `src/components/simulator/{SlimBar,MenuEscenarios,SplitScreen,ChatWindow,ControlesFlujo,Simulacion}.jsx` (nuevos).

### 2026-10-21 — Fix: panel expandido vacío al cambiar de escenario
- **Resumen:** Bug reportado: al expandir un escenario y luego tocar una mini, el panel nuevo quedaba sin contenido (solo la caja) hasta que se tocaba otra opción. Causa raíz: el `motion.div` del panel expandible portaba `layoutId` pero **no tenía `key`** — React reutilizaba la instancia y Framer Motion no maneja el cambio de `layoutId` sobre un elemento vivo (solo el patrón desmontar→remontar). Solución: `key={expandido}` en el panel para forzar remontaje limpio en cada cambio; el handoff de `layoutId` entonces ocurre como par unmount/mount soportado.
- **Verificaciones:** `npm run lint` OK, `npm run build` OK, dev server HTTP 200.
- **Archivos tocados:** `src/components/hero/Desplegables.jsx`.

### 2026-10-21 — Iteración 3: layout consistente de "Tipos de Estafas"
- **Resumen:** Corregida la proporción del panel expandido (antes se veía alargado/inconsistente). Nuevo layout: el escenario activo ocupa una **caja grande** a la izquierda (`sm:min-h-[30rem]`, flex-1, animación centrada verticalmente) y las otras 3 estafas quedan en una **columna vertical fija** (`sm:w-52`) a la derecha, cada mini mostrando **ícono + título**. Cambios de tarjeta → panel y panel → mini hechos con `layoutId` de Framer Motion (morph continuo sin saltos).
- **Verificaciones:** `npm run lint` OK, `npm run build` OK, dev server HTTP 200.
- **Archivos tocados:** `src/components/hero/Desplegables.jsx` (`EscenariosTipos` reestructurado: dos zonas + `layoutId`).

### 2026-10-21 — Iteración 2 del Hero: máscara Guy Fawkes + tarjetas expandibles
- **Resumen:** Segunda ronda de feedback visual. (1) `Mascara3D` redibujada: rostro ovalado tipo Guy Fawkes (path huevo), cejas arqueadas, ojos negros, mejillas rosadas, bigote fino con puntas curvadas y barbita de pica. (2) Eliminado el modal de "Tipos de Estafas": ahora las tarjetas se **expanden en su lugar** con animación de layout (spring de Framer Motion); la escogida toma el ancho completo con su animación + explicación + consejo, y las otras 3 pasan a mini-tarjetas laterales intercambiables. Botón "✕ Volver" al grid 2×2.
- **Verificaciones:** `npm run lint` OK, `npm run build` OK, dev server HTTP 200.
- **Archivos tocados:** `src/components/hero/visuals/Mascara3D.jsx` (reescrito), `src/components/hero/Desplegables.jsx` (nuevo componente `EscenariosTipos`, sin `AnimatePresence`/modal), `docs/06-DISENO-UI.md`.

### 2026-10-21 — Iteración del Hero: bugs + animaciones (Tanda 1, feedback)
- **Resumen:** Ajustes por feedback visual del usuario. Corregido el bug de desplegables que no se contraían (radio → `<details>/<summary>` controlado) y la alineación de las estadísticas (grid de 3 columnas centradas). Agregadas animaciones a cada sección.
- **Animaciones implementadas** (CSS/SVG/Framer Motion, sin assets externos):
  - `PhoneNotificaciones.jsx`: celular con burbujas pop-in en loop — variante `"comun"` (premio/banco/mamá) y `"otp"` (SMS 482-901 en rojo).
  - `DonutEstadisticas.jsx`: donut SVG que se dibuja al abrir (segmentos cyan/amarillo/rojo) con leyenda.
  - `Mascara3D.jsx`: rotación continua rotateY con 2 caras (cara normal / máscara Anonymous en SVG).
  - `ComprobanteSaldo.jsx`: comprobante "✓ $150.000 acreditado" + saldo bajando animado de $165.000 a $0 (rojo) con 💸.
  - `EqualizadorIA.jsx`: barras de ecualizador + chip "🤖 IA" parpadeante + "🔊 Nota de voz".
- **Interacción nueva:** tarjetas de "Tipos de Estafas" cliqueables → modal DaisyUI + Framer Motion con descripción extendida, consejo de prevención y la animación de cada escenario.
- **Números:** métricas del desplegable 2 cuentan desde 0 al abrirse (89%, 6 de 10, 3 seg).
- **Verificaciones:** `npm run lint` sin warnings (tras corregir reassign en donut), `npm run build` OK, dev server HTTP 200.
- **Archivos tocados:** `src/components/hero/Desplegables.jsx` (reescrito), `src/components/hero/visuals/` (5 componentes nuevos), `src/assets/globals.css` (keyframes: notif, eq-bar, ia-chip, mascara-3d), `docs/06-DISENO-UI.md`.

### 2026-10-21 — Tanda 1: Hero educativo sin navbar (Fase 3)
- **Resumen:** Hero a pantalla completa con H1 "Robo de Identidad / Estafas Virtuales en WhatsApp" (efecto tipeo con caret + glitch sutil), badge de la Expo, subtítulo y CTA `[Iniciar Simulación]` con scroll suave. 3 secciones desplegables tipo accordion (DaisyUI) con entrada animada escalonada (Framer Motion).
- **Decisiones tomadas:**
  - **Sin navbar** en el hero (portal kiosco de expo); navegación por CTA/flujo. Doc `06` actualizado.
  - **Slim bar de marca** (`PhishGuard AI`) visible solo en la vista del simulador → Tanda 2.
  - Fondo del hero: **glow radial CSS** (orbes cian/amarillo difusos), sin assets externos. Si no convence, se evalúa imagen de stock.
  - Estadísticas del desplegable 2: datos de ejemplo con badge "TODO: citar fuente" para reemplazar antes de la expo (RF03).
- **Contenido implementado:**
  - Desplegable 1 "¿Qué tan común es?": texto de ingeniería social en mensajería.
  - Desplegable 2 "Estadísticas Clave": 3 métricas de ejemplo + alerta de fuente pendiente.
  - Desplegable 3 "Tipos de Estafas": grid 2×2 con los 4 escenarios (ícono + nombre + una línea).
- **Verificaciones:** `npm run lint` OK, `npm run build` OK, dev server HTTP 200.
- **Archivos tocados:** `src/components/hero/Hero.jsx` (nuevo), `src/components/hero/Desplegables.jsx` (nuevo), `src/App.jsx`, `src/assets/globals.css` (clases `.glow`, `.glitch`, `.caret`), `docs/06-DISENO-UI.md`.

### 2026-10-21 — Tanda 0: Base del proyecto (Fases 1–2)
- **Resumen:** Scaffold del proyecto en la raíz con `create-vite` (React 19 + Vite 8), instalación del stack y configuración de la identidad visual. Proyecto compilando, lint limpio y dev server respondiendo HTTP 200.
- **Decisiones tomadas:**
  - **Tailwind v4 con config CSS-first** (`@tailwindcss/vite` + `@theme` en `globals.css`): no se usa `tailwind.config.js` (docs `03`/`04` ajustados mentalmente; el doc 04 se actualizó).
  - **DaisyUI 5** vía `@plugin "daisyui"` con `defaultTheme: "dark"`.
  - **Fuentes auto-hospedadas** con `@fontsource-variable/inter` y `@fontsource-variable/orbitron` (embebidas en el build; sin Google Fonts para cumplir el modo offline de la expo).
  - **Linter:** oxlint (incluido por el scaffold de Vite).
- **Stack instalado:** react@19, vite@8, tailwindcss@4 + @tailwindcss/vite, daisyui@5.7.50, framer-motion, @fontsource-variable/{inter,orbitron}.
- **Estructura creada:** `public/audio/`, `public/img/`, `src/components/{common,hero,simulator}/`, `src/data/`, `src/hooks/` (con `.gitkeep`).
- **Verificaciones:** `npm run build` OK (fuentes woff2 dentro de `dist/`), `npm run lint` sin errores, `npm run dev` → HTTP 200 con título correcto.
- **Archivos tocados:** `vite.config.js`, `index.html` (lang=es, meta PhishGuard AI), `src/main.jsx`, `src/App.jsx` (placeholder de marca), `src/assets/globals.css` (tokens @theme + :root), `package.json` (name: phishguard-ai). Eliminados: boilerplate Vite (`App.css`, `index.css`, logos, `icons.svg`).

### 2026-10-20 — Análisis y corrección de la documentación
- **Resumen:** Lectura y análisis integral de los 12 documentos de `docs/`. Detección y corrección de inconsistencias; documentación dejada lista para arrancar el desarrollo.
- **Decisiones tomadas:**
  - Voz/clonación IA: **100% offline** con audios precargados en `/public/audio/` (generados antes con ElevenLabs). Sin APIs ni claves en runtime.
  - Nombre canónico: **PhishGuard AI** (unificado en todos los docs; eliminadas referencias a `wasafe-simulator` y `WaSafe Sim`).
  - Claves del `scenarios.json`: **en inglés**; valores visibles en español.
- **Cambios realizados:**
  - `AGENTS.md.md` (docs/) → eliminado y reescrito como `AGENTS.md` en la raíz, con índice corregido (apuntaba a docs inexistentes: `07-CONVENCIONES`, `08-TAREAS`, `09-SEO`, `10-SEGURIDAD`).
  - `README.md` creado en la raíz (descripción, stack, comandos, índice de docs).
  - `02-REQUERIMIENTOS.md`: RF10 ajustado a audios precargados; RF03 con nota de fuentes citables; RNF05 reescrito (sin captura/envío de voz).
  - `03-TECNOLOGIAS.md`: ElevenLabs pasa a pregeneración offline; diagrama de flujo actualizado.
  - `04-ARQUITECTURA.md`: árbol renombrado a `PhishGuard-AI/`, eliminado `.env.local`, comentario de `public/audio/` actualizado.
  - `05-DATOS.md`: esquema y ejemplo JSON traducidos a claves en inglés (validado con Node).
  - `07-CASOS-DE-USO.md`: US03 sin grabación de micrófono.
  - `09-PLAN-DE-PRUEBAS.md`: tests marcados "Pendiente", nota de ejecución manual, caso límite 3 reemplazado (audio faltante → fallback a transcripción).
  - `10-DESPLIEGUE-Y-MANTENIMIENTO.md`: completado (estaba cortado a mitad): clone URL, dev/build/preview, Vercel/Netlify, checklist pre-expo, mantenimiento.
  - `IDENTIDAD-MARCA.md`: título unificado ("PhishGuard AI").
- **Verificaciones:** grep sin residuos (`wasafe`, `WaSafe`, referencias rotas, "Pasado"); JSON de ejemplo parsea correctamente.
