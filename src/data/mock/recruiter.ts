export interface RecContact {
  name: string
  desig: string
  email: string
  phone: string
  primary: boolean
}

export interface RecruiterProfile {
  company: string
  sector: string
  website: string
  about: string
  address: string
  hrHead: { name: string; desig: string; email: string; phone: string }
  contacts: RecContact[]
  verified: boolean
  rating: number
  mouData: { company: string; commit: string; terms: string; valid: string; signatory: string }
  history: { year: string; hires: number; avg: string; high: string }[]
}

export const REC_INITIAL: RecruiterProfile = {
  company: 'TCS', sector: 'IT Services', website: 'tcs.com',
  about: 'Tata Consultancy Services is a global leader in IT services, consulting and business solutions, hiring across engineering, analytics and management roles.',
  address: 'TCS House, Navrangpura, Ahmedabad, Gujarat – 380009',
  hrHead: { name: 'Anita Verma', desig: 'Head of Talent Acquisition', email: 'anita.verma@tcs.com', phone: '+91 90000 11111' },
  contacts: [
    { name: 'Rakesh Iyer', desig: 'Campus Recruitment Lead', email: 'rakesh.iyer@tcs.com', phone: '+91 90000 22222', primary: true },
    { name: 'Divya Nair', desig: 'HR Coordinator', email: 'divya.nair@tcs.com', phone: '+91 90000 33333', primary: false },
  ],
  verified: true, rating: 4.6,
  mouData: { company: 'TCS', commit: '80–100', terms: 'Both parties agree to coordinate in good faith on scheduling, share candidate data securely, and honour offers made through the University placement process.', valid: 'May 2027', signatory: 'Anita Verma, Head of Talent Acquisition' },
  history: [{ year: '2025', hires: 96, avg: '₹7.0 LPA', high: '₹12 LPA' }, { year: '2024', hires: 88, avg: '₹6.6 LPA', high: '₹10 LPA' }, { year: '2023', hires: 74, avg: '₹6.2 LPA', high: '₹9 LPA' }],
}

export interface OnboardStep {
  step: string
  status: 'Done' | 'Pending'
  note: string
}

export const ONBOARD: OnboardStep[] = [
  { step: 'Company registration', status: 'Done', note: 'Submitted 12 May 2026' },
  { step: 'Document verification (GST · PAN · Incorporation)', status: 'Done', note: 'Verified by placement cell' },
  { step: 'Placement cell approval', status: 'Done', note: 'Approved by TPO on 14 May 2026' },
  { step: 'MOU signed', status: 'Done', note: 'Valid till May 2027' },
  { step: 'Account activated', status: 'Done', note: 'Full recruiter access granted' },
]

export interface RecDoc {
  name: string
  status: 'Verified' | 'Uploaded'
}

export const REC_DOCS: RecDoc[] = [
  { name: 'Certificate of Incorporation', status: 'Verified' }, { name: 'GST Registration', status: 'Verified' },
  { name: 'PAN Card', status: 'Verified' }, { name: 'Company profile deck', status: 'Uploaded' },
]

export interface RecMessage {
  from: string
  subject: string
  time: string
  unread: boolean
}

export const REC_MSGS: RecMessage[] = [
  { from: 'Placement Cell', subject: 'MOU renewal reminder', time: '1 day ago', unread: true },
  { from: 'Placement Cell', subject: 'SDE drive slot confirmed for 14 Jul', time: '2 days ago', unread: false },
  { from: 'Dr. R. Mehta · CS Coordinator', subject: 'Shortlist shared for Software Engineer', time: '3 days ago', unread: false },
]
