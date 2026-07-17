import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { Topbar } from '@/components/layout/Topbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { NavOverlay } from '@/components/layout/NavOverlay'
import { NAV, isPersonaKey } from '@/data/nav'

export function PortalLayout() {
  const { persona } = useParams<{ persona: string }>()
  const location = useLocation()
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname])

  if (!isPersonaKey(persona)) {
    return <Navigate to="/" replace />
  }

  const config = NAV[persona]

  return (
    <div>
      <Topbar onMenuClick={() => setNavOpen((o) => !o)} />
      <div className="flex min-h-[calc(100vh-63px)]">
        <Sidebar config={config} open={navOpen} onNavigate={() => setNavOpen(false)} />
        <NavOverlay show={navOpen} onClose={() => setNavOpen(false)} />
        <main className="min-w-0 flex-1 px-[30px] py-[26px] pb-[60px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
