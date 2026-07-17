import type { ReactNode } from 'react'

interface BannerProps {
  icon: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  variant?: 'green' | 'gold'
}

export function Banner({ icon, title, subtitle, action, variant = 'green' }: BannerProps) {
  const styles = variant === 'gold' ? 'bg-gold-soft border-[#E4CFA0]' : 'bg-green-soft border-[#BFE0CE]'
  return (
    <div className={`mb-[18px] flex items-center gap-3.5 rounded-[10px] border px-4 py-3.5 ${styles}`}>
      <div className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[9px] bg-white">{icon}</div>
      <div className="flex-1">
        <b className="text-sm">{title}</b>
        {subtitle && <small className="block text-xs text-[#46443d]">{subtitle}</small>}
      </div>
      {action}
    </div>
  )
}
