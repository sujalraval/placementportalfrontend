const fs = require('fs');
const files = [
  'AcademicsTab.tsx',
  'PersonalTab.tsx',
  'OverviewTab.tsx',
  'SkillsTab.tsx'
];

for (const file of files) {
  const p = `d:/files/office/3/placementportal/placementportalfrontend/src/pages/student/profile/${file}`;
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/try\s*\{\s*([\s\S]*?)\s*\}\s*catch\s*\(e\)\s*\{\}/g, '$1');
  fs.writeFileSync(p, content, 'utf8');
}
