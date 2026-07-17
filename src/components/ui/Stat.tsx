import type { ReactNode } from 'react'

interface StatProps {
  label: string
  value: ReactNode
  sub?: ReactNode
}

export function Stat({ label, value, sub }: StatProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-white px-[18px] py-4">
      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold" />
      <div className="text-[10.5px] tracking-[.12em] uppercase text-muted font-bold">{label}</div>
      <div className="mt-1.5 font-serif text-[30px] font-semibold leading-none text-navy">{value}</div>
      {sub && <div className="mt-1.5 text-[11.5px] text-muted">{sub}</div>}
    </div>
  )
}
