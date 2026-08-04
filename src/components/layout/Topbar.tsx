import { Link, useLocation } from 'react-router-dom'
import { scrollToSection } from '@/lib/text'

interface TopbarProps {
  onMenuClick?: () => void
}

const LINKS = [
  { label: 'About', id: 'about' },
  { label: 'News', id: 'news' },
  { label: 'Jobs', id: 'jobs' },
  { label: 'Drives', id: 'drives' },
  { label: 'Team', id: 'team' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
]

export function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation()
  const isHome = location.pathname === '/'

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

      <div className="hidden lg:flex flex-1 items-center justify-center gap-1 overflow-x-auto rounded-full px-4">
        {isHome && (
          <>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-[#C9D4E6] hover:bg-white hover:text-navy transition-colors"
            >
              Home
            </button>
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-[#C9D4E6] hover:bg-white hover:text-navy transition-colors"
              >
                {l.label}
              </button>
            ))}
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/role-selection"
          className="whitespace-nowrap rounded-full bg-gold px-5 py-1.5 text-[13.5px] font-semibold text-navy transition-colors hover:bg-gold/90"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
