import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useToast } from '@/context/ToastContext'
import { useAuthStore } from '@/store/useAuthStore'
import { usePortalData } from '@/context/PortalDataContext'
import { adminApi, mapBackendDepartmentToFrontend, mapBackendProgramToFrontend, mapBackendSectorToFrontend, mapBackendUserToAdminUser } from '@/api/admin'
import { postingApi, mapBackendPostingToOpening } from '@/api/posting'
import { contentApi, mapBackendNewsToFrontend, mapBackendEventToFrontend, mapBackendBroadcastToFrontend } from '@/api/content'
import { type NewsItem } from '@/data/mock/news'
import { type AdminEvent, type AdminBroadcast } from '@/data/mock/adminContent'
import { type Department } from '@/data/mock/departments'
import { type Program } from '@/data/mock/programs'
import { type AdminUser } from '@/data/mock/users'
import { type Sector } from '@/data/mock/sectors'
import { type Skill } from '@/data/mock/skills'
import { type Opening } from '@/data/mock/openings'
import { EMPLOYMENT_OUTCOMES_INITIAL, type EmploymentOutcome } from '@/data/mock/outcomes'

interface AdminDataValue {
  news: NewsItem[]
  events: AdminEvent[]
  adminNotifs: AdminBroadcast[]
  depts: Department[]
  programs: Program[]
  users: AdminUser[]
  sectors: Sector[]
  skills: Skill[]
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

  saveUser(i: number, user: AdminUser, password?: string): void
  approveUser(i: number): void
  deleteUser(i: number): void

  saveSector(i: number, sector: Sector): void
  deleteSector(i: number): void

  saveSkill(i: number, skill: Skill): void
  deleteSkill(i: number): void

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

