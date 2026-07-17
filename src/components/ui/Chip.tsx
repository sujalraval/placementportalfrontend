import type { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  className?: string
}

export function Chip({ children, className = '' }: ChipProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-navy-soft px-2.5 py-1 text-[11.5px] font-semibold text-navy ${className}`}>
      {children}
    </span>
  )
}
