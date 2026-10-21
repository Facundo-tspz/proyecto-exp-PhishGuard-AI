# 05-Datos: Modelado y Estructura de Información

## 1. Estrategia de Almacenamiento
Para garantizar la velocidad, el rendimiento sin latencia y la independencia de conectividad a bases de datos remotas durante la exposición en la Expo, todos los flujos de simulación se gestionan localmente en memoria a través de un archivo de datos estructurado en formato JSON (`src/data/scenarios.json`).

**Convención:** las claves del JSON están en **inglés** (estándar de código); los valores visibles para el usuario (mensajes de chat, títulos, explicaciones) están en **español**.

---

## 2. Esquema de Entidades (JSON Schema)

Cada **Escenario** (`scenario`) dentro del simulador consta de las siguientes propiedades principales:

- **`id`** *(string)*: Identificador único del escenario (ej. `"escenario-01-otp"`).
- **`title`** *(string)*: Nombre descriptivo visible en el menú de selección.
- **`category`** *(string)*: Tipo de ataque (ej. `"Ingeniería Social"`, `"Vishing"`, `"Phishing"`).
- **`difficulty`** *(string)*: Nivel de sofisticación de la estafa (`"Baja"`, `"Media"`, `"Alta"`).
- **`description`** *(string)*: Resumen breve del vector de ataque.
- **`steps`** *(array de objetos)*: Secuencia ordenada de interacciones entre el atacante y la víctima.

### Estructura de un Objeto `Step`:
- **`stepId`** *(number)*: Número secuencial de ejecución.
- **`sender`** *(string)*: Quién envía la acción (`"estafador"` | `"victima"` | `"sistema"`).
- **`targetScreen`** *(string)*: Pantalla donde impacta el mensaje (`"atacante"` | `"victima"` | `"ambas"`).
- **`content`** *(string)*: Naturaleza del mensaje (`"texto"` | `"audio"` | `"imagen"` | `"alerta"`).
- **`message`** *(string)*: Texto del chat o transcripción del audio.
- **`time`** *(string)*: Timestamp simulado (ej. `"10:42 AM"`).
- **`audioUrl`** *(string, opcional)*: Ruta al archivo de audio en `/public/audio/` para mensajes de voz o síntesis.
- **`explanation`** *(object)*:
  - **`vulnerability`** *(string)*: Concepto de ciberseguridad explotado.
  - **`preventionTip`** *(string)*: Recomendación pedagógica para no caer en el engaño.

---

## 3. Ejemplo Estructurado (`scenarios.json`)

```json
{
  "scenarios": [
    {
      "id": "escenario-01-otp",
      "title": "Robo de Cuenta por Código SMS (OTP)",
      "category": "Ingeniería Social",
      "difficulty": "Media",
      "description": "El atacante intenta registrar la cuenta de WhatsApp de la víctima en otro dispositivo y solicita el código de 6 dígitos con una excusa urgente.",
      "steps": [
        {
          "stepId": 1,
          "sender": "estafador",
          "targetScreen": "victima",
          "content": "texto",
          "message": "Hola! Te mandé un código de 6 dígitos por error a tu SMS para la verificación de mi cuenta. ¿Me lo pasás por favor? Es urgente.",
          "time": "11:15 AM",
          "explanation": {
            "vulnerability": "Explotación de la empatía y sentido de urgencia (Ingeniería Social).",
            "preventionTip": "Nunca compartas un código de verificación SMS de 6 dígitos con nadie; es la llave de acceso a tu cuenta."
          }
        },
        {
          "stepId": 2,
          "sender": "sistema",
          "targetScreen": "ambas",
          "content": "alerta",
          "message": "⚠️ ALERTA DE SEGURIDAD: El atacante ingresó el código SMS y tomó el control de la cuenta. La sesión de la víctima fue cerrada.",
          "time": "11:16 AM",
          "explanation": {
            "vulnerability": "Secuestro de sesión por falta de Verificación en Dos Pasos.",
            "preventionTip": "Activa siempre la Verificación en Dos Pasos (PIN de 6 dígitos) en la configuración de seguridad de WhatsApp."
          }
        }
      ]
    }
  ]
}
```
