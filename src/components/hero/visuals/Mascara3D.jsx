function CaraNormal() {
  return (
    <svg viewBox="0 0 100 100" className="h-36 w-36" aria-hidden="true">
      <path
        d="M50 8 C70 8 82 26 82 46 C82 70 68 92 50 92 C32 92 18 70 18 46 C18 26 30 8 50 8 Z"
        fill="#FBBF24"
      />
      <circle cx="36" cy="42" r="5" fill="#0B0F19" />
      <circle cx="64" cy="42" r="5" fill="#0B0F19" />
      <path
        d="M32 60 Q50 76 68 60"
        fill="none"
        stroke="#0B0F19"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MascaraAnonymous() {
  return (
    <svg viewBox="0 0 100 100" className="h-36 w-36" aria-hidden="true">
      {/* Rostro ovalado tipo Guy Fawkes */}
      <path
        d="M50 8 C70 8 82 26 82 46 C82 70 68 92 50 92 C32 92 18 70 18 46 C18 26 30 8 50 8 Z"
        fill="#F3F4F6"
      />
      {/* Cejas arqueadas */}
      <path
        d="M27 35 Q36 27 45 33"
        fill="none"
        stroke="#111827"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M55 33 Q64 27 73 35"
        fill="none"
        stroke="#111827"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Ojos */}
      <circle cx="36" cy="42" r="4.5" fill="#111827" />
      <circle cx="64" cy="42" r="4.5" fill="#111827" />
      {/* Mejillas rosadas */}
      <circle cx="27" cy="55" r="7" fill="#F9A8D4" opacity="0.75" />
      <circle cx="73" cy="55" r="7" fill="#F9A8D4" opacity="0.75" />
      {/* Bigote fino con puntas curvadas hacia arriba */}
      <path
        d="M26 55 C24 50 28 49 30 52 C38 61 44 61 50 56 C56 61 62 61 70 52 C72 49 76 50 74 55"
        fill="none"
        stroke="#111827"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sonrisa */}
      <path
        d="M32 63 Q50 76 68 63"
        fill="none"
        stroke="#111827"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Barbita de pica */}
      <path
        d="M43 72 Q50 70 57 72 L53 84 Q50 87 47 84 Z"
        fill="#111827"
      />
    </svg>
  )
}

export default function Mascara3D() {
  return (
    <div className="perspectiva flex justify-center">
      <div className="mascara-3d relative h-36 w-36">
        <div className="face absolute inset-0 flex items-center justify-center">
          <CaraNormal />
        </div>
        <div className="face face-back absolute inset-0 flex items-center justify-center">
          <MascaraAnonymous />
        </div>
      </div>
    </div>
  )
}
