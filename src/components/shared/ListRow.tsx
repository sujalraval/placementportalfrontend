import type { ReactNode } from 'react'

interface ListRowProps {
  icon: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  trailing?: ReactNode
}

export function ListRow({ icon, title, subtitle, trailing }: ListRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-line-2 last:border-b-0">
      <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[7px] bg-navy-soft text-navy">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <b className="block truncate text-[13px]">{title}</b>
        {subtitle && <small className="block truncate text-[11.5px] text-muted">{subtitle}</small>}
      </div>
      {trailing}
    </div>
  )
}
