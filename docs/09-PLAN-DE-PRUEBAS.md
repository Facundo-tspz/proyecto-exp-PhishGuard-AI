# 09-Plan de Pruebas: Validación y Casos Límite

## 1. Estrategia de Pruebas
Dado que la aplicación se utilizará en un entorno de exposición presencial (stand con alto tránsito de personas y presentaciones en vivo), las pruebas deben garantizar:
- **Cero bloqueos o errores en pantalla (Crash-free):** El flujo no debe interrumpirse bajo ninguna circunstancia.
- **Rendimiento visual constante:** Mantenimiento de animaciones a 60 FPS sin tirones.
- **Resiliencia ante la falta de conectividad:** La app debe poder ejecutarse de forma totalmente offline en caso de fallos en el Wi-Fi de la expo.

---

## 2. Casos de Prueba Funcionales (Matriz de Pruebas)

> **Nota:** Pruebas manuales a ejecutar en la notebook del stand antes de la expo. Registrar fecha y responsable al completar cada caso.

| ID | Módulo / Escenario | Descripción de la Prueba | Resultado Esperado | Criterio de Pasaje |
| :---: | :--- | :--- | :--- | :--- |
| **TC01** | Hero / Presentación | Apertura y cierre de las tarjetas desplegables ("¿Qué tan común es?", "Estadísticas"). | El contenido se despliega suavemente sin solapar otros elementos de la UI. | Pendiente |
| **TC02** | Navegación de Flujo | Avance secuencial en el simulador mediante el botón `[Paso Siguiente]`. | La pantalla del receptor muestra el indicador *"Escribiendo..."* antes de renderizar el mensaje. | Pendiente |
| **TC03** | Retroceso de Flujo | Presión del botón `[Paso Anterior]` en medio de un escenario. | La interfaz retrocede al estado y mensaje exacto del paso anterior sin perder el orden. | Pendiente |
| **TC04** | Alerta de Pérdida | Llegada al paso final de secuestro de cuenta en el Escenario 1. | El marco de la víctima se ilumina en rojo (`#F43F5E`) y se despliega la pancarta de alerta de seguridad. | Pendiente |
| **TC05** | Módulo de Audio / IA | Reproducción de nota de voz clonada en el Escenario 4. | El reproductor activa la onda animada y emite el audio sin latencia notable; la transcripción queda visible. Si el archivo no carga, aparece "Reintentar" y al hacer clic reproduce. | Pendiente |

---

## 3. Pruebas de Resiliencia y Casos Límite (Edge Cases)

- **Caso Límite 1: Sin conexión a Internet en el Stand (Modo Offline)**
  - *Prueba:* Desconectar la red Wi-Fi y ejecutar todos los escenarios.
  - *Resultado Esperado:* Todos los textos, imágenes y audios de fallback pregrabados deben funcionar al 100% desde los archivos locales (`/public/audio/` y `scenarios.json`).

- **Caso Límite 2: Múltiples clics rápidos en botones de control**
  - *Prueba:* Hacer clic repetido y frenético en `[Paso Siguiente]`.
  - *Resultado Esperado:* Las animaciones de Framer Motion se ejecutan secuencialmente o se cancela la previa sin superponer mensajes corruptos.

- **Caso Límite 3: Archivo de audio faltante o corrupto en el Escenario 4**
  - *Prueba:* Simular la ausencia o corrupción de un archivo de `/public/audio/` (ej. renombrarlo temporalmente).
  - *Resultado Esperado:* La interfaz detecta el fallo de reproducción y muestra la transcripción del mensaje (ya presente en el campo `message` del JSON) como alternativa legible, sin pantalla blanca ni error de consola.