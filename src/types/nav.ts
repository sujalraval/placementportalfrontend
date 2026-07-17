import type { IconName } from '@/components/icons/icons'

export type PersonaKey = 'student' | 'recruiter' | 'dept' | 'faculty' | 'admin'

export interface NavItem {
  key: string
  label: string
  icon: IconName
}

export interface PersonaNavConfig {
  key: PersonaKey
  label: string
  footName: string
  footSub: string
  items: NavItem[]
}
