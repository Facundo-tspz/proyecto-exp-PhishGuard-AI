# 10-Despliegue y Mantenimiento: Guía de Entorno y Operación

## 1. Requisitos Previos del Sistema
Para instalar y ejecutar el proyecto localmente o preparar la notebook del stand, se requiere:
- **Node.js:** Versión 18.0 o superior (LTS recomendada).
- **Gestor de paquetes:** `npm` (incluido con Node.js).
- **Control de Versiones:** Git vinculado a una cuenta de GitHub.
- **Navegador Web Recomendado:** Google Chrome, Brave o Mozilla Firefox.

> **Nota:** No se requiere ninguna clave de API ni conectividad a servicios externos en runtime. La app funciona 100% offline una vez construida.

---

## 2. Instalación y Configuración Local

### Paso 1: Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/tu-usuario/PhishGuard-AI.git
cd PhishGuard-AI
npm install
```

### Paso 2: Variables de entorno
**No se necesita ningún archivo `.env`** para la expo: la demo de clonación de voz reproduce audios precargados en `/public/audio/` generados previamente con ElevenLabs. Si en el futuro se integra una API, recién ahí se crearía un `.env.local`.

### Paso 3: Ejecutar en desarrollo
```bash
npm run dev
```
El servidor de desarrollo abre la app en `http://localhost:5173` (Vite) con Hot Module Replacement (HMR).

---

## 3. Build de Producción

### Paso 4: Generar el build optimizado
```bash
npm run build
```
Genera la carpeta de salida `dist/` con los assets estáticos (HTML, JS, CSS, audios e imágenes) listos para servir.

### Paso 5: Previsualizar el build localmente
```bash
npm run preview
```
Sirve el build de producción en local para verificar que todo funciona antes de desplegar (incluida la reproducción de audios).

---

## 4. Despliegue en Hosting Estático

### Opción A: Vercel
1. Subir el repositorio a GitHub.
2. En [vercel.com](https://vercel.com), importar el repositorio.
3. Vercel detecta Vite automáticamente. Si no, configurar:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy. La URL pública HTTPS queda lista para la expo.

### Opción B: Netlify
1. En [netlify.com](https://netlify.com), importar el repositorio desde GitHub.
2. Configurar:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
3. Deploy.

> **Tip para la expo:** Una vez publicada la URL, probarla con el Wi-Fi desconectado (o con los datos móviles apagados) en la notebook del stand para confirmar el modo offline. También se puede descargar el build `dist/` y abrirlo desde un servidor local o USB con `npx serve dist`.

---

## 5. Checklist Pre-Expo (nota del stand)

- [ ] `npm run build` ejecutado sin errores.
- [ ] Los 4 escenarios completos se reproducen de principio a fin.
- [ ] Todos los audios de `/public/audio/` se reproducen correctamente (Escenario 4).
- [ ] Prueba offline: sin Wi-Fi, la app carga y funciona al 100%.
- [ ] Navegador en modo pantalla completa / quiosco (F11).
- [ ] Batería/cargador y cable HDMI de respaldo disponibles.

---

## 6. Mantenimiento

### Cómo editar o agregar escenarios
Todo el contenido de los chats vive en `src/data/scenarios.json` (ver `docs/05-DATOS.md` para el esquema y `docs/08-ESTRUCTURA-PASO-A-PASO.md` para el guión). Para modificar un escenario **no hace falta tocar componentes React**: basta con editar el JSON y la app refleja los cambios (en desarrollo con HMR; en producción, reconstruir con `npm run build`).

### Cómo agregar un audio de voz clonada
1. Generar el audio con ElevenLabs (u otra herramienta) a partir de una muestra corta.
2. Guardarlo en `public/audio/` con un nombre descriptivo (ej. `esc04-nota-voz-madre.m4a` o `.mp3`).
3. Referenciarlo desde el paso correspondiente del JSON mediante la clave `audioUrl`. El texto de `message` se muestra como transcripción debajo de la burbuja.

### Actualización de dependencias
```bash
npm update
```
Verificar siempre tras actualizar que el build de producción y la reproducción de audios sigan funcionando (casos TC02 y TC05 del plan de pruebas).
