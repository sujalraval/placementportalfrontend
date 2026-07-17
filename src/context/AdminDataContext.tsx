import { createContext, useContext, useState, type ReactNode } from 'react'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { NEWS, type NewsItem } from '@/data/mock/news'
import { EVENTS_INITIAL, ADMIN_NOTIFS_INITIAL, type AdminEvent, type AdminBroadcast } from '@/data/mock/adminContent'
import { DEPTS, type Department } from '@/data/mock/departments'
import { PROGRAMS_INITIAL, type Program } from '@/data/mock/programs'
import { USERS_INITIAL, type AdminUser } from '@/data/mock/users'
import { SECTORS_INITIAL, type Sector } from '@/data/mock/sectors'
import { OPENINGS_INITIAL, type Opening } from '@/data/mock/openings'
import { EMPLOYMENT_OUTCOMES_INITIAL, type EmploymentOutcome } from '@/data/mock/outcomes'

interface AdminDataValue {
  news: NewsItem[]
  events: AdminEvent[]
  adminNotifs: AdminBroadcast[]
  depts: Department[]
  programs: Program[]
  users: AdminUser[]
  sectors: Sector[]
  openings: Opening[]
  employmentOutcomes: EmploymentOutcome[]

  saveNews(i: number, item: NewsItem): void
  deleteNews(i: number): void

  saveEvent(i: number, item: AdminEvent): void
  deleteEvent(i: number): void

  saveBroadcast(i: number, item: AdminBroadcast): void
  deleteBroadcast(i: number): void

  saveDept(i: number, dept: Department): void
  deleteDept(i: number): void

  saveProgram(i: number, program: Program): void
  deleteProgram(i: number): void

  saveUser(i: number, user: AdminUser): void
  approveUser(i: number): void
  deleteUser(i: number): void

  saveSector(i: number, sector: Sector): void
  deleteSector(i: number): void

  saveOpening(i: number, opening: Omit<Opening, 'apps' | 'status'>, status: Opening['status']): void
  approveOpening(i: number): void
  publishOpening(i: number): void
  closeOpening(i: number): void
  deleteOpening(i: number): void
  generateOpenings(): void

  updateOutcome(i: number, status: EmploymentOutcome['status'], note: string): void
}

