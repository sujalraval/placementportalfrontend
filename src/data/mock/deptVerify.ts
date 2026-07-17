export interface DeptVerifyItem {
  en: string
  name: string
  item: string
  type: 'Profile' | 'Document' | 'Status'
  date: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

export const DVERIFY_INITIAL: DeptVerifyItem[] = [
  { en: 'GU21CS210', name: 'Riya Sen', item: 'Profile update — new internship added', type: 'Profile', date: '07 Jul', status: 'Pending' },
  { en: 'GU21CS077', name: 'Meet Shah', item: 'Semester 7 mark sheet upload', type: 'Document', date: '06 Jul', status: 'Pending' },
  { en: 'GU21CS118', name: 'Aarav Shah', item: 'AWS certification upload', type: 'Document', date: '05 Jul', status: 'Pending' },
  { en: 'GU21IT145', name: 'Karan Mehta', item: 'Placement status change → Higher studies', type: 'Status', date: '04 Jul', status: 'Pending' },
]
