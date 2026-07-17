export interface CandPoolMember {
  en: string
  name: string
  dept: string
  tag: string
  batch: string
  cgpa: number
  backlogs: number
  skills: string[]
}

export const CAND_POOL: CandPoolMember[] = [
  { en: 'GU21CS090', name: 'Ananya Rao', dept: 'Computer Science', tag: 'CS', batch: '2026', cgpa: 9.1, backlogs: 0, skills: ['Java', 'Data Structures', 'SQL', 'React', 'Cloud', 'Python'] },
  { en: 'GU21CS118', name: 'Aarav Shah', dept: 'Computer Science', tag: 'CS', batch: '2026', cgpa: 8.6, backlogs: 0, skills: ['Java', 'Python', 'SQL', 'Data Structures', 'Machine Learning'] },
  { en: 'GU21CS210', name: 'Riya Sen', dept: 'Computer Science', tag: 'CS', batch: '2026', cgpa: 8.0, backlogs: 0, skills: ['Python', 'SQL', 'React', 'Node', 'Data Structures'] },
  { en: 'GU21CS077', name: 'Meet Shah', dept: 'Computer Science', tag: 'CS', batch: '2026', cgpa: 7.4, backlogs: 0, skills: ['Java', 'Data Structures', 'Spring'] },
  { en: 'GU21IT145', name: 'Karan Mehta', dept: 'Information Technology', tag: 'IT', batch: '2026', cgpa: 7.2, backlogs: 1, skills: ['Java', 'SQL', 'Testing'] },
  { en: 'GU21ST044', name: 'Nisha Patel', dept: 'Statistics', tag: 'Stats', batch: '2026', cgpa: 8.2, backlogs: 0, skills: ['Python', 'R', 'SQL', 'Statistics', 'Tableau'] },
  { en: 'GU21ST012', name: 'Dev Trivedi', dept: 'Statistics', tag: 'Stats', batch: '2026', cgpa: 7.6, backlogs: 0, skills: ['Python', 'SQL', 'Statistics', 'Excel', 'Power BI'] },
  { en: 'GU21CM204', name: 'Isha Patel', dept: 'Commerce', tag: 'Commerce', batch: '2026', cgpa: 8.1, backlogs: 0, skills: ['Excel', 'Communication', 'Accounting'] },
]

export function getCand(en: string): CandPoolMember | undefined {
  return CAND_POOL.find((c) => c.en === en)
}

export interface ScorePart {
  label: string
  pct: number
  w: number
  detail: string
}

export interface ScoreResult {
  overall: number
  skillOverlap: number
  reqCount: number
  parts: ScorePart[]
}

interface ScoreableJob {
  skills?: string[]
  cgpa: string
  deptTags?: string[]
  batch?: string
}

// Ported from the original prototype's `scoreCand(job, cand)` weighted-match algorithm.
export function scoreCand(job: ScoreableJob, cand: CandPoolMember): ScoreResult {
  const req = job.skills?.length ? job.skills : []
  const have = cand.skills.map((s) => s.toLowerCase())
  const overlap = req.filter((s) => have.includes(s.toLowerCase())).length
  const skill = req.length ? overlap / req.length : 0.7
  const cut = parseFloat(job.cgpa) || 0
  const acad = Math.max(0, Math.min(1, (cand.cgpa - (cut - 1)) / (10 - (cut - 1))))
  const dept = !job.deptTags?.length || job.deptTags.includes('All') || job.deptTags.includes(cand.tag) ? 1 : 0.2
  const batch = !job.batch || job.batch === cand.batch ? 1 : 0.4
  const bl = cand.backlogs === 0 ? 1 : 0.3
  const w = { skill: 45, acad: 25, dept: 15, batch: 10, bl: 5 }
  const overall = Math.round(skill * w.skill + acad * w.acad + dept * w.dept + batch * w.batch + bl * w.bl)
  return {
    overall, skillOverlap: overlap, reqCount: req.length,
    parts: [
      { label: 'Skills match', pct: Math.round(skill * 100), w: w.skill, detail: `${overlap} of ${req.length} required skills` },
      { label: 'Academics (CGPA)', pct: Math.round(acad * 100), w: w.acad, detail: `CGPA ${cand.cgpa} vs cutoff ${cut}` },
      { label: 'Department fit', pct: Math.round(dept * 100), w: w.dept, detail: cand.dept },
      { label: 'Batch match', pct: Math.round(batch * 100), w: w.batch, detail: `Batch ${cand.batch}` },
      { label: 'No backlogs', pct: Math.round(bl * 100), w: w.bl, detail: `${cand.backlogs} active backlogs` },
    ],
  }
}

