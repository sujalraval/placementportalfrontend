import { Link, useNavigate, useParams } from 'react-router-dom'
import { NAV, PERSONA_SWITCHER } from '@/data/nav'
import type { PersonaKey } from '@/types/nav'

interface TopbarProps {
  onMenuClick?: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { persona, role } = useParams<{ persona?: string; role?: string }>()
  const navigate = useNavigate()
  
  let active = persona ?? role ?? 'website'
  if (active === 'department') active = 'dept'
  if (active === 'erp') active = 'admin'

  const goToPersona = (key: PersonaKey | 'website') => {
    if (key === 'website') {
      navigate('/')
      return
    }
    navigate(`/${key}/${NAV[key].items[0].key}`)
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b-[3px] border-gold bg-navy px-[22px] py-2.5 text-white">
      <div className="flex items-center gap-2">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="rounded-md px-2.5 py-1.5 text-xl text-white hover:bg-white/10 lg:hidden"
          >
            &#9776;
          </button>
        )}
        <Link to="/" className="flex items-center gap-3">
          <img src="/gu-logo.png" alt="GU Logo" className="h-[46px] w-auto flex-none object-contain bg-white rounded p-0.5" />
          <div>
            <small className="block text-[10px] uppercase tracking-[.18em] text-[#C9D4E6]">Gujarat University · Ahmedabad</small>
            <b className="font-serif text-[17px] font-semibold tracking-[.2px]">Placement Portal</b>
          </div>
        </Link>
      </div>
      <div className="flex gap-1 overflow-x-auto rounded-full bg-white/[.09] p-1">
        {PERSONA_SWITCHER.map((p) => (
          <button
            key={p.key}
            onClick={() => goToPersona(p.key)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
              active === p.key ? 'bg-white text-navy' : 'text-[#C9D4E6] hover:text-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}
