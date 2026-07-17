import { createContext, useContext, useState, type ReactNode } from 'react'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { REC_INITIAL, type RecruiterProfile, type RecContact } from '@/data/mock/recruiter'
import { REC_JOBS_INITIAL, type RecJob, type RecJobApplicant } from '@/data/mock/recruiterJobs'
import { REC_CANDS_INITIAL, type RecCandidate, type RecCandidateMarks, type RecCandidateSalary, RND } from '@/data/mock/candidates'
import { INTERVIEWS_INITIAL, type Interview } from '@/data/mock/interviews'
import { OFFERS_INITIAL, type Offer } from '@/data/mock/offers'
import { REC_DRIVES_INITIAL, type RecDrive } from '@/data/mock/recruiterDrives'

interface RecruiterDataValue {
  rec: RecruiterProfile
  recJobs: RecJob[]
  recCands: RecCandidate[]
  interviews: Interview[]
  offers: Offer[]
  recDrives: RecDrive[]

  saveCompany(fields: { sector: string; website: string; address: string; about: string }): void
  saveHR(fields: { name: string; desig: string; email: string; phone: string }): void
  saveContact(i: number, contact: Omit<RecContact, 'primary'>): void
  addContact(contact: Omit<RecContact, 'primary'>): void
  deleteContact(i: number): void
  saveMOU(fields: { commit: string; valid: string; signatory: string; terms: string }): void

  saveJob(i: number, job: Omit<RecJob, 'co' | 'apps' | 'applicants'>): void
  publishJob(i: number): void
  closeJob(i: number): void
  deleteJob(i: number): void
  setAppStage(jobIndex: number, en: string, stage: RecJobApplicant['stage']): void

  saveMarks(i: number, round: string, score: number, result: string): void
  saveSalary(i: number, salary: RecCandidateSalary, joining: string, loc: string): void
  markJoined(i: number): void
  rejectCand(i: number): void

  saveInterview(fields: Omit<Interview, 'status'>): void
  saveResult(i: number): void

  saveOffer(i: number, fields: Omit<Offer, 'status'>): void
  revokeOffer(i: number): void

  saveDrive(fields: Omit<RecDrive, 'reg' | 'status'>): void
}

const RecruiterDataContext = createContext<RecruiterDataValue | null>(null)