export interface RecCandidateMarks {
  apt: number | null
  tech: number | null
  hr: number | null
}

export interface RecCandidateSalary {
  ctc: string
  fixed: string
  variable: string
}

export interface RecCandidate {
  en: string
  name: string
  dept: string
  cgpa: string
  match: number
  stage: 'Applied' | 'Shortlisted' | 'Interview' | 'Offer' | 'Rejected'
  marks: RecCandidateMarks
  salary: RecCandidateSalary | null
  joined: boolean
}

export const REC_CANDS_INITIAL: RecCandidate[] = [
  { en: 'GU21CS090', name: 'Ananya Rao', dept: 'Computer Science', cgpa: '9.1', match: 92, stage: 'Offer', marks: { apt: 88, tech: null, hr: null }, salary: null, joined: false },
  { en: 'GU21CS118', name: 'Aarav Shah', dept: 'Computer Science', cgpa: '8.6', match: 88, stage: 'Offer', marks: { apt: 82, tech: 79, hr: 85 }, salary: { ctc: '₹7.0 LPA', fixed: '₹6.2 L', variable: '₹0.8 L' }, joined: false },
  { en: 'GU21CM204', name: 'Isha Patel', dept: 'Commerce', cgpa: '8.1', match: 74, stage: 'Shortlisted', marks: { apt: null, tech: null, hr: null }, salary: null, joined: false },
  { en: 'GU21EC012', name: 'Dev Trivedi', dept: 'Economics', cgpa: '7.6', match: 70, stage: 'Offer', marks: { apt: null, tech: null, hr: null }, salary: null, joined: false },
  { en: 'GU22LS078', name: 'Priya Nair', dept: 'Life Sciences', cgpa: '8.0', match: 72, stage: 'Applied', marks: { apt: null, tech: null, hr: null }, salary: null, joined: false },
  { en: 'GU21SC145', name: 'Karan Mehta', dept: 'Science', cgpa: '7.2', match: 66, stage: 'Offer', marks: { apt: null, tech: null, hr: null }, salary: null, joined: false },
  { en: 'GU22MB061', name: 'Rohan Desai', dept: 'MBA', cgpa: '7.9', match: 60, stage: 'Applied', marks: { apt: null, tech: null, hr: null }, salary: null, joined: false },
  { en: 'GU21LW033', name: 'Sneha Joshi', dept: 'Law', cgpa: '8.4', match: 64, stage: 'Rejected', marks: { apt: null, tech: null, hr: null }, salary: null, joined: false },
]

export const RND: [string, string][] = [['apt', 'Aptitude'], ['tech', 'Technical / Subjective'], ['hr', 'HR Round']]

export function funnelCounts(cands: RecCandidate[]) {
  return {
    applied: cands.length,
    appeared: cands.filter((x) => x.marks.apt != null).length,
    tech: cands.filter((x) => x.marks.tech != null).length,
    hr: cands.filter((x) => x.marks.hr != null).length,
    offer: cands.filter((x) => x.stage === 'Offer').length,
    joined: cands.filter((x) => x.joined).length,
  }
}

export const stageRank: Record<string, number> = { Applied: 0, Shortlisted: 1, Interview: 2, Offer: 3 }
