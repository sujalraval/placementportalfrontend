import type { PersonaKey, PersonaNavConfig } from '@/types/nav'

// Ported from the original prototype's `NAV` config object.
export const NAV: Record<PersonaKey, PersonaNavConfig> = {
  student: {
    key: 'student',
    label: 'Student',
    footName: 'Aarav Shah',
    footSub: 'Computer Science · 2022–26',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
      { key: 'profile', label: 'My profile', icon: 'user' },
      { key: 'jobs', label: 'Browse jobs', icon: 'brief' },
      { key: 'companies', label: 'Companies', icon: 'build' },
      { key: 'drives', label: 'Campus drives', icon: 'cal' },
      { key: 'intern', label: 'Internships', icon: 'grad' },
      { key: 'apps', label: 'My applications', icon: 'file' },
      { key: 'cv', label: 'AI CV Studio', icon: 'spark' },
      { key: 'readiness', label: 'Readiness index', icon: 'target' },
      { key: 'training', label: 'Training', icon: 'book' },
      { key: 'notifs', label: 'Notifications', icon: 'info' },
      { key: 'support', label: 'Support & feedback', icon: 'warn' },
      { key: 'alumni', label: 'Alumni & network', icon: 'users' },
    ],
  },
  recruiter: {
    key: 'recruiter',
    label: 'Recruiter · TCS',
    footName: 'TCS',
    footSub: 'Campus hiring · Verified',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
      { key: 'company', label: 'Company profile', icon: 'build' },
      { key: 'onboard', label: 'Onboarding & verification', icon: 'shield' },
      { key: 'mou', label: 'MOU', icon: 'file' },
      { key: 'jobs', label: 'Jobs & postings', icon: 'brief' },
      { key: 'intern', label: 'Internships', icon: 'grad' },
      { key: 'cands', label: 'Candidates', icon: 'users' },
      { key: 'interviews', label: 'Interviews', icon: 'cal' },
      { key: 'offers', label: 'Offers', icon: 'check' },
      { key: 'drives', label: 'Campus drives', icon: 'target' },
      { key: 'calendar', label: 'Calendar', icon: 'cal' },
      { key: 'messages', label: 'Messages', icon: 'info' },
    ],
  },
  dept: {
    key: 'dept',
    label: 'Dept · Computer Science',
    footName: 'Dr. R. Mehta',
    footSub: 'CS Coordinator',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
      { key: 'verify', label: 'Verification queue', icon: 'shield' },
      { key: 'internapp', label: 'Internship approvals', icon: 'grad' },
      { key: 'companies', label: 'Companies & recruiters', icon: 'build' },
      { key: 'students', label: 'Students', icon: 'users' },
      { key: 'apps', label: 'Applications', icon: 'file' },
      { key: 'drives', label: 'Drives', icon: 'cal' },
      { key: 'reports', label: 'Reports', icon: 'chart' },
    ],
  },
  faculty: {
    key: 'faculty',
    label: 'Faculty · Prof. Kavita Iyer',
    footName: 'Prof. Kavita Iyer',
    footSub: 'Faculty Mentor · CS',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
      { key: 'mentees', label: 'My mentees', icon: 'users' },
    ],
  },
  admin: {
    key: 'admin',
    label: 'University Admin',
    footName: 'T&P Cell',
    footSub: 'Administrator',
    items: [
      { key: 'dashboard', label: 'Overview', icon: 'grid' },
      { key: 'content', label: 'Website content', icon: 'globe' },
      { key: 'students', label: 'Students', icon: 'users' },
      { key: 'companies', label: 'Companies', icon: 'build' },
      { key: 'jobs', label: 'Job openings', icon: 'brief' },
      { key: 'interns', label: 'Internships', icon: 'grad' },
      { key: 'depts', label: 'Departments & programs', icon: 'book' },
      { key: 'users', label: 'Users & roles', icon: 'user' },
      { key: 'sectors', label: 'Sectors', icon: 'target' },
      { key: 'drives', label: 'Campus drives', icon: 'cal' },
      { key: 'funnel', label: 'Selection funnel', icon: 'chart' },
      { key: 'feedback', label: 'Feedback & surveys', icon: 'info' },
      { key: 'support', label: 'Support desk', icon: 'warn' },
      { key: 'reports', label: 'Reports', icon: 'chart' },
      { key: 'integrity', label: 'Data integrity', icon: 'shield' },
      { key: 'outcomes', label: 'Employment outcomes', icon: 'target' },
      { key: 'settings', label: 'Settings', icon: 'cog' },
    ],
  },
}

export const PERSONA_SWITCHER: { key: PersonaKey | 'website'; label: string }[] = [
  { key: 'website', label: 'Website' },
  { key: 'student', label: 'Student' },
  { key: 'recruiter', label: 'Recruiter' },
  { key: 'faculty', label: 'Faculty' },
  { key: 'dept', label: 'Department' },
  { key: 'admin', label: 'Admin / ERP' },
]

export function isPersonaKey(value: string | undefined): value is PersonaKey {
  return !!value && value in NAV
}
