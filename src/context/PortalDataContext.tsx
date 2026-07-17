import { createContext, useContext, useState, type ReactNode } from 'react'
import { useToast } from '@/context/ToastContext'
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
      setMe((m) => ({ ...m, ...fields }))
    },
    updateAbout(headline, summary) {
      setMe((m) => ({ ...m, headline: headline || m.headline, summary: summary || m.summary }))
    },
    updatePreferences(prefs) {
      setMe((m) => ({ ...m, preferences: { ...m.preferences, ...prefs } }))
    },
    setStatus(status) {
      setMe((m) => ({ ...m, status }))
    },

    addLink(link) {
      setMe((m) => ({ ...m, links: [...m.links, link] }))
    },
    editLink(i, link) {
      setMe((m) => ({ ...m, links: m.links.map((l, idx) => (idx === i ? link : l)) }))
    },
    deleteLink(i) {
      setMe((m) => ({ ...m, links: m.links.filter((_, idx) => idx !== i) }))
    },

    addSkill(skill) {
      setMe((m) => ({ ...m, skills: [...m.skills, skill] }))
    },
    editSkill(i, skill) {
      setMe((m) => ({ ...m, skills: m.skills.map((s, idx) => (idx === i ? skill : s)) }))
    },
    deleteSkill(i) {
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
      setMe((m) => ({ ...m, internships: [...m.internships, exp] }))
    },
    editExperience(i, exp) {
      setMe((m) => ({ ...m, internships: m.internships.map((x, idx) => (idx === i ? exp : x)) }))
    },
    deleteExperience(i) {
      setMe((m) => ({ ...m, internships: m.internships.filter((_, idx) => idx !== i) }))
    },

    addProject(proj) {
      setMe((m) => ({ ...m, projects: [...m.projects, proj] }))
    },
    editProject(i, proj) {
      setMe((m) => ({ ...m, projects: m.projects.map((p, idx) => (idx === i ? proj : p)) }))
    },
    deleteProject(i) {
      setMe((m) => ({ ...m, projects: m.projects.filter((_, idx) => idx !== i) }))
    },

    addCert(cert) {
      setMe((m) => ({ ...m, certs: [...m.certs, cert] }))
    },
    editCert(i, cert) {
      setMe((m) => ({ ...m, certs: m.certs.map((c, idx) => (idx === i ? cert : c)) }))
    },
    deleteCert(i) {
      setMe((m) => ({ ...m, certs: m.certs.filter((_, idx) => idx !== i) }))
    },

    addAchievement(a) {
      setMe((m) => ({ ...m, achievements: [...m.achievements, a] }))
    },
    editAchievement(i, a) {
      setMe((m) => ({ ...m, achievements: m.achievements.map((x, idx) => (idx === i ? a : x)) }))
    },
    deleteAchievement(i) {
      setMe((m) => ({ ...m, achievements: m.achievements.filter((_, idx) => idx !== i) }))
    },

    addPosition(p) {
      setMe((m) => ({ ...m, positions: [...m.positions, p] }))
    },
    editPosition(i, p) {
      setMe((m) => ({ ...m, positions: m.positions.map((x, idx) => (idx === i ? p : x)) }))
    },
    deletePosition(i) {
      setMe((m) => ({ ...m, positions: m.positions.filter((_, idx) => idx !== i) }))
    },

    addDocument(doc) {
      setMe((m) => ({ ...m, docs: [...m.docs, doc] }))
    },
    deleteDocument(i) {
      setMe((m) => ({ ...m, docs: m.docs.filter((_, idx) => idx !== i) }))
    },

    updateAcademicMeta(cgpa, backlogs) {
      setMe((m) => ({ ...m, cgpa: cgpa || m.cgpa, backlogs }))
    },
    updateSemester(i, sem) {
      setMe((m) => ({ ...m, semesters: m.semesters.map((s, idx) => (idx === i ? { ...s, ...sem } : s)) }))
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
