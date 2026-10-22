const FILAS = [
  ['Destino', 'destino'],
  ['Fecha', 'fecha'],
  ['Hora', 'hora'],
  ['Operación', 'operacion'],
]

export default function ComprobanteChat({ datos = {} }) {
  return (
    <div className="w-44 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#F6FEF9] px-2.5 py-2">
        <span
          className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#00A884] text-[10px] font-bold text-white"
          aria-hidden="true"
        >
          ✓
        </span>
        <div className="min-w-0">
          <p className="font-cuerpo text-[10px] font-semibold leading-tight text-[#111B21]">
            Transferencia realizada
          </p>
          <p className="font-cuerpo text-[9px] leading-tight text-[#667781]">
            Comprobante de transferencia
          </p>
        </div>
      </div>
      <div className="px-2.5 py-2">
        <p className="font-cuerpo text-[9px] uppercase tracking-wide text-[#667781]">
          Monto
        </p>
        <p className="font-titulos text-lg font-bold leading-tight text-[#111B21]">
          {datos.monto}
        </p>
        <dl className="mt-1.5 space-y-0.5">
          {FILAS.map(([etiqueta, clave]) => (
            <div
              key={clave}
              className="flex items-baseline justify-between gap-2"
            >
              <dt className="font-cuerpo text-[9px] text-[#667781]">
                {etiqueta}
              </dt>
              <dd className="truncate font-cuerpo text-[9px] font-medium text-[#111B21]">
                {datos[clave]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="border-t border-black/5 bg-[#F7F8FA] px-2.5 py-1 font-cuerpo text-[8px] text-[#667781]">
        Comprobante generado automáticamente
      </p>
    </div>
  )
}
