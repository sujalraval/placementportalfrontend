export interface ProfileLink { id?: string | number; label: string; url: string; ic: string }
export interface Experience { id?: string | number; role: string; co: string; dur: string; loc: string; desc: string; tech: string }
export interface Achievement { id?: string | number; t: string; y: string; d: string }
export interface Position { id?: string | number; role: string; org: string; dur: string; d: string }
export interface Semester { id?: string | number; s: string; sgpa: string; cr: number; res: 'Passed' | 'In progress' | 'Backlog' }
export interface Skill { id?: string | number; n: string; lv: number }
export interface Project { id?: string | number; name: string; stack: string; desc: string; repo: string; demo: string }
export interface Certification { id?: string | number; name: string; by: string; year: string }
export interface StudentDocument { id?: string | number; name: string; type: string; status: string; url?: string }

export interface StudentProfile {
  name: string
  en: string
  dept: string
  batch: string
  cgpa: string
  email: string
  phone: string
  dob: string
  gender: string
  category: string
  city: string
  address: string
  linkedin: string
  github: string
  status: string
  completeness: number
  verified: boolean
  coordinator: string
  backlogs: number
  headline: string
  summary: string
  preferences: { roles: string; type: string; locations: string; ctc: string; relocate: string; avail: string }
  links: ProfileLink[]
  internships: Experience[]
  achievements: Achievement[]
  positions: Position[]
  semesters: Semester[]
  skills: Skill[]
  soft: string[]
  languages: string[]
  interests: string[]
  projects: Project[]
  certs: Certification[]
  docs: StudentDocument[]
}

export const ME: StudentProfile = {
  name: 'Aarav Shah', en: 'GU21CS118', dept: 'Computer Science & Applications', batch: '2022–26',
  cgpa: '8.6', email: 'aarav.shah@gu.ac.in', phone: '+91 98250 00000', dob: '14 Aug 2004',
  gender: 'Male', category: 'General', city: 'Ahmedabad', address: '12, Satellite Road, Ahmedabad – 380015',
  linkedin: 'linkedin.com/in/aaravshah', github: 'github.com/aaravshah', status: 'Available',
  completeness: 92, verified: true, coordinator: 'Dr. R. Mehta', backlogs: 0,
  headline: 'Aspiring Software / Cloud Engineer',
  summary: 'Final-year Computer Science student focused on backend and cloud engineering. I have shipped three production-grade projects, completed two internships, and hold an AWS certification. I am looking for full-time software or cloud roles where I can build reliable, scalable systems.',
  preferences: { roles: 'Software Engineer · Cloud Engineer', type: 'Full-time', locations: 'Bengaluru · Hyderabad · Ahmedabad', ctc: '₹8–18 LPA (expected)', relocate: 'Open to relocate', avail: 'Available from June 2026' },
  links: [
    { label: 'Portfolio', url: 'aaravshah.dev', ic: 'globe' },
    { label: 'GitHub', url: 'github.com/aaravshah', ic: 'build' },
    { label: 'LinkedIn', url: 'linkedin.com/in/aaravshah', ic: 'users' },
    { label: 'LeetCode', url: 'leetcode.com/aaravshah', ic: 'target' },
  ],
  internships: [
    { role: 'Software Engineering Intern', co: 'Infosys', dur: 'May 2025 – Jul 2025', loc: 'Bengaluru · On-site', desc: 'Built REST APIs for an internal HR tool used by 2,000+ employees; cut average query latency by 40% through indexing and caching.', tech: 'Java · Spring Boot · PostgreSQL' },
    { role: 'Cloud Intern', co: 'GIFT City Fintech Lab', dur: 'Dec 2024 – Jan 2025', loc: 'Gandhinagar · Hybrid', desc: 'Automated AWS resource cleanup with Lambda functions, reducing monthly cloud spend by ~18% across a 12-service stack.', tech: 'AWS · Lambda · Python' },
  ],
  achievements: [
    { t: 'Winner — Smart India Hackathon (Software edition)', y: '2025', d: 'Led a 6-member team to build a placement-analytics dashboard.' },
    { t: 'AWS Cloud Practitioner — top 5% score', y: '2025', d: '' },
    { t: 'Merit Scholarship, Gujarat University', y: '2023–24', d: 'Awarded for academic performance.' },
    { t: '2nd place — GU Intra-University Coding Contest', y: '2024', d: '' },
  ],
  positions: [
    { role: 'Coordinator, Coding Club', org: 'Dept. of Computer Science', dur: '2024–25', d: 'Ran weekly DSA sessions for 120+ juniors.' },
    { role: 'Student Volunteer, Placement Cell', org: 'Gujarat University', dur: '2025', d: 'Helped host 8 campus drives.' },
  ],
  semesters: [
    { s: 'Semester 1', sgpa: '8.2', cr: 24, res: 'Passed' }, { s: 'Semester 2', sgpa: '8.4', cr: 24, res: 'Passed' },
    { s: 'Semester 3', sgpa: '8.5', cr: 26, res: 'Passed' }, { s: 'Semester 4', sgpa: '8.7', cr: 26, res: 'Passed' },
    { s: 'Semester 5', sgpa: '8.6', cr: 25, res: 'Passed' }, { s: 'Semester 6', sgpa: '8.9', cr: 25, res: 'Passed' },
    { s: 'Semester 7', sgpa: '8.8', cr: 24, res: 'Passed' }, { s: 'Semester 8', sgpa: '—', cr: 22, res: 'In progress' },
  ],
  skills: [{ n: 'Data Structures', lv: 88 }, { n: 'Java', lv: 85 }, { n: 'SQL', lv: 80 }, { n: 'Python', lv: 78 }, { n: 'React', lv: 65 }, { n: 'Machine Learning', lv: 55 }],
  soft: ['Communication', 'Teamwork', 'Problem solving', 'Presentation', 'Leadership'],
  languages: ['English', 'Hindi', 'Gujarati'],
  interests: ['Backend development', 'Cloud computing', 'AI / ML', 'Open source'],
  projects: [
    { name: 'CampusConnect — Placement Chatbot', stack: 'Python · Flask · NLP', desc: 'An AI chatbot answering student placement queries; piloted with 300 students.', repo: 'github.com/aaravshah/campusconnect', demo: 'campusconnect.demo.app' },
    { name: 'Cloud Cost Optimiser', stack: 'AWS · Lambda · React', desc: 'Dashboard that flags idle cloud resources and estimates monthly savings.', repo: 'github.com/aaravshah/cloud-optimiser', demo: '' },
    { name: 'Library Seat Finder', stack: 'Java · Spring · MySQL', desc: 'Real-time seat availability system for the central university library.', repo: 'github.com/aaravshah/seat-finder', demo: 'seatfinder.gu.app' },
  ],
  certs: [
    { name: 'AWS Certified Cloud Practitioner', by: 'Amazon Web Services', year: '2025' },
    { name: 'Programming in Java', by: 'NPTEL', year: '2024' },
    { name: 'Data Structures & Algorithms', by: 'Coursera', year: '2024' },
  ],
  docs: [
    { name: 'Semester 1–7 Mark Sheets', type: 'Academic', status: 'Verified' },
    { name: 'Class XII Certificate', type: 'Academic', status: 'Verified' },
    { name: 'AWS Certificate', type: 'Certification', status: 'Verified' },
    { name: 'Aadhaar (ID proof)', type: 'Identity', status: 'Verified' },
    { name: 'Passport-size Photograph', type: 'Identity', status: 'Uploaded' },
  ],
}
