const BARRAS = [0, 0.18, 0.32, 0.08, 0.25, 0.4, 0.14]

export default function EqualizadorIA() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-end gap-2">
        {BARRAS.map((delay, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              animationDelay: `${delay}s`,
              animationDuration: `${0.75 + (i % 3) * 0.22}s`,
            }}
            className="eq-bar h-16 w-3 rounded-full bg-gradient-to-t from-cian-neon to-amarillo-ciber"
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-cuerpo text-xs text-texto-principal/70">
          🔊 Nota de voz · 0:12
        </span>
        <span className="ia-chip badge border-cian-neon/70 bg-fondo font-titulos text-cian-neon">
          🤖 IA
        </span>
      </div>
    </div>
  )
}
