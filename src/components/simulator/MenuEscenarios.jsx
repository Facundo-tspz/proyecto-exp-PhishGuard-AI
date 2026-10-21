const BADIFICULTAD = {
  Baja: 'bg-success/15 text-success',
  Media: 'bg-warning/15 text-warning',
  Alta: 'bg-error/15 text-error',
}

export default function MenuEscenarios({ escenarios, onElegir, onSalir }) {
  return (
    <div className="min-h-screen bg-fondo">
      <header className="border-b border-base-300 bg-fondo/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <span className="font-titulos text-sm font-bold text-cian-neon">
            🛡️ PhishGuard AI
          </span>
          <button
            type="button"
            onClick={onSalir}
            className="btn btn-ghost btn-sm font-cuerpo text-xs text-amarillo-ciber"
          >
            ← Volver al inicio
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="font-titulos text-2xl font-bold text-amarillo-ciber sm:text-3xl">
          Elegí un escenario
        </h1>
        <p className="mb-8 mt-2 font-cuerpo text-sm text-texto-principal/70 sm:text-base">
          Mirá en tiempo real cómo opera el estafador y qué errores aprovecha.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {escenarios.map((esc) => (
            <button
              key={esc.id}
              type="button"
              onClick={() => onElegir(esc.id)}
              className="group rounded-[var(--radius-borde)] border border-base-300 bg-base-200/50 p-5 text-left transition hover:border-cian-neon/60 hover:shadow-[0_0_24px_rgba(6,182,212,0.18)]"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="badge badge-outline border-cian-neon/50 font-cuerpo text-[10px] text-cian-neon">
                  {esc.category}
                </span>
                <span
                  className={`badge font-cuerpo text-[10px] ${BADIFICULTAD[esc.difficulty] ?? ''}`}
                >
                  {esc.difficulty}
                </span>
              </div>
              <h2 className="font-titulos text-lg font-semibold text-texto-principal transition group-hover:text-cian-neon">
                {esc.title}
              </h2>
              <p className="mt-2 font-cuerpo text-sm text-texto-principal/70">
                {esc.description}
              </p>
              <span className="mt-4 inline-block font-cuerpo text-sm font-semibold text-amarillo-ciber">
                ▶ Simular
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
