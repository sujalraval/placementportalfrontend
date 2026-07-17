export interface Program {
  name: string
  dept: string
  degree: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Doctoral'
  seats: number
  duration: string
}

export const PROGRAMS_INITIAL: Program[] = [
  { name: 'B.Sc. Computer Science', dept: 'Computer Science & Applications', degree: 'Undergraduate', seats: 180, duration: '3 years' },
  { name: 'Master of Computer Applications', dept: 'Computer Science & Applications', degree: 'Postgraduate', seats: 120, duration: '2 years' },
  { name: 'MBA', dept: 'Business Management (MBA)', degree: 'Postgraduate', seats: 180, duration: '2 years' },
  { name: 'B.Com', dept: 'Commerce & Business Admin', degree: 'Undergraduate', seats: 300, duration: '3 years' },
  { name: 'LL.B.', dept: 'Law', degree: 'Undergraduate', seats: 240, duration: '3 years' },
]
