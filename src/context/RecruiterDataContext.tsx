import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { useAuthStore } from '@/store/useAuthStore'
import { companyApi } from '@/api/company'
import { postingApi, mapBackendPostingToFrontend, mapFrontendPostingToBackend } from '@/api/posting'
import { applicationApi, mapBackendStageToFrontend, mapFrontendStageToBackend } from '@/api/application'
import { REC_INITIAL, type RecruiterProfile, type RecContact } from '@/data/mock/recruiter'
import { type RecJob, type RecJobApplicant } from '@/data/mock/recruiterJobs'
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

  saveCompany(fields: { sector: string; website: string; address: string; about: string }): Promise<void>
  saveHR(fields: { name: string; desig: string; email: string; phone: string }): Promise<void>
  saveContact(i: number, contact: Omit<RecContact, 'primary'>): Promise<void>
  addContact(contact: Omit<RecContact, 'primary'>): Promise<void>
  deleteContact(i: number): Promise<void>
  saveMOU(fields: { commit: string; valid: string; signatory: string; terms: string }): Promise<void>

  saveJob(i: number, job: Omit<RecJob, 'co' | 'apps' | 'applicants'>): Promise<void>
  publishJob(i: number): Promise<void>
  closeJob(i: number): Promise<void>
  deleteJob(i: number): Promise<void>
  setAppStage(jobIndex: number, en: string, stage: RecJobApplicant['stage']): Promise<void>

  saveMarks(i: number, round: string, score: number, result: string): Promise<void>
  saveSalary(i: number, salary: RecCandidateSalary, joining: string, loc: string): Promise<void>
  markJoined(i: number): Promise<void>
  rejectCand(i: number): Promise<void>

  saveInterview(fields: Omit<Interview, 'status'>): Promise<void>
  saveResult(i: number): Promise<void>

  saveOffer(i: number, fields: Omit<Offer, 'status'>): Promise<void>
  revokeOffer(i: number): Promise<void>

  saveDrive(fields: Omit<RecDrive, 'reg' | 'status'>): Promise<void>
}

const RecruiterDataContext = createContext<RecruiterDataValue | null>(null)

