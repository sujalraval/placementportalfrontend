export interface AlumniMember {
  name: string
  batch: string
  co: string
  role: string
  loc: string
  mentor: boolean
}

export interface Referral {
  role: string
  co: string
  by: string
  status: 'Open' | string
}

export interface AlumniEvent {
  title: string
  by: string
  date: string
  mode: string
}

export interface SuccessStory {
  name: string
  batch: string
  co: string
  pkg: string
  quote: string
}

export const ALUMNI: AlumniMember[] = [
  { name: 'Meera Shah', batch: '2019', co: 'Google', role: 'Senior Software Engineer', loc: 'Bengaluru', mentor: true },
  { name: 'Rahul Patel', batch: '2018', co: 'Goldman Sachs', role: 'Vice President', loc: 'Mumbai', mentor: true },
  { name: 'Anjali Desai', batch: '2020', co: 'Microsoft', role: 'Product Manager', loc: 'Hyderabad', mentor: true },
  { name: 'Vikram Rao', batch: '2017', co: 'Amazon', role: 'SDE III', loc: 'Bengaluru', mentor: false },
  { name: 'Sara Khan', batch: '2021', co: 'Zerodha', role: 'Data Scientist', loc: 'Bengaluru', mentor: true },
  { name: 'Nikhil Menon', batch: '2019', co: 'Deloitte', role: 'Consultant', loc: 'Ahmedabad', mentor: false },
]

export const REFERRALS: Referral[] = [
  { role: 'Software Engineer Intern', co: 'Google', by: 'Meera Shah · 2019', status: 'Open' },
  { role: 'Analyst — Global Markets', co: 'Goldman Sachs', by: 'Rahul Patel · 2018', status: 'Open' },
  { role: 'Associate Product Manager', co: 'Microsoft', by: 'Anjali Desai · 2020', status: '2 referred' },
]

export const AL_EVENTS: AlumniEvent[] = [
  { title: 'Breaking into Big Tech', by: 'Meera Shah · Google', date: '16 Jul', mode: 'Webinar' },
  { title: 'Fintech Careers Panel', by: '3 alumni panellists', date: '20 Jul', mode: 'On-campus' },
  { title: 'Résumé & Referral Clinic', by: 'Nikhil Menon · Deloitte', date: '24 Jul', mode: 'Webinar' },
]

export const STORIES: SuccessStory[] = [
  { name: 'Priya N.', batch: '2025', co: 'Deloitte', pkg: '₹12 LPA', quote: 'The mock interviews and AI CV Studio gave me the confidence to crack my dream role.' },
  { name: 'Arjun M.', batch: '2025', co: 'Amazon', pkg: '₹18 LPA', quote: 'Smart job matching surfaced roles I would otherwise have missed entirely.' },
]
