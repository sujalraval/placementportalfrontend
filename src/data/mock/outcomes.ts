export interface EmploymentOutcome {
  en: string
  name: string
  co: string
  role: string
  ctc: string
  joinedOn: string
  status: 'Active' | 'Promoted' | 'Left' | 'Higher Studies'
  lastUpdate: string
}

export const EMPLOYMENT_OUTCOMES_INITIAL: EmploymentOutcome[] = [
  { en: 'GU21CM204', name: 'Isha Patel', co: 'HDFC Bank', role: 'Management Trainee', ctc: '₹8.0 LPA', joinedOn: 'Jul 2025', status: 'Active', lastUpdate: '6-month check-in · 10 Jan 2026' },
  { en: 'GU21EC012', name: 'Dev Trivedi', co: 'Deloitte', role: 'Data Analyst', ctc: '₹9.5 LPA', joinedOn: 'Aug 2025', status: 'Promoted', lastUpdate: 'Promoted to Senior Analyst · Mar 2026' },
  { en: 'GU21LW033', name: 'Sneha Joshi', co: 'Nishith Desai', role: 'Legal Associate', ctc: '₹6.5 LPA', joinedOn: 'Jul 2025', status: 'Active', lastUpdate: '6-month check-in · 12 Jan 2026' },
  { en: 'GU20CS041', name: 'Yash Bhatt', co: 'Cognizant', role: 'Business Analyst', ctc: '₹6.0 LPA', joinedOn: 'Jul 2024', status: 'Left', lastUpdate: 'Left for higher studies · Jun 2025' },
]
