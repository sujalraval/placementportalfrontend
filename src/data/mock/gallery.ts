export interface GalleryPhoto {
  cap: string
  tag: string
  c: string
}

export interface GalleryVideo {
  title: string
  dur: string
  cap: string
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { cap: 'Convocation & Placement Day 2026', tag: 'Campus event', c: '#1B3A6B' },
  { cap: 'TCS National Qualifier — Drive Day', tag: 'Drive day', c: '#8a6015' },
  { cap: 'AI Résumé Workshop, Final Years', tag: 'Training', c: '#2E7D5B' },
  { cap: 'Industry Connect Summit 2025', tag: 'Summit', c: '#1B3A6B' },
  { cap: 'Mock Interview Bootcamp', tag: 'Training', c: '#8a6015' },
  { cap: 'GIFT City Fintech Internship Signing', tag: 'MOU signing', c: '#2E7D5B' },
]

export const GALLERY_VIDEOS: GalleryVideo[] = [
  { title: 'Placement Cell — Orientation for Final Years', dur: '4:12', cap: 'How to register, build your CV, and apply — start to finish.' },
  { title: 'Student Success Story — Ananya Rao, TCS', dur: '2:45', cap: 'From application to offer: a placed student shares her journey.' },
  { title: 'Campus Drive Highlights — Season 2025–26', dur: '3:08', cap: 'A recap of this season\'s biggest hiring drives on campus.' },
  { title: 'Recruiter Testimonial — HDFC Bank', dur: '1:52', cap: 'Why HDFC Bank keeps coming back to Gujarat University.' },
]
