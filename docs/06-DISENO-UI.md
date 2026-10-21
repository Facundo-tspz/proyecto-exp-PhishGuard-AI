# 06-Diseño UI: Interfaz de Usuario y Experiencia Visiva

## 1. Concepto Visual e Identidad Estética
El diseño de la aplicación combina el modo oscuro (*dark mode*) de alta gama con detalles cyberpunk/tecnológicos, evitando el verde institucional de WhatsApp para transmitir la atmósfera de una consola de ciberdefensa o centro de monitoreo de seguridad.

- **Tema base:** Fondo principal en Negro Carbón (`#0B0F19`) con bordes sutiles y tarjetas sombreadas.
- **Jerarquía tipográfica:** Títulos impactantes con tipografía geométrica tech (`Orbitron`/`Share Tech Mono`) y chats con máxima legibilidad (`Inter`/`System UI`).
- **Estados de alerta:** Transiciones dinámicas a Amarillo Neón (`#FACC15`) para advertencias y Rojo Láser (`#F43F5E`) para vulneraciones críticas.

---

## 2. Layouts y Distribución de Pantallas

### A. Vista Principal: Hero & Secciones Educativas
> **Decisión de diseño (2026-10-21):** el Hero **no tiene navbar** — es un portal de una sola pantalla para stand de expo (modo kiosco F11); la navegación la resuelven el CTA y los botones del flujo. La marca se refuerza con el H1 gigante. Existe una **slim bar de marca** (solo logo `PhishGuard AI`) visible únicamente dentro de la vista del simulador.
- **Hero Banner (pantalla completa):**
  - Título H1 animado con efecto de tipeo + glitch sutil (`Robo de Identidad — Estafas Virtuales en WhatsApp`).
  - Subtítulo descriptivo enfocado en la concientización para la expo.
  - Fondo carbón con orbes de glow radiales en cian y amarillo (CSS, sin assets).
  - Botón principal de llamada a la acción (CTA): `[ Iniciar Simulación ]` en Cian Neón (`#06B6D4`) con scroll suave hacia las secciones desplegables.
- **Secciones Desplegables (Acordeón):** Desplegables con `<details>/<summary>` (abren y cierran al tocar de nuevo; solo una abierta a la vez).
  - **Card 1: "¿Qué tan común es?"** — Texto de riesgo + animación de un teléfono recibiendo notificaciones de estafas en loop.
  - **Card 2: "Estadísticas Clave"** — 3 métricas centradas con números que se cuentan al abrir + gráfico donut SVG animado (fuentes citables pendientes).
  - **Card 3: "Tipos de Estafas"** — Tarjetas **cliqueables** de los 4 escenarios: al tocar, la tarjeta **se expande en su lugar** (con animación de layout) y las otras 3 pasan a mini-tarjetas al costado. El panel expandido muestra la animación propia del escenario (teléfono OTP / máscara 3D Guy Fawkes giratoria / comprobante con saldo a $0 / ecualizador IA), la explicación del engaño y el consejo de prevención. Botón "✕ Volver" para colapsar al grid 2×2.

### B. Vista Simulador: Modo Split-Screen (Doble Pantalla)
Disposición horizontal dividida en dos columnas principales sobre pantallas medianas y grandes:

1. **Panel Izquierdo (Dispositivo Atacante):**
   - Marco de smartphone con encabezado que identifica al dueño del dispositivo: **"Estafador (nombre falso)"**.
   - Muestra las acciones ejecutadas por el estafador en tiempo real.
   - Los pasos de tipo **acción** (no son mensajes) aparecen como **bottom-sheet** emergente desde abajo, solo en este teléfono (ej.: "Ingresa el código 482-901 — WhatsApp valida y transfiere la sesión"). **Persisten**: una vez mostrados se acumulan y no desaparecen al avanzar.
   - Pie fijo con aviso "Dispositivo del atacante — observación pasiva".
