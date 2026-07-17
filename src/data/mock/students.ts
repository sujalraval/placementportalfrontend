export interface StudentRosterEntry {
  en: string
  name: string
  dept: string
  cgpa: string
  status: string
  pkg: string
}

export const STUDENTS: StudentRosterEntry[] = [
  { en: 'GU21CS118', name: 'Aarav Shah', dept: 'Computer Science', cgpa: '8.6', status: 'Placed', pkg: '₹18.0 LPA' },
  { en: 'GU21CM204', name: 'Isha Patel', dept: 'Commerce', cgpa: '8.1', status: 'Placed', pkg: '₹8.0 LPA' },
  { en: 'GU22MB061', name: 'Rohan Desai', dept: 'MBA', cgpa: '7.9', status: 'Interviewing', pkg: '—' },
  { en: 'GU21LW033', name: 'Sneha Joshi', dept: 'Law', cgpa: '8.4', status: 'Placed', pkg: '₹6.5 LPA' },
  { en: 'GU21SC145', name: 'Karan Mehta', dept: 'Science', cgpa: '7.2', status: 'Applied', pkg: '—' },
  { en: 'GU22LS078', name: 'Priya Nair', dept: 'Life Sciences', cgpa: '8.0', status: 'Interviewing', pkg: '—' },
  { en: 'GU21EC012', name: 'Dev Trivedi', dept: 'Economics', cgpa: '7.6', status: 'Placed', pkg: '₹9.5 LPA' },
  { en: 'GU21CS090', name: 'Ananya Rao', dept: 'Computer Science', cgpa: '9.1', status: 'Placed', pkg: '₹18.0 LPA' },
]
