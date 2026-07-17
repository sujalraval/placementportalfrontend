import type { ReactNode } from 'react'

interface MetaTagProps {
  children: ReactNode
  emphasis?: boolean
}

export function MetaTag({ children, emphasis = false }: MetaTagProps) {
  return (
    <span
      className={`rounded-md border px-2.5 py-1 text-[11.5px] ${
        emphasis
          ? 'border-navy-soft bg-navy-soft font-bold text-navy'
          : 'border-line bg-paper text-[#44423b]'
      }`}
    >
      {children}
    </span>
  )
}

export function MetaRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>
}
