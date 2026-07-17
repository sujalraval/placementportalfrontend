export interface Interview {
  cand: string
  role: string
  round: string
  date: string
  slot: string
  panel: string
  mode: 'Virtual' | 'On-campus' | 'Phone'
  status: 'Scheduled' | 'Completed'
}

export const INTERVIEWS_INITIAL: Interview[] = [
  { cand: 'Ananya Rao', role: 'Software Engineer', round: 'Technical', date: '14 Jul', slot: '11:00 AM', panel: 'Panel A · R. Iyer', mode: 'Virtual', status: 'Scheduled' },
  { cand: 'Aarav Shah', role: 'Software Engineer', round: 'Technical', date: '14 Jul', slot: '11:45 AM', panel: 'Panel A · R. Iyer', mode: 'Virtual', status: 'Scheduled' },
  { cand: 'Isha Patel', role: 'Data Analyst', round: 'Case study', date: '15 Jul', slot: '10:00 AM', panel: 'Panel B', mode: 'On-campus', status: 'Scheduled' },
  { cand: 'Dev Trivedi', role: 'Data Analyst', round: 'HR', date: '12 Jul', slot: '02:00 PM', panel: 'Panel C', mode: 'On-campus', status: 'Completed' },
]
