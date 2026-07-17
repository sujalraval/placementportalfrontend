import type { IconName } from '@/components/icons/icons'

export interface NotifItem {
  ic: IconName
  type: string
  title: string
  time: string
  unread: boolean
}

export interface NotifPref {
  ch: string
  desc: string
  on: boolean
}

export const NOTIFS: NotifItem[] = [
  { ic: 'brief', type: 'Shortlist', title: 'You have been shortlisted by TCS for Software Engineer.', time: '2 hours ago', unread: true },
  { ic: 'cal', type: 'Interview', title: 'Amazon technical interview scheduled for 14 Jul, 11:00 AM.', time: '5 hours ago', unread: true },
  { ic: 'bolt', type: 'New job', title: 'New role matching your profile: Cloud Engineer at Amazon (₹18 LPA).', time: '1 day ago', unread: true },
  { ic: 'check', type: 'Offer', title: 'Offer received from HDFC Bank — please respond by 15 Jul.', time: '2 days ago', unread: false },
  { ic: 'book', type: 'Training', title: 'Reminder: Aptitude Bootcamp session tomorrow at 9:00 AM.', time: '2 days ago', unread: false },
  { ic: 'info', type: 'Announcement', title: 'TCS National Qualifier registration closes 11 Jul.', time: '3 days ago', unread: false },
]

export const NOTIF_PREFS: NotifPref[] = [
  { ch: 'Email', desc: 'Offers, interviews, and results', on: true },
  { ch: 'SMS', desc: 'Time-sensitive alerts only', on: true },
  { ch: 'In-app push', desc: 'All activity', on: true },
  { ch: 'WhatsApp', desc: 'Drive reminders', on: false },
]
