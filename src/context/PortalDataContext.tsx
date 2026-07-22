import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useToast } from '@/context/ToastContext'
import { useAuthStore } from '@/store/useAuthStore'
import { studentApi, mapBackendStudentToFrontend } from '@/api/student'
import { ME, type StudentProfile, type ProfileLink, type Skill, type Experience, type Project, type Certification, type Achievement, type Position, type StudentDocument, type Semester } from '@/data/mock/me'
import { APPS, type Application } from '@/data/mock/applications'
import { NOTIFS, NOTIF_PREFS, type NotifItem, type NotifPref } from '@/data/mock/notifications'
import { TRAIN, type TrainingCourse } from '@/data/mock/training'
import { CVPARAMS, type CvParam } from '@/data/mock/cvParams'
import { DRIVES, type Drive } from '@/data/mock/drives'
import { INTERNSHIPS, MY_INTERNS_INITIAL, INTERN_APPROVALS_INITIAL, weeksElapsed, internEligibleDate, fmtDate, type Internship, type MyInternship, type InternApproval } from '@/data/mock/internships'
import { TICKETS_INITIAL, SURVEYS_INITIAL, type Ticket, type Survey } from '@/data/mock/support'
import { COMPANIES, type Company } from '@/data/mock/companies'
import { DVERIFY_INITIAL, type DeptVerifyItem } from '@/data/mock/deptVerify'
import { MENTEES_INITIAL, type Mentee, type MenteeEvaluation } from '@/data/mock/mentees'

type TagKind = 'soft' | 'lang' | 'intr'
const TAG_KEY: Record<TagKind, 'soft' | 'languages' | 'interests'> = { soft: 'soft', lang: 'languages', intr: 'interests' }

interface PortalDataValue {
  me: StudentProfile
  apps: Application[]
  notifs: NotifItem[]
  notifPrefs: NotifPref[]
  train: TrainingCourse[]
  cvParams: CvParam[]
  drives: Drive[]
  myDrives: string[]
  internships: Internship[]
  myInterns: MyInternship[]
  internApprovals: InternApproval[]
  tickets: Ticket[]
  surveys: Survey[]
  companies: Company[]
  dverify: DeptVerifyItem[]
  mentees: Mentee[]

  promoteCompanyToUniversityWide(i: number): void
  deleteCompany(i: number): void
  addCompanyDirect(company: Omit<Company, 'hires' | 'pkg' | 'status'>): void

  updatePersonal(fields: Partial<Pick<StudentProfile, 'name' | 'dob' | 'gender' | 'category' | 'city' | 'email' | 'phone' | 'linkedin' | 'github' | 'address'>>): void
  updateAbout(headline: string, summary: string): void
  updatePreferences(prefs: Partial<StudentProfile['preferences']>): void
  setStatus(status: string): void

  addLink(link: ProfileLink): void
  editLink(i: number, link: ProfileLink): void
  deleteLink(i: number): void

  addSkill(skill: Skill): void
  editSkill(i: number, skill: Skill): void
  deleteSkill(i: number): void

  addTag(kind: TagKind, value: string): void
  deleteTag(kind: TagKind, i: number): void

  addExperience(exp: Experience): void
  editExperience(i: number, exp: Experience): void
  deleteExperience(i: number): void

  addProject(proj: Project): void
  editProject(i: number, proj: Project): void
  deleteProject(i: number): void

  addCert(cert: Certification): void
  editCert(i: number, cert: Certification): void
  deleteCert(i: number): void

  addAchievement(a: Achievement): void
  editAchievement(i: number, a: Achievement): void
  deleteAchievement(i: number): void

  addPosition(p: Position): void
  editPosition(i: number, p: Position): void
  deletePosition(i: number): void

  addDocument(doc: StudentDocument): void
  deleteDocument(i: number): void

  updateAcademicMeta(cgpa: string, backlogs: number): void
  updateSemester(i: number, sem: Partial<Semester>): void

  withdrawApplication(co: string): void
  acceptOffer(co: string): void

  markAllNotificationsRead(): void
  toggleNotifPref(i: number): void
  pushNotification(notif: Omit<NotifItem, 'unread' | 'time'> & { time?: string }): void

