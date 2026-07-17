export interface AdminUser {
  name: string
  role: 'Student' | 'Coordinator' | 'Placement Officer' | 'Recruiter' | 'Admin'
  dept: string
  email: string
  status: 'Active' | 'Pending' | 'Suspended'
}

export const USERS_INITIAL: AdminUser[] = [
  { name: 'Dr. R. Mehta', role: 'Coordinator', dept: 'Computer Science', email: 'r.mehta@gu.ac.in', status: 'Active' },
  { name: 'Dr. S. Shah', role: 'Coordinator', dept: 'Commerce', email: 's.shah@gu.ac.in', status: 'Active' },
  { name: 'Ms. P. Rao', role: 'Placement Officer', dept: 'Central Cell', email: 'tpo@gu.ac.in', status: 'Active' },
  { name: 'Aarav Shah', role: 'Student', dept: 'Computer Science', email: 'aarav.shah@gu.ac.in', status: 'Active' },
  { name: 'Rakesh Iyer · TCS', role: 'Recruiter', dept: '—', email: 'rakesh.iyer@tcs.com', status: 'Active' },
  { name: 'HR · Adani Group', role: 'Recruiter', dept: '—', email: 'hr@adani.com', status: 'Pending' },
]
