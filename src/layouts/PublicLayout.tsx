import { Outlet } from 'react-router-dom'
import { Topbar } from '@/components/layout/Topbar'

export function PublicLayout() {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  )
}
