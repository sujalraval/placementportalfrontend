export interface RecDrive {
  title: string
  date: string
  depts: string
  rounds: string
  reg: number
  mode: 'On-campus' | 'Off-campus' | 'Virtual'
  status: 'Upcoming' | 'Completed'
}

export const REC_DRIVES_INITIAL: RecDrive[] = [
  { title: 'TCS National Qualifier', date: '12 Jul', depts: 'All departments', rounds: 'Aptitude · Interview', reg: 640, mode: 'On-campus', status: 'Upcoming' },
  { title: 'SDE Hiring Drive', date: '14 Jul', depts: 'CS · IT', rounds: 'Technical · HR', reg: 97, mode: 'Virtual', status: 'Upcoming' },
  { title: 'Winter Internship Drive', date: '02 Jun', depts: 'CS', rounds: 'OA · Technical', reg: 120, mode: 'On-campus', status: 'Completed' },
]
