export interface Drive {
  co: string
  title: string
  date: string
  depts: string
  rounds: string
  reg: number
  status: 'Upcoming' | 'Registration open' | 'Today' | 'Completed'
}

export const DRIVES: Drive[] = [
  { co: 'Amazon', title: 'Amazon', date: '14 Jul', depts: 'CS · IT', rounds: 'OA · Tech · HR', reg: 97, status: 'Upcoming' },
  { co: 'TCS', title: 'TCS National Qualifier', date: '12 Jul', depts: 'All', rounds: 'Aptitude · Interview', reg: 640, status: 'Upcoming' },
  { co: 'HDFC Bank', title: 'HDFC Pool Drive', date: '10 Jul', depts: 'MBA · Commerce', rounds: 'GD · Interview', reg: 212, status: 'Registration open' },
  { co: 'Deloitte', title: 'Deloitte', date: '08 Jul', depts: 'Stats · CS', rounds: 'Case · Tech · HR', reg: 142, status: 'Today' },
  { co: 'Zydus', title: 'Zydus', date: '01 Jul', depts: 'Biotech', rounds: 'Tech · HR', reg: 41, status: 'Completed' },
]
