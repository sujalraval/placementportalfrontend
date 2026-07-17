export interface Department {
  name: string
  total: number
  placed: number
  coord: string
}

export const DEPTS: Department[] = [
  { name: 'Computer Science & Applications', total: 320, placed: 271, coord: 'Dr. R. Mehta' },
  { name: 'Commerce & Business Admin', total: 410, placed: 299, coord: 'Dr. S. Shah' },
  { name: 'Business Management (MBA)', total: 180, placed: 159, coord: 'Dr. A. Desai' },
  { name: 'Law', total: 240, placed: 151, coord: 'Dr. P. Joshi' },
  { name: 'Science (Phy · Chem · Maths)', total: 280, placed: 179, coord: 'Dr. K. Patel' },
  { name: 'Life Sciences & Biotech', total: 160, placed: 104, coord: 'Dr. N. Rao' },
  { name: 'Economics & Statistics', total: 150, placed: 110, coord: 'Dr. V. Iyer' },
  { name: 'Arts & Humanities', total: 300, placed: 168, coord: 'Dr. M. Trivedi' },
]

export const TOTAL = DEPTS.reduce((a, d) => a + d.total, 0)
export const PLACED = DEPTS.reduce((a, d) => a + d.placed, 0)
export const RATE = Math.round((PLACED / TOTAL) * 100)