  setCvParam(i: number, value: number): void

  registerDrive(index: number): void

  applyInternship(id: number): void
  requestInternshipApproval(i: number): void
  submitInternshipReport(i: number, report: { objectives: string; summary: string; learnings: string }): void

  raiseTicket(fields: { cat: string; sub: string; pri: 'Low' | 'Medium' | 'High'; body: string }): void
  resolveTicket(i: number): void
  escalateTicket(i: number): void

  createSurvey(survey: Omit<Survey, 'resp' | 'score' | 'status'>): void
  closeSurvey(i: number): void
  deleteSurvey(i: number): void

  postInternship(posting: Omit<Internship, 'id' | 'applicants'>): void
  selectApplicant(internId: number, en: string): void
  rejectApplicant(internId: number, en: string): void
  completeInternship(internId: number, en: string): void

  approveVerification(i: number): void
  rejectVerification(i: number): void

  rejectInternRequest(i: number): void
  finalizeInternApproval(i: number, credits: { course: string; count: string; evalBasis: string } | null): void

  saveFacultyEvaluation(i: number, evaluation: MenteeEvaluation): void
}

const PortalDataContext = createContext<PortalDataValue | null>(null)

export function PortalDataProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast()
  const [me, setMe] = useState<StudentProfile>(ME)
  const [apps, setApps] = useState<Application[]>(APPS)
  const [notifs, setNotifs] = useState<NotifItem[]>(NOTIFS)
  const [notifPrefs, setNotifPrefs] = useState<NotifPref[]>(NOTIF_PREFS)
  const [train] = useState<TrainingCourse[]>(TRAIN)
  const [cvParams, setCvParams] = useState<CvParam[]>(CVPARAMS)
  const [drives, setDrives] = useState<Drive[]>(DRIVES)
  const [myDrives, setMyDrives] = useState<string[]>(['Deloitte'])
  const [internships, setInternships] = useState<Internship[]>(INTERNSHIPS)
  const [myInterns, setMyInterns] = useState<MyInternship[]>(MY_INTERNS_INITIAL)
  const [internApprovals, setInternApprovals] = useState<InternApproval[]>(INTERN_APPROVALS_INITIAL)
  const [tickets, setTickets] = useState<Ticket[]>(TICKETS_INITIAL)
  const [surveys, setSurveys] = useState<Survey[]>(SURVEYS_INITIAL)
  const [companies, setCompanies] = useState<Company[]>(COMPANIES)
  const [dverify, setDverify] = useState<DeptVerifyItem[]>(DVERIFY_INITIAL)
  const [mentees, setMentees] = useState<Mentee[]>(MENTEES_INITIAL)

  const { user } = useAuthStore()

  useEffect(() => {
    if (user && user.role === 'STUDENT') {
      studentApi.getMe().then(data => {
        setMe(mapBackendStudentToFrontend(data.data || data))
      }).catch(err => {
        console.error('Failed to load profile:', err)
      })
    }
  }, [user])

  const value: PortalDataValue = {
    me, apps, notifs, notifPrefs, train, cvParams, drives, myDrives, internships, myInterns, internApprovals, tickets, surveys, companies, dverify, mentees,

    promoteCompanyToUniversityWide(i) {
      setCompanies((list) => list.map((c, idx) => (idx === i ? { ...c, deptScope: 'University-wide' } : c)))
      showToast(`${companies[i]?.name} promoted to university-wide visibility`)
    },
    deleteCompany(i) {
      const name = companies[i]?.name
      setCompanies((list) => list.filter((_, idx) => idx !== i))
      showToast(`${name} removed from your department's recruiter list`)
    },
    addCompanyDirect(company) {
      setCompanies((list) => [{ ...company, hires: 0, pkg: '—', status: 'Active' }, ...list])
    },

    updatePersonal(fields) {
      const formattedFields = { ...fields }
      if (fields.dob) {
        formattedFields.dob = new Date(fields.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      }
      setMe((m) => ({ ...m, ...formattedFields }))
      const data: any = {}
      if (fields.name !== undefined) data.fullName = fields.name
      if (fields.phone !== undefined) data.phone = fields.phone
      if (fields.dob) data.dateOfBirth = new Date(fields.dob).toISOString()
      if (fields.gender !== undefined) data.gender = fields.gender
      if (fields.category !== undefined) data.category = fields.category
      if (fields.address !== undefined) data.addressLine = fields.address
      if (fields.city !== undefined) data.city = fields.city
      
      if (Object.keys(data).length > 0) {
        studentApi.updateMe(data).catch(console.error)
      }

      const handleLink = (label: string, value: string | undefined) => {
        if (value === undefined) return;
        const existing = me.links.find(l => l.label.toLowerCase() === label.toLowerCase());
        if (existing && existing.url !== value) {
          studentApi.deleteLink(existing.id.toString()).then(() => {
            if (value) studentApi.addLink({ label, url: value }).catch(console.error);
          }).catch(console.error);
        } else if (!existing && value) {
          studentApi.addLink({ label, url: value }).catch(console.error);
        }
      }

      handleLink('LinkedIn', fields.linkedin);
      handleLink('GitHub', fields.github);
    },
    updateAbout(headline, summary) {
      setMe((m) => ({ ...m, headline: headline || m.headline, summary: summary || m.summary }))
      studentApi.updateMe({ headline, bio: summary }).catch(console.error)
    },
    updatePreferences(prefs) {
      setMe((m) => ({ ...m, preferences: { ...m.preferences, ...prefs } }))
      
      const backendPrefs: any = {}
      if (prefs.roles) backendPrefs.preferredRoles = prefs.roles.split(' · ').map(s => s.trim()).filter(Boolean)
      if (prefs.type) {
        backendPrefs.preferredKinds = []
        if (prefs.type.includes('Placement')) backendPrefs.preferredKinds.push('PLACEMENT')
        if (prefs.type.includes('Internship')) backendPrefs.preferredKinds.push('INTERNSHIP')
        if (prefs.type.includes('OJT')) backendPrefs.preferredKinds.push('OJT')
      }
      if (prefs.locations) backendPrefs.preferredLocations = prefs.locations.split(' · ').map(s => s.trim()).filter(Boolean)
      if (prefs.ctc) backendPrefs.minExpectedCtc = parseFloat(prefs.ctc.replace(/[^0-9.-]+/g,"")) || 0
      if (prefs.relocate !== undefined) backendPrefs.openToRelocate = prefs.relocate === 'Open to relocate'
      
      studentApi.upsertPreference(backendPrefs).catch(console.error)
    },
    setStatus(status) {
      setMe((m) => ({ ...m, status }))
      // The backend expects UPPERCASE enum usually, e.g. PLACED, UNPLACED
      const backendStatus = status.toUpperCase().replace(' ', '_')
      studentApi.updatePlacementStatus(backendStatus).catch(console.error)
    },

    addLink(link) {
      const tempId = Date.now().toString()
      setMe((m) => ({ ...m, links: [...m.links, { ...link, id: tempId }] }))
      studentApi.addLink({ label: link.label, url: link.url }).then(res => {
        setMe((m) => ({ ...m, links: m.links.map(l => l.id === tempId ? { ...link, id: res.data?.id || res.id } : l) }))
      }).catch(console.error)
    },
    editLink(i, link) {
      // Backend doesn't have an updateLink endpoint, we delete and recreate or if it's there we can use it.
      // Looking at student.routes.ts, there is NO patch for links. Just POST and DELETE.
      const id = me.links[i]?.id;
      if (id) {
        studentApi.deleteLink(id.toString()).then(() => {
          studentApi.addLink({ label: link.label, url: link.url }).then(res => {
            setMe((m) => ({ ...m, links: m.links.map((l, idx) => (idx === i ? { ...link, id: res.id } : l)) }))
          })
        }).catch(console.error)
      } else {
        setMe((m) => ({ ...m, links: m.links.map((l, idx) => (idx === i ? link : l)) }))
      }
    },
    deleteLink(i) {
      const id = me.links[i]?.id;
      if (id) studentApi.deleteLink(id.toString()).catch(console.error);
      setMe((m) => ({ ...m, links: m.links.filter((_, idx) => idx !== i) }))
    },

    addSkill(skill) {
      const tempId = Date.now().toString()
      setMe((m) => ({ ...m, skills: [...m.skills, { ...skill, id: tempId }] }))
      studentApi.addSkill({ name: skill.n, proficiency: Math.round(skill.lv / 20) }).then(res => {
        setMe((m) => ({ ...m, skills: m.skills.map(s => s.id === tempId ? { ...skill, id: res.data?.skillId || res.skillId } : s) }))
      }).catch(console.error)
    },
    editSkill(i, skill) {
      const id = me.skills[i]?.id;
      if (id) {
        studentApi.updateSkill(id.toString(), { proficiency: Math.round(skill.lv / 20) }).catch(console.error);
      }
      setMe((m) => ({ ...m, skills: m.skills.map((s, idx) => (idx === i ? skill : s)) }))
    },
    deleteSkill(i) {
      const id = me.skills[i]?.id;
      if (id) studentApi.deleteSkill(id.toString()).catch(console.error);
      setMe((m) => ({ ...m, skills: m.skills.filter((_, idx) => idx !== i) }))
    },

    addTag(kind, value) {
      const key = TAG_KEY[kind]
      setMe((m) => ({ ...m, [key]: [...m[key], value] }))
    },
    deleteTag(kind, i) {
      const key = TAG_KEY[kind]
      setMe((m) => ({ ...m, [key]: m[key].filter((_, idx) => idx !== i) }))
    },

    addExperience(exp) {
      const data = {
        organisation: exp.co,
        role: exp.role,
        employmentType: exp.tech,
        location: exp.loc,
        description: exp.desc,
        startedOn: exp.dur ? new Date(`${exp.dur.split('–')[0].trim()} 1`).toISOString() : new Date().toISOString(),
      }
      const tempId = Date.now().toString()
      setMe((m) => ({ ...m, internships: [...m.internships, { ...exp, id: tempId }] }))
      studentApi.addExperience(data).then(res => {
        setMe((m) => ({ ...m, internships: m.internships.map(x => x.id === tempId ? { ...exp, id: res.data?.id || res.id } : x) }))
      }).catch(console.error)
    },
    editExperience(i, exp) {
      const id = me.internships[i]?.id;
      if (id) {
        studentApi.updateExperience(id.toString(), { 
          organisation: exp.co, 
          role: exp.role, 
          description: exp.desc,
          employmentType: exp.tech,
          location: exp.loc
        }).catch(console.error);
      }
      setMe((m) => ({ ...m, internships: m.internships.map((x, idx) => (idx === i ? exp : x)) }))
    },
    deleteExperience(i) {
      const id = me.internships[i]?.id;
      if (id) studentApi.deleteExperience(id.toString()).catch(console.error);
      setMe((m) => ({ ...m, internships: m.internships.filter((_, idx) => idx !== i) }))
    },

    addProject(proj) {
      const data = {
        title: proj.name,
        description: proj.desc,
        techStack: proj.stack ? proj.stack.split(' · ').map(s => s.trim()).filter(Boolean) : [],
        repoUrl: proj.repo || undefined,
        liveUrl: proj.demo || undefined
      }
      const tempId = Date.now().toString()
      setMe((m) => ({ ...m, projects: [...m.projects, { ...proj, id: tempId }] }))
      studentApi.addProject(data).then(res => {
        setMe((m) => ({ ...m, projects: m.projects.map(p => p.id === tempId ? { ...proj, id: res.data?.id || res.id } : p) }))
      }).catch(console.error)
    },
    editProject(i, proj) {
      const id = me.projects[i]?.id;
      if (id) {
        studentApi.updateProject(id.toString(), { 
          title: proj.name, 
          description: proj.desc, 
          techStack: proj.stack ? proj.stack.split(' · ').map(s => s.trim()).filter(Boolean) : [],
          repoUrl: proj.repo || undefined, 
          liveUrl: proj.demo || undefined 
        }).catch(console.error);
      }
      setMe((m) => ({ ...m, projects: m.projects.map((p, idx) => (idx === i ? proj : p)) }))
    },
    deleteProject(i) {
      const id = me.projects[i]?.id;
      if (id) studentApi.deleteProject(id.toString()).catch(console.error);
      setMe((m) => ({ ...m, projects: m.projects.filter((_, idx) => idx !== i) }))
    },

    addCert(cert) {
      const tempId = Date.now().toString()
      setMe((m) => ({ ...m, certs: [...m.certs, { ...cert, id: tempId }] }))
      const issuedOn = cert.year ? new Date(`${cert.year}-01-01`).toISOString() : undefined;
      studentApi.addCertification({ name: cert.name, issuer: cert.by, issuedOn }).then(res => {
        setMe((m) => ({ ...m, certs: m.certs.map(c => c.id === tempId ? { ...cert, id: res.data?.id || res.id } : c) }))
      }).catch(console.error)
    },
    editCert(i, cert) {
      const id = me.certs[i]?.id;
      if (id) {
        const issuedOn = cert.year ? new Date(`${cert.year}-01-01`).toISOString() : undefined;
        studentApi.updateCertification(id.toString(), { name: cert.name, issuer: cert.by, issuedOn }).catch(console.error);
      }
      setMe((m) => ({ ...m, certs: m.certs.map((c, idx) => (idx === i ? cert : c)) }))
    },
    deleteCert(i) {
      const id = me.certs[i]?.id;
      if (id) studentApi.deleteCertification(id.toString()).catch(console.error);
      setMe((m) => ({ ...m, certs: m.certs.filter((_, idx) => idx !== i) }))
    },

    addAchievement(a) {
      const tempId = Date.now().toString()
      setMe((m) => ({ ...m, achievements: [...m.achievements, { ...a, id: tempId }] }))
      studentApi.addAchievement({ title: a.t, description: a.d, achievedOn: new Date(`${a.y}-01-01`).toISOString() }).then(res => {
        setMe((m) => ({ ...m, achievements: m.achievements.map(x => x.id === tempId ? { ...a, id: res.data?.id || res.id } : x) }))
      }).catch(console.error)
    },
    editAchievement(i, a) {
      const id = me.achievements[i]?.id;
      if (id) {
        studentApi.updateAchievement(id.toString(), { title: a.t, description: a.d, achievedOn: new Date(`${a.y}-01-01`).toISOString() }).catch(console.error);
      }
      setMe((m) => ({ ...m, achievements: m.achievements.map((x, idx) => (idx === i ? a : x)) }))
    },
    deleteAchievement(i) {
      const id = me.achievements[i]?.id;
      if (id) studentApi.deleteAchievement(id.toString()).catch(console.error);
      setMe((m) => ({ ...m, achievements: m.achievements.filter((_, idx) => idx !== i) }))
    },

    addPosition(p) {
      const tempId = Date.now().toString()
      setMe((m) => ({ ...m, positions: [...m.positions, { ...p, id: tempId }] }))
      const startedOn = p.dur ? new Date(`${p.dur.split('–')[0].trim()} 1`).toISOString() : new Date().toISOString()
      studentApi.addPosition({ title: p.role, organisation: p.org, description: p.d, startedOn }).then(res => {
        setMe((m) => ({ ...m, positions: m.positions.map(x => x.id === tempId ? { ...p, id: res.data?.id || res.id } : x) }))
      }).catch(console.error)
    },
    editPosition(i, p) {
      const id = me.positions[i]?.id;
      if (id) {
        studentApi.updatePosition(id.toString(), { title: p.role, organisation: p.org, description: p.d }).catch(console.error);
      }
      setMe((m) => ({ ...m, positions: m.positions.map((x, idx) => (idx === i ? p : x)) }))
    },
    deletePosition(i) {
      const id = me.positions[i]?.id;
      if (id) studentApi.deletePosition(id.toString()).catch(console.error);
      setMe((m) => ({ ...m, positions: m.positions.filter((_, idx) => idx !== i) }))
    },

    addDocument(doc) {
      // In a real app, 'doc' would be a File object for upload, but frontend uses mock StudentDocument.
      // We'll skip the actual file upload logic since mock interface doesn't have a File payload.
      // We will just do optimistic update.
      setMe((m) => ({ ...m, docs: [...m.docs, doc] }))
    },
    deleteDocument(i) {
      const id = me.docs[i]?.id;
      if (id) studentApi.deleteDocument(id.toString()).catch(console.error);
      setMe((m) => ({ ...m, docs: m.docs.filter((_, idx) => idx !== i) }))
    },

    updateAcademicMeta(cgpa, backlogs) {
      setMe((m) => ({ ...m, cgpa: cgpa || m.cgpa, backlogs }))
      studentApi.updateMe({ cgpa: parseFloat(cgpa) || 0, activeBacklogs: backlogs }).catch(console.error)
    },
    updateSemester(i, sem) {
      setMe((m) => ({ ...m, semesters: m.semesters.map((s, idx) => (idx === i ? { ...s, ...sem } : s)) }))
      const updatedSem = me.semesters[i]
      if (updatedSem) {
        studentApi.upsertSemesterRecord({
          semester: i + 1,
          sgpa: parseFloat(sem.sgpa || updatedSem.sgpa) || 0,
          credits: sem.cr !== undefined ? sem.cr : updatedSem.cr,
          backlogs: sem.res === 'Backlog' || updatedSem.res === 'Backlog' ? 1 : 0
        }).catch(console.error)
      }
    },

    withdrawApplication(co) {
      setApps((a) => a.map((x) => (x.co === co ? { ...x, outcome: 'Withdrawn', note: 'Withdrawn by you' } : x)))
      showToast(`Application to ${co} withdrawn`)
    },
    acceptOffer(co) {
      setApps((a) => a.map((x) => (x.co === co && x.outcome === 'Offer' ? { ...x, note: 'Offer accepted · joining ' + co } : x)))
      setMe((m) => ({ ...m, status: 'Placed' }))
      showToast('Offer accepted — placement status updated to Placed. Congratulations!')
    },

    markAllNotificationsRead() {
      setNotifs((n) => n.map((x) => ({ ...x, unread: false })))
      showToast('All notifications marked as read')
    },
    toggleNotifPref(i) {
      setNotifPrefs((p) => p.map((x, idx) => (idx === i ? { ...x, on: !x.on } : x)))
    },
    pushNotification(notif) {
      setNotifs((n) => [{ ...notif, time: notif.time ?? 'Just now', unread: true }, ...n])
    },

    setCvParam(i, v) {
      setCvParams((p) => p.map((x, idx) => (idx === i ? { ...x, v } : x)))
    },

    registerDrive(index) {
      const drive = drives[index]
      if (!drive || myDrives.includes(drive.co)) return
      setMyDrives((d) => [...d, drive.co])
      setDrives((ds) => ds.map((d, idx) => (idx === index ? { ...d, reg: d.reg + 1 } : d)))
      setNotifs((n) => [{ ic: 'cal', type: 'Drive', title: `Registered for ${drive.co} (${drive.date}). Your QR pass will arrive 24h before the drive.`, time: 'Just now', unread: true }, ...n])
      showToast(`Registered for ${drive.co} — slot confirmed`)
    },

    applyInternship(id) {
      const x = internships.find((i) => i.id === id)
      if (!x) return
      if (myInterns.some((m) => m.internId === id)) {
        showToast('You have already applied to this internship')
        return
      }
      setMyInterns((mi) => [{
        internId: id, role: x.role, co: x.co, type: x.type, stipend: x.stipend, mode: x.mode, affiliation: x.affiliation, minWeeks: x.minWeeks,
        stage: 'Applied', mentor: null, appliedOn: '08 Jul', reportText: null, certificateIssued: false, approvedOn: null, credits: null,
      }, ...mi])
      setInternships((list) => list.map((i) => {
        if (i.id !== id) return i
        if (i.applicants.some((a) => a.en === me.en)) return i
        return { ...i, applicants: [...i.applicants, { en: me.en, name: me.name, stage: 'Applied' }] }
      }))
      showToast(`Applied to ${x.role} at ${x.co}`)
    },
    requestInternshipApproval(i) {
      const mi = myInterns[i]
      if (!mi) return
      setMyInterns((list) => list.map((x, idx) => (idx === i ? { ...x, stage: 'Approval Requested' } : x)))
      setInternships((list) => list.map((x) => (x.id !== mi.internId ? x : {
        ...x,
        applicants: x.applicants.map((a) => (a.en === me.en ? { ...a, stage: 'Approval Requested' } : a)),
      })))
      setInternApprovals((list) => [{
        en: me.en, name: me.name, co: mi.co, role: mi.role, type: mi.type, mode: mi.mode, minWeeks: mi.minWeeks, affiliation: mi.affiliation,
        status: 'Pending', requestedOn: '08 Jul',
      }, ...list])
      showToast('College approval letter requested — sent to your department coordinator')
    },
    submitInternshipReport(i, report) {
      setMyInterns((list) => list.map((x, idx) => (idx === i ? { ...x, reportText: report } : x)))
    },

    raiseTicket(fields) {
      const ticket: Ticket = {
        id: 'TKT-' + (1043 + tickets.length), by: me.name, cat: fields.cat, sub: fields.sub, pri: fields.pri,
        status: 'In progress', sla: '24h left', owner: 'Cell Desk', date: '08 Jul',
      }
      setTickets((t) => [ticket, ...t])
    },
    resolveTicket(i) {
      setTickets((list) => list.map((t, idx) => (idx === i ? { ...t, status: 'Resolved', sla: 'Met' } : t)))
      showToast(`${tickets[i]?.id} resolved — requester notified`)
    },
    escalateTicket(i) {
      setTickets((list) => list.map((t, idx) => (idx === i ? { ...t, status: 'Escalated' } : t)))
      showToast(`${tickets[i]?.id} escalated to TPO`)
    },

    createSurvey(survey) {
      setSurveys((list) => [{ ...survey, resp: 0, score: '—', status: 'Open' }, ...list])
      showToast('Survey launched — audience notified')
    },
    closeSurvey(i) {
      setSurveys((list) => list.map((s, idx) => (idx === i ? { ...s, status: 'Closed' } : s)))
      showToast('Survey closed')
    },
    deleteSurvey(i) {
      setSurveys((list) => list.filter((_, idx) => idx !== i))
      showToast('Survey deleted')
    },

    postInternship(posting) {
      setInternships((list) => [...list, { ...posting, id: list.length ? Math.max(...list.map((x) => x.id)) + 1 : 0, applicants: [] }])
    },
    selectApplicant(internId, en) {
      let candName = 'Candidate'
      setInternships((list) => list.map((x) => (x.id !== internId ? x : {
        ...x,
        applicants: x.applicants.map((a) => { if (a.en === en) { candName = a.name; return { ...a, stage: 'Selected' } } return a }),
      })))
      setMyInterns((list) => list.map((mi) => (mi.internId === internId && en === me.en && mi.stage === 'Applied' ? { ...mi, stage: 'Selected' } : mi)))
      showToast(`${candName} selected for the internship`)
    },
    rejectApplicant(internId, en) {
      setInternships((list) => list.map((x) => (x.id !== internId ? x : { ...x, applicants: x.applicants.map((a) => (a.en === en ? { ...a, stage: 'Rejected' } : a)) })))
      showToast('Applicant rejected')
    },
    completeInternship(internId, en) {
      const mi = myInterns.find((m) => m.internId === internId)
      if (en === me.en && mi) {
        if (!mi.reportText) { showToast('Student has not submitted their internship report yet'); return }
        const elapsed = weeksElapsed(mi.approvedOn)
        if (elapsed < mi.minWeeks) {
          const eligible = internEligibleDate(mi)
          const remaining = Math.max(1, Math.ceil(mi.minWeeks - elapsed))
          showToast(`Compliance block: minimum ${mi.minWeeks} weeks required — eligible from ${fmtDate(eligible)} (${remaining} week(s) remaining)`)
          return
        }
        setMyInterns((list) => list.map((x) => (x.internId === internId ? { ...x, stage: 'Completed', certificateIssued: true } : x)))
        setNotifs((n) => [{ ic: 'check', type: 'Internship', title: `Your internship at ${mi.co} is complete — Experience Letter & NOC issued.`, time: 'Just now', unread: true }, ...n])
      }
      setInternships((list) => list.map((x) => (x.id !== internId ? x : { ...x, applicants: x.applicants.map((a) => (a.en === en ? { ...a, stage: 'Completed' } : a)) })))
      showToast('Internship marked complete — certificate issued')
    },

    approveVerification(i) {
      const item = dverify[i]
      if (!item) return
      setDverify((list) => list.map((v, idx) => (idx === i ? { ...v, status: 'Approved' } : v)))
      setNotifs((n) => [{ ic: 'check', type: 'Verified', title: `Your ${item.type.toLowerCase()} ("${item.item}") was verified by your coordinator.`, time: 'Just now', unread: true }, ...n])
      showToast(`${item.name} — approved & student notified`)
    },
    rejectVerification(i) {
      setDverify((list) => list.map((v, idx) => (idx === i ? { ...v, status: 'Rejected' } : v)))
      showToast(`${dverify[i]?.name} — rejected with remarks`)
    },

    rejectInternRequest(i) {
      setInternApprovals((list) => list.map((r, idx) => (idx === i ? { ...r, status: 'Rejected' } : r)))
      showToast('Request rejected')
    },
    finalizeInternApproval(i, credits) {
      const r = internApprovals[i]
      if (!r) return
      setInternApprovals((list) => list.map((x, idx) => (idx === i ? { ...x, status: 'Approved', ...(credits ? { credits: { course: credits.course || '—', count: +credits.count || 0, evalBasis: credits.evalBasis || '—' } } : {}) } : x)))
      if (r.en === me.en) {
        const mappedCredits = credits ? { course: credits.course || '—', count: +credits.count || 0, evalBasis: credits.evalBasis || '—' } : null
        setMyInterns((list) => list.map((mi) => (mi.co === r.co && mi.role === r.role ? { ...mi, stage: 'Approved', mentor: 'Prof. Kavita Iyer', approvedOn: new Date().toISOString(), credits: mappedCredits ?? mi.credits } : mi)))
        setInternships((list) => list.map((x) => ({ ...x, applicants: x.applicants.map((a) => (a.en === me.en ? { ...a, stage: 'Approved' } : a)) })))
        setMentees((list) => {
          const existing = list.find((m) => m.en === me.en && m.co === r.co && m.role === r.role)
          if (existing) return list.map((m) => (m === existing ? { ...m, stage: 'Ongoing' } : m))
          return [{ en: me.en, name: me.name, co: r.co, role: r.role, stage: 'Ongoing', minWeeks: r.minWeeks, reportSubmitted: false, evaluation: null }, ...list]
        })
        setNotifs((n) => [{ ic: 'shield', type: 'Internship', title: `College approval letter issued for your ${r.co} internship. You may now join.`, time: 'Just now', unread: true }, ...n])
      }
      showToast(`${r.name} — approved${credits ? ` · ${credits.count} credits mapped` : ''}, mentor assigned, letter issued`)
    },

    saveFacultyEvaluation(i, evaluation) {
      const mentee = mentees[i]
      setMentees((list) => list.map((m, idx) => (idx === i ? { ...m, evaluation } : m)))
      if (mentee?.en === me.en) {
        setNotifs((n) => [{ ic: 'check', type: 'Internship', title: `Faculty evaluation recorded for your ${mentee.co} internship: ${evaluation.grade} (${evaluation.marks}/100).`, time: 'Just now', unread: true }, ...n])
      }
      showToast(`Evaluation saved for ${mentee?.name}`)
    },
  }

  return <PortalDataContext.Provider value={value}>{children}</PortalDataContext.Provider>
}

export function usePortalData() {
  const ctx = useContext(PortalDataContext)
  if (!ctx) throw new Error('usePortalData must be used within a PortalDataProvider')
  return ctx
}
