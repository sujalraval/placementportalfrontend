export interface MenteeEvaluation {
  grade: string
  marks: number
  remarks: string
}

export interface Mentee {
  en: string
  name: string
  co: string
  role: string
  stage: 'Ongoing' | 'Completed'
  minWeeks: number
  reportSubmitted: boolean
  evaluation: MenteeEvaluation | null
}

export const MENTEES_INITIAL: Mentee[] = [
  { en: 'GU21CS077', name: 'Meet Shah', co: 'Infosys', role: 'Frontend Development Intern', stage: 'Ongoing', minWeeks: 8, reportSubmitted: false, evaluation: null },
  { en: 'GU21CS210', name: 'Riya Sen', co: 'Zydus', role: 'Biotech Lab Intern', stage: 'Ongoing', minWeeks: 6, reportSubmitted: true, evaluation: null },
]
