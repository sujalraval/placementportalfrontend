export interface NewsItem {
  date: string
  cat: string
  title: string
  body: string
}

export const NEWS: NewsItem[] = [
  { date: '05 Jul 2026', cat: 'Announcement', title: 'Placement season crosses 1,400 offers', body: 'Gujarat University records its highest-ever placement rate of 71% with three months still left in the season.' },
  { date: '02 Jul 2026', cat: 'Recruiter', title: 'Amazon returns for on-campus SDE hiring', body: 'Cloud and software roles open across CS and IT with packages up to ₹18 LPA. Campus drive scheduled for 14 July.' },
  { date: '28 Jun 2026', cat: 'Workshop', title: 'AI résumé workshop for final-year students', body: 'A hands-on session on the new AI CV Studio — build and score an ATS-ready résumé in under 30 minutes.' },
  { date: '24 Jun 2026', cat: 'Partnership', title: 'GIFT City firms sign internship MoU', body: 'Fintech and banking firms at GIFT City will offer 120+ paid internships to Gujarat University students this year.' },
]
