const NOTIF_COMUN = [
  {
    icono: '🎭',
    titulo: '¡Ganaste un premio!',
    texto: 'Tocá aquí para reclamar',
    delay: '0s',
    alerta: false,
  },
  {
    icono: '🏦',
    titulo: 'Banco — Alerta',
    texto: 'Verificá tu cuenta urgente',
    delay: '1.4s',
    alerta: false,
  },
  {
    icono: '👨‍👩‍👧',
    titulo: 'Mamá',
    texto: 'Necesito plata, es urgente',
    delay: '2.8s',
    alerta: false,
  },
]

const NOTIF_OTP = [
  {
    icono: '✉️',
    titulo: 'SMS · WhatsApp',
    texto: 'Tu código es 482-901',
    delay: '0s',
    alerta: true,
  },
  {
    icono: '⚠️',
    titulo: 'Alguien intenta entrar',
    texto: 'No compartas ese código',
    delay: '1.6s',
    alerta: true,
  },
  {
    icono: '📱',
    titulo: 'Nuevo dispositivo',
    texto: 'Sesión iniciada en otro celular',
    delay: '3.2s',
    alerta: false,
  },
]

export default function PhoneNotificaciones({ variante = 'comun' }) {
  const notifs = variante === 'otp' ? NOTIF_OTP : NOTIF_COMUN

  return (
    <div className="flex justify-center">
      <div className="relative h-64 w-40 rounded-3xl border-2 border-base-300 bg-base-300/60 p-2 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
        <div className="mx-auto mb-2 mt-1 h-1.5 w-12 rounded-full bg-base-100/80" />
        <div className="flex h-[calc(100%-1.5rem)] flex-col gap-2 overflow-hidden rounded-2xl bg-fondo/80 p-2">
          {notifs.map((n) => (
            <div
              key={n.titulo}
              style={{ animationDelay: n.delay }}
              className={`notif rounded-xl border px-2 py-1.5 text-left ${
                n.alerta
                  ? 'border-rojo-peligro/60 bg-rojo-peligro/10'
                  : 'border-base-300 bg-base-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span aria-hidden="true">{n.icono}</span>
                <span className="truncate font-cuerpo text-[10px] font-semibold text-texto-principal">
                  {n.titulo}
                </span>
              </div>
              <p className="truncate font-cuerpo text-[9px] text-texto-principal/70">
                {n.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
