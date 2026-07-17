import type { ReactNode } from 'react'

interface IconControlsProps {
  children: ReactNode
  className?: string
}

export function IconControls({ children, className = '' }: IconControlsProps) {
  return <div className={`flex flex-none items-center gap-1.5 ${className}`}>{children}</div>
}

export function IconControlButton({ onClick, danger, children }: { onClick: () => void; danger?: boolean; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1 text-[11.5px] font-semibold ${
        danger ? 'border-line text-red hover:border-red hover:bg-red-soft' : 'border-line text-navy hover:border-navy hover:bg-paper'
      }`}
    >
      {children}
    </button>
  )
}
