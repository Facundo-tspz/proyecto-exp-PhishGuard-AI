# 01-Contexto: El porqué del proyecto

## Problema
Las estafas virtuales y los ciberataques basados en ingeniería social en aplicaciones de mensajería instantánea (como WhatsApp) han crecido exponencialmente. La población (desde jóvenes hasta adultos mayores) suele caer en trampas cotidianas debido a la falta de educación preventiva, el desconocimiento de las técnicas de suplantación de identidad (phishing, vishing y robo de códigos OTP) y la falsa confianza que genera una interfaz conocida. Además, las charlas teóricas tradicionales sobre ciberseguridad suelen resultar aburridas y poco efectivas para concientizar.

## Objetivo
Desarrollar un sitio web interactivo (simulador de doble pantalla: Víctima vs. Estafador) destinado a la Expo de la Tecnicatura Superior en Desarrollo de Software, para educar y concientizar al público de manera dinámica sobre los riesgos de la ingeniería social y el impacto de la clonación de voz mediante Inteligencia Artificial.

## Público Destinatario
Visitantes de la Expo del IES Tinogasta: estudiantes, profesores, familias, vecinos y público general sin conocimientos técnicos avanzados de ciberseguridad.

## Casos de Uso / Módulos Principales (Escenarios de Simulación)
El simulador contará con un menú interactivo de 4 escenarios basados en las estafas más comunes:
1. **Secuestro de Cuenta por Código SMS (OTP):** Explotación de la urgencia para la obtención de códigos de verificación.
2. **Falso Soporte Técnico / Turnos / Anses:** Suplantación de entidades para la captura de credenciales.
3. **Transferencia por Error / Mercado Pago Falso:** Manipulación de comprobantes de pago y e-commerce.
4. **Suplantación con IA / Clonación de Voz (Vishing):** Demostración del uso de síntesis de voz a partir de audios cortos de prueba para simular estafas a familiares.

## No incluye (por ahora)
- Pasarelas de pago reales o transacciones monetarias efectivas.
- Base de datos en producción persistente para registro masivo de usuarios externos (el foco es la experiencia interactiva local/demostrativa para la expo).
- Envío de SMS o llamadas reales a teléfonos celulares fuera de la simulación web controlada.