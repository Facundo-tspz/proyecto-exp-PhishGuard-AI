export default function ControlesFlujo({ sim }) {
  const { pasoIdx, total, terminado, anterior, reiniciar } = sim

  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-2">
      <button
        type="button"
        onClick={anterior}
        disabled={pasoIdx === 0}
        className="btn btn-ghost btn-xs font-cuerpo text-texto-principal/50 hover:text-amarillo-ciber disabled:text-texto-principal/25"
      >
        ‹ Anterior
      </button>

      <span className="font-cuerpo text-[11px] text-texto-principal/40">
        Paso {pasoIdx + 1} / {total}
      </span>

      {terminado ? (
        <button
          type="button"
          onClick={reiniciar}
          className="btn btn-ghost btn-xs font-cuerpo text-amarillo-ciber"
        >
          ↺ Reiniciar
        </button>
      ) : (
        <span className="w-16" aria-hidden="true" />
      )}
    </div>
  )
}
