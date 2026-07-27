export interface Skill {
  id?: string;
  name: string;
  description?: string;
  category?: string;
}

export const SKILLS_INITIAL: Skill[] = [
  { name: 'Java' },
  { name: 'Python' },
  { name: 'C++' },
  { name: 'React' },
  { name: 'Node.js' }
];
