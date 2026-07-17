import { NavLink } from 'react-router-dom'
import { Icon } from '@/components/icons/Icon'
import { initials } from '@/lib/text'
import type { PersonaNavConfig } from '@/types/nav'

interface SidebarProps {
  config: PersonaNavConfig
  open: boolean
  onNavigate: () => void
}

export function Sidebar({ config, open, onNavigate }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 top-[62px] z-[60] flex w-[250px] flex-none flex-col gap-0.5 overflow-y-auto border-r border-line bg-white p-3 shadow-[8px_0_40px_rgba(0,0,0,.18)] transition-transform duration-200 ease-in-out lg:sticky lg:top-[62px] lg:z-auto lg:h-[calc(100vh-62px)] lg:w-[236px] lg:translate-x-0 lg:shadow-none ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="px-3 pb-1.5 pt-2.5 text-[10px] font-bold uppercase tracking-[.16em] text-muted">
        {config.label}
      </div>
      {config.items.map((item) => (
        <NavLink
          key={item.key}
          to={`/${config.key}/${item.key}`}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-2.5 rounded-md px-3 py-2 text-[13.5px] font-medium ${
              isActive ? 'bg-navy font-semibold text-white' : 'text-[#33322e] hover:bg-paper'
            }`
          }
        >
          <Icon name={item.icon} />
          <span>{item.label}</span>
        </NavLink>
      ))}
      <div className="mt-auto flex items-center gap-2.5 border-t border-line p-3">
        <div className="grid h-[34px] w-[34px] place-items-center rounded-full bg-navy-soft text-[13px] font-bold text-navy">
          {initials(config.footName)}
        </div>
        <div>
          <b className="block text-[13px]">{config.footName}</b>
          <small className="block text-[11px] text-muted">{config.footSub}</small>
        </div>
      </div>
    </aside>
  )
}
