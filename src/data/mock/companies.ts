export interface Company {
  name: string
  sector: string
  hires: number
  pkg: string
  status: 'Active' | 'Verifying'
  type: 'Employer' | 'Agency' | 'Agent'
  source: string
  deptScope: string
}

export interface CompanyExtra {
  web: string
  li: string
  x: string
  ig: string
  about: string
  hq: string
  size: string
  founded: string
}

export const COMPANIES: Company[] = [
  { name: 'TCS', sector: 'IT Services', hires: 96, pkg: '₹7.0', status: 'Active', type: 'Employer', source: 'Self-registered', deptScope: 'University-wide' },
  { name: 'Amazon', sector: 'Technology', hires: 22, pkg: '₹18.0', status: 'Active', type: 'Employer', source: 'Self-registered', deptScope: 'University-wide' },
  { name: 'Deloitte', sector: 'Consulting', hires: 34, pkg: '₹9.5', status: 'Active', type: 'Employer', source: 'Self-registered', deptScope: 'University-wide' },
  { name: 'HDFC Bank', sector: 'Banking', hires: 61, pkg: '₹8.0', status: 'Active', type: 'Employer', source: 'Self-registered', deptScope: 'University-wide' },
  { name: 'Infosys', sector: 'IT Services', hires: 78, pkg: '₹6.5', status: 'Active', type: 'Employer', source: 'Self-registered', deptScope: 'University-wide' },
  { name: 'Adani Group', sector: 'Conglomerate', hires: 29, pkg: '₹7.5', status: 'Verifying', type: 'Employer', source: 'Self-registered', deptScope: 'University-wide' },
  { name: 'Cognizant', sector: 'IT Services', hires: 52, pkg: '₹6.0', status: 'Active', type: 'Employer', source: 'Self-registered', deptScope: 'University-wide' },
  { name: 'Zydus', sector: 'Pharma', hires: 18, pkg: '₹5.5', status: 'Active', type: 'Employer', source: 'Self-registered', deptScope: 'University-wide' },
  { name: 'Nishith Desai', sector: 'Legal Services', hires: 6, pkg: '₹6.5', status: 'Active', type: 'Employer', source: 'Self-registered', deptScope: 'University-wide' },
  { name: 'Vibrant Manpower Solutions', sector: 'Staffing & Recruitment', hires: 41, pkg: '₹5.0', status: 'Active', type: 'Agency', source: 'Onboarded by Admin', deptScope: 'University-wide' },
  { name: 'Kalpesh Rana (Independent Agent)', sector: 'IT Contract Staffing', hires: 9, pkg: '₹4.5', status: 'Active', type: 'Agent', source: 'Onboarded by Dept. Coordinator', deptScope: 'Computer Science & Applications' },
  { name: 'Bhavesh & Associates', sector: 'Tax Consultancy', hires: 4, pkg: '₹4.0', status: 'Active', type: 'Employer', source: 'Onboarded by Dept. Coordinator', deptScope: 'Commerce & Business Admin' },
]

export const CO_X: Record<string, CompanyExtra> = {
  'TCS': { web: 'tcs.com', li: 'linkedin.com/company/tcs', x: '@TCS', ig: '@tataconsultancyservices', about: 'Global leader in IT services, consulting and business solutions. Hires for software, cloud, analytics and QA roles across India.', hq: 'Mumbai', size: '600,000+', founded: '1968' },
  'Amazon': { web: 'amazon.jobs', li: 'linkedin.com/company/amazon', x: '@amazon', ig: '@amazon', about: "World's largest e-commerce and cloud company. Campus roles in SDE, cloud, and operations.", hq: 'Seattle / Hyderabad', size: '1.5M+', founded: '1994' },
  'Deloitte': { web: 'deloitte.com', li: 'linkedin.com/company/deloitte', x: '@Deloitte', ig: '@lifeatdeloitte', about: 'Big Four professional services network. Hires analysts and consultants across audit, tax, consulting and risk.', hq: 'London / Mumbai', size: '450,000+', founded: '1845' },
  'HDFC Bank': { web: 'hdfcbank.com', li: 'linkedin.com/company/hdfc-bank', x: '@HDFC_Bank', ig: '@hdfcbank', about: "India's leading private-sector bank. Management trainee and analyst programmes for commerce and MBA graduates.", hq: 'Mumbai', size: '170,000+', founded: '1994' },
  'Infosys': { web: 'infosys.com', li: 'linkedin.com/company/infosys', x: '@Infosys', ig: '@infosys', about: 'Global digital services and consulting company with large-scale campus hiring for engineering roles.', hq: 'Bengaluru', size: '320,000+', founded: '1981' },
  'Adani Group': { web: 'adani.com', li: 'linkedin.com/company/adani-group', x: '@AdaniOnline', ig: '@adanionline', about: "India's largest infrastructure conglomerate — energy, ports, logistics and research internships.", hq: 'Ahmedabad', size: '45,000+', founded: '1988' },
  'Cognizant': { web: 'cognizant.com', li: 'linkedin.com/company/cognizant', x: '@Cognizant', ig: '@cognizant', about: 'IT services and consulting; hires business analysts and engineers from all streams.', hq: 'Teaneck / Chennai', size: '340,000+', founded: '1994' },
  'Zydus': { web: 'zyduslife.com', li: 'linkedin.com/company/zydus-group', x: '@ZydusUniverse', ig: '@zyduslife', about: 'Ahmedabad-based pharma innovator; biotech and life-science associate roles and OJT programmes.', hq: 'Ahmedabad', size: '27,000+', founded: '1952' },
}