  const [news, setNews] = useState<NewsItem[]>([])
  const [events, setEvents] = useState<AdminEvent[]>([])
  const [adminNotifs, setAdminNotifs] = useState<AdminBroadcast[]>([])
  const [depts, setDepts] = useState<Department[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])
  const [sectors, setSectors] = useState<Sector[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [openings, setOpenings] = useState<Opening[]>([])
  const [employmentOutcomes, setEmploymentOutcomes] = useState<EmploymentOutcome[]>(EMPLOYMENT_OUTCOMES_INITIAL)

  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') return;

    adminApi.listDepartments().then(res => {
      setDepts((res?.data?.data || res?.data || []).map(mapBackendDepartmentToFrontend));
    }).catch(console.error);

    adminApi.listPrograms().then(res => {
      setPrograms((res?.data?.data || res?.data || []).map(mapBackendProgramToFrontend));
    }).catch(console.error);

    adminApi.listSectors().then(res => {
      setSectors((res?.data?.data || res?.data || []).map(mapBackendSectorToFrontend));
    }).catch(console.error);

    adminApi.listSkills().then(res => {
      setSkills(res?.data?.data || res?.data || []);
    }).catch(console.error);

    adminApi.listUsers().then(res => {
      const payload = res?.data?.data || res?.data;
      const userArray = Array.isArray(payload) ? payload : (payload?.users || []);
      setUsers(userArray.map(mapBackendUserToAdminUser));
    }).catch(console.error);

    postingApi.list().then(res => {
      // Admins see all postings including pending
      setOpenings((res?.data?.data || res?.data || []).map(mapBackendPostingToOpening));
    }).catch(console.error);

    contentApi.listNews().then(res => {
      setNews((res?.data?.data || res?.data || []).map(mapBackendNewsToFrontend));
    }).catch(console.error);

    contentApi.listEvents().then(res => {
      setEvents((res?.data?.data || res?.data || []).map(mapBackendEventToFrontend));
    }).catch(console.error);

    contentApi.listBroadcasts().then(res => {
      setAdminNotifs((res?.data?.data || res?.data || []).map(mapBackendBroadcastToFrontend));
    }).catch(console.error);
  }, [user]);

  const value: AdminDataValue = {
    news, events, adminNotifs, depts, programs, users, sectors, skills, openings, employmentOutcomes,

    saveNews(i, item) {
      const payload = {
        title: item.title,
        slug: item.title.toLowerCase().replace(/\s+/g, '-'),
        body: item.body,
        category: item.cat
      };
      if (i >= 0 && news[i]?.id) {
        // Mock update for now since update endpoint doesn't exist, we only have update status
        setNews((list) => list.map((n, idx) => (idx === i ? item : n)))
        showToast('News updated')
      } else {
        contentApi.createNews(payload).then(res => {
          setNews((list) => [{ ...item, id: (res.data as any)?.id || (res as any).id }, ...list])
          showToast('News published')
        }).catch(console.error);
      }
    },
    deleteNews(i) {
      if (news[i]?.id) {
        contentApi.updateNewsStatus(news[i].id!, 'ARCHIVED').then(() => {
          setNews((list) => list.filter((_, idx) => idx !== i))
          showToast('News archived')
        }).catch(console.error);
      } else {
        setNews((list) => list.filter((_, idx) => idx !== i))
        showToast('News removed')
      }
    },

    saveEvent(i, event) {
      const payload = {
        title: event.title,
        slug: event.title.toLowerCase().replace(/\s+/g, '-'),
        startsAt: new Date().toISOString(), // Mocking date logic for now
        venue: event.mode
      };
      if (i >= 0 && events[i]?.id) {
        setEvents((list) => list.map((e, idx) => (idx === i ? event : e)))
        showToast('Event updated')
      } else {
        contentApi.createEvent(payload).then(res => {
          setEvents((list) => [{ ...event, id: (res.data as any)?.id || (res as any).id }, ...list])
          showToast('Event created')
        }).catch(console.error);
      }
    },
    deleteEvent(i) {
      if (events[i]?.id) {
        contentApi.updateEventStatus(events[i].id!, 'ARCHIVED').then(() => {
          setEvents((list) => list.filter((_, idx) => idx !== i))
          showToast('Event archived')
        }).catch(console.error);
      } else {
        setEvents((list) => list.filter((_, idx) => idx !== i))
        showToast('Event removed')
      }
    },

    saveBroadcast(i, item) {
      contentApi.sendBroadcast({
        title: item.title,
        body: item.title, // using title as body since broadcast form doesn't strictly have a big body
        audience: item.audience === 'All departments' ? 'ALL' : 'STUDENTS'
      }).then(res => {
        setAdminNotifs((list) => [{ ...item, id: (res.data as any)?.id || (res as any).id }, ...list])
        if (i < 0) pushNotification({ ic: 'info', type: 'Announcement', title: item.title })
        showToast('Broadcast sent successfully')
      }).catch(console.error);
    },
    deleteBroadcast(i) {
      setAdminNotifs((list) => list.filter((_, idx) => idx !== i))
      showToast('Broadcast removed')
    },

    saveDept(i, dept) {
      const payload = {
        name: dept.name,
        code: dept.code,
        contactEmail: dept.contactEmail,
        contactPhone: dept.contactPhone,
        coordinatorName: dept.coordName || dept.coord,
        coordinatorEmail: dept.coordEmail,
        coordinatorPhone: dept.coordPhone,
      }
      if (i >= 0 && depts[i]?.id) {
        adminApi.updateDepartment(depts[i].id!, payload).then(() => {
          setDepts((list) => list.map((d, idx) => (idx === i ? dept : d)))
          showToast('Department updated')
        }).catch(console.error)
      } else {
        adminApi.createDepartment(payload).then(res => {
          setDepts((list) => [{ ...dept, id: (res.data as any)?.data?.id || (res.data as any)?.id || (res as any).id }, ...list])
          showToast('Department added')
        }).catch((err) => {
          console.error(err);
          showToast(err.response?.data?.error?.message || 'Failed to add department');
        })
      }
    },
    deleteDept(i) {
      if (depts[i]?.id) {
        adminApi.deleteDepartment(depts[i].id!).then(() => {
          setDepts((list) => list.filter((_, idx) => idx !== i))
          showToast('Department removed')
        }).catch(console.error)
      }
    },

    saveProgram(i, program) {
      const payload = {
        departmentId: depts.find(d => d.name === program.dept)?.id,
        name: program.name, 
        code: program.code,
        degreeLevel: program.degree,
        durationYears: parseInt(program.duration) || 3,
        totalSemesters: (parseInt(program.duration) || 3) * 2,
        skills: program.skills,
        sectors: program.sectors,
        subSectors: program.subSectors,
        industry: program.industry,
        domain: program.domain,
        subDomain: program.subDomain
      }
      if (i >= 0 && programs[i]?.id) {
        adminApi.updateProgram(programs[i].id!, payload).then(() => {
          setPrograms((list) => list.map((p, idx) => (idx === i ? program : p)))
          showToast('Program updated')
        }).catch(console.error)
      } else {
        adminApi.createProgram(payload).then(res => {
          setPrograms((list) => [{ ...program, id: (res.data as any)?.data?.id || (res.data as any)?.id || (res as any).id }, ...list])
          showToast('Program added')
        }).catch((err) => {
          console.error(err)
          showToast(err.response?.data?.error?.message || 'Failed to add program')
        })
      }
    },
    deleteProgram(i) {
      if (programs[i]?.id) {
        adminApi.deleteProgram(programs[i].id!).then(() => {
          setPrograms((list) => list.filter((_, idx) => idx !== i))
          showToast('Program removed')
        }).catch(console.error)
      }
    },

    saveUser(i, user, password) {
      if (i >= 0 && users[i]?.id) {
        let backendRole = undefined;
        if (user.role === 'Admin') backendRole = 'ADMIN';
        if (user.role === 'Coordinator') backendRole = 'COORDINATOR';
        if (user.role === 'Faculty') backendRole = 'FACULTY';
        
        const deptObj = depts.find(d => d.name === user.dept);
        
        adminApi.updateUser(users[i].id!, { 
          fullName: user.name, 
          email: user.email,
          role: backendRole,
          departmentId: deptObj?.id || null
        }).then(() => {
          setUsers((list) => list.map((u, idx) => (idx === i ? user : u)))
          showToast('User updated')
        }).catch((err) => {
          console.error(err);
          showToast(err.response?.data?.error?.message || 'Failed to update user');
        })
      } else {
        let backendRole = 'COORDINATOR';
        if (user.role === 'Admin') backendRole = 'ADMIN';
        if (user.role === 'Faculty') backendRole = 'FACULTY';
        
        const deptObj = depts.find(d => d.name === user.dept);
        
        adminApi.createUser({
          fullName: user.name,
          email: user.email,
          password: password || 'defaultPass123',
          role: backendRole,
          departmentId: deptObj?.id
        }).then((res) => {
          setUsers((list) => [{ ...user, id: (res.data as any)?.data?.id || (res.data as any)?.id || (res as any).id, status: 'Active' }, ...list])
          showToast('User added')
        }).catch((err) => {
          console.error("API ERROR RESPONSE:", JSON.stringify(err.response?.data, null, 2));
          console.error(err);
          const errorData = err.response?.data?.error;
          let msg = errorData?.message || 'Failed to add user';
          if (errorData?.details) {
            msg = typeof errorData.details === 'string' ? errorData.details : JSON.stringify(errorData.details);
          }
          showToast(msg);
        })
      }
    },
    approveUser(i) {
      const user = users[i];
      if (user?.id) {
        adminApi.updateUserStatus(user.id, 'ACTIVE').then(() => {
          setUsers((list) => list.map((u, idx) => (idx === i ? { ...u, status: 'Active' } : u)))
          showToast(`${user.name} approved`)
        }).catch(console.error);
      }
    },
    deleteUser(i) {
      const user = users[i];
      if (user?.id) {
        adminApi.deleteUser(user.id).then(() => {
          setUsers((list) => list.filter((_, idx) => idx !== i))
          showToast('User removed')
        }).catch(console.error);
      }
    },

    saveSector(i, sector) {
      const payload = {
        name: sector.name,
        industryRelevance: sector.industryRelevance,
        industryDomains: sector.industryDomains,
        industrySubDomains: sector.industrySubDomains,
        applicationAreas: sector.applicationAreas
      }
      if (i >= 0 && sectors[i]?.id) {
        adminApi.updateSector(sectors[i].id!, payload).then(() => {
          setSectors((list) => list.map((s, idx) => (idx === i ? sector : s)))
          showToast('Sector updated')
        }).catch(console.error)
      } else {
        adminApi.createSector(payload).then(res => {
          setSectors((list) => [{ ...sector, id: (res.data as any)?.data?.id || (res.data as any)?.id || (res as any).id }, ...list])
          showToast('Sector added')
        }).catch(console.error)
      }
    },
    deleteSector(i) {
      if (sectors[i]?.id) {
        adminApi.deleteSector(sectors[i].id!).then(() => {
          setSectors((list) => list.filter((_, idx) => idx !== i))
          showToast('Sector removed')
        }).catch(console.error)
      }
    },

    saveSkill(i, skill) {
      if (i >= 0 && skills[i]?.id) {
        adminApi.updateSkill(skills[i].id!, { name: skill.name, description: skill.description, category: skill.category }).then(() => {
          setSkills((list) => list.map((s, idx) => (idx === i ? skill : s)))
          showToast('Skill updated')
        }).catch(console.error)
      } else {
        adminApi.createSkill({ name: skill.name, description: skill.description || '', category: skill.category }).then(res => {
          setSkills((list) => [{ ...skill, id: (res.data as any)?.data?.id || (res.data as any)?.id || (res as any).id }, ...list])
          showToast('Skill added')
        }).catch(console.error)
      }
    },
    deleteSkill(i) {
      if (skills[i]?.id) {
        adminApi.deleteSkill(skills[i].id!).then(() => {
          setSkills((list) => list.filter((_, idx) => idx !== i))
          showToast('Skill removed')
        }).catch(console.error)
      }
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
      const opening = openings[i];
      if (opening?.id) {
        postingApi.updateStatus(opening.id, { status: 'PUBLISHED' }).then(() => {
          setOpenings((list) => list.map((o, idx) => (idx === i ? { ...o, status: 'Published' } : o)))
          showToast(`${opening.role} approved & published`)
        }).catch(console.error);
      }
    },
    publishOpening(i) {
      const opening = openings[i];
      if (opening?.id) {
        postingApi.updateStatus(opening.id, { status: 'PUBLISHED' }).then(() => {
          setOpenings((list) => list.map((o, idx) => (idx === i ? { ...o, status: 'Published' } : o)))
          showToast('Opening published')
        }).catch(console.error);
      }
    },
    closeOpening(i) {
      const opening = openings[i];
      if (opening?.id) {
        postingApi.updateStatus(opening.id, { status: 'CLOSED' }).then(() => {
          setOpenings((list) => list.map((o, idx) => (idx === i ? { ...o, status: 'Closed' } : o)))
          showToast('Opening closed')
        }).catch(console.error);
      }
    },
    deleteOpening(i) {
      // assuming delete endpoint doesn't exist on postingApi yet, just mock delete for now
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
