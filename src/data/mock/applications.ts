export interface Application {
  role: string
  co: string
  ctc: string
  dept: string
  applied: string
  reached: number
  outcome: 'Offer' | 'Interview' | 'Shortlisted' | 'Applied' | 'Rejected' | 'Withdrawn'
  note: string
  marks?: string
}

export const APPS: Application[] = [
  { role: 'Management Trainee', co: 'HDFC Bank', ctc: '₹8.0 LPA', dept: 'MBA · Comm', applied: '22 Jun', reached: 3, outcome: 'Offer', note: 'Offer received — respond by 15 Jul' },
  { role: 'Cloud Engineer', co: 'Amazon', ctc: '₹18 LPA', dept: 'CS', applied: '02 Jul', reached: 2, outcome: 'Interview', note: 'Technical round · 14 Jul, 11:00 AM', marks: 'Aptitude 82/100 · Technical pending' },
  { role: 'Software Engineer', co: 'TCS', ctc: '₹7.0 LPA', dept: 'CS', applied: '28 Jun', reached: 1, outcome: 'Shortlisted', note: 'Aptitude test · 12 Jul', marks: 'Aptitude 82/100 · advanced to technical' },
  { role: 'Data Analyst', co: 'Deloitte', ctc: '₹9.5 LPA', dept: 'Stats · CS', applied: '25 Jun', reached: 0, outcome: 'Applied', note: 'Awaiting shortlist' },
  { role: 'Business Analyst', co: 'Cognizant', ctc: '₹6.0 LPA', dept: 'Comm', applied: '20 Jun', reached: 1, outcome: 'Rejected', note: 'Not selected after group discussion' },
]
