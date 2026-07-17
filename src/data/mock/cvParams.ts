export interface CvParam {
  n: string
  d: string
  w: number
  v: number
}

export const CVPARAMS: CvParam[] = [
  { n: 'Contact details', d: 'Name, email, phone, links', w: 5, v: 100 },
  { n: 'Profile summary', d: 'Clarity & impact', w: 10, v: 70 },
  { n: 'Education & academics', d: 'Record, CGPA', w: 15, v: 90 },
  { n: 'Skills', d: 'Relevance to target roles', w: 20, v: 75 },
  { n: 'Projects & experience', d: 'Action verbs, quantified', w: 20, v: 60 },
  { n: 'Certifications', d: 'Credibility & recency', w: 10, v: 55 },
  { n: 'Formatting & ATS', d: 'Parseable layout', w: 10, v: 85 },
  { n: 'Language & grammar', d: 'Readability', w: 10, v: 88 },
]

export function cvScoreOf(params: CvParam[]): number {
  return Math.round(params.reduce((a, p) => a + (p.w * p.v) / 100, 0))
}

export function grade(score: number): [string, string] {
  if (score >= 80) return ['Excellent', 'var(--color-green)']
  if (score >= 60) return ['Good', 'var(--color-gold)']
  return ['Needs work', 'var(--color-red)']
}

const SUGGESTION_TEXT: Record<string, string> = {
  'Profile summary': 'Open with a 2-line summary naming your target role and top strength.',
  'Skills': 'Add role-relevant skills the recruiter listed; remove generic ones.',
  'Projects & experience': 'Start each bullet with an action verb and add a measurable result.',
  'Certifications': 'Add a recent, relevant certification to strengthen credibility.',
  'Formatting & ATS': 'Use a single-column, standard-heading layout so parsers can read it.',
  'Contact details': 'Add a professional email and a portfolio or LinkedIn link.',
  'Education & academics': 'List CGPA and any academic distinctions clearly.',
  'Language & grammar': 'Run the grammar check and tighten long sentences.',
}

export function suggestionFor(paramName: string): string {
  return SUGGESTION_TEXT[paramName] ?? 'Review this section for completeness.'
}
