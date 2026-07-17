export interface Sector {
  name: string
  companies: number
  openings: number
  status: 'Active' | 'Inactive'
}

export const SECTORS_INITIAL: Sector[] = [
  { name: 'IT Services', companies: 42, openings: 38, status: 'Active' },
  { name: 'Banking & Finance', companies: 26, openings: 19, status: 'Active' },
  { name: 'Analytics & Data', companies: 18, openings: 15, status: 'Active' },
  { name: 'Consulting', companies: 14, openings: 11, status: 'Active' },
  { name: 'Pharma & Life Sciences', companies: 12, openings: 9, status: 'Active' },
  { name: 'Core / Manufacturing', companies: 10, openings: 6, status: 'Active' },
  { name: 'FMCG', companies: 8, openings: 5, status: 'Active' },
  { name: 'Government / PSU', companies: 6, openings: 4, status: 'Active' },
]
