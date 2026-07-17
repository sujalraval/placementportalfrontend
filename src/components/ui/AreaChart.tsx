import { useId } from 'react'

interface AreaChartProps {
  data: number[]
  w?: number
  h?: number
}

export function AreaChart({ data, w = 420, h = 120 }: AreaChartProps) {
  const gradientId = useId()
  const max = Math.max(...data) * 1.1
  const min = Math.min(...data) * 0.85
  const span = max - min
  const pts = data.map((v, i): [number, number] => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / span) * h,
  ])
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')
  const area = `${line} L ${w} ${h} L 0 ${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14315E" stopOpacity={0.22} />
          <stop offset="1" stopColor="#14315E" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} fill="none" stroke="var(--color-navy)" strokeWidth={2.2} />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0].toFixed(1)} cy={p[1].toFixed(1)} r={2.6} fill="var(--color-gold)" />
      ))}
    </svg>
  )
}