2. **Panel Derecho (Dispositivo Víctima):**
   - Marco de smartphone con encabezado **"Tu teléfono"** (el público encarna a la víctima).
   - Refleja la llegada de mensajes, audios e interacciones recibidos.
   - La **alerta de cuenta comprometida** se muestra **solo en este teléfono** como overlay rojo emergente (con resplandor rojo), **no** como mensaje del chat. Persiste al avanzar.
3. **Composer estilo WhatsApp (base del dispositivo Víctima):**
   - Barra con placeholder "Escribe un mensaje…", botón **"Responder"** y **flecha circular verde** (`#00A884`). Cada clic avanza la simulación **un paso** (modo pausado manual, sin auto-play).
   - Controles discretos debajo: `‹ Anterior` · indicador `Paso N / M` · `↺ Reiniciar` (al finalizar).
4. **Overlay de Tarjeta Explicativa (Explicación Pedagógica):**
   - Tarjeta animada con Framer Motion bajo los teléfonos que aparece tras **cada paso** revelado.
   - Contiene la vulnerabilidad técnica explotada y el consejo preventivo, con badge del emisor y número de paso.

### C. Paleta WhatsApp — MODO CLARO (solo dentro de los teléfonos simulados)
Excepción aprobada a la paleta de marca — los teléfonos replican WhatsApp **claro** convencional (más identificable para el público de la expo):
- Fondo de chat `#EFEAE2` · header blanco `#FFFFFF` · composer `#F0F2F5` / input blanco.
- Burbuja **entrante** (izquierda): `#FFFFFF` con borde sutil. Burbuja **saliente** (derecha): `#D9FDD3`.
- Texto `#111B21` · meta/hora `#667781` · doble check azul `#53BDEB` · botón enviar `#00A884` (ícono blanco).
- Avatares placeholder `#DFE5E7` con ícono `#54656F`, centrados.
- **Semántica de alineación:** en cada dispositivo, sus propios mensajes salen a la derecha (verde claro) y los recibidos entran a la izquierda (blanco). La misma conversación se refleja en ambos teléfonos con la perspectiva invertida. El marco/bezel del teléfono es oscuro (es el dispositivo, no la UI de WhatsApp). Los acentos cian/amarillo de la app quedan solo fuera de los teléfonos.
- **Tipos de paso:** `texto`/`audio` → burbuja en ambos teléfonos; `accion` → bottom-sheet persistente solo en el atacante; `alerta` → overlay rojo persistente solo en el teléfono víctima. El chat **solo** contiene burbujas de texto/audio.

---

## 3. Componentes UI (DaisyUI & Tailwind)

- **Contenedor de Chat (semántica WhatsApp):**
  - En cada teléfono, los mensajes **propios** van a la derecha (`chat-end`, verde `#D9FDD3`) y los **recibidos** a la izquierda (`chat-start`, blanco `#FFFFFF`).
  - Ambos dispositivos muestran la conversación completa, con la perspectiva invertida.
- **Composer "Responder":** placeholder + botón de texto + flecha circular verde estilo WhatsApp que impulsa el avance de pasos.
- **Controles discretos:** `‹ Anterior` / `↺ Reiniciar` como botones fantasma (`btn-ghost`) pequeños, con indicador `Paso N / M` centrado — no compiten con el composer.
- **Alertas de Sistema (`alert-warning` / `alert-error`):**
  - Contenedores destacados para notificaciones de secuestro de cuenta o fallos de seguridad.

---

## 4. Animaciones y Microinteracciones (Framer Motion)

- **Entrada de Mensajes:** Efecto de deslizamiento suave desde el lateral (`slide-in`) y aumento progresivo de opacidad (`fade-in`), alineado a la perspectiva de cada dispositivo.
- **Indicador de "Escribiendo...":** Burbuja de chat animada con tres puntos pulsantes en el lado de quien va a enviar el mensaje, antes de que este aparezca.
- **Tarjeta Explicativa:** entrada con fade + desplazamiento vertical, reemplazada con `AnimatePresence` (`mode="wait"`) en cada nuevo paso.
- **Revelación de Alerta:** Transición de escala con resplandor (*glow*) rojo al completarse el engaño en el simulador.