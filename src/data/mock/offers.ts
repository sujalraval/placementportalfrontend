export interface Offer {
  cand: string
  role: string
  ctc: string
  joining: string
  loc: string
  status: 'Released' | 'Accepted' | 'Declined' | 'Revoked'
}

export const OFFERS_INITIAL: Offer[] = [
  { cand: 'Aarav Shah', role: 'Software Engineer', ctc: '₹7.0 LPA', joining: 'Jul 2026', loc: 'Ahmedabad', status: 'Accepted' },
  { cand: 'Ananya Rao', role: 'Software Engineer', ctc: '₹7.0 LPA', joining: 'Jul 2026', loc: 'Ahmedabad', status: 'Released' },
  { cand: 'Dev Trivedi', role: 'Data Analyst', ctc: '₹9.5 LPA', joining: 'Aug 2026', loc: 'Bengaluru', status: 'Accepted' },
  { cand: 'Karan Mehta', role: 'QA Engineer', ctc: '₹6.5 LPA', joining: 'Jul 2026', loc: 'Pune', status: 'Declined' },
]
