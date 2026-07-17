export interface PlacementOfficer {
  name: string
  role: string
  email: string
  bio: string
}

export interface LeadershipMember {
  name: string
  role: string
  org: string
  bio: string
}

export interface DeptOfficer {
  dept: string
  name: string
  email: string
}

export interface StaffMember {
  name: string
  role: string
  email: string
  phone: string
  bio: string
}

export const TPO: PlacementOfficer = {
  name: 'Dr. Kinjal Amin Desai',
  role: 'Placement Officer',
  email: 'placement@gujaratuniversity.ac.in',
  bio: 'Heads the Gujarat University Placement Cell, coordinating campus recruitment, industry partnerships, and student readiness across all departments from the B K School of Business Management campus.',
}

export const LEADERSHIP: LeadershipMember[] = [
  {
    name: 'Prof. Jagdish Joshi', role: 'Vice-Chancellor', org: 'Gujarat University',
    bio: 'Provides institutional vision and leadership to Gujarat University and its Training & Placement initiatives.',
  },
  {
    name: 'Registrar', role: 'Registrar', org: 'Gujarat University',
    bio: 'Oversees university administration and governance, supporting placement operations across departments.',
  },
]

export const DEPT_OFFICERS: DeptOfficer[] = [
  { dept: 'Computer Science & Applications', name: 'Dr. R. Mehta', email: 'r.mehta@gujaratuniversity.ac.in' },
  { dept: 'Commerce & Business Admin', name: 'Prof. S. Shah', email: 's.shah@gujaratuniversity.ac.in' },
  { dept: 'B K School of Business Management', name: 'Dr. Kinjal Amin Desai', email: 'placement@gujaratuniversity.ac.in' },
  { dept: 'Science', name: 'Dr. A. Pandya', email: 'a.pandya@gujaratuniversity.ac.in' },
  { dept: 'Arts & Humanities', name: 'Prof. M. Joshi', email: 'm.joshi@gujaratuniversity.ac.in' },
  { dept: 'Law', name: 'Dr. P. Bhatt', email: 'p.bhatt@gujaratuniversity.ac.in' },
]

export const STAFF: StaffMember[] = [
  {
    name: 'Dr. Kinjal Amin Desai', role: 'Placement Officer', email: 'placement@gujaratuniversity.ac.in', phone: '+91 79 2630 1100',
    bio: 'Heads the Gujarat University Placement Cell, coordinating campus recruitment, industry partnerships, and student readiness across all departments.',
  },
  {
    name: 'Dr. R. Mehta', role: 'Placement Coordinator — Computer Science', email: 'r.mehta@gujaratuniversity.ac.in', phone: '+91 79 2630 1108',
    bio: 'Coordinates CS & IT placements, technical-drive readiness, and recruiter relationships for engineering roles.',
  },
  {
    name: 'Ms. Divya Nair', role: 'Placement Executive — Operations', email: 'divya.nair@gujaratuniversity.ac.in', phone: '+91 79 2630 1112',
    bio: 'Runs day-to-day drive logistics, student registrations, and recruiter onboarding support.',
  },
  {
    name: 'Mr. Sanjay Trivedi', role: 'Industry Relations Officer', email: 'sanjay.trivedi@gujaratuniversity.ac.in', phone: '+91 79 2630 1120',
    bio: 'Builds and maintains corporate partnerships, MOUs, and sponsorships across sectors.',
  },
]