export function RecruiterDataProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast()
  const { setStatus } = usePortalData()

  const [rec, setRec] = useState<RecruiterProfile>(REC_INITIAL)
  const [recJobs, setRecJobs] = useState<RecJob[]>([])
  const [recCands, setRecCands] = useState<RecCandidate[]>(REC_CANDS_INITIAL)
  const [interviews, setInterviews] = useState<Interview[]>(INTERVIEWS_INITIAL)
  const [offers, setOffers] = useState<Offer[]>(OFFERS_INITIAL)
  const [recDrives, setRecDrives] = useState<RecDrive[]>(REC_DRIVES_INITIAL)

  const { user } = useAuthStore()

  useEffect(() => {
    if (user && user.role === 'RECRUITER') {
      if (user.companyId) {
        companyApi.getById(user.companyId).then(data => {
          const c = data.data || data;
          setRec(r => ({
            ...r,
            company: c.name,
            website: c.website || '',
            about: c.description || '',
            address: c.hqLocation || '',
            sector: c.sector?.name || 'Unknown',
            status: c.verificationStatus === 'VERIFIED' ? 'Verified' : 'Pending',
          }));
        }).catch(err => console.error('Failed to load company profile:', err))
      }

      postingApi.list().then(async data => {
        const jobs = (data.data || data).map(mapBackendPostingToFrontend);
        
        try {
          const appsRes = await applicationApi.list();
          const apps = appsRes.data || appsRes;
          jobs.forEach((job: RecJob) => {
            const jobApps = apps.filter((a: any) => a.jobPostingId === job.id);
            job.applicants = jobApps.map((a: any) => ({
               id: a.id,
               en: a.student?.enrollmentNo || 'Unknown',
               stage: mapBackendStageToFrontend(a.status)
            }));
            job.apps = job.applicants.length;
          });
        } catch (e) {
          console.error('Failed to load applications for jobs', e);
        }

        setRecJobs(jobs);
      }).catch(err => console.error('Failed to load postings:', err))
    }
  }, [user])

  const value: RecruiterDataValue = {
    rec, recJobs, recCands, interviews, offers, recDrives,

    async saveCompany(fields) {
      setRec((r) => ({ ...r, sector: fields.sector || r.sector, website: fields.website || r.website, address: fields.address || r.address, about: fields.about || r.about }))
      showToast('Company profile updated')
    },
    async saveHR(fields) {
      setRec((r) => ({ ...r, hrHead: { name: fields.name || r.hrHead.name, desig: fields.desig || r.hrHead.desig, email: fields.email || r.hrHead.email, phone: fields.phone || r.hrHead.phone } }))
      showToast('HR Head updated')
    },
    async saveContact(i, contact) {
      setRec((r) => ({ ...r, contacts: r.contacts.map((c, idx) => (idx === i ? { ...contact, primary: c.primary } : c)) }))
      showToast('Contact updated')
    },
    async addContact(contact) {
      setRec((r) => ({ ...r, contacts: [...r.contacts, { ...contact, primary: false }] }))
      showToast('Contact added')
    },
    async deleteContact(i) {
      setRec((r) => ({ ...r, contacts: r.contacts.filter((_, idx) => idx !== i) }))
      showToast('Contact removed')
    },
    async saveMOU(fields) {
      setRec((r) => ({ ...r, mouData: { company: r.company, commit: fields.commit || r.mouData.commit, valid: fields.valid || r.mouData.valid, signatory: fields.signatory || r.mouData.signatory, terms: fields.terms || r.mouData.terms } }))
    },

    async saveJob(i, job) {
      const backendPayload = mapFrontendPostingToBackend(job);
      if (i >= 0 && recJobs[i]?.id) {
        // Update existing
        await postingApi.update(recJobs[i].id!, backendPayload).then(res => {
          setRecJobs((jobs) => jobs.map((j, idx) => (idx === i ? mapBackendPostingToFrontend(res.data || res) : j)))
          showToast(job.status === 'Published' ? 'Posting published — eligible students notified' : 'Saved as draft')
        }).catch(err => console.error('Failed to update job:', err))
      } else {
        // Create new
        await postingApi.create(backendPayload).then(res => {
          setRecJobs((jobs) => [...jobs, mapBackendPostingToFrontend(res.data || res)])
          showToast('Saved as draft')
        }).catch(err => console.error('Failed to create job:', err))
      }
    },
    async publishJob(i) {
      const jobId = recJobs[i]?.id;
      if (!jobId) return;
      await postingApi.updateStatus(jobId, { status: 'PENDING_APPROVAL' }).then(() => {
        setRecJobs((jobs) => jobs.map((j, idx) => (idx === i ? { ...j, status: 'Pending approval' } : j)))
        showToast('Submitted to Placement Cell for approval')
      }).catch(err => console.error('Failed to publish job:', err))
    },
    async closeJob(i) {
      const jobId = recJobs[i]?.id;
      if (!jobId) return;
      await postingApi.updateStatus(jobId, { status: 'CLOSED' }).then(() => {
        setRecJobs((jobs) => jobs.map((j, idx) => (idx === i ? { ...j, status: 'Closed' } : j)))
        showToast('Posting closed')
      }).catch(err => console.error('Failed to close job:', err))
    },
    async deleteJob(i) {
      // Backend doesn't support deleting job postings in standard schema, but we can remove it from UI
      setRecJobs((jobs) => jobs.filter((_, idx) => idx !== i))
      showToast('Posting hidden')
    },
    async setAppStage(jobIndex, en, stage) {
      const job = recJobs[jobIndex];
      const applicant = job?.applicants.find(a => a.en === en);
      
      let candName = en;
      
      if (applicant?.id) {
        await applicationApi.updateStatus(applicant.id, { status: mapFrontendStageToBackend(stage) }).then(() => {
          setRecJobs((jobs) => jobs.map((j, idx) => {
            if (idx !== jobIndex) return j
            return { ...j, applicants: j.applicants.map((a) => { if (a.en === en) { candName = en; return { ...a, stage } } return a }) }
          }))
          showToast(`${candName || 'Candidate'} → ${stage}`)
        }).catch(err => console.error('Failed to update stage:', err))
      } else {
        // Fallback for mock data that might not have an ID yet
        setRecJobs((jobs) => jobs.map((j, idx) => {
          if (idx !== jobIndex) return j
          return { ...j, applicants: j.applicants.map((a) => { if (a.en === en) { candName = en; return { ...a, stage } } return a }) }
        }))
        showToast(`${candName || 'Candidate'} → ${stage}`)
      }
    },

    async saveMarks(i, round, score, result) {
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
    async saveSalary(i, salary, joining, loc) {
      const cand = recCands[i]
      if (!cand) return
      setRecCands((cands) => cands.map((c, idx) => (idx === i ? { ...c, salary, stage: 'Offer' } : c)))
      setOffers((o) => [{ cand: cand.name, role: 'Software Engineer', ctc: salary.ctc, joining: joining || 'Jul 2026', loc: loc || 'Ahmedabad', status: 'Released' }, ...o])
      showToast(`Salary finalized — offer released to ${cand.name} and placement cell notified`)
    },
    async markJoined(i) {
      const cand = recCands[i]
      if (!cand) return
      setRecCands((cands) => cands.map((c, idx) => (idx === i ? { ...c, joined: true } : c)))
      if (cand.en === 'GU21CS118') setStatus('Placed')
      showToast(`${cand.name} marked as joined — institutional funnel updated`)
    },
    async rejectCand(i) {
      setRecCands((cands) => cands.map((c, idx) => (idx === i ? { ...c, stage: 'Rejected' } : c)))
      showToast(`${recCands[i]?.name} rejected`)
    },

    async saveInterview(fields) {
      setInterviews((list) => [...list, { ...fields, status: 'Scheduled' }])
      showToast('Interview scheduled — candidate notified by email & SMS')
    },
    async saveResult(i) {
      setInterviews((list) => list.map((v, idx) => (idx === i ? { ...v, status: 'Completed' } : v)))
      showToast('Result recorded — candidate will be intimated')
    },

    async saveOffer(i, fields) {
      setOffers((list) => {
        const offer = { ...fields, status: 'Released' as const }
        if (i >= 0) return list.map((o, idx) => (idx === i ? offer : o))
        return [...list, offer]
      })
      showToast('Offer released — candidate and placement cell notified')
    },
    async revokeOffer(i) {
      setOffers((list) => list.map((o, idx) => (idx === i ? { ...o, status: 'Revoked' } : o)))
      showToast('Offer revoked')
    },

    async saveDrive(fields) {
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
