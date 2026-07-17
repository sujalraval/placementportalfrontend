export interface Opening {
  role: string
  co: string
  dept: string
  ctc: string
  openings: number
  status: 'Published' | 'Pending' | 'Draft' | 'Closed'
  apps: number
}

export const OPENINGS_INITIAL: Opening[] = [
  { role: 'Software Engineer', co: 'TCS', dept: 'CS · IT', ctc: '₹7.0 LPA', openings: 40, status: 'Published', apps: 186 },
  { role: 'Data Analyst', co: 'Deloitte', dept: 'Stats · CS', ctc: '₹9.5 LPA', openings: 15, status: 'Published', apps: 142 },
  { role: 'Management Trainee', co: 'HDFC Bank', dept: 'MBA · Comm', ctc: '₹8.0 LPA', openings: 20, status: 'Published', apps: 210 },
  { role: 'Summer Intern — SDE', co: 'Amazon', dept: 'CS', ctc: '₹40k / mo', openings: 10, status: 'Pending', apps: 0 },
  { role: 'Legal Associate', co: 'Nishith Desai', dept: 'Law', ctc: '₹6.5 LPA', openings: 6, status: 'Pending', apps: 0 },
  { role: 'Research Intern', co: 'Adani Group', dept: 'Science', ctc: '₹25k / mo', openings: 8, status: 'Draft', apps: 0 },
]
