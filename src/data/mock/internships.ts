export interface InternApplicant {
  en: string
  name: string
  stage: 'Applied' | 'Selected' | 'Rejected' | 'Approval Requested' | 'Approved' | 'Ongoing' | 'Completed'
}

export interface Internship {
  id: number
  role: string
  co: string
  type: 'Paid' | 'Free'
  stipend: string
  mode: string
  affiliation: 'Independent' | 'With College'
  minWeeks: number
  depts: string
  cgpa: string
  batch: string
  deadline: string
  status: 'Open' | 'Closed'
  desc: string
  applicants: InternApplicant[]
}

export interface InternshipCredits {
  course: string
  count: number
  evalBasis: string
}

export interface MyInternship {
  internId: number
  role: string
  co: string
  type: 'Paid' | 'Free'
  stipend: string
  mode: string
  affiliation: 'Independent' | 'With College'
  minWeeks: number
  stage: 'Applied' | 'Selected' | 'Approval Requested' | 'Approved' | 'Completed'
  mentor: string | null
  appliedOn: string
  reportText: { objectives: string; summary: string; learnings: string } | null
  certificateIssued: boolean
  approvedOn: string | null
  credits: InternshipCredits | null
}

export interface InternApproval {
  en: string
  name: string
  co: string
  role: string
  type: 'Paid' | 'Free'
  mode: string
  minWeeks: number
  affiliation: 'Independent' | 'With College'
  status: 'Pending' | 'Approved' | 'Rejected'
  requestedOn: string
}

export const INTERNSHIPS: Internship[] = [
  {
    id: 0, role: 'Software Engineering Intern — Summer', co: 'TCS', type: 'Paid', stipend: '₹20,000/mo',
    mode: 'Full-time · Fixed timing (9:30 AM–6:00 PM)', affiliation: 'Independent', minWeeks: 8,
    depts: 'CS · IT', cgpa: '6.5', batch: '2026', deadline: '20 Jul', status: 'Open',
    desc: 'Work with the campus engineering team on internal tooling and cloud services.',
    applicants: [{ en: 'GU21CS118', name: 'Aarav Shah', stage: 'Selected' }, { en: 'GU21CS090', name: 'Ananya Rao', stage: 'Applied' }],
  },
  {
    id: 1, role: 'Frontend Development Intern', co: 'Infosys', type: 'Paid', stipend: '₹15,000/mo',
    mode: 'Full-time · Fixed timing (10:00 AM–6:00 PM)', affiliation: 'Independent', minWeeks: 8,
    depts: 'CS · IT', cgpa: '6.0', batch: '2026', deadline: '20 Jul', status: 'Open',
    desc: 'Build and ship UI features for internal HR tools using React.', applicants: [],
  },
  {
    id: 2, role: 'Marketing Research Intern', co: 'HDFC Bank', type: 'Free', stipend: 'Unpaid — certificate + LOR',
    mode: 'Flexible hours (min 20 hrs/week)', affiliation: 'With College', minWeeks: 6,
    depts: 'Commerce · MBA', cgpa: '6.0', batch: '2026', deadline: '18 Jul', status: 'Open',
    desc: 'Support market research for retail banking products.', applicants: [],
  },
  {
    id: 3, role: 'Cloud Support Intern', co: 'Amazon', type: 'Paid', stipend: '₹25,000/mo',
    mode: 'Full-time · Fixed timing (9:30 AM–6:30 PM)', affiliation: 'Independent', minWeeks: 12,
    depts: 'CS · IT', cgpa: '7.0', batch: '2026', deadline: '25 Jul', status: 'Open',
    desc: 'Assist cloud infrastructure monitoring and support-ticket resolution.', applicants: [],
  },
  {
    id: 4, role: 'Biotech Lab Intern', co: 'Zydus', type: 'Free', stipend: 'Unpaid — certificate only',
    mode: 'Full-time · Fixed timing (9:00 AM–5:00 PM)', affiliation: 'With College', minWeeks: 6,
    depts: 'Life Sciences · Science', cgpa: '6.5', batch: '2026', deadline: '22 Jul', status: 'Open',
    desc: 'Assist in lab research protocols under senior scientists.', applicants: [],
  },
]

export const MY_INTERNS_INITIAL: MyInternship[] = [
  {
    internId: 0, role: 'Software Engineering Intern — Summer', co: 'TCS', type: 'Paid', stipend: '₹20,000/mo',
    mode: 'Full-time · Fixed timing (9:30 AM–6:00 PM)', affiliation: 'Independent', minWeeks: 8,
    stage: 'Selected', mentor: null, appliedOn: '28 Jun', reportText: null, certificateIssued: false, approvedOn: null, credits: null,
  },
]

export const INTERN_APPROVALS_INITIAL: InternApproval[] = [
  { en: 'GU21CS077', name: 'Meet Shah', co: 'Infosys', role: 'Frontend Development Intern', type: 'Paid', mode: 'Full-time · Fixed timing', minWeeks: 8, affiliation: 'Independent', status: 'Pending', requestedOn: '05 Jul' },
  { en: 'GU21CS210', name: 'Riya Sen', co: 'Zydus', role: 'Biotech Lab Intern', type: 'Free', mode: 'Full-time · Fixed timing', minWeeks: 6, affiliation: 'With College', status: 'Pending', requestedOn: '04 Jul' },
]

export function addWeeks(date: string | Date, weeks: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + Math.round(weeks * 7))
  return d
}

export function fmtDate(d: string | Date | null): string {
  return d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'
}

export function weeksElapsed(approvedOn: string | null): number {
  if (!approvedOn) return 0
  const ms = Date.now() - new Date(approvedOn).getTime()
  return ms / (1000 * 60 * 60 * 24 * 7)
}

export function internEligibleDate(mi: MyInternship): Date | null {
  return mi.approvedOn ? addWeeks(mi.approvedOn, mi.minWeeks) : null
}
