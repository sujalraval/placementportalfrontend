export interface AdminEvent {
  title: string
  date: string
  mode: 'On-campus' | 'Webinar' | 'Off-campus' | 'Virtual'
  dept: string
  status: 'Upcoming' | 'Completed'
}

export const EVENTS_INITIAL: AdminEvent[] = [
  { title: 'Pre-Placement Talk — Amazon', date: '13 Jul', mode: 'On-campus', dept: 'CS · IT', status: 'Upcoming' },
  { title: 'AI Résumé Workshop', date: '28 Jun', mode: 'Webinar', dept: 'All departments', status: 'Completed' },
  { title: 'Industry Connect Summit', date: '22 Jul', mode: 'On-campus', dept: 'All departments', status: 'Upcoming' },
]

export interface AdminBroadcast {
  title: string
  audience: string
  channel: string
  date: string
}

export const ADMIN_NOTIFS_INITIAL: AdminBroadcast[] = [
  { title: 'TCS National Qualifier registration closes 11 Jul', audience: 'All departments', channel: 'Email · SMS · Push', date: '05 Jul' },
  { title: 'Résumé submission deadline extended to 10 Jul', audience: 'Batch 2026', channel: 'Email · Push', date: '02 Jul' },
]
