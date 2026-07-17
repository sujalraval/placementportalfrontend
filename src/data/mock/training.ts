export interface TrainingCourse {
  name: string
  cat: string
  dur: string
  enrolled: boolean
  prog?: number
  att?: number
}

export interface MockInterview {
  type: string
  date: string
  slot: string
  panel: string
  status: 'Scheduled' | 'Book slot'
}

export interface PracticeTest {
  name: string
  q: number
  best: string
}

export interface SkillGap {
  skill: string
  have: number
  demand: number
}

export interface LearningResource {
  name: string
  cat: string
}

export const TRAIN: TrainingCourse[] = [
  { name: 'Aptitude & Reasoning Bootcamp', cat: 'Aptitude', dur: '6 weeks', enrolled: true, prog: 72, att: 88 },
  { name: 'Data Structures in Java', cat: 'Technical', dur: '8 weeks', enrolled: true, prog: 45, att: 80 },
  { name: 'Group Discussion Lab', cat: 'Communication', dur: '4 weeks', enrolled: true, prog: 88, att: 92 },
  { name: 'Mock Interview Series', cat: 'Interview', dur: 'Ongoing', enrolled: true, prog: 30, att: 75 },
  { name: 'Full-Stack Web Development', cat: 'Technical', dur: '10 weeks', enrolled: false },
  { name: 'Business Communication', cat: 'Communication', dur: '5 weeks', enrolled: false },
  { name: 'Advanced Quantitative Aptitude', cat: 'Aptitude', dur: '4 weeks', enrolled: false },
  { name: 'System Design Fundamentals', cat: 'Technical', dur: '6 weeks', enrolled: false },
]

export const MOCKS: MockInterview[] = [
  { type: 'Technical Mock · DSA', date: '11 Jul', slot: '10:00 AM', panel: 'Dr. R. Mehta', status: 'Scheduled' },
  { type: 'HR & Behavioural Mock', date: '—', slot: '—', panel: '—', status: 'Book slot' },
]

export const PRACTICE: PracticeTest[] = [
  { name: 'Aptitude Test #5', q: 30, best: '82%' }, { name: 'Java Coding Set', q: 15, best: '—' },
  { name: 'Verbal Ability #3', q: 25, best: '76%' }, { name: 'Logical Reasoning #4', q: 20, best: '90%' },
]

export const SKILLGAP: SkillGap[] = [
  { skill: 'System Design', have: 40, demand: 85 }, { skill: 'Cloud (AWS)', have: 55, demand: 90 },
  { skill: 'React', have: 65, demand: 78 }, { skill: 'SQL', have: 80, demand: 80 }, { skill: 'Aptitude', have: 82, demand: 70 },
]

export const RESOURCES: LearningResource[] = [
  { name: 'GeeksforGeeks — DSA track', cat: 'Technical' }, { name: 'HackerRank — Practice', cat: 'Coding' },
  { name: 'NPTEL — Quantitative Aptitude', cat: 'Aptitude' }, { name: 'GU Placement Handbook 2026', cat: 'Guide' },
]
