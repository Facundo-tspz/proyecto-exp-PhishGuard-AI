# Manual de Identidad de Marca: PhishGuard AI

## 1. Esencia de la Marca
- **Nombre del Proyecto:** PhishGuard AI (Simulador de Estafas Virtuales & IA)
- **Eslogan:** *"Ciberseguridad e Inteligencia Artificial en la era de la ingeniería social."*
- **Propósito:** Concientizar y educar a la comunidad mediante un simulador interactivo de ciberdefensa de doble pantalla (Víctima vs. Estafador) que expone las estafas más comunes en WhatsApp y el impacto de la clonación de voz con IA.
- **Tono de Comunicación:** Técnico, directo, persuasivo, moderno y concientizador.
- **Público Objetivo:** Visitantes de la Expo (estudiantes, profesores, familias, adultos mayores y entusiastas de la tecnología).

---

## 2. Paleta de Colores Futurista (Dark Mode & Cyberpunk)

| Nombre del Color | Código HEX | Proporción | Uso Principal |
| :--- | :--- | :--- | :--- |
| **Negro Carbón Espacial** | `#0B0F19` | 60% (Fondo) | Fondo principal de la interfaz, marcos de dispositivos y contenedores. |
| **Blanco Nieve** | `#F3F4F6` | 30% (Textos) | Textos de chat, párrafos, descripciones y elementos de alta lectura. |
| **Amarillo Neón / Ciber** | `#FACC15` | Acento / Títulos | Títulos principales (H1/H2), tarjetas destacadas, estadísticas y alertas preventivas. |
| **Cian Neón / Azul Eléctrico**| `#06B6D4` | Acento Tecnológico | Botones interactivos (`Call to Action`), bordes activos, indicadores de IA y llamadas a la acción. |
| **Rojo Láser / Peligro** | `#F43F5E` | Alerta Crítica | Estados de "¡Fuiste estafado!", indicadores de riesgo alto e infecciones/ataques simulados. |

---

## 3. Tipografía y Estilo Visual

- **Títulos (H1, H2, H3) y Destacados:** `Orbitron` / `Share Tech Mono` / `Michroma` (Fuentes geométricas y tecnológicas).
- **Cuerpo de Texto y Mensajes de Chat:** `Inter` / `Plus Jakarta Sans` (Fuentes sans-serif limpias de alta legibilidad en pantallas táctiles y monitores).

---

## 4. Tokens de Diseño CSS (Variables para `globals.css`)

```css
:root {
  --color-fondo: #0B0F19;
  --color-texto-principal: #F3F4F6;
  --color-amarillo-ciber: #FACC15;
  --color-cian-neon: #06B6D4;
  --color-rojo-peligro: #F43F5E;
  
  --fuente-titulos: 'Orbitron', 'Share Tech Mono', sans-serif;
  --fuente-cuerpo: 'Inter', system-ui, sans-serif;
  
  --radio-borde: 12px;
}