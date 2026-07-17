import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  pad?: boolean
}

export function Card({ children, pad = false, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`bg-card border border-line rounded-lg ${pad ? 'p-[18px]' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
