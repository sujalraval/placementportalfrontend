export interface RecJobApplicant {
  en: string
  stage: 'Applied' | 'Shortlisted' | 'Interview' | 'Offer' | 'Rejected'
}

export interface RecJob {
  co: string
  role: string
  type: string
  sector: string
  ctc: string
  loc: string
  openings: string
  cgpa: string
  depts: string
  deptTags: string[]
  batch: string
  apps: number
  status: 'Published' | 'Draft' | 'Pending approval' | 'Closed'
  deadline: string
  bond: string
  skills: string[]
  rounds: string[]
  jd: string
  applicants: RecJobApplicant[]
}

export const REC_JOBS_INITIAL: RecJob[] = [
  {
    co: 'TCS', role: 'Software Engineer', type: 'Full-time', sector: 'IT Services', ctc: '₹7.0 LPA', loc: 'Ahmedabad', openings: '40', cgpa: '6.5', depts: 'CS · IT', deptTags: ['CS', 'IT'], batch: '2026', apps: 186, status: 'Published', deadline: '12 Jul', bond: '1 year service agreement', skills: ['Java', 'Data Structures', 'SQL'], rounds: ['Aptitude', 'Technical', 'HR'], jd: 'Design, build and maintain scalable backend services and APIs. Work with cloud infrastructure and modern engineering practices.',
    applicants: [{ en: 'GU21CS090', stage: 'Interview' }, { en: 'GU21CS118', stage: 'Interview' }, { en: 'GU21CS210', stage: 'Shortlisted' }, { en: 'GU21CS077', stage: 'Applied' }, { en: 'GU21IT145', stage: 'Applied' }],
  },
  {
    co: 'TCS', role: 'Data Analyst', type: 'Full-time', sector: 'Analytics', ctc: '₹9.5 LPA', loc: 'Bengaluru', openings: '15', cgpa: '7.0', depts: 'Stats · CS', deptTags: ['Stats', 'CS'], batch: '2026', apps: 142, status: 'Published', deadline: '15 Jul', bond: 'None', skills: ['Python', 'SQL', 'Statistics'], rounds: ['Case study', 'Technical', 'HR'], jd: 'Analyse data, build dashboards and deliver insights for business teams using SQL, Python and BI tools.',
    applicants: [{ en: 'GU21ST044', stage: 'Shortlisted' }, { en: 'GU21ST012', stage: 'Applied' }, { en: 'GU21CS210', stage: 'Applied' }, { en: 'GU21CM204', stage: 'Applied' }],
  },
  {
    co: 'TCS', role: 'Summer Intern — SDE', type: 'Internship', sector: 'IT Services', ctc: '₹40k / mo', loc: 'Remote', openings: '10', cgpa: '7.0', depts: 'CS', deptTags: ['CS'], batch: '2027', apps: 64, status: 'Pending approval', deadline: '20 Jul', bond: 'None', skills: ['Python', 'Data Structures'], rounds: ['OA', 'Technical'], jd: '8-week internship building internal cloud tooling.',
    applicants: [{ en: 'GU21CS077', stage: 'Applied' }, { en: 'GU21CS210', stage: 'Applied' }],
  },
  {
    co: 'TCS', role: 'Cloud Trainee', type: 'Internship + PPO', sector: 'IT Services', ctc: '₹6.0 LPA', loc: 'Hyderabad', openings: '8', cgpa: '6.5', depts: 'CS · IT', deptTags: ['CS', 'IT'], batch: '2026', apps: 0, status: 'Draft', deadline: '—', bond: '2 years', skills: ['Cloud', 'Python'], rounds: [], jd: '', applicants: [],
  },
  {
    co: 'TCS', role: 'QA Engineer', type: 'Full-time', sector: 'IT Services', ctc: '₹6.5 LPA', loc: 'Pune', openings: '12', cgpa: '6.0', depts: 'CS · IT', deptTags: ['CS', 'IT'], batch: '2025', apps: 120, status: 'Closed', deadline: '01 Jul', bond: '1 year', skills: ['Java', 'Testing'], rounds: ['Aptitude', 'Technical', 'HR'], jd: '',
    applicants: [{ en: 'GU21IT145', stage: 'Applied' }],
  },
]
