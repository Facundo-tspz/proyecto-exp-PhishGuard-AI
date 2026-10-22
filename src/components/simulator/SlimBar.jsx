export default function SlimBar({
  titulo,
  onSalir,
  silenciado,
  onAlternarSonido,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-fondo/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <span className="font-titulos text-sm font-bold text-cian-neon">
          🛡️ PhishGuard AI
        </span>
        <span className="hidden truncate font-cuerpo text-xs text-texto-principal/70 md:block">
          {titulo}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onAlternarSonido}
            aria-label={silenciado ? 'Activar sonido' : 'Silenciar sonido'}
            aria-pressed={silenciado}
            title={silenciado ? 'Activar sonido' : 'Silenciar sonido'}
            className="btn btn-ghost btn-sm btn-square font-cuerpo text-base"
          >
            {silenciado ? '🔇' : '🔊'}
          </button>
          <button
            type="button"
            onClick={onSalir}
            className="btn btn-ghost btn-sm font-cuerpo text-xs text-amarillo-ciber"
          >
            ✕ Volver al menú
          </button>
        </div>
      </div>
    </header>
  )
}
