# 08-Estructura Paso a Paso: Guión de los Escenarios

Este documento especifica la secuencia exacta de mensajes, acciones del atacante, respuestas de la víctima y explicaciones pedagógicas para los 4 escenarios del simulador.

---

## Escenario 1: Robo de Cuenta por Código SMS (OTP)

- **Vector de Ataque:** Ingeniería Social / Suplantación de Identidad por WhatsApp.
- **Objetivo del Atacante:** Obtener el código de verificación de 6 dígitos enviada por SMS a la víctima para vincular su cuenta en otro celular.

| Paso | Emisor | Mensaje / Acción | Pantalla | Explicación Pedagógica |
| :---: | :--- | :--- | :--- | :--- |
| **1** | Atacante | *"Hola! Disculpá que te moleste, te mandé recién por error un código de 6 dígitos a tu SMS. ¿Me lo podés pasar por favor? Es para confirmar mi turno/cuenta."* | Víctima | **Urgencia y Empatía:** El atacante apela a la buena voluntad de la víctima usando una excusa de error fortuito. |
| **2** | Víctima | *"Hola, ah dale, bancame que me fijé en los SMS..."* | Atacante | **Vulnerabilidad de confianza:** La víctima no sospecha porque el mensaje viene de un contacto conocido (cuenta previamente robada). |
| **3** | Víctima | *"Es el 482-901, ¿ese es?"* | Atacante | **Entrega de credencial:** La víctima comparte la clave temporal de un solo uso (OTP). |
| **4** | Atacante | *(Ingresa el código en su dispositivo)* | Atacante | **Ejecución del ataque:** El servidor de WhatsApp valida el código y transfiere la sesión. |
| **5** | Sistema | ⚠️ **¡ALERTA DE SEGURIDAD!** Tu cuenta de WhatsApp ha sido vinculada en otro dispositivo. Se ha cerrado la sesión. | Ambos | **Consecuencia:** La víctima pierde el control total de su cuenta y el atacante procede a pedir dinero a sus contactos. |

---

## Escenario 2: Falso Soporte Técnico / Turno de Vacunación / ANSES

- **Vector de Ataque:** Phishing / Vishing comercial.
- **Objetivo del Atacante:** Hacer que la víctima instale una app de control remoto (TeamViewer/AnyDesk) o comparta su pantalla.

| Paso | Emisor | Mensaje / Acción | Pantalla | Explicación Pedagógica |
| :---: | :--- | :--- | :--- | :--- |
| **1** | Atacante | *"Estimado usuario, nos comunicamos del área de Modernización/ANSES para la confirmación de su turno/subsidio. Indique si recibió la notificación."* | Víctima | **Autoridad Falsa:** Uso de logos oficiales y tono formal para generar credibilidad. |
| **2** | Víctima | *"Hola, sí, estaba esperando el turno. ¿Qué tengo que hacer?"* | Atacante | **Disposición a colaborar:** La víctima asume que la entidad oficial la está contactando de verdad. |
| **3** | Atacante | *"Para validar su identidad y generar el token, ingrese al siguiente enlace y descargue la aplicación de verificación asistida..."* | Víctima | **Trojan / Enlace Malicioso:** Se induce a la instalación de software que comparte la pantalla o descarga malware. |
| **4** | Sistema | 🚨 **¡ACCESO NO AUTORIZADO!** El atacante ha tomado acceso a la pantalla de la víctima y capturado credenciales bancarias. | Ambos | **Consecuencia:** Robo de claves de home banking y transferencia de fondos. |

---

## Escenario 3: Transferencia Falsa / Comprobante Trucho / Mercado Pago

- **Vector de Ataque:** Fraude en Comercio Electrónico / Manipulación Visual.
- **Objetivo del Atacante:** Simular una transferencia errónea por un monto elevado y exigir la devolución del dinero real.

| Paso | Emisor | Mensaje / Acción | Pantalla | Explicación Pedagógica |
| :---: | :--- | :--- | :--- | :--- |
| **1** | Atacante | *"¡Hola! Te pido mil disculpas, te transferí por error $150.000 en vez de $15.000 por la compra. Te adjunto el comprobante..."* *(Adjunta imagen editada)* | Víctima | **Engaño Visual:** Se utiliza un comprobante de pago adulterado digitalmente. |
| **2** | Atacante | *"Por favor devuélveme la diferencia, es la plata para los remedios de mi hijo, estoy desesperado/a."* | Víctima | **Presión Emocional:** Se genera culpa y angustia para forzar una reacción rápida sin verificar el saldo. |
| **3** | Víctima | *(Realiza la transferencia de devolución desde su cuenta real)* | Atacante | **Perjuicio Económico:** La víctima transfiere dinero real basándose en una acreditación inexistente. |
| **4** | Sistema | ⚠️ **VERIFICACIÓN FALLIDA:** El saldo de la cuenta nunca se incrementó. El comprobante era falso. | Ambos | **Prevención:** Revisar siempre los movimientos del home banking antes de realizar devoluciones. |

---

## Escenario 4: Suplantación por IA / Clonación de Voz (Vishing)

- **Vector de Ataque:** Deepfake de Voz / Inteligencia Artificial Generativa.
- **Objetivo del Atacante:** Clonar el tono de voz de un familiar a partir de un audio corto recopilado de redes sociales para solicitar dinero de urgencia.

| Paso | Emisor | Mensaje / Acción | Pantalla | Explicación Pedagógica |
| :---: | :--- | :--- | :--- | :--- |
| **1** | Atacante | *(Carga un audio corto de 5 segundos recopilado de Instagram/TikTok en el motor de IA)* | Atacante | **Extracción de Patrón de Voz:** Las herramientas de IA necesitan pocos segundos de audio para replicar el timbre y modulación. |
| **2** | Atacante | 🔊 *(Envía nota de voz generada por IA)*: *"Hola ma, tuve un problema tremendo con el auto en la ruta, necesito que me transfieras a este alias ya porque no tengo señal para el home banking..."* | Víctima | **Suplantación Biométrica:** El receptor reconoce la voz del familiar y reacciona instintivamente sin dudar. |
| **3** | Víctima | *"¡Hijo! ¿Estás bien? Decime a qué alias te transfiero ya mismo."* | Atacante | **Efecto de Pánico:** El vínculo afectivo anula el pensamiento crítico y las comprobaciones de seguridad. |
| **4** | Sistema | 🛡️ **ALERTA DE SEGURIDAD IA:** El audio fue sintetizado mediante modelos de Inteligencia Artificial. | Ambos | **Protocolo de Emergencia:** Ante audios de urgencia de familiares, cortar la comunicación y llamar directamente por teléfono o acordar una palabra de seguridad familiar. |