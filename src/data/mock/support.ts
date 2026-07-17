export interface Ticket {
  id: string
  by: string
  cat: string
  sub: string
  pri: 'Low' | 'Medium' | 'High'
  status: 'In progress' | 'Escalated' | 'Resolved'
  sla: string
  owner: string
  date: string
}

export interface Survey {
  name: string
  aud: string
  resp: number
  score: string
  status: 'Open' | 'Closed'
}

export const TICKETS_INITIAL: Ticket[] = [
  { id: 'TKT-1042', by: 'Aarav Shah', cat: 'Application issue', sub: 'Unable to withdraw Deloitte application', pri: 'Medium', status: 'In progress', sla: '12h left', owner: 'Cell Desk', date: '06 Jul' },
  { id: 'TKT-1039', by: 'Isha Patel', cat: 'Profile / documents', sub: 'Mark sheet verification pending 5 days', pri: 'High', status: 'Escalated', sla: 'Breached', owner: 'Dr. S. Shah', date: '04 Jul' },
  { id: 'TKT-1031', by: 'Rakesh Iyer · TCS', cat: 'Recruiter', sub: 'Need venue change for 12 Jul drive', pri: 'High', status: 'Resolved', sla: 'Met', owner: 'TPO Office', date: '02 Jul' },
]

export const SURVEYS_INITIAL: Survey[] = [
  { name: 'Post-Drive Feedback — Deloitte (08 Jul)', aud: 'Participants', resp: 118, score: '4.3 / 5', status: 'Open' },
  { name: 'Aptitude Bootcamp — Effectiveness', aud: 'Enrolled students', resp: 96, score: '4.1 / 5', status: 'Open' },
  { name: 'Recruiter Experience Survey — H1', aud: 'Recruiters', resp: 37, score: 'NPS +52', status: 'Closed' },
]