export function RecruiterDataProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast()
  const { setStatus } = usePortalData()

  const [rec, setRec] = useState<RecruiterProfile>(REC_INITIAL)
  const [recJobs, setRecJobs] = useState<RecJob[]>(REC_JOBS_INITIAL)
  const [recCands, setRecCands] = useState<RecCandidate[]>(REC_CANDS_INITIAL)
  const [interviews, setInterviews] = useState<Interview[]>(INTERVIEWS_INITIAL)
  const [offers, setOffers] = useState<Offer[]>(OFFERS_INITIAL)
  const [recDrives, setRecDrives] = useState<RecDrive[]>(REC_DRIVES_INITIAL)

  const value: RecruiterDataValue = {
    rec, recJobs, recCands, interviews, offers, recDrives,

    saveCompany(fields) {
      setRec((r) => ({ ...r, sector: fields.sector || r.sector, website: fields.website || r.website, address: fields.address || r.address, about: fields.about || r.about }))
      showToast('Company profile updated')
    },
    saveHR(fields) {
      setRec((r) => ({ ...r, hrHead: { name: fields.name || r.hrHead.name, desig: fields.desig || r.hrHead.desig, email: fields.email || r.hrHead.email, phone: fields.phone || r.hrHead.phone } }))
      showToast('HR Head updated')
    },
    saveContact(i, contact) {
      setRec((r) => ({ ...r, contacts: r.contacts.map((c, idx) => (idx === i ? { ...contact, primary: c.primary } : c)) }))
      showToast('Contact updated')
    },
    addContact(contact) {
      setRec((r) => ({ ...r, contacts: [...r.contacts, { ...contact, primary: false }] }))
      showToast('Contact added')
    },
    deleteContact(i) {
      setRec((r) => ({ ...r, contacts: r.contacts.filter((_, idx) => idx !== i) }))
      showToast('Contact removed')
    },
    saveMOU(fields) {
      setRec((r) => ({ ...r, mouData: { company: r.company, commit: fields.commit || r.mouData.commit, valid: fields.valid || r.mouData.valid, signatory: fields.signatory || r.mouData.signatory, terms: fields.terms || r.mouData.terms } }))
    },

    saveJob(i, job) {
      setRecJobs((jobs) => {
        if (i >= 0) {
          const prev = jobs[i]
          return jobs.map((j, idx) => (idx === i ? { ...job, co: prev.co, apps: prev.apps, applicants: prev.applicants } : j))
        }
        return [...jobs, { ...job, co: rec.company, apps: 0, applicants: [] }]
      })
      showToast(job.status === 'Published' ? 'Posting published — eligible students notified' : 'Saved as draft')
    },
    publishJob(i) {
      setRecJobs((jobs) => jobs.map((j, idx) => (idx === i ? { ...j, status: 'Published' } : j)))
      showToast('Posting published — eligible students notified')
    },
    closeJob(i) {
      setRecJobs((jobs) => jobs.map((j, idx) => (idx === i ? { ...j, status: 'Closed' } : j)))
      showToast('Posting closed')
    },
    deleteJob(i) {
      setRecJobs((jobs) => jobs.filter((_, idx) => idx !== i))
      showToast('Posting deleted')
    },
    setAppStage(jobIndex, en, stage) {
      let candName = ''
      setRecJobs((jobs) => jobs.map((j, idx) => {
        if (idx !== jobIndex) return j
        return { ...j, applicants: j.applicants.map((a) => { if (a.en === en) { candName = en; return { ...a, stage } } return a }) }
      }))
      showToast(`${candName || 'Candidate'} → ${stage}`)
    },

    saveMarks(i, round, score, result) {
      const roundKey = RND.find((r) => r[1] === round)?.[0] as keyof RecCandidateMarks | undefined
      if (!roundKey) return
      const clamped = Math.max(0, Math.min(100, score))
      setRecCands((cands) => cands.map((c, idx) => {
        if (idx !== i) return c
        const marks = { ...c.marks, [roundKey]: clamped }
        let stage = c.stage
        if (result.startsWith('Fail')) stage = 'Rejected'
        else if (result.startsWith('Pass')) {
          if (roundKey === 'apt') stage = 'Shortlisted'
          if (roundKey === 'tech') stage = 'Interview'
        }
        return { ...c, marks, stage }
      }))
      showToast(`${recCands[i]?.name} — ${round}: ${clamped}/100 recorded · candidate notified`)
    },
    saveSalary(i, salary, joining, loc) {
      const cand = recCands[i]
      if (!cand) return
      setRecCands((cands) => cands.map((c, idx) => (idx === i ? { ...c, salary, stage: 'Offer' } : c)))
      setOffers((o) => [{ cand: cand.name, role: 'Software Engineer', ctc: salary.ctc, joining: joining || 'Jul 2026', loc: loc || 'Ahmedabad', status: 'Released' }, ...o])
      showToast(`Salary finalized — offer released to ${cand.name} and placement cell notified`)
    },
    markJoined(i) {
      const cand = recCands[i]
      if (!cand) return
      setRecCands((cands) => cands.map((c, idx) => (idx === i ? { ...c, joined: true } : c)))
      if (cand.en === 'GU21CS118') setStatus('Placed')
      showToast(`${cand.name} marked as joined — institutional funnel updated`)
    },
    rejectCand(i) {
      setRecCands((cands) => cands.map((c, idx) => (idx === i ? { ...c, stage: 'Rejected' } : c)))
      showToast(`${recCands[i]?.name} rejected`)
    },

    saveInterview(fields) {
      setInterviews((list) => [...list, { ...fields, status: 'Scheduled' }])
      showToast('Interview scheduled — candidate notified by email & SMS')
    },
    saveResult(i) {
      setInterviews((list) => list.map((v, idx) => (idx === i ? { ...v, status: 'Completed' } : v)))
      showToast('Result recorded — candidate will be intimated')
    },

    saveOffer(i, fields) {
      setOffers((list) => {
        const offer = { ...fields, status: 'Released' as const }
        if (i >= 0) return list.map((o, idx) => (idx === i ? offer : o))
        return [...list, offer]
      })
      showToast('Offer released — candidate and placement cell notified')
    },
    revokeOffer(i) {
      setOffers((list) => list.map((o, idx) => (idx === i ? { ...o, status: 'Revoked' } : o)))
      showToast('Offer revoked')
    },

    saveDrive(fields) {
      setRecDrives((list) => [{ ...fields, reg: 0, status: 'Upcoming' }, ...list])
      showToast('Drive scheduled — sent to placement cell for slot confirmation')
    },
  }

  return <RecruiterDataContext.Provider value={value}>{children}</RecruiterDataContext.Provider>
}

export function useRecruiterData() {
  const ctx = useContext(RecruiterDataContext)
  if (!ctx) throw new Error('useRecruiterData must be used within a RecruiterDataProvider')
  return ctx
}
