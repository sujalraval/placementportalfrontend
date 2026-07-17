interface DonutProps {
  pct: number
  size?: number
  stroke?: number
  color?: string
  label?: string
}

export function Donut({ pct, size = 132, stroke = 15, color = 'var(--color-navy)', label = 'PLACED' }: DonutProps) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c * (1 - pct / 100)
  const center = size / 2

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={center} cy={center} r={r} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
      <circle
        cx={center}
        cy={center}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text x="50%" y="49%" textAnchor="middle" fontFamily="Georgia,serif" fontSize={26} fontWeight={700} fill="var(--color-navy)">
        {pct}%
      </text>
      <text x="50%" y="63%" textAnchor="middle" fontSize={9.5} letterSpacing={1} fill="var(--color-muted)">
        {label}
      </text>
    </svg>
  )
}
