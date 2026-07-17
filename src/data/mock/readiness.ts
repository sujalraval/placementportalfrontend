export interface Badge {
  n: string
  d: string
  got: boolean
}

export const BADGES: Badge[] = [
  { n: 'Profile Pro', d: 'Profile 90%+ complete', got: true },
  { n: 'First Offer', d: 'Received a job offer', got: true },
  { n: 'Mock Master', d: 'Completed 3 mock interviews', got: false },
  { n: 'Skill Builder', d: 'Finished 2 training courses', got: true },
  { n: 'Early Bird', d: 'Applied within 24h of a posting', got: true },
  { n: 'Streak ×7', d: '7-day prep streak', got: false },
]
