import type { StudentProfile } from '@/data/mock/me'
import { cvScoreOf, type CvParam } from '@/data/mock/cvParams'

export interface ReadinessPart {
  n: string
  v: number
  w: number
  d: string
}

export function readinessParts(me: StudentProfile, cvParams: CvParam[]): ReadinessPart[] {
  const acad = Math.round((parseFloat(me.cgpa) / 10) * 100)
  const skills = Math.round(me.skills.reduce((a, s) => a + s.lv, 0) / (me.skills.length * 100) * 100)
  const exp = Math.min(100, me.internships.length * 40 + me.projects.length * 10)
  const certs = Math.min(100, me.certs.length * 30)
  const cvs = cvScoreOf(cvParams)
  return [
    { n: 'Academics', v: acad, w: 25, d: `CGPA ${me.cgpa} / 10` },
    { n: 'Skills proficiency', v: skills, w: 25, d: `${me.skills.length} technical skills` },
    { n: 'Experience & projects', v: exp, w: 20, d: `${me.internships.length} internships · ${me.projects.length} projects` },
    { n: 'Certifications', v: certs, w: 10, d: `${me.certs.length} verified` },
    { n: 'CV quality', v: cvs, w: 20, d: `AI CV score ${cvs}/100` },
  ]
}

export function readinessScore(me: StudentProfile, cvParams: CvParam[]): number {
  return Math.round(readinessParts(me, cvParams).reduce((a, p) => a + (p.v * p.w) / 100, 0))
}
