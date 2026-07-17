export interface Job {
  id: number
  role: string
  co: string
  tag: string
  ctc: string
  loc: string
  type: 'Full-time' | 'Internship' | 'OJT'
  cgpa: string
  apps: number
  status: 'Open' | 'Closed'
  deadline: string
}

export const JOBS: Job[] = [
  { id: 1, role: 'Software Engineer', co: 'TCS', tag: 'CS', ctc: '₹7.0 LPA', loc: 'Ahmedabad', type: 'Full-time', cgpa: '6.5', apps: 186, status: 'Open', deadline: '12 Jul' },
  { id: 2, role: 'Data Analyst', co: 'Deloitte', tag: 'Stats · CS', ctc: '₹9.5 LPA', loc: 'Bengaluru', type: 'Full-time', cgpa: '7.0', apps: 142, status: 'Open', deadline: '15 Jul' },
  { id: 3, role: 'Management Trainee', co: 'HDFC Bank', tag: 'MBA · Comm', ctc: '₹8.0 LPA', loc: 'Mumbai', type: 'Full-time', cgpa: '6.0', apps: 210, status: 'Open', deadline: '10 Jul' },
  { id: 4, role: 'Cloud Engineer', co: 'Amazon', tag: 'CS', ctc: '₹18 LPA', loc: 'Hyderabad', type: 'Full-time', cgpa: '7.5', apps: 97, status: 'Open', deadline: '18 Jul' },
  { id: 5, role: 'Legal Associate', co: 'Nishith Desai', tag: 'Law', ctc: '₹6.5 LPA', loc: 'Ahmedabad', type: 'Full-time', cgpa: '6.0', apps: 64, status: 'Open', deadline: '20 Jul' },
  { id: 6, role: 'Research Intern', co: 'Adani Group', tag: 'Science', ctc: '₹25k / mo', loc: 'Ahmedabad', type: 'Internship', cgpa: '6.5', apps: 58, status: 'Open', deadline: '09 Jul' },
  { id: 7, role: 'Business Analyst', co: 'Cognizant', tag: 'Comm · MBA', ctc: '₹6.0 LPA', loc: 'Pune', type: 'Full-time', cgpa: '6.0', apps: 120, status: 'Open', deadline: '22 Jul' },
  { id: 8, role: 'Biotech Associate', co: 'Zydus', tag: 'Biotech', ctc: '₹5.5 LPA', loc: 'Ahmedabad', type: 'Full-time', cgpa: '6.5', apps: 41, status: 'Closed', deadline: '01 Jul' },
  { id: 9, role: 'Manufacturing OJT Programme', co: 'Adani Group', tag: 'Science', ctc: '₹18k / mo + certification', loc: 'Mundra', type: 'OJT', cgpa: '6.0', apps: 33, status: 'Open', deadline: '25 Jul' },
  { id: 10, role: 'Banking Operations OJT', co: 'HDFC Bank', tag: 'Commerce', ctc: '₹15k / mo', loc: 'Ahmedabad', type: 'OJT', cgpa: '6.0', apps: 47, status: 'Open', deadline: '22 Jul' },
]

export function kindOf(job: Job): 'OJT' | 'Internship' | 'Placement' {
  if (job.type === 'OJT') return 'OJT'
  if (job.type.includes('Intern')) return 'Internship'
  return 'Placement'
}

// Ported from the original prototype's `jmatch(j)` — a deterministic mock match score.
export function matchScore(job: Job): number {
  return 64 + ((job.role.length * 7 + job.co.length * 5 + Math.round(parseFloat(job.cgpa) * 4)) % 32)
}
