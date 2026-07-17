import type { Company } from '@/data/mock/companies'
import type { Department } from '@/data/mock/departments'
import { JOBS } from '@/data/mock/jobs'
import type { Drive } from '@/data/mock/drives'
import type { Internship, MyInternship, InternApproval } from '@/data/mock/internships'
import type { RecJob } from '@/data/mock/recruiterJobs'
import type { RecCandidate } from '@/data/mock/candidates'
import { CAND_POOL } from '@/data/mock/candidates'
import type { Interview } from '@/data/mock/interviews'
import type { Offer } from '@/data/mock/offers'
import type { Program } from '@/data/mock/programs'
import type { AdminUser } from '@/data/mock/users'
import type { DeptVerifyItem } from '@/data/mock/deptVerify'

export interface IntegrityCheckResult {
  name: string
  ok: boolean
  detail: string
}

interface IntegrityCheckInputs {
  companies: Company[]
  depts: Department[]
  drives: Drive[]
  internships: Internship[]
  myInterns: MyInternship[]
  recJobs: RecJob[]
  recCands: RecCandidate[]
  interviews: Interview[]
  offers: Offer[]
  programs: Program[]
  users: AdminUser[]
  dverify: DeptVerifyItem[]
  internApprovals: InternApproval[]
  meEn: string
}

// Ported from the original prototype's `runIntegrityChecks()` — a live
// referential-integrity self-check across every cross-entity relationship.
export function runIntegrityChecks(inputs: IntegrityCheckInputs): IntegrityCheckResult[] {
  const { companies, depts, drives, internships, myInterns, recJobs, recCands, interviews, offers, programs, users, dverify, internApprovals, meEn } = inputs
  const results: IntegrityCheckResult[] = []
  const push = (name: string, ok: boolean, detail: string) => results.push({ name, ok, detail })

  const coNames = new Set(companies.map((c) => c.name))

  const deptNamesSet = new Set(depts.map((d) => d.name))
  const badScope = companies.filter((c) => c.deptScope !== 'University-wide' && !deptNamesSet.has(c.deptScope))
  push('Company visibility scopes resolve', badScope.length === 0,
    badScope.length ? badScope.map((c) => `${c.name} → ${c.deptScope}`).join(', ') : 'Every company is scoped to University-wide or a real department')

  const coRefs = new Set<string>()
  JOBS.forEach((j) => coRefs.add(j.co))
  recJobs.forEach((j) => coRefs.add(j.co))
  internships.forEach((j) => coRefs.add(j.co))
  drives.forEach((j) => coRefs.add(j.co))
  const orphanCo = [...coRefs].filter((c) => c && !coNames.has(c))
  push('Company references resolve', orphanCo.length === 0,
    orphanCo.length ? `Unresolved: ${orphanCo.join(', ')}` : `All ${coRefs.size} referenced companies exist in COMPANIES`)

  const internIds = new Set(internships.map((x) => x.id))
  const orphanMi = myInterns.filter((m) => !internIds.has(m.internId))
  push('Internship tracker links resolve', orphanMi.length === 0,
    orphanMi.length ? `${orphanMi.length} orphaned MY_INTERNS record(s)` : 'Every MY_INTERNS.internId resolves to a real posting')

  let desync = 0
  myInterns.forEach((mi) => {
    const x = internships.find((z) => z.id === mi.internId)
    if (!x) return
    const ap = x.applicants.find((a) => a.en === meEn)
    if (ap && ap.stage !== mi.stage) desync++
  })
  push('Internship stage sync (tracker ↔ posting)', desync === 0,
    desync ? `${desync} record(s) out of sync` : 'Tracker and posting stages agree for every tracked internship')

  const offerNames = new Set(offers.map((o) => o.cand))
  const mismatched = recCands.filter((c) => offerNames.has(c.name) && c.stage !== 'Offer')
  push('Candidate stage matches Offers', mismatched.length === 0,
    mismatched.length ? `${mismatched.map((c) => c.name).join(', ')} has an offer but a different stage` : 'Every candidate with an offer record shows stage = Offer')

  const candNames = new Set(recCands.map((c) => c.name))
  const orphanOffers = [...offerNames].filter((n) => !candNames.has(n))
  const orphanInterviews = [...new Set(interviews.map((v) => v.cand))].filter((n) => !candNames.has(n))
  push('Offer / Interview candidate names resolve', orphanOffers.length === 0 && orphanInterviews.length === 0,
    orphanOffers.length || orphanInterviews.length ? `Unresolved: ${orphanOffers.concat(orphanInterviews).join(', ')}` : 'All names resolve to a real candidate record')

  const deptNames = new Set(depts.map((d) => d.name))
  const orphanProg = programs.filter((p) => !deptNames.has(p.dept))
  push('Programs link to real departments', orphanProg.length === 0,
    orphanProg.length ? orphanProg.map((p) => p.name).join(', ') : `All ${programs.length} programs resolve to a department`)

  const candEnSet = new Set(CAND_POOL.map((c) => c.en).concat([meEn]))
  const orphanDv = dverify.filter((v) => !candEnSet.has(v.en))
  const orphanIa = internApprovals.filter((v) => !candEnSet.has(v.en))
  push('Verification queues reference real students', orphanDv.length === 0 && orphanIa.length === 0,
    orphanDv.length + orphanIa.length === 0 ? 'Every DVERIFY / INTERN_APPROVALS entry resolves to a real student' : `${orphanDv.length + orphanIa.length} unresolved reference(s)`)

  const orphanUsers = users.filter((u) => u.role === 'Recruiter' && u.name.includes('·') && !coNames.has(u.name.split('·').pop()!.trim()))
  push('Recruiter accounts link to real companies', orphanUsers.length === 0,
    orphanUsers.length ? orphanUsers.map((u) => u.name).join(', ') : 'All recruiter accounts resolve to COMPANIES')

  return results
}