const AdminDataContext = createContext<AdminDataValue | null>(null)

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast()
  const { pushNotification } = usePortalData()

  const [news, setNews] = useState<NewsItem[]>(NEWS)
  const [events, setEvents] = useState<AdminEvent[]>(EVENTS_INITIAL)
  const [adminNotifs, setAdminNotifs] = useState<AdminBroadcast[]>(ADMIN_NOTIFS_INITIAL)
  const [depts, setDepts] = useState<Department[]>(DEPTS)
  const [programs, setPrograms] = useState<Program[]>(PROGRAMS_INITIAL)
  const [users, setUsers] = useState<AdminUser[]>(USERS_INITIAL)
  const [sectors, setSectors] = useState<Sector[]>(SECTORS_INITIAL)
  const [openings, setOpenings] = useState<Opening[]>(OPENINGS_INITIAL)
  const [employmentOutcomes, setEmploymentOutcomes] = useState<EmploymentOutcome[]>(EMPLOYMENT_OUTCOMES_INITIAL)

  const value: AdminDataValue = {
    news, events, adminNotifs, depts, programs, users, sectors, openings, employmentOutcomes,

    saveNews(i, item) {
      setNews((list) => (i >= 0 ? list.map((n, idx) => (idx === i ? item : n)) : [item, ...list]))
      showToast(i >= 0 ? 'News updated' : 'News published to website')
    },
    deleteNews(i) {
      setNews((list) => list.filter((_, idx) => idx !== i))
      showToast('News removed')
    },

    saveEvent(i, item) {
      setEvents((list) => (i >= 0 ? list.map((e, idx) => (idx === i ? item : e)) : [...list, item]))
      showToast(i >= 0 ? 'Event updated' : 'Event added')
    },
    deleteEvent(i) {
      setEvents((list) => list.filter((_, idx) => idx !== i))
      showToast('Event removed')
    },

    saveBroadcast(i, item) {
      setAdminNotifs((list) => (i >= 0 ? list.map((n, idx) => (idx === i ? item : n)) : [item, ...list]))
      if (i < 0) pushNotification({ ic: 'info', type: 'Announcement', title: item.title })
      showToast(i >= 0 ? 'Broadcast updated' : `Broadcast sent to ${item.audience} — delivered to student feeds`)
    },
    deleteBroadcast(i) {
      setAdminNotifs((list) => list.filter((_, idx) => idx !== i))
      showToast('Broadcast removed')
    },

    saveDept(i, dept) {
      setDepts((list) => (i >= 0 ? list.map((d, idx) => (idx === i ? dept : d)) : [...list, dept]))
      showToast(i >= 0 ? 'Department updated' : 'Department added')
    },
    deleteDept(i) {
      setDepts((list) => list.filter((_, idx) => idx !== i))
      showToast('Department removed')
    },

    saveProgram(i, program) {
      setPrograms((list) => (i >= 0 ? list.map((p, idx) => (idx === i ? program : p)) : [...list, program]))
      showToast(i >= 0 ? 'Program updated' : 'Program added')
    },
    deleteProgram(i) {
      setPrograms((list) => list.filter((_, idx) => idx !== i))
      showToast('Program removed')
    },

    saveUser(i, user) {
      setUsers((list) => (i >= 0 ? list.map((u, idx) => (idx === i ? user : u)) : [...list, user]))
      showToast(i >= 0 ? 'User updated' : 'User added')
    },
    approveUser(i) {
      setUsers((list) => list.map((u, idx) => (idx === i ? { ...u, status: 'Active' } : u)))
      showToast(`${users[i]?.name} approved`)
    },
    deleteUser(i) {
      setUsers((list) => list.filter((_, idx) => idx !== i))
      showToast('User removed')
    },

    saveSector(i, sector) {
      setSectors((list) => (i >= 0 ? list.map((s, idx) => (idx === i ? sector : s)) : [...list, sector]))
      showToast(i >= 0 ? 'Sector updated' : 'Sector added')
    },
    deleteSector(i) {
      setSectors((list) => list.filter((_, idx) => idx !== i))
      showToast('Sector removed')
    },

    saveOpening(i, opening, status) {
      setOpenings((list) => {
        const o: Opening = { ...opening, status, apps: i >= 0 ? list[i].apps : 0 }
        if (i >= 0) return list.map((x, idx) => (idx === i ? o : x))
        return [o, ...list]
      })
      showToast(status === 'Published' ? 'Opening published — eligible students notified' : 'Saved as draft')
    },
    approveOpening(i) {
      setOpenings((list) => list.map((o, idx) => (idx === i ? { ...o, status: 'Published' } : o)))
      showToast(`${openings[i]?.role} approved & published`)
    },
    publishOpening(i) {
      setOpenings((list) => list.map((o, idx) => (idx === i ? { ...o, status: 'Published' } : o)))
      showToast('Opening published')
    },
    closeOpening(i) {
      setOpenings((list) => list.map((o, idx) => (idx === i ? { ...o, status: 'Closed' } : o)))
      showToast('Opening closed')
    },
    deleteOpening(i) {
      setOpenings((list) => list.filter((_, idx) => idx !== i))
      showToast('Opening deleted')
    },
    generateOpenings() {
      setOpenings((list) => [{ role: 'Frontend Engineer', co: 'Cognizant', dept: 'CS · IT', ctc: '₹6.5 LPA', openings: 12, status: 'Pending', apps: 0 }, ...list])
      showToast('Generated 1 opening from recruiter requests — pending approval')
    },

    updateOutcome(i, status, note) {
      setEmploymentOutcomes((list) => list.map((e, idx) => (idx === i ? { ...e, status, lastUpdate: `${note || 'Status updated'} · 08 Jul 2026` } : e)))
      showToast(`Outcome updated for ${employmentOutcomes[i]?.name}`)
    },
  }

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext)
  if (!ctx) throw new Error('useAdminData must be used within an AdminDataProvider')
  return ctx
}
