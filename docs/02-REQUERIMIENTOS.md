# 02-Requerimientos: Qué tiene que hacer el sistema

## 1. Requerimientos Funcionales (RF)

### Módulo 1: Presentación / Hero (Sección de Impacto)
| ID | Requerimiento Funcional | Prioridad |
| :--- | :--- | :--- |
| **RF01** | **Pantalla Hero Impactante:** Mostrar título principal ("Robo de Identidad - Estafas Virtuales en WhatsApp"), leyenda descriptiva y fondo oscuro futurista con animaciones. | Alta |
| **RF02** | **Desplegable "¿Qué tan común es?":** Botón/Card interactivo que despliega texto conciso sobre los riesgos de la ingeniería social en mensajería. | Alta |
| **RF03** | **Desplegable "Estadísticas":** Botón/Card interactivo que muestra datos clave e indicadores gráficos sobre cibercrimen y estafas diarias. Las cifras deben citar su fuente verificable. | Alta |
| **RF04** | **Desplegable "Estafas más comunes":** Componente interactivo que resume y lista brevemente los tipos de engaños más frecuentes antes de la simulación. | Media |

### Módulo 2: Simulador Interactivo de Doble Pantalla
| ID | Requerimiento Funcional | Prioridad |
| :--- | :--- | :--- |
| **RF05** | **Menú de Selección de Escenarios:** Permitir al usuario seleccionar entre 4 escenarios de estafa (Código SMS OTP, Falso Soporte Técnico, Transferencia Falsa/Mercado Pago, Clonación de Voz por IA). | Alta |
| **RF06** | **Vista Split-Screen de Dispositivos:** Presentar en pantalla dos smartphones simulados en paralelo (Teléfono Atacante vs. Teléfono Víctima) ejecutando la interfaz de chat de WhatsApp. | Alta |
| **RF07** | **Control de Navegación por Pasos:** Proporcionar controles (`[Paso Siguiente >]`, `[Paso Anterior]`, `[Pausar/Reproducir]`) para avanzar secuencialmente en la historia de la estafa. | Alta |
| **RF08** | **Tarjeta Explicativa de Técnica:** Mostrar tarjetas contextuales emergentes en cada paso que expliquen la vulnerabilidad psicológica o técnica empleada por el atacante. | Media |
| **RF09** | **Notificación de Perfeccionamiento de Estafa:** Visualizar en la pantalla de la víctima el bloqueo/desvinculación de la cuenta cuando el atacante toma el control. | Alta |
| **RF10** | **Módulo de Voz Sintética (IA):** Reproducir dentro del Escenario 4 notas de voz clonadas precargadas en `/public/audio/` (generadas previamente con ElevenLabs), con onda animada y controles de play/pausa. Sin grabación ni APIs en runtime. | Alta |

---

## 2. Requerimientos No Funcionales (RNF)

| ID | Requerimiento No Funcional | Criterio de Aceptación |
| :--- | :--- | :--- |
| **RNF01** | **Animaciones y Rendimiento Visual** | Uso de Framer Motion para asegurar animaciones fluidas (60 FPS) en transiciones y simulaciones de tipeo en tiempo real. |
| **RNF02** | **Facilidad de Lectura en Stand (UX)** | Diseño con tipografía de alto contraste sobre fondo oscuro para lectura clara a 1.5 - 2 metros de distancia del monitor/pantalla de la expo. |
| **RNF03** | **Compatibilidad Responsive** | Interfaz adaptable tanto a pantallas de escritorio/monitores grandes de la expo como a tablets/notebooks. |
| **RNF04** | **Diseño de Interfaz Declarativo** | Construcción de la UI apoyada en DaisyUI y Tailwind CSS para mantener consistente el sistema de componentes. |
| **RNF05** | **Privacidad de Voz** | No se captura ni envía voz de usuarios a ningún servicio: la simulación reproduce únicamente audios precargados en `/public/audio/`. Sin claves de API ni llamadas externas en runtime. |